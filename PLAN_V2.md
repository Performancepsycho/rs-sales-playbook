# 🚀 RS Sales Playbook — Plan V2 (تطوير البروجيكت)

> **المراجعة قبل التنفيذ.** ضع تعليقاتك على أي قسم — هغير على أساسها قبل ما أبدأ شغل.

---

## 1. التحسينات الأساسية (الـ Vision)

### 1.1 فصل القنوات (واتساب / كول) كـ 2 Tabs/Pages منفصلة
**حالياً:** كل stage فيه WhatsApp + Call في نفس الصفحة (طويلة، السيلز بيدور).
**التحسين:** لكل stage 2 صفحات منفصلة. السيلز يعرف بالظبط فين يدوس حسب القناة اللي شغّال عليها.

### 1.2 محتوى أدسم لكل سكريبت
**حالياً:** Opener + 1-2 follow-up + Call structure مختصر.
**التحسين:**
- WhatsApp: Opener + 3-5 follow-ups + 5 variations حسب رد العميل + Voice note templates
- Call: Pre-call checklist + Opening + Discovery (3 layers) + Pitch + 6 Objection branches + 3 Closing options + Voice Mail + Post-call follow-up

### 1.3 Workshop-Specific Content أقوى
**حالياً:** كل ورشة فيها overview بسيط.
**التحسين:** كل ورشة هتبقى فيها:
- نظرة عامة (مع الـ flyer content)
- محتوى الورشة كامل (للسيلز يعرف يجاوب)
- FAQ خاص بالورشة
- Common tactics خاصة بالورشة
- Pricing breakdown مفصل
- Common questions about the workshop

### 1.4 أدوات إضافية للسيلز
- **Quick Reference Cards** للطباعة (cheat sheet للموبايل)
- **Decision Tree** visual للـ stage identification
- **Voice Notes Templates** (لو السيلز يبعت صوت بدل نص)
- **SMS Fallback Templates** (لو الواتساب بطّأ)
- **Email Templates** (لو العميل سأل عن email)

---

## 2. هيكل الـ Navigation الجديد

```
RS Sales Scripts
│
├── 🏠 الرئيسية
│
├── 📘 المحاسب المالي
│   ├── 📋 نظرة عامة + محتوى الورشة
│   ├── 🎯 Angle 1 — Fresh بيدوّر شغل
│   │   ├── 📌 الـ Brief (الجمهور + الـ pain + الـ hook)
│   │   ├── Stage 1: تم التحويل ✅
│   │   │   ├── 📱 WhatsApp Script
│   │   │   └── 📞 Call Script
│   │   ├── Stage 2: تم الحجز ✅
│   │   │   ├── 📱 WhatsApp Script
│   │   │   └── 📞 Call Script
│   │   ├── Stage 3: جاهز للتحويل 💳
│   │   │   ├── 📱 WhatsApp Script
│   │   │   └── 📞 Call Script
│   │   ├── Stage 4: مهتم لم يتقدم 🟡
│   │   │   ├── 📱 WhatsApp Script
│   │   │   └── 📞 Call Script
│   │   ├── Stage 5: شاف السعر ولم يحجز 🟡
│   │   │   ├── 📱 WhatsApp Script
│   │   │   └── 📞 Call Script
│   │   ├── Stage 6: مرحلة الاستكشاف 🔵
│   │   │   ├── 📱 WhatsApp Script
│   │   │   └── 📞 Call Script
│   │   └── Stage 7: رفض 🔵
│   │       ├── 📱 WhatsApp Script
│   │       └── 📞 Call Script
│   ├── 🎯 Angle 2 — فريش لسه في الكلية
│   │   └── ... (نفس الـ structure)
│   ├── 🎯 Angle 3 — موظف جديد ضايع
│   │   └── ... (نفس الـ structure)
│   ├── 🛡️ اعتراضات خاصة بالورشة
│   ├── ❓ FAQ — أكتر أسئلة العملاء
│   └── 💰 Pricing + Packages
│
├── 📗 المحاسب الشامل (نفس الهيكل)
├── 📕 خبير الضرائب (نفس الهيكل)
├── 📙 Odoo Accounting (نفس الهيكل)
├── 📓 هندسة التكاليف (نفس الهيكل)
├── 📔 التحليل المالي (نفس الهيكل)
├── 📒 المدير المالي CFO (نفس الهيكل)
│
├── 🛡️ Objections Library (عام)
├── 🎓 Training & Coaching (للسيلز الجدد)
└── 📊 Tools & Templates (Cheat sheets, voice notes)
```

