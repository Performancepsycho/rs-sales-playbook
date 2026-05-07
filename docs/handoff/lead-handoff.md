# Lead Handoff Protocol — البروتوكول الرسمي

> القواعد المقدسة لما الـ lead بينتقل من الـ AI Agent للسيلز.

---

## الـ Stages الكاملة للـ Handoff

```
[Stage 1] Lead Generated
    ↓ (Marketing/Organic)
[Stage 2] AI Agent Engagement
    ↓ (3-30 minutes — instant)
[Stage 3] Brief Generated
    ↓ (every 15 minutes — Brief Agent)
[Stage 4] Routing Decision
    ↓ (every 15 minutes — DT Unified)
    ├── routing = bookings → Bookings Team (Instant)
    ├── routing = sales → Sales Team (After 2h delay)
    └── routing = transfers → Done
[Stage 5] Sales Rep Assigned (Odoo)
    ↓
[Stage 6] First Contact (within 30 min of receipt)
    ↓
[Stage 7] Discovery → Pitch → Close OR Lost
```

---

## SLA الـ Sales Team (Service Level Agreement)

| Metric | Target | Hard Limit |
|--------|--------|------------|
| **Time to first contact** (after lead received) | < 30 دقيقة | < 2 ساعة |
| **Brief reading rate** (% of leads where rep read brief before contact) | 100% | 95% |
| **Initial response quality** (personalized, references brief) | 100% | 95% |
| **First follow-up timing** (if no response) | Within 24h | Within 48h |
| **Lead status update in Odoo** | Within 2h of any action | Within 24h |

**Penalties (للسيلز اللي بيكسر SLA):**
- 1st violation: تنبيه شفهي
- 2nd violation: 1-on-1 + retraining
- 3rd violation: tier downgrade لمدة شهر

---

## ما يجب أن يحتويه الـ Brief (من AI Agent)

كل brief بيوصل للسيلز لازم فيه:

```markdown
## Customer Profile
- Name: [الاسم]
- Phone: [الرقم]
- Job Title: [Job title لو معروف]
- Workshop Interest: [اسم الورشة]

## Conversation Summary
[3-5 جمل عن الـ conversation كاملة]

## Key Signals
- Intent Level: [hot / warm / cool]
- Price Sensitivity: [high / medium / low]
- Urgency: [immediate / within month / exploring]

## Specific Questions Asked
1. [سؤال 1]
2. [سؤال 2]

## Concerns/Objections Raised
- [objection 1]
- [objection 2]

## Recommended Approach
[suggestion من الـ Brief Agent]
```

**لو الـ brief مفقود حاجة من دول → escalate للـ Director.**

---

## ما يجب على السيلز فعله قبل أول رسالة

### Checklist (5 دقايق max)

- [ ] قراءة الـ brief كامل (مش skim)
- [ ] فحص chat history (لو السيلز محتاج context إضافي)
- [ ] البحث عن العميل في Odoo (لو هو old customer / repeat lead)
- [ ] تحديد أنهي workshop tier هو (Fresh / Junior / Senior / Manager)
- [ ] اختيار الـ script المناسب من `../01_SCRIPTS/`
- [ ] تحضير 2-3 discovery questions محددة لحالته

---

## Format الرسالة الأولى (Standard)

```
[الاسم] أهلاً 👋

[اسم السيلز] من فريق RS Financial Services.

شفت إنك بتسأل عن [الورشة] وبتحاول تفهم [موضوع محدد من الـ brief].

[سؤال discovery واحد محدد بناءً على الـ brief]

عشان أبعتلك التفاصيل اللي تنفعك تحديداً.
```

**ليه ينفع:**
- اسم العميل
- اسم السيلز (شخصنة)
- ربط بـ context محدد من الـ brief
- سؤال واحد (ما تسألش 5 أسئلة في رسالة واحدة)
- وضوح في الـ "leading to" (هيبعت تفاصيل)

---

## أنماط الـ Failed Handoff (وحلها)

### النمط 1: Brief فارغ
**الـ symptom:** السيلز يستلم lead بدون أي context
**السبب المحتمل:** Brief Agent failed / customer ما تكلمش كفاية

**الحل:**
1. السيلز ما يكلمش العميل قبل ما يفهم الـ context
2. يبص في chat history في Supabase
3. لو لسه مفيش context → "كنت بتسأل قبل كده عن إيه؟" بشكل عام
4. يبلغ Marketing/Tech عن الـ brief الفارغ

---

### النمط 2: Brief غلط
**الـ symptom:** الـ brief يقول "العميل يسأل عن ورشة الضرايب" بس فعلاً سأل عن ورشة المحاسب الشامل
**السبب:** Brief Agent misclassified

