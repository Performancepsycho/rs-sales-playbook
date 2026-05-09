# RS Sales Wins — Playbook Patterns from RS Hero Agent Config
**Generated from:** Chat analysis + Sales Agent Prompts (WhatsApp v3, Messenger v6)  
**Date:** May 2026  
**Status:** Pattern extraction (10+ observed/configured win patterns)

---

## Win Pattern Library

| # | Workshop | Customer Profile | Pain | Tactic | Result | Lesson |
|---|----------|------------------|------|--------|--------|--------|
| 1 | المحاسب المالي | Fresh grad / junior accountant | Needs professional structure but no foundational accounting | Micro-commitment Binary: "خريج جديد ولا عندك خبرة؟" → Instant recommendation + future outcome framing | Booked | Open with a choice, not a pitch. Moves them from explorer to buyer mode. |
| 2 | البرنامج المحاسبي الشامل | Junior (1-3 yrs exp) | Specialized in one area, wants to develop across roles | Career progression framing: "هتكون متأسس لمستوى رئيس حسابات" + pricing anchoring (before vs after) | Routed to sales | Position as career advancement, not generic training. Lead with role outcomes. |
| 3 | خبير الضرائب | Senior / owner | "محتاج عملية في اللجان والترافع" (practical tax litigation) | Validate + gap fill: "بعد الورشة هتعمل إقرارات وفحص وتترافع في لجان طعن" (future pacing) | Closed | Never say "beginner" to experienced people. Frame as "mastery" or "advanced certification." |
| 4 | هندسة التكاليف | Factory owner / cost analyst | Vague about whether they need product pricing or project cost mgmt | Clarify binary before product match: "تسعير منتجات ولا إدارة تكاليف المشروع؟" | Booked | Never assume the variant. One micro-question buckets them correctly first. |
| 5 | Odoo / التحليل المالي | ERP user or spreadsheet-reliant leader | "نظام عندي بس مش عارف أستخدمه" or "قوائم يدوية" | Tool-to-workshop mapping: Odoo issue → Odoo workshop. Financial reporting → التحليل. Match existing problem to workshop. | Booked | Map problem to workshop, not generic interest. "الOdoo workshop" beats generic pitch. |
| 6 | المدير المالي | CFO / 5+ yrs experience | "محتاج موازنات لكن بلا وقت" | Authority + flexibility first: "أونلاين لايف على Zoom + محاضرات متسجلة" (bypass time objection before it lands) | Booked | For senior roles, highlight flexibility/efficiency first. Fit workshop to their schedule. |
| 7 | أي ورشة | Any customer | "مش قادر أدفع كله دلوقتي" (payment push-back) | Never defend price. Reframe as 50% deposit + 50% first day: "تضمن مكانك + تسدد الباقي أول محاضرة" | Booked (50% deposit) | Payment objection solved by splitting, not discounting. Deposit = certainty + flexibility. |
| 8 | أي ورشة | Any level | Customer diverts to OOB topic (automation, AI consulting, etc.) | Hard boundary + bridge: "أنا متخصص في الورش التدريبية 💙 بالمناسبة، لسه مهتم بـ {workshop}?" (Max 1 OOB response) | Transferred to team | Set scope boundaries. Allow 1 off-topic response, then bridge back. Never ghost. |
| 9 | المحاسب المالي / الشامل | Any | Phone number embedded in long/unclear message | Silent capture first, clarify later: Call Google Sheets tool without "استنى" overhead. Then ask diagnostic. | Registered + advanced | Capture data before clarity. If you get a phone, log it immediately then ask. Don't lose the contact. |
| 10 | المحاسب الشامل | From different governorate | "أنا من الإسكندرية / الصعيد" (geography objection) | Default online, hint local: "أونلاين لايف على Zoom + المحاضرات متسجلة. الإسكندرية متاح أوفلاين لو فضلت." | Booked (online) | Geography is not a barrier; it's a preference. Default online, mention offline as option. |

---

## Cross-Workshop Patterns (Highest-Leverage Lessons)

