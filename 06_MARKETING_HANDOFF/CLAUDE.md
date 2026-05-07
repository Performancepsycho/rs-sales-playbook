# 🤝 Marketing-Sales Handoff — ربط القسمين

> **اقرأ `../_RS_SALES_CONTEXT.md` و `../../rs-hero/_RS_CONTEXT.md` أول حاجة.**

---

## دور الفولدر

**سعيد، انت بتمسك الماركتينج والسيلز في نفس الوقت.** الميزة دي = أفضل sales-marketing alignment في السوق.

الفولدر ده بيظبّط:
- الـ handoff من الماركتينج للسيلز (lead quality + brief structure)
- الـ feedback loop من السيلز للماركتينج (lead quality reports + lost deal insights)
- Joint ownership على KPIs (CAC, LTV, conversion rate)
- الـ Marketing-Sales Sync الأسبوعي

---

## الملفات

| ملف | الموضوع |
|-----|---------|
| `lead-handoff-protocol.md` | إزاي الـ lead بيوصل من الماركتينج للسيلز (وعكس) |
| `lead-quality-feedback.md` | تقييم جودة الـ leads أسبوعياً + feedback مهيكل |
| `weekly-sync-agenda.md` | جدول الـ Marketing-Sales sync الأسبوعي |
| `lost-deal-analysis.md` | تحليل الـ deals الضايعة + الـ insights للماركتينج |
| `attribution-tracking.md` | إزاي نعرف أنهي حملة جابت أنهي deal |

---

## المشكلة اللي بيحلها الفولدر ده

في 95% من الشركات، فيه حرب بين السيلز والماركتينج:

| السيلز بيقول | الماركتينج بيقول |
|---------------|-------------------|
| "الـ leads مش جايدين" | "السيلز مش بيشتغل عليهم صح" |
| "كلهم بيسألوا على السعر" | "ده شغل السيلز يقفل" |
| "ما بييجيش lead واحد جاهز" | "بنبعتلكم 1000 lead في الشهر" |
| "الإعلانات مش بتجذب الفريش الصح" | "السيلز مش بيقرأ الـ brief" |

**في RS، انت بتمسك القسمين. ميزة + مسؤولية:**
- ميزة: مفيش هلامية
- مسؤولية: لو الـ leads مش جايدين، انت السبب. لو السيلز مش بيقفل، انت السبب.

الحل: **Joint Accountability على الـ funnel كله.**

---

## فلسفة الـ Marketing-Sales Loop في RS

### 1) One Funnel, Two Owners
الـ funnel من الإعلان للـ payment = funnel واحد. الماركتينج بياخد الـ first half، السيلز التاني. بس النجاح **مشترك**.

### 2) Feedback Within 48 Hours
لو السيلز شاف نمط في الـ leads (مثلاً: كلهم سألوا عن نفس الحاجة) → feedback للماركتينج خلال 48 ساعة. مش بعد شهر.

### 3) Marketing Joins Sales Calls Monthly
الـ ميديا باير لازم يحضر مكالمة سيلز كل شهر — يسمع الـ language الحقيقي للعميل. بدونه، الإعلانات بتبقى "marketing-speak" مش "customer-speak".

### 4) Sales Joins Marketing Reviews Monthly
السيلز Top Performer لازم يحضر مراجعة الإعلانات — يقول إيه اللي بيظبط الـ pitch من الإعلان.

### 5) Shared KPIs
| KPI | Marketing | Sales | Joint |
|-----|-----------|-------|-------|
| Leads Volume | ✅ | — | — |
| Lead Quality (qualified rate) | — | — | ✅ |
| CPL (Cost per Lead) | ✅ | — | — |
| CAC (Cost per Customer) | — | — | ✅ |
| Conversion Rate (lead → paid) | — | ✅ | — |
| LTV/CAC | — | — | ✅ |
| Revenue | — | ✅ | — |

---

## الـ Lead Flow (الكامل)

```
1. Marketing Campaign (Meta/TikTok/Organic)
   ↓ (Marketing owns)
2. Lead lands on website / WhatsApp / Messenger
   ↓
3. AI Agent (Messenger v6 / WhatsApp Supabase)
   ├── Initial qualification
   ├── Brief generation
   └── Routing decision
   ↓
4. Routed to:
   ├── bookings → Bookings Team (مش شغلنا)
   ├── sales → Sales Team (هنا شغلنا) ← (Sales takes over here)
   └── transfers → Done
   ↓
5. Sales Rep contact (WhatsApp / Call)
   ↓ (Sales owns)
6. Discovery → Pitch → Objection Handling → Close
   ↓
7. Payment + Onboarding to Workshop
```

---

## الـ Critical Handoff Points