**الحل:**
1. السيلز يصحح في Odoo
2. يبلغ Tech للـ training data
3. يعالج العميل بناءً على الواقع، مش الـ brief الغلط

---

### النمط 3: Lead بيوصل بعد ما العميل cooled off
**الـ symptom:** الـ lead بيوصل للسيلز بعد 6 ساعات من آخر رسالة من العميل
**السبب:** الـ 2-hour delay + processing time = 4-6 hours total

**الحل:**
1. السيلز يبدأ الرسالة بـ acknowledgment للوقت: "أعذرني على التأخير، شفت رسالتك دلوقتي بس"
2. يقدم قيمة فوراً (مش بس "ايه أخبارك؟")
3. لو العميل سكت → اعتبره warm lead، بدأ nurture

---

### النمط 4: Duplicate Lead
**الـ symptom:** نفس العميل بيظهر مرتين في Odoo (مرة من Messenger، مرة من WhatsApp)
**الحل:**
1. السيلز يفحص الرقم/الاسم قبل أول رسالة
2. لو duplicate → يبلغ Tech للـ deduplication
3. يكلم العميل من القناة اللي تفاعل عليها أكتر

---

### النمط 5: Cold Lead Routed as Sales
**الـ symptom:** lead باين عليه مش جاهز يدفع، بس routed كـ sales
**الحل:**
1. السيلز يقيمه (lead quality scoring)
2. لو فعلاً cold → يحدد expectation (ما يضغطش للـ close)
3. يبلغ Marketing بالـ pattern عشان الـ AI Agent يصنفه أحسن

---

## Re-engagement Protocol (للـ leads اللي رجعت من السيلز للـ AI Agent)

أحياناً السيلز بيقرر إن الـ lead مش جاهز دلوقتي ويرجع للـ AI Agent. قبل ما يرجعه:

```markdown
## Reason for Returning Lead
- [ ] Cold (مش جاهز دلوقتي)
- [ ] Wrong Workshop Fit
- [ ] Budget Issue (بس مهتم لاحقاً)
- [ ] Timing Issue (موعد مش مناسب)

## Notes for AI Agent
- العميل اهتم بـ [...]
- المرة الجاية يكون أحسن نقدمله [...]
- Recontact in [X weeks/months]
```

---

## الـ Bookings Team (Separate Protocol)

> ملاحظة: تيم الحجوزات منفصل عن تيم السيلز. الـ leads بـ routing = bookings تروحلهم مباشرة (مش لتيم السيلز الـ 20).

**الفرق:**
- **Bookings:** العميل قال "هحجز" + ادي رقم/معلومات. التيم بيكمل الحجز فقط.
- **Sales:** العميل مهتم بس ما قالش "هحجز" بعد. السيلز محتاج يقفل.

لو السيلز شاف lead في الـ pipeline بتاعه فعلاً جاهز (قال "هحجز")، يحوله لتيم الحجوزات بدلاً من معالجته بنفسه.

---

## Tracking للأداء

### Metrics للـ Handoff Quality

| Metric | Target | Owner |
|--------|--------|-------|
| % leads with complete brief | 95%+ | Tech (AI Agent) |
| % leads contacted within 30 min | 90%+ | Sales |
| % leads with brief read before contact | 100% | Sales |
| Lead-to-first-response time (median) | < 20 min | Sales |
| % leads correctly routed | 95%+ | Tech (DT Unified) |
| Bookings team SLA on routed leads | < 1h | Bookings Team |

---

## Escalation Path

| الـ Issue | التصرف الأول | لمين تـ escalate |
|-----------|----------------|--------------------|
| Brief فارغ/غلط | السيلز يـ ping Tech | Tech Lead |
| Routing غلط | السيلز يصحح في Odoo + يبلغ | Tech Lead |
| Lead delay > 4h | السيلز يبلغ Director | Sales Director |
| Duplicate lead | السيلز يفحص + يدمج | Sales Director |
| AI Agent عمل وعد بحاجة مش متاحة | السيلز يحاول يحل + يبلغ | Marketing + Tech |

---

## ✅ النتيجة المتوقعة من البروتوكول ده

- **Lead-to-Contact time:** من 2 ساعة لـ 30 دقيقة
- **Brief reading rate:** من ~60% لـ 100%
- **Initial response personalization:** من generic لـ context-aware
- **Lead loss في الـ handoff:** من 15% لـ < 5%
- **Sales-Marketing trust:** mutual respect بدلاً من الحرب
