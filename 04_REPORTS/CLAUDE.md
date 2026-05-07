# 📊 Reports — التقارير القيادية

> **اقرأ `../_RS_SALES_CONTEXT.md` و `../../rs-hero/_RS_CONTEXT.md` أول حاجة.**

---

## دور الفولدر

تيمبليتس + إطارات للتقارير اللي الـ Sales Director يحتاجها يومياً وأسبوعياً وشهرياً.

**ملاحظة:** ده مش فولدر تحليل بيانات (ده شغل `../../rs-hero/05_SALES/`). ده فولدر **تقارير قيادية** بتنفع لاتخاذ قرار سريع.

---

## الملفات

| ملف | المعدل | لمين |
|-----|--------|------|
| `daily-standup-report.md` | يومي | الفريق + Director |
| `weekly-performance.md` | أسبوعي | Director + Team Leads |
| `monthly-review.md` | شهري | Leadership + الفريق |
| `individual-scorecard.md` | أسبوعي/شهري | لكل سيلز فردي |
| `pipeline-health-dashboard.md` | أسبوعي | Director |
| `executive-summary.md` | شهري | Leadership فقط |

---

## فلسفة التقارير في RS

### 1) التقرير = قرار، مش معلومة
كل تقرير لازم ينتهي بـ "إيه القرار/الـ action؟". لو مفيش action، التقرير ما يستحقش وقت قراءته.

### 2) Numbers + Story
الأرقام لوحدها = noise. الـ story وراها = signal.
**مثال:** "Conversion 18%" ❌ → "Conversion 18% (نزل من 22%) — السبب: أكتر من 60% من الـ leads هذا الشهر كانت Senior workshops، وهي أصعب في الـ close" ✅

### 3) Visual > Tabular > Text
- **Charts:** للـ trends (revenue over time, conversion by workshop)
- **Tables:** للـ comparison (rep vs rep, workshop vs workshop)
- **Text:** للـ context (ليه الرقم زاد/قل)

### 4) Self-Serve > Pulled
السيلز يدخل Odoo يشوف scorecard بنفسه. الـ Director ما يبعتش "كم قفلت اليوم؟"

---

## الـ Reports — التفصيل

### 1) Daily Standup Report (يومي — 5 دقايق قراءة)
**لمين:** الفريق كاملاً + Director
**التوقيت:** قبل الـ standup الصباحي بـ 30 دقيقة

**المحتوى:**
- إجمالي leads أمس (يوم العمل اللي فات)
- عدد closes أمس + الـ revenue
- Top performer أمس
- Leads pending > 24h بدون contact (red flag)
- Active pipeline value (إجمالي قيمة كل الـ pipeline اللي شغّال)

---

### 2) Weekly Performance Report (أسبوعي — 15 دقيقة قراءة)
**لمين:** Director + Team Leads
**التوقيت:** صباح السبت

**المحتوى:**
- KPIs للفريق ككل (مع comparison بـ الأسبوع الفايت)
- Ranking لكل سيلز (top 5 + bottom 5)
- Workshops ranking (أعلى/أقل revenue)
- Pipeline health (deals في كل stage)
- Lead-to-close conversion funnel
- Coaching priorities للأسبوع الجاي

---

### 3) Monthly Review (شهري — 30 دقيقة قراءة + meeting)
**لمين:** الفريق كاملاً + Director
**التوقيت:** أول أسبوع كل شهر

**المحتوى:**
- Revenue actual vs target (مع breakdown)
- Top performers + bottom performers
- Workshops mix analysis
- Marketing-Sales feedback loop
- Wins of the month (case studies)
- Lessons learned (lost deals analysis)
- Strategic priorities للشهر الجاي

---

### 4) Individual Scorecard (أسبوعي — لكل سيلز)
**لمين:** كل سيلز فردي + Team Lead
**التوقيت:** نهاية الأسبوع

**المحتوى:** (تفصيل في `individual-scorecard.md`)
- KPIs الشخصية vs target
- Ranking في الفريق
- Strengths هذا الأسبوع
- Improvement areas
- Coaching focus للأسبوع الجاي

---

### 5) Pipeline Health Dashboard (أسبوعي — Director only)
**المحتوى:**
- Pipeline value by stage
- Velocity (أيام في كل stage)
- Stuck deals (> 14 يوم في stage واحد)
- Forecast (% احتمال close + projection)

---

### 6) Executive Summary (شهري — Leadership)
**لمين:** سعيد + الإدارة العليا
**المحتوى:**
- Revenue performance + projection
- Strategic insights (مش tactical)
- Risks + opportunities
- Recommendations لاتخاذ قرار

---

## ❌ Anti-Patterns في التقارير

1. **Data Overload** — 50 metric في تقرير واحد. السيلز/الـ Director مش هيفسره
2. **No Action Items** — تقرير بدون "إيه التالي" = waste
3. **Late Reports** — تقرير الأسبوع بعد 3 أسابيع = useless
4. **Vanity Metrics** — "بعتنا 10,000 رسالة!" بدون conversion
5. **Comparing Apples to Oranges** — مقارنة سيلز Fresh بسيلز CFO ظلم

---

## ✅ Reports Best Practices

1. **One Page Rule لـ Daily** — الـ standup report صفحة واحدة كحد أقصى
2. **Charts قبل Numbers** — العين بتاخد الـ trend في 3 ثواني
3. **Actionable Insights في الآخر** — كل تقرير ينتهي بـ "اللي محتاجين نعمله الأسبوع الجاي"
4. **Same Format Every Week** — مش لازم تخترع تيمبليت كل أسبوع
5. **Automate لو ممكن** — Odoo dashboards / Looker Studio / Google Sheets formulas
