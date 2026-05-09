"""Fix angle files where Stage 1 has [template] placeholder
or Stage 2-3 are merged into one tab."""
import re
from pathlib import Path

# Workshop info
WORKSHOPS = {
    "financial-accountant": {
        "name": "المحاسب المالي",
        "instructor": "أ/ محمد علاء",
        "lectures": "8 محاضرات × 3 ساعات",
        "full": 3250,
        "half": 1625,
        "address": "29 أ امتداد رمسيس، نقابة التجاريين، الدور 8، العباسية، القاهرة",
    },
    "comprehensive-accountant": {
        "name": "المحاسب الشامل",
        "instructor": "أ/ محمد ريان",
        "lectures": "8 محاضرات × 4 ساعات",
        "full": 5800,
        "half": 2900,
        "address": "29 أ امتداد رمسيس، نقابة التجاريين، الدور 8، العباسية، القاهرة",
    },
    "tax-expert": {
        "name": "خبير الضرائب",
        "instructor": "أ/ أحمد علي",
        "lectures": "12 محاضرة × 3 ساعات",
        "full": 5250,
        "half": 2625,
        "address": "29 أ امتداد رمسيس، نقابة التجاريين، الدور 8، العباسية، القاهرة",
    },
    "odoo": {
        "name": "Odoo Accounting",
        "instructor": "أ/ إسلام سعيد",
        "lectures": "8 محاضرات × 3 ساعات",
        "full": 3000,
        "half": 1500,
        "address": "29 أ امتداد رمسيس، نقابة التجاريين، الدور 8، العباسية، القاهرة",
    },
    "cost-engineering": {
        "name": "هندسة التكاليف",
        "instructor": "أ/ أحمد عاشور",
        "lectures": "5-8 محاضرات × 3 ساعات",
        "full": 3500,
        "half": 1750,
        "address": "29 أ امتداد رمسيس، نقابة التجاريين، الدور 8، العباسية، القاهرة",
    },
    "financial-analysis": {
        "name": "التحليل المالي",
        "instructor": "أ/ أحمد عاشور",
        "lectures": "7 محاضرات × 3 ساعات",
        "full": 5000,
        "half": 2500,
        "address": "29 أ امتداد رمسيس، نقابة التجاريين، الدور 8، العباسية، القاهرة",
    },
    "cfo": {
        "name": "المدير المالي CFO",
        "instructor": "أ/ أحمد عاشور",
        "lectures": "10 محاضرات × 3 ساعات",
        "full": 6000,
        "half": 3000,
        "address": "Online (Zoom — تفاعلي)",
    },
}


def make_stage_1(w):
    return f'''=== "Stage 1: تم التحويل ✅💰 (🔥 Hot)"

    ## السياق
    العميل **حوّل فلوس فعلاً**. الـ AI أكد التحويل. السيلز يأكد + يرحب + يجاوب على أسئلة محتملة قبل الموعد.

    ## الهدف
    1. تأكيد رسمي للحجز
    2. ترحيب احترافي يبني الـ trust
    3. تسليم كل التفاصيل (موعد، عنوان، جروب)
    4. **ما تـ pitchش الورشة تاني** — العميل دفع، خلاص

    === "📱 WhatsApp"

        ```
        ✅ التحويل وصل، شكراً [الاسم]!

        🎉 مبروك! حجزك في ورشة {w["name"]} مع {w["instructor"]} مؤكد رسمياً.

        📋 التفاصيل:
        • الورشة: {w["name"]}
        • المحاضر: {w["instructor"]}
        • التاريخ: [تاريخ بداية المجموعة]
        • المواعيد: [الأيام والوقت]
        • العنوان: {w["address"]}

        💰 خطة الدفع:
        • المدفوع: {w["half"]}ج (50% جدية حجز) ✅
        • المتبقي: {w["half"]}ج في أول محاضرة (بدون فوايد)

        ⚠️ مهم تيجي قبل الموعد بـ 15 دقيقة في أول محاضرة. لينك جروب الواتساب الخاص بالمجموعة هيوصلك قبل المحاضرة بيوم.

        أهلاً بيك في عيلة RS! 🌟
        ```

    === "📞 Call"

        ```
        "السلام عليكم [الاسم]، معاك [اسم السيلز] من RS.

        شفت إن التحويل وصل — مبروك على الحجز! 🎉

        كلمتك بسرعة عشان أأكدلك التفاصيل صوتياً وأرد على أي سؤال محتمل قبل ما تيجي المحاضرة الأولى.

        عندك دقيقتين؟"
        ```

        #### Confirmation Talking Points (دقيقة 1-3)
        1. "أكد التاريخ والوقت — [التفاصيل] — مظبوط معاك؟"
        2. "تعرف العنوان؟ {w["address"]} — أبعتلك location على الواتساب لو مش متأكد"
        3. "هتلاقي {w["instructor"]} في انتظارك — تقدر تسأل أي حاجة"
        4. "في أي سؤال محتاج توضيح قبل المحاضرة الأولى؟"

        #### Closing
        ```
        "خلاص [الاسم]، أنا هنا لو احتجت أي حاجة قبل أو بعد المحاضرة. شكراً ليك على ثقتك في RS — هتشوف بنفسك ليه 50,000 محاسب اختارونا من 2014. سلام عليكم."
        ```

    ### ❌ Anti-patterns Stage 1
    - تـ pitch الورشة تاني (العميل دفع، خلاص)
    - تسأل "ليه اخترتنا؟" — feedback time مش الآن
    - تأخر في إرسال التأكيد > 30 دقيقة من التحويل
    - تنسى تذكر العنوان والوقت بالظبط'''


