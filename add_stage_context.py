"""Priority 1.2 — Add السياق + الهدف to Stages that are missing them.

Detects accordions that go straight to '=== "📱 WhatsApp"' without a
context section, and inserts a stage-specific context block.
"""
import re
from pathlib import Path


CONTEXT_TEMPLATES = {
    1: '''    ## السياق
    العميل **حوّل فلوس فعلاً**. الـ AI Agent أكد التحويل. السيلز يأكد + يرحب + يجاوب على أي أسئلة محتملة قبل الموعد.

    ## الهدف
    1. تأكيد رسمي للحجز
    2. ترحيب احترافي يبني الـ trust
    3. تسليم كل التفاصيل (موعد، عنوان، جروب)
    4. **ما تـ pitchش الورشة تاني** — العميل دفع، خلاص

''',
    2: '''    ## السياق
    العميل **اتفق على الحجز** (قال "سجلني" / "احجزلي" / "هاجي ادفع في المقر" / "هحجز بعد ما المرتب ينزل"). بس **لسه ما حوّلش**.

    ## الهدف
    1. ثبّت الـ commitment (يحس إنه فعلاً متفقين)
    2. حدد **timeline محدد للتحويل** (مش "هحوّل قريب")
    3. سهّل عليه الدفع (5 طرق جاهزة)
    4. متابعة بدون pressure حتى يحوّل

''',
    3: '''    ## السياق
    العميل **شاف السعر** و**سأل عن الدفع** ("أحوّل فين؟" / "ادفع ازاي؟"). الـ AI ادّاهوله البيانات بس **العميل ما رجعش**. يعني هو **كان جاهز ساعتها**.

    ## الهدف
    1. إعادة فتح المحادثة بدون ضغط
    2. كشف لو فيه حاجة طارئة
    3. تسهيل التحويل بأقل احتكاك ممكن
    4. لو اتعذر، انقله لـ Stage 4

''',
    4: '''    ## السياق
    العميل **شاف السعر** بعد ما الـ AI ادّاهوله. قال "تمام" أو "حلو" بعد السعر **بدون** ما يسأل عن طريقة الدفع. يعني فيه objection داخلي ما قالش عليه.

    ## الهدف
    1. كشف الـ real objection (السعر؟ الثقة؟ التوقيت؟)
    2. ربط القيمة بـ ROI واضح
    3. Close أو schedule كول

''',
    5: '''    ## السياق
    العميل عرف **كل التفاصيل** (سعر + موعد + محاضر + محتوى). قال صراحة **"هفكر"** أو **"هرجعلك"** أو سكت بعد ما وصلته كل المعلومات. هو **جاهز نفسياً** بس محتاج push نهائي.

    ## الهدف
    1. كسر الـ "هفكر" → معالجة الـ تسويف
    2. خلق urgency حقيقي (مش fake scarcity)
    3. الحصول على commitment محدد بتاريخ، أو "لأ" واضحة

''',
    6: '''    ## السياق
    العميل **مشافش السعر** خالص. لسه بيسأل عن إيه الورشة، إيه محتواها، إيه الفرق بين الورش. الـ AI Agent بدأ معاه بس لسه في مرحلة بدائية.

    ## الهدف
    1. كشف وضعه الحالي (مين هو، إيه pain اللي بيقابله)
    2. تكثيف الـ pain (يحس إن المشكلة مش هتمشي لوحدها)
    3. ربط الورشة بحل محدد لمشكلته
    4. ينقله لـ Stage تاني (مهتم باعرف السعر / موعد كول)

''',
    7: '''    ## السياق
    العميل **شاف السعر ورفض صريح**. قال "غالي" / "مش مهتم" / "مش فاضي" / "ميزانيتي مش كده". الـ AI Agent خلّص الـ engagement وحطه كـ Cold. السيلز هنا في **محاولة إعادة تواصل أخيرة**.

    ## الهدف
    1. **مش إقفال فوري** — هدفنا نفهم سبب الرفض
    2. لو في فرصة، نقدم alternative (ورشة أرخص، تقسيط، تأجيل)
    3. لو مفيش فرصة، نخلي العميل يسيب على نهاية لطيفة (يبقى مفتوح للمستقبل)
    4. حماية البراند (مفيش ضغط، مفيش مفاوضة بدون احترام)

    ## ⚠️ Mindset مهم
    **رفض اليوم مش رفض للأبد.** 30% من اللي رفضوا أول مرة بيرجعوا في خلال 6 شهور. الهدف: تخليه يرجع، مش تكسره دلوقتي.

''',
}


def fix_missing_context(content: str) -> tuple[str, int]:
    """Insert context block in stages that lack it.
    Returns (new_content, stages_fixed_count).
    """
    # Match accordion + content until next accordion or top-level section or end
    pattern = re.compile(
        r'(\?{3} \w+ "Stage (\d+):[^"]+"\s*\n)([\s\S]*?)(?=(?:\n\?{3} \w+ "Stage)|(?:\n##\s)|\Z)',
        re.MULTILINE
    )

    fixes_count = 0

    def replace(match):
        nonlocal fixes_count
        header = match.group(1)
        stage_num = int(match.group(2))
        body = match.group(3)

        # Check if context is already present
        if '## السياق' in body:
            return match.group(0)

        # Add context
        ctx = CONTEXT_TEMPLATES.get(stage_num, '')
        if not ctx:
            return match.group(0)

        fixes_count += 1

        # Strip leading newlines from body
        body_clean = body.lstrip('\n')
        return f'{header}\n{ctx}{body_clean}'

    new_content = pattern.sub(replace, content)
    return new_content, fixes_count


def main():
    files = list(Path('docs/scripts').rglob('angle-*.md'))
    files += list(Path('docs/scripts/financial-statements').rglob('*.md'))

    print(f"Adding context to stages in {len(files)} files...\n")

    total_fixes = 0
    files_changed = 0

    for f in sorted(set(files)):
        rel = f.relative_to(Path('docs/scripts'))
        content = f.read_text(encoding='utf-8')
        new_content, count = fix_missing_context(content)

        if count > 0:
            f.write_text(new_content, encoding='utf-8')
            print(f"[OK] {rel} — added context to {count} stages")
            files_changed += 1
            total_fixes += count
        else:
            print(f"[--] {rel} — already has context for all stages")

    print(f"\nTotal: {total_fixes} stages fixed in {files_changed} files")


if __name__ == "__main__":
    main()
