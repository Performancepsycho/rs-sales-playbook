"""Convert outer Stage tabs to vertical accordions (collapsible).

Why: 7 horizontal tabs cause overflow on screen — sales rep can't see all stages.
Solution: Use ??? note (accordions) — all 7 stages visible vertically, click to open one.

Inner tabs (📱 WhatsApp / 📞 Call) stay as tabs (only 2, no overflow).
"""
import re
from pathlib import Path


# Stage emojis based on heat level
STAGE_TYPES = {
    1: "danger",   # Hot — red
    2: "danger",   # Hot — red
    3: "danger",   # Hot — red
    4: "warning",  # Warm — orange
    5: "warning",  # Warm — orange
    6: "info",     # Cold — blue
    7: "info",     # Cold — blue
}


def convert(content: str) -> str:
    """Convert outer Stage tabs to accordions."""

    # 1. Replace the existing helper tip (if any) with new wording
    content = re.sub(
        r'!!! tip "كيف تستخدم الـ Tabs"\s*\n\s*اضغط على Stage اللي تحتاجه\. داخل كل Stage هتلاقي tab WhatsApp \+ tab Call\.',
        '!!! tip "كيف تستخدم الصفحة"\n    اضغط على Stage اللي تحتاجه عشان يفتح. باقي الـ Stages بتفضل مقفولة عشان شاشتك ما تتزحمش.\n\n    داخل كل Stage هتلاقي tab WhatsApp + tab Call.',
        content
    )

    # 2. Replace each === "Stage X..." (column 0) with ??? <type> "Stage X..."
    def replace_stage(match):
        stage_num = int(match.group(1))
        rest = match.group(2)
        admonition_type = STAGE_TYPES.get(stage_num, "note")
        return f'??? {admonition_type} "Stage {stage_num}{rest}"'

    content = re.sub(
        r'^=== "Stage (\d+)([^"]*)"',
        replace_stage,
        content,
        flags=re.MULTILINE
    )

    return content


def main():
    files = list(Path("docs/scripts").rglob("angle-*.md"))

    # Also include financial-statements/index.md (which has Stage structure)
    fs_index = Path("docs/scripts/financial-statements/index.md")
    if fs_index.exists():
        files.append(fs_index)

    print(f"Converting {len(files)} files...\n")
    converted = 0

    for f in sorted(files):
        rel = f.relative_to(Path("docs/scripts"))
        try:
            content = f.read_text(encoding='utf-8')
            new_content = convert(content)

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