def make_stage_2(w):
    return f'''=== "Stage 2: تم الحجز ✅ (🔥 Hot)"

    ## السياق
    العميل **اتفق على الحجز** ("سجلني" / "احجزلي" / "هاجي ادفع في المقر" / "هحجز بعد ما المرتب ينزل"). بس **لسه ما حوّلش**.

    ## الهدف
    1. ثبّت الـ commitment (يحس إنه فعلاً متفقين)
    2. حدد **timeline محدد للتحويل**
    3. سهّل عليه الدفع (5 طرق جاهزة)

    === "📱 WhatsApp"

        ```
        [الاسم] أهلاً 👋

        [اسم السيلز] من تيم الحجوزات في RS.

        تابعت محادثتك — متفقين على ورشة {w["name"]} مع المجموعة الجاية ([التاريخ]) ✅

        محتاج تحويل {w["half"]}ج جدية حجز عشان أثبّتلك المكان رسمياً:

        🟢 انستا باي: 100057017249
        🟢 فودافون كاش: 01002180432
        🟢 تحويل بنكي: CIB - حساب 100057017249
        🟢 فيزا في المقر (يومياً 10ص-6م)
        🟢 لينك Stripe: https://buy.stripe.com/00geWvdkedzn09O3ce

        أنهي طريقة دفع تناسبك؟ ومتى تتوقع تحوّل عشان أعرف أمشي معاك؟
        ```

        ### Variation: لو قال "هحوّل بعد ما المرتب ينزل"
        ```
        تمام، فاهمك. متى المرتب بينزل تقريباً؟

        أحتفظلك بالمكان لحد ساعتها وأكلمك يومها. مفيش متابعة في الفترة دي.

        ⚠️ لو في احتمال تأخير، قولّي عشان نظبط الـ plan B.
        ```

        ### Follow-up 1 (بعد 24 ساعة بدون تحويل)
        ```
        [الاسم] —

        تابعت معاك أمس على ورشة {w["name"]}.

        في حاجة عمالة تأخر التحويل؟ (محتاج طريقة دفع تانية؟ ظرف طارئ؟)

        لو محتاج تأجيل، نلاقي حل — مش مشكلة.
        ```

    === "📞 Call"

        ```
        "السلام عليكم [الاسم]، [اسم السيلز] من تيم الحجوزات في RS.

        تابعت محادثتك مع زميلتي — متفقين على حجز ورشة {w["name"]}. كلمتك نظبّت موعد التحويل.

        السعر {w["full"]}ج، 50% جدية + 50% أول محاضرة. يعني هتحوّل دلوقتي {w["half"]}ج.

        أنهي طريقة دفع أحسن ليك؟"
        ```

        #### Soft Commitment
        ```
        "خلاص [الاسم]، نتفق إنك تحوّل [التاريخ المتفق عليه].

        لو في أي ظرف طارئ، كلمني فوراً — مفيش مشكلة، بس عشان أعرف أحتفظلك بالمكان.

        أنا متاح على نفس الرقم. سلام عليكم."
        ```

    ### ❌ Anti-patterns Stage 2
    - تضغط للتحويل في نفس اللحظة (يخلق resistance)
    - ما تحددش timeline → عميل يضيع في الـ "بعدين"
    - تخوّف بـ "آخر مكان" لو مش حقيقي
    - تنسى تتابع بعد 24 ساعة'''