### Handoff Point 1: AI Agent → Sales Rep
**ما يجب أن يحدث:**
- الـ Lead بيدخل Odoo مع brief كامل
- السيلز يستلم notification في 30 دقيقة من الـ routing
- السيلز يقرأ الـ brief قبل أول رسالة

**ما يحصل غلط حالياً (لو في issue):**
- الـ brief مش كامل / مش دقيق → السيلز بيكلم العميل بدون context
- الـ routing بيتأخر → العميل cooled off
- السيلز بيتجاهل الـ brief ويسأل العميل من الأول → العميل بيحس "مكرر"

**الحل:**
- Quality check للـ briefs أسبوعياً (Random sample من 20 brief)
- Coaching للسيلز إن قراءة الـ brief = أول step قبل أي رسالة
- Feedback مهيكل من السيلز للـ Brief Agent

---

### Handoff Point 2: Sales Loss → Marketing Insight
**لو السيلز خسر deal، الماركتينج محتاج يعرف:**
- الـ Lead جاي من أنهي حملة؟
- ايه السبب الحقيقي للخسارة؟
- في pattern؟ (مثلاً: كل deals من حملة معينة بيخسروا في نفس الـ stage)

**الـ Process:**
- Lost deal → السيلز يكتب في Odoo: السبب (price / time / trust / wrong fit / competitor)
- أسبوعياً: تقرير بالـ losses حسب الحملة
- شهرياً: Marketing-Sales sync لمراجعة الـ patterns

---

## Weekly Marketing-Sales Sync (Template)

### الـ Setup
- **التوقيت:** كل خميس، 60 دقيقة
- **الحضور:** Director + ممثل من الماركتينج + 1-2 Top Sales Performers
- **الـ Format:** Data review → Insights → Actions

### الـ Agenda
```
1. Numbers Review (15 دقيقة)
   - Leads received this week (by source)
   - Conversion rates (by source)
   - CPL + CAC (by campaign)
   - Revenue by workshop

2. Lead Quality Discussion (15 دقيقة)
   - السيلز: "الـ leads هذا الأسبوع كانت إزاي؟"
   - patterns (positive / negative)
   - specific complaints + compliments

3. Lost Deals Analysis (15 دقيقة)
   - Top 3 lost deals this week
   - الأسباب
   - Marketing implications

4. Sales Insights for Marketing (10 دقيقة)
   - Objections اللي تكررت
   - Phrases من العملاء (للـ ad copy)
   - Pain points اللي طلعت

5. Action Items (5 دقيقة)
   - Marketing actions (تعديل ads, audiences, إلخ)
   - Sales actions (تعديل scripts, training, إلخ)
   - Joint actions
```

---

## الـ Lead Quality Score (Framework)

كل lead بيتقيّم على 4 dimensions:

| Dimension | Weight | كيف يتقاس |
|-----------|--------|-----------|
| **Fit** | 30% | هو من الـ ICP؟ (fresh/junior/senior/manager المستهدف للورشة) |
| **Intent** | 30% | في clear intent؟ (سأل عن السعر، طلب موعد، إلخ) |
| **Context** | 20% | الـ brief كامل؟ معلومات كافية؟ |
| **Timing** | 20% | جاهز يقرر دلوقتي؟ ولا "هفكر بعد كذا شهر"؟ |

**Scoring:**
- A (90-100): Hot, high-priority, action immediately
- B (70-89): Warm, standard process
- C (50-69): Cool, nurture before serious sales effort
- D (< 50): Cold, return to AI Agent for nurture

---

## ❌ Anti-Patterns في الـ Sync

1. **Marketing defending campaigns بدون datapoint** — "إعلاننا أحسن في السوق" without proof
2. **Sales blaming leads بدون patterns** — "كلهم سيئين" without specifics
3. **Sync بدون pre-data** — الناس بتحضر بدون قراءة الأرقام
4. **Action items بدون owner + deadline** — discussions بدون commitment
5. **Avoiding tough conversations** — لو في حملة فاشلة، لازم تتقال
6. **Weekly sync بدون monthly retrospective** — كل أسبوع بنحل مشاكل، بس مفيش "بنتعلم إيه عن المدى البعيد؟"

---

## ✅ Best Practices

1. **Marketing يحضر sales call شهرياً** — يسمع الـ language الحقيقي
2. **Sales يحضر marketing review شهرياً** — يقول إيه اللي بيشتغل في الـ pitch
3. **Shared dashboard** — كل الفريقين يشوفوا نفس الأرقام
4. **Customer interviews ربع سنوي** — Marketing + Sales يقابلوا 5 متدربين قدماء سوا
5. **Lost deal reviews شهري** — الفريقين يقعدوا يحللوا أسباب الخسارة
6. **Win story sharing** — كل deal كبير قُفل = story مكتوبة للفريقين
