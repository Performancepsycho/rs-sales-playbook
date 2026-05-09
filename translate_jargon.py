"""Translate English sales jargon to Arabic in script files (instructional context).
Keeps technical methodology names (PAEC, A.C.R, ROI, KPI, etc.) in English.
"""
import re
from pathlib import Path


# Order matters: longer phrases first
TRANSLATIONS = [
    # Closes & instructions
    ('Goodwill close', 'إنهاء محترم'),
    ('Goodwill Close', 'إنهاء محترم'),
    ('pleasant note', 'نهاية لطيفة'),
    ('Trial Close', 'اختبار قرار'),
    ('trial close', 'اختبار قرار'),
    ('Soft Close', 'إقفال هادي'),
    ('soft close', 'إقفال هادي'),
    ('Direct Close', 'إقفال مباشر'),
    ('Choice Close', 'إقفال بالاختيار'),
    ('Hard Close', 'إقفال حازم'),
    ('Soft Commitment', 'التزام هادي'),
    ('soft commitment', 'التزام هادي'),

    # Methodology pieces
    ('Pre-call checklist', 'قبل المكالمة'),
    ('Pre-call', 'قبل المكالمة'),
    ('Post-Call Follow-up', 'متابعة بعد المكالمة'),
    ('Post-call', 'بعد المكالمة'),
    ('post-call', 'بعد المكالمة'),
    ('Decision Tree', 'شجرة القرار'),
    ('Quick Decision Tree', 'شجرة قرار سريعة'),

    # Concepts
    ('Pitch Outline', 'هيكل العرض'),
    ('Pitch outline', 'هيكل العرض'),
    ('Discovery Questions', 'أسئلة الاستكشاف'),
    ('Confirmation Talking Points', 'نقاط تأكيد للمكالمة'),
    ('Talking Points', 'نقاط للمكالمة'),
    ('Bridge to Pitch', 'الربط للعرض'),
    ('Bridge', 'الربط'),
    ('Opening Script', 'افتتاحية المكالمة'),
    ('Opening', 'الافتتاحية'),

    # Sales tactics (commentary brackets)
    ('[Branch]', '[فرع المحادثة حسب رد العميل]'),
    ('[Branch ', '[فرع المحادثة '),
    ('Branch:', 'فرع:'),
    ('— Branch:', '— فرع المحادثة:'),
    ('reactivation', 'إعادة تواصل'),
    ('Reactivation', 'إعادة تواصل'),
    ('stalling', 'تسويف'),
    ('Stalling', 'تسويف'),
    ('framing', 'تأطير'),
    ('Framing', 'تأطير'),
    ('verification', 'تحقق'),
    ('Verification', 'تحقق'),
    ('verify', 'تتحقق'),

    # Less common but used
    ('Workshop Highlight', 'إبراز الورشة'),
    ('Recovery', 'استعادة'),
    ('Bypass', 'تجاوز'),
    ('binary choice', 'اختيار محدد'),
    ('Binary Question', 'سؤال اختيار محدد'),
    ('Binary opener', 'افتتاحية بسؤال محدد'),

    # In-script directives
    ('[انتظر — Branch:]', '[استنى رد العميل — فرع المحادثة:]'),
    ('[انتظر]', '[استنى رد العميل]'),
    ('[استمع — Branch:]', '[استمع للعميل — فرع المحادثة:]'),
    ('[استمع]', '[استمع للعميل]'),
    ('[Empathy statement', '[جملة تعاطف'),
    ('[Pitch outline]', '[هيكل العرض]'),
    ('[Pitch focused on owner ROI angle]', '[عرض مركز على ROI لصاحب الشركة]'),
    ('[Pitch focused on owner verification angle]', '[عرض مركز على دور التحقق لصاحب الشركة]'),
    ('[Pitch focused on company-ERP angle]', '[عرض مركز على ERP الشركة]'),
    ('[Pitch focused on market angle]', '[عرض مركز على فرصة السوق]'),
    ('[Pitch focused on filling the gap]', '[عرض مركز على سد الـ skill gap]'),
    ('[Pitch focused on CFO ready]', '[عرض مركز على الجاهزية لـ CFO]'),
    ('[Pitch]', '[عرض الورشة]'),

    # Common Arabic-English mixed instructions
    ('— focused responses', '— ردود مخصصة لكل واحد'),
    ('— كل واحد رد مفصّل', '— كل واحد رد مفصّل'),  # already good
]


def translate_content(content: str) -> tuple[str, int]:
    """Apply all translations. Returns (new_content, count_replaced)."""
    count = 0
    for en, ar in TRANSLATIONS:
        new_content = content.replace(en, ar)
        if new_content != content:
            count += content.count(en)
            content = new_content
    return content, count


def main():
    files = list(Path('docs/scripts').rglob('*.md'))
    print(f"Translating jargon in {len(files)} files...\n")

    total_replacements = 0
    total_files_changed = 0

    for f in sorted(files):
        rel = f.relative_to(Path('docs/scripts'))
        content = f.read_text(encoding='utf-8')
        new_content, count = translate_content(content)
        if new_content != content:
            f.write_text(new_content, encoding='utf-8')
            print(f"[OK] {rel} ({count} replacements)")
            total_files_changed += 1
            total_replacements += count

    print(f"\nTotal: {total_replacements} replacements across {total_files_changed} files")


if __name__ == "__main__":
    main()
