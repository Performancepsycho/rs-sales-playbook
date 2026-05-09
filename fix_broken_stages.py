"""Fix broken Stage accordions where content escaped outside.

Pattern of brokenness:
    ??? info "Stage 7: ..."

    ---
    ## السياق  ← orphaned (should be inside accordion)
    ...
    ### 📱 WhatsApp Script  ← orphaned (should be === tab)
    ...
"""
import re
from pathlib import Path


# Post-stage section markers (boundary for orphaned content)
POST_STAGE_PATTERN = r'\n## (?:🚦|📊|ملاحظات|💎|🎯 ملاحظات|🔍|❌ Anti-patterns لـ Angle|❌ Anti-patterns Angle|✅ Best Practices لـ |✅ Best Practices Angle|Cross-sell|الـ Cross-sell)'


def process_orphaned_body(body: str) -> str:
    """Convert orphaned content: change ### 📱/📞 sections to nested tabs."""
    lines = body.split('\n')
    result = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Match WhatsApp script heading (any variant)
        if re.match(r'^### 📱', line):
            result.append('=== "📱 WhatsApp"')
            result.append('')
            i += 1
            # Collect content until next channel heading or post-channel heading
            channel_content = []
            while i < len(lines):
                if re.match(r'^### (📱|📞|❌|✅)', lines[i]):
                    break
                channel_content.append(lines[i])
                i += 1
            # Indent the channel content by 4 (so it's inside the tab)
            for cl in channel_content:
                if cl.strip():
                    result.append('    ' + cl)
                else:
                    result.append('')
            continue

        if re.match(r'^### 📞', line):
            result.append('=== "📞 Call"')
            result.append('')
            i += 1
            channel_content = []
            while i < len(lines):
                if re.match(r'^### (📱|📞|❌|✅)', lines[i]):
                    break
                channel_content.append(lines[i])
                i += 1
            for cl in channel_content:
                if cl.strip():
                    result.append('    ' + cl)
                else:
                    result.append('')
            continue

        # All other lines stay as-is
        result.append(line)
        i += 1

    return '\n'.join(result)


def fix_broken_stage(content: str) -> str:
    """Find broken Stage accordions and re-wrap orphaned content."""
    # Pattern: ??? type "Stage X: ..." + (whitespace/empty lines) + --- + orphaned content
    # Boundary: next post-stage H2 marker
    pattern = re.compile(
        r'(\?{3} \w+ "Stage \d+:[^"]+")\s*\n+\s*---\s*\n+([\s\S]*?)(?=' + POST_STAGE_PATTERN + r'|\Z)',
        re.MULTILINE
    )

    def replace(match):
        header = match.group(1)
        body = match.group(2).rstrip()

        # Process body: convert channels to tabs
        new_body = process_orphaned_body(body)

        # Indent every line by 4 spaces (to be inside the accordion)
        indented_lines = []
        for line in new_body.split('\n'):
            if line.strip():
                indented_lines.append('    ' + line)
            else:
                indented_lines.append('')
        indented = '\n'.join(indented_lines).rstrip()

        return f'{header}\n\n{indented}\n'

    return pattern.sub(replace, content)


def main():
    files = list(Path('docs/scripts').rglob('*.md'))

    fixed = 0
    for f in sorted(files):
        rel = f.relative_to(Path('docs/scripts'))
        content = f.read_text(encoding='utf-8')

        # Only process files that have broken stages
        broken_pattern = re.compile(
            r'\?{3} \w+ "Stage \d+:[^"]+"\s*\n\s*\n+\s*---\s*\n+##',
            re.DOTALL
        )
        if not broken_pattern.search(content):
            continue

        new_content = fix_broken_stage(content)
        if new_content != content:
            f.write_text(new_content, encoding='utf-8')
            print(f"[OK] {rel}")
            fixed += 1
        else:
            print(f"[FAIL] {rel} — pattern matched but no change")

    print(f"\nFixed: {fixed}")


if __name__ == "__main__":
    main()
