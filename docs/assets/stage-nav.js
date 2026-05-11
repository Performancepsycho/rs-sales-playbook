// RS Sales — Pro Max Features
// 1. Stage number badges (1/7, 2/7, ...)
// 2. Floating Stage Navigator (single-injection guarded)
// 3. Smooth scroll on open
// 4. Auto-close other stages
// 5. Copy-to-clipboard for all code blocks

(function () {
  'use strict';

  function getHeatLevel(detailsEl) {
    if (detailsEl.classList.contains('danger')) return 'hot';
    if (detailsEl.classList.contains('warning')) return 'warm';
    if (detailsEl.classList.contains('info')) return 'cold';
    return 'default';
  }

  function getStageNumber(summaryText) {
    const m = summaryText.match(/Stage\s*(\d+)/);
    return m ? parseInt(m[1]) : null;
  }

  function initStageNav() {
    const article = document.querySelector('article');
    if (!article) return;

    // GUARD: bail if already injected on this article
    if (article.dataset.stageNavInjected === '1') return;

    const allDetails = article.querySelectorAll('details');
    const stageDetails = [];

    allDetails.forEach(d => {
      const summary = d.querySelector('summary');
      if (summary && getStageNumber(summary.textContent) !== null) {
        stageDetails.push(d);
      }
    });

    if (stageDetails.length < 3) return; // Not a stage page

    // 1. Add stage number badge (guarded against double-injection)
    stageDetails.forEach((d, i) => {
      const summary = d.querySelector('summary');
      if (!summary) return;
      if (summary.querySelector('.stage-num-badge')) return; // already has

      const badge = document.createElement('span');
      badge.className = 'stage-num-badge';
      badge.textContent = `${i + 1} / ${stageDetails.length}`;
      summary.insertBefore(badge, summary.firstChild);

      d.id = `stage-${i + 1}`;
    });

    // 2. Build floating stage navigator (only if not already present)
    if (!article.querySelector('.stage-nav')) {
      const nav = document.createElement('div');
      nav.className = 'stage-nav';
      nav.innerHTML = '<span class="stage-nav-label">قفز لـ Stage:</span>';

      const btnContainer = document.createElement('div');
      btnContainer.className = 'stage-nav-buttons';

      stageDetails.forEach((d, i) => {
        const heat = getHeatLevel(d);
        const btn = document.createElement('button');
        btn.className = 'stage-nav-btn';
        btn.dataset.heat = heat;
        btn.dataset.stage = i + 1;
        btn.textContent = i + 1;
        btn.title = d.querySelector('summary').textContent.trim();

        btn.addEventListener('click', (e) => {
          e.preventDefault();
          stageDetails.forEach(other => {
            if (other !== d) other.open = false;
          });
          d.open = true;
          setTimeout(() => {
            d.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);

          article.querySelectorAll('.stage-nav-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });

        btnContainer.appendChild(btn);
      });

      nav.appendChild(btnContainer);
      stageDetails[0].parentElement.insertBefore(nav, stageDetails[0]);
    }

    // 3. Listen for accordion open/close to update active button
    stageDetails.forEach((d, i) => {
      if (d.dataset.toggleListenerBound === '1') return;
      d.dataset.toggleListenerBound = '1';
      d.addEventListener('toggle', () => {
        if (d.open) {
          article.querySelectorAll('.stage-nav-btn').forEach(b => b.classList.remove('active'));
          const btn = article.querySelector(`.stage-nav-btn[data-stage="${i + 1}"]`);
          if (btn) btn.classList.add('active');
        }
      });
    });

    article.dataset.stageNavInjected = '1';
  }

  // ============================================
  // Copy-to-Clipboard for code blocks
  // ============================================
  function initCopyButtons() {
    const article = document.querySelector('article');
    if (!article) return;
    if (article.dataset.copyBtnsInjected === '1') return;

    const codeBlocks = article.querySelectorAll('pre > code');
    codeBlocks.forEach(code => {
      const pre = code.parentElement;
      if (pre.querySelector('.rs-copy-btn')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'rs-code-wrapper';
      pre.parentElement.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement('button');
      btn.className = 'rs-copy-btn';
      btn.type = 'button';
      btn.textContent = '📋 نسخ';
      btn.setAttribute('aria-label', 'نسخ السكريبت');

      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const text = code.innerText;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = '✅ تم النسخ!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = '📋 نسخ';
            btn.classList.remove('copied');
          }, 1800);
        } catch (err) {
          btn.textContent = '❌ فشل النسخ';
          setTimeout(() => { btn.textContent = '📋 نسخ'; }, 1800);
        }
      });

      wrapper.appendChild(btn);
    });

    article.dataset.copyBtnsInjected = '1';
  }

  // ============================================
  // Init runner with guard against duplicate calls
  // ============================================
  function init() {
    initStageNav();
    initCopyButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Material's instant navigation — re-init on page swap
  if (typeof document$ !== 'undefined') {
    document$.subscribe(() => {
      // small delay to let DOM settle
      setTimeout(init, 30);
    });
  }
})();
