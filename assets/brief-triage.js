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
    const workshopUrl = w ? `scripts/${w.slug}/` : 'scripts/';
    const heatLabel = heat === 'hot' ? '🔥 Hot' : heat === 'warm' ? '🟡 Warm' : '🔵 Cold';
    const isBookings = parsed.routing && parsed.routing.type === 'bookings';

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
        </div>

        <div class="bt-card-body">
          ${w ? `<div class="bt-workshop">
            <strong>${w.emoji} ${escapeHtml(parsed.workshopName)}</strong> · ${w.instructor}
            ${parsed.method ? `<br>📌 ${escapeHtml(parsed.method === 'offline' ? '🏢 Offline' : parsed.method === 'online' ? '💻 Online' : parsed.method)}` : ''}
            ${parsed.location ? ` · 📍 ${escapeHtml(parsed.location)}` : ''}
            ${parsed.date ? `<br>📅 ${escapeHtml(parsed.date)}` : ''}
          </div>` : ''}

          ${parsed.priceInfo ? `<div class="bt-price"><strong>💰 السعر المعروض:</strong><br>${escapeHtml(parsed.priceInfo)}</div>` : ''}

          <div class="bt-action">
            <strong>🎯 خطوتك الجاية:</strong>
            <p>${escapeHtml(sData.action)}</p>
            <p style="margin-top:0.3rem;font-size:0.9rem;color:var(--md-default-fg-color--light);">${escapeHtml(sData.focus)}</p>
          </div>

          ${parsed.summary ? `<details class="bt-summary" open><summary>📝 ملخص المحادثة (من الـ AI Agent)</summary><p>${escapeHtml(parsed.summary)}</p></details>` : ''}

          ${parsed.nextStep ? `<details class="bt-next"><summary>🔮 اقتراح الـ AI للخطوة الجاية</summary><p>${escapeHtml(parsed.nextStep)}</p></details>` : ''}

          <div class="bt-quick-links">
            ${w ? `<a class="bt-link" href="${workshopUrl}">${w.emoji} صفحة الورشة</a>` : ''}
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
  function renderTemplates(p) {
    const W = p.workshopName || 'الورشة';
    const D = p.date || '[تاريخ المجموعة]';
    const L = p.location || '[المكان]';
    const M = p.method === 'offline' ? 'Offline' : p.method === 'online' ? 'Online' : '';
    const PR = p.workshop ? p.workshop.priceNew : '[السعر]';

    const items = getTemplatesForStage(p.stage, { W, D, L, M, PR });
    if (!items || items.length === 0) return '<p class="bt-empty">مفيش templates للـ stage ده.</p>';

    return items.map(t => `
      <div class="bt-template">
        <div class="bt-template-label">${escapeHtml(t.label)}</div>
        <pre class="bt-template-text">${escapeHtml(t.text)}</pre>
        <button class="bt-copy-btn">📋 انسخ الـ template</button>
      </div>
    `).join('');
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

[الاسم] — سؤال صريح: أنت كنت جاهز ساعتها — ايه اللي خلاك تتأخر؟

[انتظر — استمع]"`
        }
      ];

      case 4: return [
        { label: '📱 WhatsApp — كشف الـ Real Objection', text:
`[الاسم] — سؤال صريح:

أنت قلت "تمام" لما عرفت السعر، بس ما حجزتش. عاوز أفهم — ايه اللي عمال يخليك تستنى؟

مش بضغط — بس عشان أعرف لو في حاجة محتاجة توضيح، أوضحها. ولو ورشة ${x.W} مش الـ fit ليك، اقولك بصراحة.`
        }
      ];

      case 5: return [
        { label: '📱 WhatsApp — كسر التسويف', text:
`[الاسم] —

شفت إنك قلت "هفكر" لما عرضنا سعر ورشة ${x.W} (${x.PR}).

سؤال صريح: هتفكر في إيه تحديداً؟

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
