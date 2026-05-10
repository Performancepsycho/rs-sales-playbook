"""Priority 1.1 — Fix broken translation patterns.
Targets specific Arabic-English hybrid strings that read poorly.
"""
import re
from pathlib import Path

# Order: longer/specific phrases first to avoid partial matches
TRANSLATIONS = [
    # Compound phrases (must come before single words)
    ('[Pitch focused on owner تحقق angle]', '[عرض مركز على دور التحقق لصاحب الشركة]'),
    ('[Pitch focused on specialization angle]', '[عرض مركز على تخصص العميل]'),
    ('[Pitch focused on owner verification angle]', '[عرض مركز على التحقق لصاحب الشركة]'),
    ('[Pitch focused on owner ROI angle]', '[عرض مركز على ROI لصاحب الشركة]'),
    ('[Pitch focused on company-ERP angle]', '[عرض مركز على ERP الشركة]'),
    ('[Pitch focused on market angle]', '[عرض مركز على فرصة السوق]'),
    ('[Pitch focused on filling the gap]', '[عرض مركز على سد الـ skill gap]'),
    ('[Pitch focused on CFO ready]', '[عرض مركز على الجاهزية لـ CFO]'),

    # Stage decision tree common lines
    ('Stage 1-3 → Closing سريع + tax-deductible reminder', 'Stages 1-3 → إقفال سريع + تذكير العميل إنها مصاريف معتمدة ضريبياً'),
    ('Stage 1-3 → Closing سريع + laptop reminder', 'Stages 1-3 → إقفال سريع + تذكير اللابتوب'),
    ('Stage 1-3 → Closing سريع', 'Stages 1-3 → إقفال سريع'),
    ('Stage 7 → إعادة تواصل بـ "تحقق insurance" تأطير', 'Stage 7 → إعادة تواصل بمنطق "التأمين عن طريق التحقق"'),
    ('Stage 7 → إعادة تواصل بـ "تحقق insurance"', 'Stage 7 → إعادة تواصل بمنطق "التأمين عن طريق التحقق"'),
    ('"تحقق insurance"', '"التأمين بالتحقق"'),
    ('verification insurance', 'التأمين عن طريق التحقق'),
    ('insurance framing', 'تأطير الحماية'),
    ('reactivation محترم', 'إعادة تواصل محترمة'),

    # Headings (very common)
    ('## 🚦 Quick شجرة القرار للسيلز', '## 🚦 شجرة القرار السريعة'),
    ('## 🚦 Quick شجرة القرار', '## 🚦 شجرة القرار السريعة'),
    ('## 🚦 شجرة القرار للسيلز', '## 🚦 شجرة القرار السريعة'),
    ('Quick شجرة القرار', 'شجرة القرار السريعة'),
    ('## Quick Reference Card', '## بطاقة مرجعية سريعة'),
    ('## 📋 Quick Reference Card', '## 📋 بطاقة مرجعية سريعة'),
    ('## 📋 Quick Reference', '## 📋 المرجع السريع'),
    ('## 🗺️ Quick Navigation', '## 🗺️ التنقل السريع'),

    # Reference card field names
    ('| **Top 3 Objections** |', '| **أكتر 3 اعتراضات** |'),
    ('Top 3 Objections', 'أكتر 3 اعتراضات'),

    # Mid-text English
    ('approach مختلف لكل واحد', 'الأسلوب يختلف لكل واحد'),
    ('approach مختلف', 'الأسلوب مختلف'),
    ('Cross-sell الذكي', 'البيع الإضافي الذكي'),
    ('الـ Cross-sell', 'البيع الإضافي'),
    ('Cross-sell', 'بيع إضافي'),

    # Pitch instruction lines
    ('**استخدامها في الـ pitch:**', '**استخدامها في العرض:**'),
    ('في الـ pitch:', 'في العرض:'),
    ('استخدامها في الـ pitch', 'استخدامها في العرض'),

    # Common commentary
    ('— Differentiator', '— ميزة تميّزها'),
    ('— Differentiator vs YouTube', '— ميزة تميّزها عن YouTube'),
    ('Differentiator vs YouTube', 'ميزة تميّزها عن YouTube'),
    ('— Trust signal', '— إشارة ثقة'),
    ('— Trust', '— ثقة'),
    ('Trust signal', 'إشارة ثقة'),

    # Why-it-works style
    ('**Why it works:**', '**ليه ينفع:**'),
    ('Why it works:', 'ليه ينفع:'),
    ('explicit promise', 'وعد صريح'),
    ('feedback time', 'وقت الـ feedback مش الآن'),
    ('= explicit promise', '= وعد صريح'),
    ('defensiveness', 'الدفاعية'),
    ('open للمستقبل', 'مفتوح للمستقبل'),
    ('referral)', 'تواصل لاحق)'),

    # Workshop-specific
    ('بنشتغل live على Odoo فعلي', 'بنشتغل على Odoo فعلياً'),

    # Hook lines (header style)
    ('**الـ Hook الأساسي**', '**الـ Hook الأساسي**'),  # keep — Hook is sales jargon
    ('— الـ pain الأساسي', '— الـ Pain الأساسي'),
    ('— الـ paradigm shift', '— تغيير زاوية النظر'),
    ('— الـ market angle', '— زاوية السوق'),
    ('— الـ progression', '— التطور المهني'),
    ('— الـ outcome', '— النتيجة المستهدفة'),
    ('— الـ ROI', '— الـ ROI واضح'),

    # Stand-alone English
    ('Recovery من اعتراض حاد', 'استعادة من اعتراض حاد'),
    ('Goodwill close', 'إنهاء محترم'),  # double-check stragglers
    ('cost-benefit clear', 'فيه فايدة واضحة'),
    ('case studies من كتاب', 'حالات دراسية من كتب'),

    # CFO-related
    ('Pitch focused on CFO ready', 'عرض مركز على الجاهزية لـ CFO'),

    # Already-done patterns that need reverification (common)
    ('cost saving', 'توفير التكلفة'),
    ('تـ تحقق', 'تتحقق من'),
]


def main():
    files = list(Path('docs').rglob('*.md'))
    print(f"Fixing translation patterns in {len(files)} files...\n")

    total_replacements = 0
    files_changed = 0

    for f in sorted(files):
        rel = f.relative_to(Path('docs'))
        content = f.read_text(encoding='utf-8')
        original = content

        local_replacements = 0
        for en, ar in TRANSLATIONS:
            count_before = content.count(en)
            if count_before > 0:
                content = content.replace(en, ar)
                local_replacements += count_before

        if content != original:
            f.write_text(content, encoding='utf-8')
            print(f"[OK] {rel} ({local_replacements} replacements)")
            files_changed += 1
            total_replacements += local_replacements

    print(f"\nTotal: {total_replacements} replacements in {files_changed} files")


if __name__ == "__main__":
    main()
