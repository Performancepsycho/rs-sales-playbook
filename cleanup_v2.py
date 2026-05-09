"""Remove obsolete Quick Navigation tables from V2 angle files."""
import re
from pathlib import Path


def cleanup(content: str) -> str:
    # Remove the "## 🗺️ Quick Navigation للـ 7 Stages" section
    # It runs until the next H2 heading or horizontal rule
    pattern = r'\n## 🗺️ Quick Navigation للـ 7 Stages\n.*?(?=\n## |\n---\n)'
    new_content = re.sub(pattern, '', content, flags=re.DOTALL)

    # Also clean up any double "---" left behind
    new_content = re.sub(r'\n---\n+---\n', '\n---\n', new_content)
    # Remove empty trailing dashes near top
    new_content = re.sub(r'(>\s*"[^"]+"\s*\n+)---\n+(?=## 📚)', r'\1\n', new_content)

    return new_content


def main():
    files = [
        f for f in Path("docs/scripts").rglob("angle-*.md")
        if "financial-statements" not in str(f)
    ]

    converted = 0
    for f in sorted(files):
        content = f.read_text(encoding='utf-8')
        new_content = cleanup(content)
        if new_content != content:
            f.write_text(new_content, encoding='utf-8')
            print(f"[OK] {f.relative_to(Path('docs/scripts'))}")
            converted += 1

    print(f"\nCleaned: {converted}/{len(files)} files")


if __name__ == "__main__":
    main()