def make_stage_3(w):
    return f'''=== "Stage 3: جاهز للتحويل 💳 (🔥 Hot)"

    ## السياق
    العميل **شاف السعر** و**سأل عن الدفع** ("أحوّل فين؟" / "ادفع ازاي؟"). الـ AI ادّاهوله البيانات بس **العميل ما رجعش**.

    ## الهدف
    1. إعادة فتح المحادثة بدون pressure
    2. كشف لو فيه حاجة طارئة
    3. تسهيل التحويل بأقل احتكاك ممكن

    === "📱 WhatsApp"

        ```
        [الاسم] أهلاً 👋

        [اسم السيلز] من تيم الحجوزات في RS.

        شفت إنك سألت زميلتي قبل كده على طريقة الدفع لورشة {w["name"]} وأرسلتلك البيانات.

        سؤال سريع: في حاجة عمالة تأخر؟

        (محتاج طريقة دفع تانية؟ ظرف طارئ؟ ولا الموضوع راح من بالك؟)

        لو الموضوع راح من بالك، تمام — كلنا بنرتبك. هبعتلك التفاصيل تاني:

        🟢 انستا باي: 100057017249
        🟢 فودافون كاش: 01002180432
        🟢 تحويل بنكي: CIB - حساب 100057017249
        🟢 لينك Stripe: https://buy.stripe.com/00geWvdkedzn09O3ce

        أنهي يناسبك؟
        ```

        ### Follow-up: لو رد بـ "هحوّل قريب"
        ```
        تمام [الاسم] 👍

        في أنهي وقت تتوقع تحوّل عشان أعرف أمشي معاك؟

        (دلوقتي / آخر النهارده / بكره الصبح / في الويك إند)

        ولو احتجت طريقة دفع تانية، قولّي.
        ```

    === "📞 Call"

        ```
        "السلام عليكم [الاسم]، [اسم السيلز] من RS.

        شفت إنك سألت قبل كده على طريقة الدفع لورشة {w["name"]}. كلمتك أتأكد إنك خدت البيانات صح وفي حاجة محتاج توضيح.

        عندك 3 دقايق؟"
        ```

        #### Discovery (دقيقة 1)
        ```
        "[الاسم] — سؤال صريح:

        أنت كنت جاهز للحجز ساعتها — ايه اللي حصل بعدها؟"
        ```

        #### Response Branches
        - **لو "نسيت":** "تمام، طبيعي. تحب نخلصها دلوقتي؟ هبعتلك على الواتساب البيانات وأنا في انتظار سكرين شوت التحويل."
        - **لو "ظرف طارئ":** "فاهمك. متى تتوقع تحل؟ عشان أعرف لو أحتفظلك بالمكان في المجموعة الجاية ولا اللي بعدها."
        - **لو "بفكر تاني":** "تمام. في حاجة معينة طلعت في دماغك؟ السعر؟ المحاضر؟ ولا حاجة في الورشة نفسها؟" (انتقل لـ Stage 4)

    ### ❌ Anti-patterns Stage 3
    - "ليه ما حوّلتش؟" (accusatory tone)
    - بعت البيانات بدون متابعة
    - تضغط في يوم واحد بأكتر من رسالة
    - تفترض إن العميل غير رأيه (خلي العميل هو اللي يقول)'''


def fix_file(file_path: Path):
    workshop_key = file_path.parent.name
    if workshop_key not in WORKSHOPS:
        return False, "Unknown workshop"

    w = WORKSHOPS[workshop_key]

    content = file_path.read_text(encoding='utf-8')
    original = content

    # Pattern 1: Find and replace Stage 1 with [template]
    # Pattern: === "Stage 1: ..." followed by content with [template] until next === "Stage" or other
    stage1_pattern = re.compile(
        r'=== "Stage 1: تم التحويل[^"]*"\s*\n.*?\[template\].*?(?=\n=== "Stage|\n# Stage)',
        re.DOTALL
    )

    new_stage1 = make_stage_1(w)
    if stage1_pattern.search(content):
        content = stage1_pattern.sub(new_stage1 + '\n\n', content)

    # Pattern 2: Find and replace "# Stage 2-3" or "=== \"Stage 2-3\"" merged with Stages 2 and 3 separated
    # The merged pattern looks like:
    # === "Stage 2-3: 🔥 Hot"
    #     ```
    #     Stage 2: ...
    #     Stage 3: ...
    #     ```
    # We replace it with two full tabs

    merged_pattern = re.compile(
        r'(?:=== "Stage 2-3[^"]*"|# Stage 2-3:[^\n]*)\s*\n.*?(?=\n=== "Stage 4|\n# Stage 4)',
        re.DOTALL
    )

    new_stages_23 = make_stage_2(w) + '\n\n' + make_stage_3(w)
    if merged_pattern.search(content):
        content = merged_pattern.sub(new_stages_23 + '\n\n', content)

    if content != original:
        file_path.write_text(content, encoding='utf-8')
        return True, "Fixed"
    return False, "No changes needed"


def main():
    files_to_check = [
        "cfo/angle-1-chief-to-cfo.md",
        "cfo/angle-2-new-cfo.md",
        "cfo/angle-3-owner-evaluating.md",
        "financial-analysis/angle-1-senior-pressured.md",
        "financial-analysis/angle-2-analyst-growing.md",
        "financial-analysis/angle-3-investor-owner.md",
        "cost-engineering/angle-2-specialization.md",
        "cost-engineering/angle-3-business-owner.md",
    ]

    base = Path("docs/scripts")
    fixed = 0

    for rel in files_to_check:
        f = base / rel
        if not f.exists():
            print(f"[SKIP] {rel} (not found)")
            continue

        changed, msg = fix_file(f)
        status = "[OK]" if changed else "[--]"
        print(f"{status} {rel}: {msg}")
        if changed:
            fixed += 1

    print(f"\nFixed: {fixed}/{len(files_to_check)} files")


if __name__ == "__main__":
    main()
