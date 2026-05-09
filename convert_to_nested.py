"""Convert flat V2 angle files to nested V2 (channel tabs inside stage tabs)."""
import re
from pathlib import Path


def transform_stage_block(stage_lines: list) -> list:
    """Convert one stage block from flat to nested.

    Input format (flat):
        === "Stage X: ..."

            ## السياق
            ...

            ### 📱 WhatsApp Script

            ```
            content
            ```

            ### 📞 Call Script

            ```
            content
            ```

            ### ❌ Anti-patterns
            ...

    Output format (nested):
        === "Stage X: ..."

            ## السياق
            ...

            === "📱 WhatsApp"

                ```
                content
                ```

            === "📞 Call"

                ```
                content
                ```

            ### ❌ Anti-patterns
            ...
    """
    if len(stage_lines) <= 1:
        return stage_lines

    header = stage_lines[0]
    body = stage_lines[1:]

    # Find boundaries
    wa_start = None
    call_start = None
    after_call = None

    for idx, line in enumerate(body):
        # Match indented H3 heading: "    ### ..."
        match = re.match(r'^    ### (.+)$', line)
        if not match:
            continue
        title = match.group(1)

        # Detect channel
        is_whatsapp = '📱' in title or 'WhatsApp' in title or 'واتساب' in title
        is_call = '📞' in title or 'Call' in title or 'مكالمة' in title

        if is_whatsapp and not is_call:
            if wa_start is None:
                wa_start = idx
        elif is_call:
            if call_start is None and wa_start is not None:
                call_start = idx
        else:
            # Other heading (Anti-patterns, etc.)
            if call_start is not None and after_call is None:
                after_call = idx

    if wa_start is None or call_start is None:
        return stage_lines  # Structure not recognized

    if after_call is None:
        after_call = len(body)

    # Build transformed body
    new_body = []

    # 1. Pre-WhatsApp content
    new_body.extend(body[:wa_start])

    # Strip trailing empty lines and "---" before tab
    while new_body and (new_body[-1].strip() == '' or new_body[-1].strip() == '---'):
        new_body.pop()
    new_body.append('')  # one blank line before tab

    # 2. WhatsApp tab
    new_body.append('    === "📱 WhatsApp"')
    new_body.append('')
    for line in body[wa_start + 1:call_start]:
        if line.strip():
            new_body.append('    ' + line)
        else:
            new_body.append('')

    # Strip trailing empty lines from WhatsApp content
    while new_body and new_body[-1].strip() == '':
        new_body.pop()
    new_body.append('')  # blank line between tabs

    # 3. Call tab
    new_body.append('    === "📞 Call"')
    new_body.append('')
    for line in body[call_start + 1:after_call]:
        if line.strip():
            new_body.append('    ' + line)
        else:
            new_body.append('')

    # Strip trailing empty lines from Call content
    while new_body and new_body[-1].strip() == '':
        new_body.pop()

    # 4. Post-call content
    if after_call < len(body):
        new_body.append('')
        new_body.append('')
        new_body.extend(body[after_call:])

    return [header] + new_body


def convert_to_nested(content: str) -> str:
    """Convert flat V2 to nested V2."""
    lines = content.split('\n')
    output = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Check if this is a Stage tab opener at column 0
        if re.match(r'^=== "Stage \d+', line):
            # Collect stage block
            stage_block = [line]
            i += 1

            while i < len(lines):
                next_line = lines[i]
                stripped = next_line.strip()
                indent = len(next_line) - len(next_line.lstrip())

                # Stage ends if we hit a top-level non-indented item
                if indent == 0 and stripped:
                    if re.match(r'^=== ', next_line):
                        break
                    if stripped.startswith('---'):
                        break
                    if stripped.startswith('## '):
                        break
                    if stripped.startswith('# '):
                        break
                    # Some other top-level content
                    break

                stage_block.append(next_line)
                i += 1

            # Process the stage block
            transformed = transform_stage_block(stage_block)
            output.extend(transformed)
        else:
            output.append(line)
            i += 1

    return '\n'.join(output)


def main():
    files = [
        f for f in Path("docs/scripts").rglob("angle-*.md")
        if "financial-statements" not in str(f)
    ]

    print(f"Converting {len(files)} files to nested tabs...\n")
    converted = 0

    for f in sorted(files):
        rel = f.relative_to(Path("docs/scripts"))
        try:
            content = f.read_text(encoding='utf-8')
            new_content = convert_to_nested(content)

            if new_content != content:
                f.write_text(new_content, encoding='utf-8')
                print(f"[OK] {rel}")
                converted += 1
            else:
                print(f"[--] {rel} (no changes)")
        except Exception as e:
            print(f"[ERR] {rel}: {e}")

    print(f"\nTotal: {converted}/{len(files)} converted")


if __name__ == "__main__":
    main()