**الإجمالي:**
- 7 ورش × 3 angles × 7 stages × 2 channels = **294 صفحة سكريبت**
- + 7 ورش × 4 صفحات إضافية (overview, objections, FAQ, pricing) = **28 صفحة**
- + 3 صفحات عامة (Objections, Training, Tools) = **3 صفحات**
- **= ~325 صفحة كاملة في الـ playbook**

---

## 3. Template الـ WhatsApp Script (الـ Depth الجديد)

```markdown
# 📱 WhatsApp — [الورشة] — [Angle] — Stage [X]: [اسم الـ Stage]

## 📋 السياق
- **العميل:** [وصف الـ profile من الـ AI brief]
- **الـ Stage:** [التعريف]
- **الهدف من الرسائل:** [محدد]
- **الـ KPI المستهدف:** [response rate, conversion %, etc.]

---

## 🎯 الـ Opener (الرسالة الأولى)

### Script:
[النص الكامل]

### Why it works:
- [نقطة 1]
- [نقطة 2]
- [نقطة 3]

### Customization:
- لو العميل [X]، عدّل [Y]
- لو في معلومة [Z] في الـ brief، اضيف [W]

---

## 🔄 Follow-up Sequence (5 رسائل)

### Follow-up 1 — بعد X ساعة لو ما رد
**التوقيت:** [محدد]
**الهدف:** [محدد]
**Script:** [النص]

### Follow-up 2 — بعد Y ساعة
...

### Follow-up 3 — بعد Z يوم
...

### Follow-up 4 — Last attempt
...

### Follow-up 5 — Goodwill close
...

---

## 🔀 Response Variations (5 سيناريوهات)

### السيناريو A: العميل رد بـ "السعر غالي"
**Script للرد:**
[النص]

### السيناريو B: العميل رد بـ "هكلم زوجتي/أهلي"
**Script للرد:**
[النص]

### السيناريو C: العميل رد بـ "هل ضامن شغل؟"
...

### السيناريو D: العميل رد بـ "هفكر"
...

### السيناريو E: العميل رد بسؤال محدد عن المحتوى
...

---

## 🎙️ Voice Note Templates (لو السيلز يبعت صوت)

### Voice Note 1: Welcome (30 ثانية)
**Script للقراءة:**
[النص بـ tone notes]
**Tone:** [دافي / مهني / حماسي]

### Voice Note 2: Workshop Highlight (45 ثانية)
...

---

## ❌ Anti-patterns
| ❌ ما تعملش | ليه غلط | ✅ بدلها |
|-------------|---------|---------|
| ... | ... | ... |

---

## 🏆 Real Win Example (anonymized)
**العميل:** [وصف بدون اسم]
**الموقف:** [الـ context]
**الـ Tactic:** [ايه السيلز اللي عمله]
**النتيجة:** [النتيجة]
**Lesson:** [اللي تتعلمه]
```

---

## 4. Template الـ Call Script (الـ Depth الجديد)

