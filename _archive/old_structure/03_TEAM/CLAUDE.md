# 👥 Team Management — إدارة فريق السيلز

> **اقرأ `../_RS_SALES_CONTEXT.md` و `../../rs-hero/_RS_CONTEXT.md` أول حاجة.**

---

## دور الفولدر

كل ما يتعلق بـ **إدارة 20 سيلز**:
- KPIs و targets فردية
- 1-on-1 framework
- Coaching framework
- Onboarding للسيلز الجديد (30/60/90)
- Recognition + incentives
- Team rituals (standups, weekly reviews)

---

## الملفات

| ملف | الاستخدام |
|-----|-----------|
| `kpis-targets.md` | الـ KPIs لكل سيلز + للفريق + إزاي يتم الحساب |
| `1on1-template.md` | تيمبليت 1-on-1 محترم وعملي (مش رسمي) |
| `coaching-framework.md` | إطار الـ coaching الأسبوعي + call review |
| `ramp-up-30-60-90.md` | onboarding plan لكل سيلز جديد |
| `team-rituals.md` | Daily standup + weekly review + monthly all-hands |
| `recognition-incentives.md` | نظام تكريم + مكافآت |

---

## فلسفة إدارة فريق RS Sales

### 1) Coaching > Managing
السيلز مش موظف بنراقبه — ده شغّال بنطوّره. الـ Director وقته 70% coaching، 30% admin.

### 2) Numbers Tell Stories
كل KPI لازم يفسّر سلوك. "Conversion rate نزل" مش رقم — هي مكالمة عشان نفهم ليه.

### 3) Public Praise, Private Critique
- مدح في الـ standup قدام الفريق
- نقد في 1-on-1 لوحده
- Never humiliate publicly — ده بيكسر الفريق كله

### 4) Process > Personality
Top performer مش "موهبة" — Top performer = اللي بيتبع process سليم بانضباط. مهمتنا نوضّح الـ process.

### 5) Energy Management
السيلز شغل عاطفي — Rejection بتاكل. الـ Director مسؤول عن الـ team energy، مش بس الأرقام.

---

## هيكل الفريق المقترح (لـ 20 سيلز)

> **مقترح — حسب احتياجك دلوقتي.**

```
Sales Director (سعيد) 
├── Team Lead A (5 سيلز) — Fresh + Junior workshops
├── Team Lead B (5 سيلز) — Fresh + Junior workshops
├── Team Lead C (5 سيلز) — Senior workshops (Tax, Cost, Analysis)
└── Team Lead D (5 سيلز) — High-ticket (Manager, CFO)
```

**ليه التقسيم ده:**
- **Specialization** — كل تيم بيشتغل على ورش متشابهة في الـ buyer persona
- **Span of control** — 5 reps لكل lead = manageable
- **Growth path** — Top performers يبقوا Team Leads → كاريير لكل سيلز

**لو لسه ما بنيتش team leads:** ابدأ بـ 2 team leads (10 سيلز كل واحد) كـ مرحلة انتقالية.

---

## الإيقاع الأسبوعي للفريق

| اليوم | النشاط | المدة | المشاركون |
|-------|--------|-------|-----------|
| **يومياً** | Daily Standup | 15 دق | الفريق كامل |
| **يومياً** | Lead Routing Check | 5 دق | Team Leads |
| **سبت** | Weekly Review (الأسبوع الفايت) | 30 دق | الفريق كامل |
| **سبت** | Pipeline Review | 60 دق | Team Leads + Director |
| **كل أسبوعين** | 1-on-1 (لكل سيلز) | 30 دق | Director + Sales Rep |
| **كل أسبوع** | Coaching Call (لكل سيلز) | 30 دق | Team Lead + Sales Rep |
| **كل شهر** | Monthly Performance + Recognition | 60 دق | الفريق كامل |
| **كل شهر** | Marketing Sync | 60 دق | Director + Marketing |
| **كل ربع** | Quarterly Strategy | 3 ساعات | Director + Team Leads |

---

## الأدوات اللي محتاجها (Stack)

| الاحتياج | الأداة الحالية | المقترح |
|----------|----------------|----------|
| CRM | Odoo Community | Odoo Enterprise (قريباً) |
| Calls | عادي | VoIP + recording (للـ coaching) |
| Pipeline tracking | Odoo + Google Sheets | Odoo فقط |
| Coaching notes | مفيش | Notion/Odoo notes |
| Performance dashboard | Google Sheets | Looker Studio أو Odoo dashboards |
| Internal comm | WhatsApp Group | Slack أو WhatsApp Business |
| Documentation | مفيش | الفولدر ده! |

---

## Communication Norms للفريق

### في الـ Standup
- كل سيلز يقول 3 حاجات في 60 ثانية:
  1. كم lead قفلت أمس
  2. كم lead في الـ pipeline دلوقتي
  3. حاجة بلوكاني (objection غريبة، lead صعب، احتياج مساعدة)

### بين الفريق
- Slack/WhatsApp Group: سؤال = رد في 10 دقايق max
- لو سيلز محتاج cover lead → يطلب علناً، أول واحد متاح ياخده
- Wins بتتشار في channel #wins (موراليتر للفريق)

### من Director للفريق
- ❌ ما تعملش announcement على واتساب لحاجة سياسية أو مفاوضات
- ✅ Big news → في meeting شخصياً
- ✅ Daily updates → Slack
- ❌ ما تكتب لسيلز نقد على واتساب — في 1-on-1 فقط

---

## ❌ Anti-Patterns في إدارة فريق السيلز

1. **Micromanagement كل ساعة** — السيلز بيكره الموبايل، الإنتاجية بتنزل
2. **Public callouts للأخطاء** — يكسر الـ trust للأبد
3. **مفيش feedback إيجابي** — السيلز محتاج "حلو" مش بس "غلط"
4. **Targets غير واقعية** — الفريق يكتشف وبيفقد الإيمان
5. **مفيش career path** — top performers يستقيلوا
6. **Sales Director مش بيبيع أبداً** — يفقد الـ credibility مع الفريق
7. **Comparing reps علناً** — "اشمعنى أحمد قافل أكتر منكم؟" يدمّر الفريق

---

## ✅ Best Practices

1. **اعمل Ride-Along أسبوعياً** — اقعد مع سيلز مختلف كل أسبوع، اسمعه شغال
2. **Celebrate Wins فوراً** — الـ close الأول للسيلز الجديد = إعلان للفريق
3. **اطلب Feedback شخصياً** — "إيه اللي مزعجك دلوقتي في الشغل؟"
4. **Be the Coach, Not the Boss** — الفرق إن المدرب بيطوّر، المدير بيطلب
5. **اعرف عيلة كل سيلز اسماً وموضوعاً** — السيلز بشر، مش رقم
6. **Career conversations كل 6 شهور** — "فين عاوز توصل في سنة؟"
