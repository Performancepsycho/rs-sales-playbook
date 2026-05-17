/* ============================================================
   Brief Triage — Parser + Decision Logic + Templates + History
   ============================================================
   Privacy: All parsing runs locally in the salesperson's browser.
   No data is sent to any server. History stored in LocalStorage only.
   ============================================================ */

(function () {
  'use strict';

  // ============ Workshop Mapping ============
  const WORKSHOPS = [
    { keys: ['المحاسب المالي'], slug: 'financial-accountant', emoji: '📘', instructor: 'محمد علاء', priceNew: '3250ج', priceOld: '4600ج', multi: '3000ج', pdf: 'assets/pdfs/financial-accountant.pdf' },
    { keys: ['إعداد القوائم المالية', 'إعداد القوائم', 'القوائم المالية'], slug: 'financial-statements', emoji: '📊', instructor: 'محمد علاء', priceNew: '2500ج', priceOld: '4000ج', multi: '2000ج', pdf: 'assets/pdfs/financial-statements.pdf' },
    { keys: ['المحاسب الشامل'], slug: 'comprehensive-accountant', emoji: '📗', instructor: 'محمد ريان', priceNew: '5800ج', priceOld: '7500ج', multi: '—', pdf: 'assets/pdfs/comprehensive-accountant.pdf' },
    { keys: ['خبير الضرائب', 'الضرائب', 'الضرايب'], slug: 'tax-expert', emoji: '📕', instructor: 'أحمد علي', priceNew: '5250ج', priceOld: '7500ج', multi: '5000ج', pdf: 'assets/pdfs/tax-expert.pdf' },
    { keys: ['Odoo Accounting', 'Odoo', 'أودو', 'اودو', 'أوديو'], slug: 'odoo', emoji: '📙', instructor: 'إسلام سعيد', priceNew: '3000ج', priceOld: '6000ج', multi: '3000ج', pdf: 'assets/pdfs/odoo.pdf' },
    { keys: ['هندسة التكاليف', 'التكاليف'], slug: 'cost-engineering', emoji: '📓', instructor: 'أحمد عاشور', priceNew: '3500ج', priceOld: '6000ج', multi: '3200ج', pdf: 'assets/pdfs/cost-engineering.pdf' },
    { keys: ['التحليل المالي'], slug: 'financial-analysis', emoji: '📔', instructor: 'أحمد عاشور', priceNew: '5000ج', priceOld: '6500ج', multi: '4000ج', pdf: 'assets/pdfs/financial-analysis.pdf' },
    { keys: ['المدير المالي CFO', 'المدير المالي', 'CFO'], slug: 'cfo', emoji: '📒', instructor: 'أحمد عاشور', priceNew: '6000ج', priceOld: '12000ج', multi: '6000ج', pdf: 'assets/pdfs/cfo.pdf' },
    { keys: ['ورشة الإكسيل', 'الإكسيل', 'Excel', 'إكسيل', 'الاكسيل'], slug: 'excel', emoji: '🟢', instructor: 'مصطفى القصاص', priceNew: '2000ج', priceOld: '4000ج', multi: 'في الـ bundle', pdf: null }
  ];

  // ============ Stage Mapping ============
  const STAGES = {
    1: { name: 'تم التحويل', heat: 'hot', icon: '✅💰', action: 'تأكيد فوري + ترحيب + تسليم تفاصيل (موعد، عنوان، جروب الواتساب)', focus: 'الترحيب والتأكيد — العميل دفع، خلاص. مفيش pitch.' },
    2: { name: 'تم الحجز', heat: 'hot', icon: '✅', action: 'اعمل timeline للتحويل + سهّل الدفع (5 طرق متاحة)', focus: 'تحديد ميعاد التحويل، مش الضغط النفسي.' },
    3: { name: 'جاهز للتحويل', heat: 'hot', icon: '💳', action: 'افتح المحادثة بدون pressure + سهّل التحويل + اكشف سبب التأخير', focus: 'العميل قريب جداً. سؤال "في حاجة عمالة تأخر؟" بدل الضغط.' },
    4: { name: 'مهتم لم يتقدم', heat: 'warm', icon: '🟡', action: 'اكشف الـ objection الحقيقي (مش الظاهر) — سؤال صريح', focus: 'العميل قال "تمام" بس مش بيتحرك. السبب الحقيقي مدفون.' },
    5: { name: 'شاف السعر ولم يحجز', heat: 'warm', icon: '🟡', action: 'اكسر التسويف + خلق urgency حقيقي + احصل على commitment', focus: '"هفكر" = stalling. اسأل في إيه يحديداً، مش "أيوة هفكر طبعاً".' },
    6: { name: 'مرحلة الاستكشاف', heat: 'cold', icon: '🔵', action: 'Discovery كامل + بناء قيمة + ربط بـ pain', focus: 'لسه ما شافش سعر. اسأل قبل ما تبيع.' },
    7: { name: 'رفض', heat: 'cold', icon: '🔵', action: 'إعادة تواصل محترمة (مش إقفال نهائي) — Goodwill close', focus: 'احترم القرار. سجّل في nurture list. متضغطش.' }
  };

  // ============ Angle Detection (per workshop) ============
  const ANGLES_MAP = {
    'financial-accountant': [
      { n: 1, label: 'Fresh بـ يـ دوّر شغل', slug: 'angle-1-fresh-job-hunter', keywords: ['متخرج', 'بدور شغل', 'مترفض', 'إنترفيو', 'مفيش خبرة', 'fresh', 'graduate', 'بقدّم', 'دور وظيفة'] },
      { n: 2, label: 'فريش لسه في الكلية', slug: 'angle-2-fresh-pre-job', keywords: ['كلية', 'لسه طالب', 'هتخرج', 'سنة 4', 'سنة 3', 'سنة رابعة', 'سنة ثالثة', 'طالب', 'لسه ما تخرجش'] },
      { n: 3, label: 'موظف جديد ضايع', slug: 'angle-3-new-employee', keywords: ['موظف جديد', 'ضايع', 'بنفذ', 'مش فاهم', 'محاسب جديد', 'لسه دخلت شركة', 'أول شغل'] }
    ],
    'comprehensive-accountant': [
      { n: 1, label: 'Junior ثابت', slug: 'angle-1-stuck-junior', keywords: ['junior', 'سنة', 'سنتين', 'ثابت', 'data entry', 'مدخل بيانات', 'بنفذ', 'مكرر', 'مش بفهم'] },
      { n: 2, label: 'طموح رئيس حسابات', slug: 'angle-2-aspiring-chief', keywords: ['رئيس حسابات', 'chief', 'يدير', 'فريق', 'أشيل ملف', 'إقفال', 'تسويات', 'طموح', 'منصب'] },
      { n: 3, label: 'صاحب شركة', slug: 'angle-3-business-owner', keywords: ['صاحب شركة', 'صاحب', 'owner', 'بزنس', 'شركتي', 'محاسبي'] }
    ],
    'tax-expert': [
      { n: 1, label: 'محاسب خايف من الفحص', slug: 'angle-1-fearing-audit', keywords: ['فحص ضريبي', 'فحص', 'خوف', 'خايف', 'مأمور', 'مصلحة', 'غرامات', 'مش جاهز', 'الشركة'] },
      { n: 2, label: 'يبغى تخصص', slug: 'angle-2-specialization', keywords: ['تخصص', 'specialization', 'يزود قيمتي', 'authority', 'محاسب شغّال', 'متخصص ضرايب'] },
      { n: 3, label: 'صاحب شركة بـ يدفع غرامات', slug: 'angle-3-owner-fines', keywords: ['غرامات', 'بدفع كل سنة', 'محاسبي مش فاهم', 'صاحب شركة', 'owner', 'بزنس'] }
    ],
    'odoo': [
      { n: 1, label: 'شركته بـ تنقل ERP', slug: 'angle-1-company-erp', keywords: ['شركتي بتنقل', 'odoo', 'erp', 'بيطلب مني', 'مش عارف', 'system', 'نظام جديد'] },
      { n: 2, label: 'يبغى يدخل سوق ERP', slug: 'angle-2-erp-market', keywords: ['سوق', 'تخصص', 'erp consultant', 'implementation', 'يدخل تخصص', 'odoo specialist'] },
      { n: 3, label: 'صاحب شركة', slug: 'angle-3-owner', keywords: ['صاحب شركة', 'owner', 'شركتي', 'excel', 'محاسبي', 'نظام'] }
    ],
    'cost-engineering': [
      { n: 1, label: 'محاسب في مصنع', slug: 'angle-1-factory-accountant', keywords: ['مصنع', 'تكاليف', 'محاسب تكاليف', 'إنتاج', 'صناعي', 'بدخل قيود', 'مقاولات'] },
      { n: 2, label: 'يبغى تخصص', slug: 'angle-2-specialization', keywords: ['تخصص', 'specialization', 'محاسبة عادية', 'يزود قيمتي', 'تكاليف'] },
      { n: 3, label: 'صاحب نشاط إنتاجي', slug: 'angle-3-business-owner', keywords: ['صاحب', 'owner', 'شركتي', 'نشاط إنتاجي', 'مصنع', 'قرارات'] }
    ],
    'financial-analysis': [
      { n: 1, label: 'Senior مضغوط', slug: 'angle-1-senior-pressured', keywords: ['senior', 'سينيور', 'مضغوط', 'مدير بـ يطلب', 'رؤية', 'تحليل', 'قرارات', '3 سنين', '5 سنين'] },
      { n: 2, label: 'محلل junior', slug: 'angle-2-analyst-growing', keywords: ['محلل', 'analyst', 'junior', 'بـ شتغل تحليل', 'يحترف', 'depth', 'يطور'] },
      { n: 3, label: 'مستثمر/صاحب', slug: 'angle-3-investor-owner', keywords: ['مستثمر', 'investor', 'صاحب شركة', 'بـ شوف قوائم', 'يقيّم'] }
    ],
    'cfo': [
      { n: 1, label: 'رئيس حسابات → CFO', slug: 'angle-1-chief-to-cfo', keywords: ['رئيس حسابات', 'chief', 'ثابت', 'أنتقل لـ cfo', 'مفيش حد بـ يعلمني', '7 سنين', '5 سنين'] },
      { n: 2, label: 'CFO جديد', slug: 'angle-2-new-cfo', keywords: ['cfo جديد', 'new cfo', 'knowledge gap', 'gaps', 'مش متأكد', 'tools', 'thinking'] },
      { n: 3, label: 'صاحب شركة بـ يقيّم', slug: 'angle-3-owner-evaluating', keywords: ['صاحب شركة', 'owner', 'بـ قيّم', 'محتاج cfo', 'يدور على', 'كفؤ', 'يفهم'] }
    ],
    'excel': [
      { n: 1, label: 'فريش بـ يـ تعلم Excel', slug: 'angle-1-junior-learning', keywords: ['فريش', 'fresh', 'لسه', 'بـ يـ تعلم', 'من أين أبدأ', 'مبتدئ', 'beginner'] },
      { n: 2, label: 'محاسب شغّال بـ يـ عمل تقارير', slug: 'angle-2-working-accountant', keywords: ['محاسب شغال', 'تقارير', 'بـ شتغل في excel', 'وقت طويل', 'shortcuts', 'functions', 'advanced'] },
      { n: 3, label: 'صاحب شركة', slug: 'angle-3-business-owner', keywords: ['صاحب شركة', 'owner', 'موظفيني', 'roi', 'وقت موظف'] }
    ]
  };

  function detectAngle(text, workshop) {
    if (!workshop || !ANGLES_MAP[workshop.slug]) return null;
    const t = (text || '').toLowerCase();
    const angles = ANGLES_MAP[workshop.slug];
    let best = null;
    let bestScore = 0;
    angles.forEach(a => {
      let score = 0;
      a.keywords.forEach(k => {
        // Count keyword occurrences (Arabic-aware: don't lowercase Arabic)
        const isArabic = /[؀-ۿ]/.test(k);
        const needle = isArabic ? k : k.toLowerCase();
        const haystack = isArabic ? (text || '') : t;
        if (haystack.includes(needle)) score += 1;
      });
      if (score > bestScore) {
        bestScore = score;
        best = a;
      }
    });
    if (!best || bestScore === 0) return null;
    // Confidence: relative to keywords matched
    const confidence = bestScore >= 3 ? 'high' : bestScore >= 2 ? 'medium' : 'low';
    return { ...best, score: bestScore, confidence };
  }

  // ============ Objection Auto-detect ============
  const OBJECTION_PATTERNS = [
    { key: 'price', label: 'السعر + الخصم', emoji: '💰', keywords: ['غالي', 'سعر مرتفع', 'مش قادر أدفع', 'متحملش', 'ميزانية', 'تخفيض', 'خصم', 'كتير', 'مرتفع', 'expensive'], url: 'objections/price/' },
    { key: 'stalling', label: 'Stalling — هفكر / هكلم', emoji: '🚧', keywords: ['هفكر', 'هكلم', 'أهلي', 'زوجتي', 'بعدين', 'هرجعلك', 'مش الوقت', 'هرد عليك', 'هشوف'], url: 'objections/stalling/' },
    { key: 'trust', label: 'الثقة + الضمان', emoji: '🤔', keywords: ['ضامن', 'ضمان', 'ثقة', 'مين هما', 'إثبات', 'feedback', 'reviews', 'موثوقة', 'حقيقي', 'مضمون'], url: 'objections/trust/' },
    { key: 'time', label: 'الوقت + المواعيد', emoji: '⏰', keywords: ['مش فاضي', 'مشغول جداً', 'مش متاح', 'مواعيد صعبة', 'مش هـ يـ ناسبني', 'وقت قليل', 'مش لاقي وقت', 'الميعاد صعب'], url: 'objections/time/' },
    { key: 'logistics', label: 'Logistics — مكان/Online/لاب توب', emoji: '📍', keywords: ['بعيد عن', 'مكان بعيد', 'من محافظة تانية', 'مش هـ سافر', 'مفيش مواصلات', 'مفيش لاب توب', 'مفيش كمبيوتر', 'مش هـ نزل القاهرة'], url: 'objections/logistics/' },
    { key: 'competition', label: 'Competition — منافسين', emoji: '🥊', keywords: ['يوتيوب', 'مجاني', 'كورس تاني', 'أكاديمية', 'بـ شوف', 'موقع تاني', 'instructor', 'udemy', 'في حد تاني'] , url: 'objections/competition/' },
    { key: 'doubt', label: 'Doubt — شك في القيمة', emoji: '❓', keywords: ['مش متأكد', 'هل يفرق', 'يساعد فعلاً', 'هضمن', 'هل ينفع', 'مش عارف', 'شك'], url: 'objections/doubt/' }
  ];

  function detectObjections(text) {
    if (!text) return [];
    const matches = [];
    OBJECTION_PATTERNS.forEach(o => {
      let score = 0;
      o.keywords.forEach(k => {
        if (text.includes(k)) score += 1;
      });
      if (score > 0) matches.push({ ...o, score });
    });
    return matches.sort((a, b) => b.score - a.score).slice(0, 3);
  }

  // ============ Stage Conversion Probability ============
  const PROBABILITY = {
    1: { percent: '95%+', heat: 'hot', hint: 'حوّل بالفعل — تثبيت + ترحيب' },
    2: { percent: '80-90%', heat: 'hot', hint: 'اتفق على الحجز — تأكيد ميعاد التحويل' },
    3: { percent: '60-80%', heat: 'hot', hint: 'قريب من الـ close — كشف العائق + تسهيل' },
    4: { percent: '30-50%', heat: 'warm', hint: 'في objection مخفي — اكشف السبب الحقيقي' },
    5: { percent: '20-35%', heat: 'warm', hint: 'stalling — اكسر التسويف + احصل على commitment' },
    6: { percent: '10-20%', heat: 'cold', hint: 'بدري — discovery كامل + بناء قيمة' },
    7: { percent: '5-10%', heat: 'cold', hint: 'رفض — nurture longterm، متضغطش' }
  };

  function getProbability(stage) {
    return PROBABILITY[stage] || null;
  }

  // ============ Routing Mapping ============
  function detectRouting(text) {
    const t = (text || '').toLowerCase();
    if (text.includes('تيم الحجوزات') || t.includes('bookings')) return { type: 'bookings', label: 'تيم الحجوزات', emoji: '📋' };
    if (text.includes('محول') || text.includes('تم التحويل بالفعل') || t.includes('transfers')) return { type: 'transfers', label: 'تم التحويل', emoji: '🔄' };
    if (text.includes('تيم السيلز') || t.includes('sales')) return { type: 'sales', label: 'تيم السيلز', emoji: '🎯' };
    return null;
  }

  function detectHeat(text) {
    if (text.includes('🔥') || /\bhot\b/i.test(text)) return 'hot';
    if (text.includes('🟡') || /\bwarm\b/i.test(text)) return 'warm';
    if (text.includes('🔵') || /\bcold\b/i.test(text)) return 'cold';
    return null;
  }

  function detectWorkshop(name) {
    if (!name) return null;
    for (const w of WORKSHOPS) {
      for (const k of w.keys) {
        if (name.includes(k)) return w;
      }
    }
    return null;
  }

  // ============ Parser ============
  function field(text, label, multiline) {
    // Match: "label: value" until end-of-line, OR (if multiline) until next "field:" pattern
    const labelRe = label.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    if (multiline) {
      const re = new RegExp(labelRe + '\\s*:\\s*([\\s\\S]+?)(?=\\n\\s*\\S[^\\n]*?:\\s|$)', 'i');
      const m = text.match(re);
      return m ? m[1].trim() : null;
    }
    const re = new RegExp(labelRe + '\\s*:\\s*([^\\n]+)', 'i');
    const m = text.match(re);
    return m ? m[1].trim() : null;
  }

  function parseBrief(text) {
    const out = {};

    // Workshop
    out.workshopName = field(text, 'الورشة') || field(text, 'الورشة المعتمدة');
    out.workshop = detectWorkshop(out.workshopName);

    // Method (online/offline)
    out.method = field(text, 'طريقة الحضور');

    // Location
    out.location = field(text, 'مكان الحضور');

    // Date
    out.date = field(text, 'تاريخ الحضور');

    // Stage
    const stageRaw = field(text, 'المرحلة');
    if (stageRaw) {
      out.stageRaw = stageRaw;
      const sm = stageRaw.match(/\d+/);
      if (sm) {
        const n = parseInt(sm[0], 10);
        if (n >= 1 && n <= 7) {
          out.stage = n;
          out.stageData = STAGES[n];
        }
      }
    }

    // Heat
    const heatRaw = field(text, 'الحالة');
    out.heatRaw = heatRaw;
    out.heat = detectHeat(heatRaw || text) || (out.stageData && out.stageData.heat);

    // Routing
    const routingRaw = field(text, 'التوجيه');
    out.routingRaw = routingRaw;
    out.routing = detectRouting(routingRaw || text);

    // Price (multi-line)
    out.priceInfo = field(text, 'السعر اللي اتعرض', true);

    // Transfer details
    out.transferDetails = field(text, 'تفاصيل التحويل');

    // Summary (multi-line)
    out.summary = field(text, 'ملخص المحادثة', true);

    // Next step (multi-line, often at end)
    out.nextStep = field(text, 'الخطوة الجاية', true);

    // Smart Angle Detection (uses summary + raw text + job_title field)
    const jobTitle = field(text, 'job_title') || field(text, 'الوظيفة') || '';
    const detectionPool = [out.summary || '', text, jobTitle].join(' ');
    out.angle = detectAngle(detectionPool, out.workshop);

    // Objection Auto-detect: scan SUMMARY ONLY (not structural fields like priceInfo/location).
    // Skip for hot stages where deal is already in motion (1=paid, 2=committed).
    out.objections = (out.stage && out.stage <= 2) ? [] : detectObjections(out.summary || '');

    // Stage Conversion Probability
    out.probability = getProbability(out.stage);

    return out;
  }

  // ============ Validate ============
  function validate(p) {
    const missing = [];
    if (!p.workshop && !p.workshopName) missing.push('الورشة');
    if (!p.stage) missing.push('المرحلة');
    if (!p.routing) missing.push('التوجيه');
    return missing;
  }

  // ============ Render ============
  function renderResult(parsed) {
    const resultEl = document.getElementById('bt-result');
    if (!resultEl) return;

    const missing = validate(parsed);

    // Critical: 2+ fields missing → can't proceed
    if (missing.length >= 2) {
      resultEl.innerHTML = `
        <div class="bt-card bt-error">
          <div class="bt-card-title">⚠️ مش قادر أحلّل الـ Brief</div>
          <p>ناقص: <strong>${escapeHtml(missing.join('، '))}</strong></p>
          <p>تأكد إن الـ brief كامل من الـ AI Agent. لو الـ format اتغيّر، تواصل مع Sales Director.</p>
          <details><summary>الـ Brief اللي لزّقته</summary><pre style="background:#fff;padding:0.5rem;border-radius:6px;font-size:0.85rem;direction:rtl;white-space:pre-wrap;">${escapeHtml((parsed.__raw || '').slice(0, 600))}</pre></details>
        </div>`;
      return;
    }

    // Routing = transfers → already done
    if (parsed.routing && parsed.routing.type === 'transfers') {
      resultEl.innerHTML = `
        <div class="bt-card bt-transfers">
          <div class="bt-card-title">🔄 تم التحويل بالفعل</div>
          <div class="bt-action"><p>العميل اتحوّل خلاص. مفيش action مطلوب. علّمه <strong>closed/won</strong> في Odoo + سلّم للـ bookings logistics (جروب، تذكير، إلخ).</p></div>
          ${parsed.workshop ? `<div class="bt-workshop">${parsed.workshop.emoji} ${escapeHtml(parsed.workshopName)}</div>` : ''}
        </div>`;
      saveHistory(parsed);
      return;
    }

    // Routing = bookings OR sales → full action card (same team handles both)
    const heat = parsed.heat || 'cold';
    const stage = parsed.stage;
    const sData = parsed.stageData;
    const w = parsed.workshop;
    const angle = parsed.angle;
    // Deep-link: if angle detected, link to angle page + stage anchor; else workshop index
    const workshopUrl = w
      ? (angle ? `scripts/${w.slug}/${angle.slug}/#stage-${stage}` : `scripts/${w.slug}/`)
      : 'scripts/';
    const heatLabel = heat === 'hot' ? '🔥 Hot' : heat === 'warm' ? '🟡 Warm' : '🔵 Cold';
    const isBookings = parsed.routing && parsed.routing.type === 'bookings';
    const prob = parsed.probability;

    let warningBanner = '';
    if (isBookings) {
      warningBanner = `<div class="bt-priority-banner">🔥 <strong>Ready to Book — أولوية قصوى.</strong> العميل جاهز للتحويل. سهّل الدفع فوراً + كلمه في خلال 15 دقيقة.</div>`;
    }
    if (missing.length === 1) {
      warningBanner += `<div class="bt-warning-banner">⚠️ ناقص: <strong>${escapeHtml(missing[0])}</strong> — حلّلت اللي قدرت عليه، تأكد يدوياً من الـ brief.</div>`;
    }
    if (!w && parsed.workshopName) {
      warningBanner += `<div class="bt-warning-banner">⚠️ ورشة "${escapeHtml(parsed.workshopName)}" مش في الـ list. تأكد من الاسم في الـ brief.</div>`;
    }

    resultEl.innerHTML = `
      <div class="bt-card bt-sales bt-heat-${heat}">
        ${warningBanner}
        <div class="bt-card-header">
          <span class="bt-heat-badge">${heatLabel}</span>
          <span class="bt-stage-badge">Stage ${stage}: ${escapeHtml(sData.name)} ${sData.icon}</span>
          ${prob ? `<span class="bt-prob-badge" title="${escapeHtml(prob.hint)}">📊 ${prob.percent}</span>` : ''}
        </div>

        <div class="bt-card-body">
          ${w ? `<div class="bt-workshop">
            <strong>${w.emoji} ${escapeHtml(parsed.workshopName)}</strong> · ${w.instructor}
            ${parsed.method ? `<br>📌 ${escapeHtml(parsed.method === 'offline' ? '🏢 Offline' : parsed.method === 'online' ? '💻 Online' : parsed.method)}` : ''}
            ${parsed.location ? ` · 📍 ${escapeHtml(parsed.location)}` : ''}
            ${parsed.date ? `<br>📅 ${escapeHtml(parsed.date)}` : ''}
          </div>` : ''}

          ${angle ? `<div class="bt-angle-rec bt-conf-${angle.confidence}">
            <div class="bt-angle-rec-header">
              <strong>🎯 Angle مقترح (auto-detected):</strong>
              <span class="bt-angle-conf">ثقة ${angle.confidence === 'high' ? 'عالية' : angle.confidence === 'medium' ? 'متوسطة' : 'منخفضة'} · ${angle.score} keywords matched</span>
            </div>
            <a class="bt-angle-link" href="scripts/${w.slug}/${angle.slug}/#stage-${stage}">
              Angle ${angle.n} — ${escapeHtml(angle.label)} → روح Stage ${stage} مباشرة
            </a>
          </div>` : (w ? `<div class="bt-angle-rec bt-conf-none">
            <strong>🎯 Angle:</strong> ما قدرتش أحدّد angle محدد من الـ brief — <a href="scripts/${w.slug}/">شوف 3 angles الورشة</a> واختار يدوياً.
          </div>` : '')}

          ${parsed.priceInfo ? `<div class="bt-price"><strong>💰 السعر المعروض:</strong><br>${escapeHtml(parsed.priceInfo)}</div>` : ''}

          <div class="bt-action">
            <strong>🎯 خطوتك الجاية:</strong>
            <p>${escapeHtml(sData.action)}</p>
            <p style="margin-top:0.3rem;font-size:0.9rem;color:var(--md-default-fg-color--light);">${escapeHtml(sData.focus)}</p>
          </div>

          ${parsed.objections && parsed.objections.length > 0 ? `<div class="bt-objections">
            <strong>🛡️ Objections متوقعة من الـ summary:</strong>
            <div class="bt-objection-chips">
              ${parsed.objections.map(o => `<a class="bt-objection-chip" href="${o.url}" title="${o.score} keyword(s) matched">${o.emoji} ${escapeHtml(o.label)} <span class="bt-obj-score">×${o.score}</span></a>`).join('')}
            </div>
            <p class="bt-objection-hint">اقرا الـ category قبل المكالمة — هـ يكون objection موجود.</p>
          </div>` : ''}

          ${parsed.summary ? `<details class="bt-summary" open><summary>📝 ملخص المحادثة (من الـ AI Agent)</summary><p>${escapeHtml(parsed.summary)}</p></details>` : ''}

          ${parsed.nextStep ? `<details class="bt-next"><summary>🔮 اقتراح الـ AI للخطوة الجاية</summary><p>${escapeHtml(parsed.nextStep)}</p></details>` : ''}

          <div class="bt-quick-links">
            ${w ? `<a class="bt-link" href="${workshopUrl}">${w.emoji} ${angle ? `Angle ${angle.n} → Stage ${stage}` : 'صفحة الورشة'}</a>` : ''}
            ${w && w.pdf ? `<a class="bt-link bt-link-pdf" href="${w.pdf}" download>📥 نزّل PDF الورشة</a>` : ''}
            <a class="bt-link" href="objections/">🛡️ Objections</a>
            <a class="bt-link" href="pricing/">💰 Pricing</a>
            <a class="bt-link" href="cheatsheet/">🖨️ Cheatsheet</a>
            <a class="bt-link" href="helper/">🧭 Helper</a>
          </div>

          <div class="bt-templates">
            <div class="bt-templates-title">📋 Templates جاهزة — معبّاة بـ context العميل (دوس انسخ):</div>
            ${renderTemplates(parsed)}
          </div>
        </div>
      </div>`;

    // Wire template vars editor (live find/replace)
    wireTemplateVars(resultEl);

    // Wire copy buttons
    resultEl.querySelectorAll('.bt-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pre = btn.parentElement.querySelector('.bt-template-text');
        const tmpl = pre ? pre.textContent : '';
        copyText(tmpl).then(() => {
          const orig = btn.textContent;
          btn.textContent = '✅ اتنسخ!';
          btn.classList.add('bt-copied');
          setTimeout(() => {
            btn.textContent = orig;
            btn.classList.remove('bt-copied');
          }, 1800);
        });
      });
    });

    saveHistory(parsed);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback
    return new Promise((resolve) => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      resolve();
    });
  }

  // ============ Templates ============
  const SALES_REP_KEY = 'rs_sales_rep_name';
  function readSalesRepName() { try { return localStorage.getItem(SALES_REP_KEY) || ''; } catch (e) { return ''; } }
  function saveSalesRepName(v) { try { localStorage.setItem(SALES_REP_KEY, v || ''); } catch (e) {} }

  function applyTemplateVars(originalText, customerName, salesRepName) {
    let out = originalText;
    if (customerName) out = out.replace(/\[الاسم\]/g, customerName);
    if (salesRepName) out = out.replace(/\[اسم السيلز\]/g, salesRepName);
    return out;
  }

  function renderTemplates(p) {
    const W = p.workshopName || 'الورشة';
    const D = p.date || '[تاريخ المجموعة]';
    const L = p.location || '[المكان]';
    const M = p.method === 'offline' ? 'Offline' : p.method === 'online' ? 'Online' : '';
    const PR = p.workshop ? p.workshop.priceNew : '[السعر]';

    const items = getTemplatesForStage(p.stage, { W, D, L, M, PR });
    if (!items || items.length === 0) return '<p class="bt-empty">مفيش templates للـ stage ده.</p>';

    const savedRep = readSalesRepName();

    return `
      <div class="bt-template-vars">
        <div class="bt-template-vars-title">✏️ املا الأسماء قبل النسخ:</div>
        <div class="bt-template-vars-row">
          <label>
            <span>اسم العميل:</span>
            <input type="text" id="bt-var-customer" placeholder="مثلاً: أحمد" />
          </label>
          <label>
            <span>اسم السيلز (محفوظ):</span>
            <input type="text" id="bt-var-rep" value="${escapeHtml(savedRep)}" placeholder="مثلاً: محمود" />
          </label>
        </div>
      </div>
      ${items.map((t, i) => `
        <div class="bt-template" data-tpl-idx="${i}">
          <div class="bt-template-label">${escapeHtml(t.label)}</div>
          <pre class="bt-template-text" data-tpl-original="${escapeAttr(t.text)}">${escapeHtml(t.text)}</pre>
          <button class="bt-copy-btn">📋 انسخ الـ template</button>
        </div>
      `).join('')}
    `;
  }

  function wireTemplateVars(rootEl) {
    if (!rootEl) return;
    const customerInput = rootEl.querySelector('#bt-var-customer');
    const repInput = rootEl.querySelector('#bt-var-rep');
    if (!customerInput && !repInput) return;

    function refresh() {
      const c = (customerInput && customerInput.value.trim()) || '';
      const r = (repInput && repInput.value.trim()) || '';
      rootEl.querySelectorAll('.bt-template-text').forEach(pre => {
        const original = pre.getAttribute('data-tpl-original') || '';
        // The data attribute is HTML-escaped; decode by setting via textContent of a temp element
        const decoded = decodeHtmlEntities(original);
        pre.textContent = applyTemplateVars(decoded, c, r);
      });
    }

    customerInput && customerInput.addEventListener('input', refresh);
    repInput && repInput.addEventListener('input', () => {
      saveSalesRepName(repInput.value.trim());
      refresh();
    });

    // Initial pass to apply saved rep name (if any) right after render
    refresh();
  }

  function decodeHtmlEntities(s) {
    const ta = document.createElement('textarea');
    ta.innerHTML = s;
    return ta.value;
  }

  function getTemplatesForStage(stage, x) {
    switch (stage) {
      case 1: return [
        { label: '📱 WhatsApp — تأكيد التحويل + ترحيب', text:
`[الاسم] —

✅ التحويل وصل، شكراً!

🎉 مبروك! حجزك في ورشة ${x.W} مؤكد رسمياً.

📋 تفاصيل المجموعة:
🔹 الورشة: ${x.W}
🔹 التاريخ: ${x.D}
🔹 المكان: ${x.L}
${x.M ? `🔹 طريقة الحضور: ${x.M}\n` : ''}
💰 المدفوع: 50% جدية حجز ✅
💰 المتبقي: 50% في أول محاضرة (بدون فوايد)

⚠️ مهم تيجي قبل الموعد بـ 15 دقيقة في أول محاضرة + لينك جروب الواتساب هيوصلك قبلها بيوم.

أهلاً بيك في عيلة RS! 🌟`
        }
      ];

      case 2: return [
        { label: '📱 WhatsApp — Timeline للتحويل', text:
`[الاسم] أهلاً 👋

متفقين على ورشة ${x.W} مع مجموعة ${x.D} ✅

محتاج منك حاجة واحدة عشان أثبّتلك المكان رسمياً:

تحويل جدية الحجز (50% من السعر)

🟢 انستا باي: 100057017249
🟢 فودافون كاش: 01002180432
🟢 تحويل بنكي: CIB - حساب 100057017249
🟢 فيزا في المقر (يومياً 10ص - 6م)
🟢 Stripe (أونلاين)

هتقدر تحوّل امتى؟ عشان أحدد المقعد بـ اسمك.`
        }
      ];

      case 3: return [
        { label: '📱 WhatsApp — Soft Re-open (Stage 3)', text:
`[الاسم] أهلاً 👋

شفت إنك سألت قبل كده عن طريقة الدفع لورشة ${x.W}، وأرسلتلك البيانات.

سؤال: في حاجة عمالة تأخر؟

(محتاج تكلم الأهل؟ ظرف طارئ؟ ولا الموضوع راح من بالك؟)

لو الأهل، عندي breakdown مكتوب جاهز أبعته يساعد المحادثة.
لو فلوس، عندي خيارات تقسيط مرنة (50/50 بدون فوايد + فيزا 12-24 شهر).

أنهي المشكلة الحقيقية؟`
        },
        { label: '📞 Call Opener — Stage 3', text:
`"السلام عليكم [الاسم]، معاك [اسم السيلز] من RS.

شفت إنك سألت قبل كده على طريقة الدفع لورشة ${x.W}. كلمتك أتأكد إن في حاجة محتاجة توضيح. عندك 3 دقايق؟

[بعد القبول]

[الاسم]، خليني أسألك: أنت كنت جاهز ساعتها، ايه اللي خلاك تتأخر؟

[انتظر — استمع]"`
        }
      ];

      case 4: return [
        { label: '📱 WhatsApp — كشف الـ Real Objection', text:
`[الاسم]، في حاجة في بالي.

أنت قلت "تمام" لما عرفت السعر، بس ما حجزتش. عاوز أفهم: ايه اللي عمال يخليك تستنى؟

مش بضغط، بس عشان أعرف لو في حاجة محتاجة توضيح، أوضحها. ولو ورشة ${x.W} مش الـ fit ليك، اقولك بصراحة.`
        }
      ];

      case 5: return [
        { label: '📱 WhatsApp — كسر التسويف', text:
`[الاسم] —

شفت إنك قلت "هفكر" لما عرضنا سعر ورشة ${x.W} (${x.PR}).

خليني أسألك: هتفكر في إيه تحديداً؟

💰 السعر؟
📅 التوقيت؟
📚 المحتوى؟
🤝 المحاضر؟

خلينا نتكلم في اللي بيشغل بالك — مش في إن أقفل عليك.`
        }
      ];

      case 6: return [
        { label: '📱 WhatsApp — Discovery Opening', text:
`[الاسم] أهلاً 👋

شفت إنك بتسأل عن ورشة ${x.W}. قبل ما أرسلك التفاصيل، عاوز أفهم وضعك أحسن.

سؤال واحد سريع:

أنت في أنهي مرحلة دلوقتي؟
(طالب / فريش / محاسب شغّال 1-3 سنين / Senior / مدير / صاحب شركة)

عشان أبعتلك اللي يخدمك انت تحديداً، مش معلومات عامة.`
        }
      ];

      case 7: return [
        { label: '📱 WhatsApp — Goodwill Close', text:
`[الاسم] —

احترم قرارك. ولو السعر / التوقيت كان السبب، عادي تماماً.

هسجّلك في الـ priority list — لو فتحنا مجموعة بسعر مختلف أو في وقت أنسب ليك، انت أول حد هكلمه.

سلام، وتمنياتي ليك بالتوفيق فعلاً 🌟`
        }
      ];

      default: return [];
    }
  }

  // ============ History ============
  const HISTORY_KEY = 'rs_brief_history_v1';
  const MAX_HISTORY = 5;

  function saveHistory(p) {
    try {
      const arr = readHistory();
      arr.unshift({
        ts: new Date().toLocaleString('ar-EG'),
        workshop: p.workshopName || 'غير معروف',
        workshopEmoji: p.workshop ? p.workshop.emoji : '📚',
        stage: p.stage || '?',
        stageName: p.stageData ? p.stageData.name : '—',
        heat: p.heat || 'cold',
        routing: p.routing ? p.routing.label : 'غير معروف',
        summary: (p.summary || '').replace(/\s+/g, ' ').trim().slice(0, 140)
      });
      localStorage.setItem(HISTORY_KEY, JSON.stringify(arr.slice(0, MAX_HISTORY)));
      renderHistory();
    } catch (e) {
      console.warn('History save failed:', e);
    }
  }

  function readHistory() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
    catch (e) { return []; }
  }

  function renderHistory() {
    const listEl = document.getElementById('bt-history-list');
    if (!listEl) return;
    const arr = readHistory();
    if (arr.length === 0) {
      listEl.innerHTML = '<p class="bt-empty">لسه ما حلّلتش أي brief.</p>';
      return;
    }
    listEl.innerHTML = arr.map(h => {
      const he = h.heat === 'hot' ? '🔥' : h.heat === 'warm' ? '🟡' : '🔵';
      return `
        <div class="bt-history-item">
          <div class="bt-history-meta">${escapeHtml(h.ts)}</div>
          <div class="bt-history-routing">${he} Stage ${escapeHtml(String(h.stage))}: ${escapeHtml(h.stageName)} · ${escapeHtml(h.workshopEmoji)} ${escapeHtml(h.workshop)} · ${escapeHtml(h.routing)}</div>
          ${h.summary ? `<div class="bt-history-summary">${escapeHtml(h.summary)}${h.summary.length >= 140 ? '…' : ''}</div>` : ''}
        </div>`;
    }).join('');
  }

  function clearHistory() {
    if (!confirm('متأكد إنك عاوز تمسح الـ history؟')) return;
    localStorage.removeItem(HISTORY_KEY);
    renderHistory();
  }

  // ============ Utils ============
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }

  // For HTML attribute values — escapes quotes too (escapeHtml doesn't)
  function escapeAttr(text) {
    return escapeHtml(text).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ============ Init ============
  function init() {
    const root = document.getElementById('brief-triage');
    if (!root) return;

    const input = document.getElementById('bt-input');
    const analyzeBtn = document.getElementById('bt-analyze');
    const clearBtn = document.getElementById('bt-clear');
    const clearHistoryBtn = document.getElementById('bt-clear-history');

    analyzeBtn && analyzeBtn.addEventListener('click', () => {
      const text = (input.value || '').trim();
      const resultEl = document.getElementById('bt-result');
      if (!text) {
        resultEl.innerHTML = '<div class="bt-card bt-error"><div class="bt-card-title">⚠️ ما لزّقتش حاجة</div><p>الصق الـ brief كامل من الـ AI Agent في الـ box فوق.</p></div>';
        return;
      }
      const parsed = parseBrief(text);
      parsed.__raw = text;
      renderResult(parsed);
      // Scroll to result
      setTimeout(() => {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    });

    clearBtn && clearBtn.addEventListener('click', () => {
      input.value = '';
      const r = document.getElementById('bt-result');
      if (r) r.innerHTML = '';
      input.focus();
    });

    clearHistoryBtn && clearHistoryBtn.addEventListener('click', clearHistory);

    // Cmd/Ctrl + Enter to analyze
    input && input.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        analyzeBtn.click();
      }
    });

    renderHistory();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