```markdown
# 📞 Call — [الورشة] — [Angle] — Stage [X]: [اسم الـ Stage]

## 📋 السياق
- **العميل:** [Profile]
- **الـ Stage:** [التعريف]
- **مدة المكالمة المتوقعة:** [3-5 / 7-10 / 15-20 دقيقة]
- **الهدف من المكالمة:** [محدد]

---

## ✅ Pre-call Checklist (5 دقايق قبل المكالمة)
- [ ] قراءة الـ brief كامل
- [ ] فحص history في Odoo
- [ ] تحضير 3 discovery questions محددة
- [ ] تحضير 2 hypotheses عن الـ pain
- [ ] تحديد target outcome للمكالمة
- [ ] تجهيز "ضربة" (story / case / data point)

---

## 🎬 Opening (أول 30 ثانية — PAEC)

### Script:
[النص الكامل]

### Tone Notes:
- [دافي / مهني / مهتم]
- [Pause في النقط الفلانية]

---

## 🔍 Discovery (دقيقة 1-7 — 3 Layers)

### Layer 1: Context (3 أسئلة)
1. [السؤال + Why]
2. ...
3. ...

### Layer 2: Pain (3 أسئلة عميقة)
4. [السؤال + Why]
5. ...
6. ...

### Layer 3: Vision (2 أسئلة)
7. ...
8. ...

### Pause Rules:
- بعد كل سؤال، استنى 2-3 ثواني
- ما تقاطعش العميل
- استخدم "تمام" / "احكيلي أكتر" بين الأسئلة

---

## 🌉 Bridge to Pitch (دقيقة 7-8)

### Recap Script:
[النص]

### Permission to Pitch:
[النص]

---

## 🎯 Pitch Outline (دقيقة 8-13)

### 1. Pain Recap (30 ثانية)
[Script]

### 2. Value Promise (60 ثانية)
[Script]

### 3. Social Proof (45 ثانية)
[Story / case study مفصّل]

### 4. Logistics (60 ثانية)
[Workshop details]

### 5. Investment (60 ثانية)
[Pricing breakdown]

---

## 🛡️ Objection Response Branches (6 احتمالات)

### Branch A: "السعر"
**A.C.R Response:**
- A: [Acknowledgment script]
- C: [Clarify question]
- R: [Response based on clarification]

### Branch B: "الوقت"
...

### Branch C: "هل يضمن شغل؟"
...

### Branch D: "هل المحاضر يعرف؟"
...

### Branch E: "هكلم العيلة"
...

### Branch F: "هفكر"
...

---

## 🤝 Trial Close (دقيقة 13-15)

### Script:
[نص الـ trial close]

### Interpretation:
- لو 8-10/10 → روح للـ direct close
- لو 5-7/10 → اسأل "ايه اللي ميخلش الرقم 8؟"
- لو 1-4/10 → discovery تاني

---

## 🎯 Closing Options (دقيقة 15-18)

### Option 1: Direct Close
[Script]

### Option 2: Choice Close
[Script — A/B/C choices]

### Option 3: Soft Close (للمتردد)
[Script]

---

## 📞 Voice Mail Script (لو ما رد)
### النص:
[60 ثانية voice mail]

### الـ Follow-up SMS بعد voice mail:
[نص قصير]

---

## 📨 Post-Call Follow-up Templates

### لو الـ call أنهت بقرار "نعم":
[WhatsApp template للـ payment link]

### لو الـ call أنهت بـ "هفكر":
[WhatsApp template + scheduled follow-up]

### لو الـ call أنهت بـ "لأ":
[WhatsApp template للـ goodwill close + nurture]

---

## ❌ Anti-patterns
| ❌ ما تعملش | ليه | ✅ بدلها |
|-------------|------|---------|
| ... | ... | ... |

---

## 🏆 Real Call Example
[Anonymized full call breakdown — opening, discovery، pitch، objection، close]

---

## 📊 Coaching Notes
- متوسط مدة الكول لـ Stage ده: [X] دقيقة
- Conversion rate المتوقع: [X]%
- أكتر objection بتطلع: [X]
- "Top performers do X — average performers do Y"
```

---

## 5. مثال كامل: ورشة المحاسب الشامل (Using الـ Flyer)

### من الـ Flyer (المرفق):
**العنوان:** "لما تحضر ورشة المحاسب الشامل"

**القيمة الأساسية:**
- "هيكون عندك الفهم الكامل للدورة المحاسبية من البداية للنهاية"
- "هتخليك قادر تبني نظام حسابات لأي شركة من الصفر"
- "فاهم شجرة الحسابات وعندك رؤية شاملة، مش مجرد بتنفذ مهام"

**4 Outcomes واضحة:**
1. ✓ هتشتغل في أي نوع شركة (صناعية / تجارية / خدمية)
2. ✓ هتمسك كل الحسابات في أي قسم باحترافية (مش حساب واحد بس)
3. ✓ هتقدر تعمل: التسويات + الإقفالات الشهرية والسنوية + إعداد القوائم المالية
4. ✓ هتدير فريق عمل بكفاءة (توزع شغل + تتابع تنفيذ)