### Pattern A: The Binary Question Opener
**When:** First interaction or after initial exploration  
**The Tactic:** Always open stage decisions with a micro-commitment Binary choice (A vs B), never open-ended.  
**Why it works:** Reduces cognitive load, gives customer agency, moves from "browsing" to "deciding."  
**Configured phrases:**
- "خريج جديد ولا عندك خبرة؟"
- "أونلاين وتوفر وقت ولا أوفلاين في المقر؟"

### Pattern B: Future Pacing Outcome (Not Features)
**When:** Stage 3 (price reveal) or objection handling  
**The Tactic:** Lead with what they'll *do* (action) or *be* (role), not what they'll *learn*.  
**Why it works:** Emotional commitment before rational price review.  
**Examples:**
- المحاسب المالي: "بعد 8 محاضرات هتقفل شركة لوحدك"
- الضرائب: "هتعمل إقرارات وفحص وتترافع في لجان"
- التكاليف: "هتسعّر أي منتج وتاخد قرارات تشغيلية"

### Pattern C: Split Payment = Objection Bypass
**When:** Customer says "غالي" or "مش قادر"  
**The Tactic:** Never defend price. Reframe as 50% deposit + 50% at workshop.  
**Why it works:** Perceived cost drops 50%, commitment stays high (pre-payment), no discount needed.

### Pattern D: Boundary + Bridge (Hard Stop on Scope Creep)
**When:** Customer asks OOB question (automation, AI, tech consulting)  
**The Tactic:** Max 1 off-topic response. Then: "أنا متخصص في الورش التدريبية 💙 بالمناسبة، لسه مهتم بـ {workshop}?"  
**Why it works:** Protects agent from scope drift without ghosting the lead.

### Pattern E: Silent Tool Calls (No Friction Delays)
**When:** Lead gives data (phone, name) or needs pricing/knowledge lookup  
**The Tactic:** Execute tool (Google Sheets, pricing_agent) in background. No "استنى" or "هأكدلك". Instant response.  
**Why it works:** Zero perceived delay = feels human (not bot), builds trust.

### Pattern F: Problem-to-Workshop Mapping
**When:** Customer expresses a problem (not a workshop name)  
**The Tactic:** Map problem → workshop directly. "Odoo issues" → Odoo workshop. "ضرائب" → خبير الضرائب. Ask diagnostic Binary if ambiguous.  
**Why it works:** Prevents silent mismatch; customer books the right workshop.

---

## Negative Patterns (From Chat Analysis — What NOT to Do)

| Anti-Pattern | Problem | Fix |
|---|---|---|
| Explaining AI logic / offering automation services | Dilutes brand, confuses customer, wastes credibility | Hard boundaries: omit non-workshop topics after 1 fallback |
| Forgetting phone when embedded in text | Lose lead forever — can't follow up | Scan every message for phone **before** responding; call Google Sheets silently |
| Repeating fallback URL 3+ times | Looks desperate; customer feels bounced | Max 1 mention of team link after boundary |
| Defending price instead of reframing | Customer sees agent as defensive | Split payment (50/50) instead; never justify cost |
| Accepting OOB questions for 4+ responses | Conversation spirals away from booking | Max 1 off-topic response + immediate bridge |

---

## Implementation for Sales Reps

1. **Use Binary openers in every new conversation** — "خريج ولا خبرة؟" is the entry key.
2. **Map problems to workshops before saying the name** — If customer mentions Odoo, say "Odoo workshop" within 2 turns.
3. **Always split payment when they push back** — 50% deposit is magical. Not a discount; it's certainty.
4. **Capture phone silently, clarify later** — Customer with phone number in system = win, even if not "yes" yet.
5. **One boundary response, then bridge** — If they ask about AI/tech, say "أنا متخصص في الورش 💙" then ask about the last workshop mentioned.
6. **Future pace with role outcomes, not hours** — "رئيس حسابات" beats "100 ساعة تدريب."

---

Generated from RS Hero automation system — May 2026.