"""Convert angle files from V1 (sequential headings) to V2 (Stage tabs)."""
import re
from pathlib import Path


def convert_to_v2(content: str) -> str:
    """Convert V1 angle file to V2 Stage-tabs format."""
    # Split on "# Stage X:" headers (H1 only, not ##)
    parts = re.split(r'(?=^# Stage \d+:)', content, flags=re.MULTILINE)

    if len(parts) < 2:
        return content  # No stages found

    header = parts[0].rstrip()
    stages = parts[1:]

    # Separate post-content from the last stage
    # Post-content markers: "## " sections after Stage 7
    last_stage = stages[-1]
    post_content = ''

    # Find first H2 (## ) that's NOT inside a code block within the last stage
    # Simpler heuristic: find the first "## " on its own line
    post_match = re.search(r'\n## ', last_stage)
    if post_match:
        stages[-1] = last_stage[:post_match.start()]
        post_content = last_stage[post_match.start() + 1:]  # Skip the leading \n

    # Build V2 output
    output_parts = [header, '', '## 📚 الـ 7 Stages', '']
    output_parts.append('!!! tip "كيف تستخدم الـ Tabs"')
    output_parts.append('    اضغط على Stage اللي تحتاجه. داخل كل Stage هتلاقي tab WhatsApp + tab Call.')
    output_parts.append('')

    for stage in stages:
        m = re.match(r'^# (.+?)$', stage, flags=re.MULTILINE)
        if not m:
            continue

        title = m.group(1).strip()
        # Extract body after the H1 line
        body = stage[m.end():].lstrip('\n')
        # Remove trailing horizontal rule
        body = re.sub(r'\n+---\s*$', '', body).rstrip()

        # Convert sub-headings within stage:
        # ### 📱 WhatsApp / WhatsApp Script -> H3 stays (will be inside tab)
        # We don't change them — they remain as headings inside the tab content

        # Indent every line by 4 spaces (for tab content)
        indented_lines = []
        for line in body.split('\n'):
            if line.strip():
                indented_lines.append('    ' + line)
            else:
                indented_lines.append('')
        indented = '\n'.join(indented_lines)

        output_parts.append(f'=== "{title}"')
        output_parts.append('')
        output_parts.append(indented)
        output_parts.append('')

    output = '\n'.join(output_parts)

    # Append post-content (Anti-patterns, Decision Tree, etc.) un-tabbed
    if post_content.strip():
        output += '\n\n---\n\n' + post_content.strip() + '\n'

    return output


def process_file(file_path: Path) -> bool:
    """Process a single angle file. Returns True if changed."""
    try:
        content = file_path.read_text(encoding='utf-8')
        new_content = convert_to_v2(content)

        if new_content == content:
            return False

        file_path.write_text(new_content, encoding='utf-8')
        return True
    except Exception as e:
        print(f"  ERROR: {e}")
        return False


def main():
    docs_root = Path("docs/scripts")
    files = [
        f for f in docs_root.rglob("angle-*.md")
        if "financial-statements" not in str(f)
    ]

    print(f"Found {len(files)} angle files to convert\n")

    converted = 0
    for f in sorted(files):
        rel = f.relative_to(docs_root)
        print(f"Processing: {rel}")
        if process_file(f):
            print(f"  [OK] Converted")
            converted += 1
        else:
            print(f"  [--] Skipped")

    print(f"\n{'='*50}")
    print(f"Total: {converted}/{len(files)} files converted")


if __name__ == "__main__":
    main()