**الخلاصة:**
> "الورشة هتنقلك من مجرد محاسب منفذ لـ محاسب فاهم وقادر يدير أي نظام محاسبي لأي شركة."

### استخدامات الـ Flyer Content في السكريبتات:

**في صفحة "نظرة عامة":**
- نسخ الـ flyer content كاملاً كـ canonical reference
- إضافة "كيف تستخدم هذا في الـ pitch"

**في كل Pitch (Call + WhatsApp):**
- استخدام "محاسب منفذ → محاسب فاهم وقادر يدير" كـ Hook رئيسي
- استخدام الـ 4 outcomes كـ differentiators
- ربط كل angle بـ outcome محدد:
  - **Angle 1 (Junior ثابت):** "الـ outcome رقم 4 — تدير فريق بدلاً من تنفيذ مهام"
  - **Angle 2 (طموح رئيس حسابات):** "الـ outcome رقم 3 — تعمل التسويات والإقفالات والقوائم"
  - **Angle 3 (صاحب شركة):** "الـ outcome رقم 1 — تفهم نظام شركتك بدون اعتماد على محاسبك"

**في FAQ الورشة:**
- "هل ينفع لشركة [نوع محدد]؟" → "نعم، الورشة بتغطي 3 أنواع: صناعية + تجارية + خدمية"
- "هل بنتعلم القوائم المالية من الصفر؟" → "نعم، من القيد الأول لإعداد القوائم"
- "هل بنتعلم نمسك كل الأقسام؟" → "نعم، مش بس عملاء وموردين"

---

## 6. Timeline التنفيذ

### Phase 1: Foundation (يوم 1)
- إعادة بناء الـ navigation structure في mkdocs.yml
- إنشاء templates لـ WhatsApp + Call
- إنشاء صفحات overview لكل ورشة + FAQ + Pricing

### Phase 2: ورشة المحاسب المالي (يوم 2-3)
- 3 angles × 7 stages × 2 channels = 42 صفحة بالعمق الجديد
- صفحات الورشة الإضافية (overview + objections + FAQ + pricing)

### Phase 3: ورشة المحاسب الشامل (يوم 4-5)
- نفس البنية مع integration الـ flyer content

### Phase 4: باقي الـ 5 ورش (يوم 6-10)
- ورشة في اليوم تقريباً

### Phase 5: المحتوى العام (يوم 11)
- Objections Library
- Training & Coaching
- Tools & Templates (Cheat sheets, voice notes templates)

### Phase 6: التحقق + Polish (يوم 12)
- مراجعة كل الـ links
- اختبار الـ navigation
- Fix الـ anchors المكسورة
- Deploy نهائي

---

## 7. أسئلة محتاج رد عليها قبل التنفيذ

1. **الـ Voice Notes templates:** عاوز أكتب نص للسيلز يقرأه ولا فعلاً نسجل voice notes جاهزة؟
2. **الـ Real Win Examples:** عندك examples من فريقك الحالي تحب نضيفها؟ ولا أكتب hypothetical examples؟
3. **الـ Pricing Breakdown:** هل تحب نحط الأسعار الفعلية في الـ playbook (لكل ورشة) ولا نسيبها كـ placeholder؟
4. **الـ Coaching Notes:** عاوز "Top performers do X" — هل عندك data من فريقك ولا نبنيها على best practices عامة؟
5. **الـ FAQ:** عاوز نجمع أكتر 20-30 سؤال بيتسأل لكل ورشة؟ (ممكن أنا أعمل initial list من الـ knowledge base)

---

## 8. الـ Output النهائي المتوقع

بعد الـ V2:
- ✅ الـ playbook دسم 10x من الـ V1
- ✅ السيلز يلاقي الـ script المناسب في 5 ثواني (separated channels)
- ✅ كل ورشة فيها كل اللي السيلز يحتاجه (مش بس scripts — overview + FAQ + objections + tactics)
- ✅ Tools إضافية (cheat sheets + voice notes + SMS fallbacks)
- ✅ Workshop-specific content من الـ flyers الفعلية

**اقرأ الـ plan + ضع تعليقاتك (خصوصاً على القرارات والأسئلة في القسم 7) — هـ أعدّل وننفذ.**
