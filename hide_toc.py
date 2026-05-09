"""Add hide: [toc] front-matter to angle files (TOC pollutes from accordions)."""
import re
from pathlib import Path


def add_hide_toc(content: str) -> str:
    """Add hide: [toc] to existing or new front-matter."""
    # Check if front-matter already exists
    if content.startswith('---\n'):
        end = content.find('\n---\n', 4)
        if end > 0:
            fm = content[4:end + 1]
            rest = content[end + 5:]
            # If hide already exists, ensure toc is in it
            if re.search(r'^hide:', fm, re.MULTILINE):
                if '- toc' not in fm:
                    fm = re.sub(
                        r'(hide:\s*\n(?:\s+- \S+\n)*)',
                        r'\1  - toc\n',
                        fm,
                        count=1
                    )
            else:
                fm = fm.rstrip() + '\nhide:\n  - toc\n'
            return f'---\n{fm}---\n{rest}'

    # No front-matter — add one
    return f'---\nhide:\n  - toc\n---\n\n{content}'


def main():
    files = list(Path('docs/scripts').rglob('angle-*.md'))
    print(f"Adding hide:[toc] to {len(files)} angle files...\n")

    converted = 0
    for f in sorted(files):
        rel = f.relative_to(Path('docs/scripts'))
        content = f.read_text(encoding='utf-8')
        new = add_hide_toc(content)
        if new != content:
            f.write_text(new, encoding='utf-8')
            print(f"[OK] {rel}")
            converted += 1
        else:
            print(f"[--] {rel}")

    print(f"\nTotal: {converted}/{len(files)} files")


if __name__ == "__main__":
    main()
