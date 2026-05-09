// RS Sales — Pro Max Features
// 1. Stage number badges (1/7, 2/7, ...)
// 2. Floating Stage Navigator
// 3. Smooth scroll on open
// 4. Auto-close other stages when one opens (one-at-a-time mode)

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

  function init() {
    // Find all "stage" details on this page (must have summary with "Stage N")
    const allDetails = document.querySelectorAll('article details');
    const stageDetails = [];

    allDetails.forEach(d => {
      const summary = d.querySelector('summary');
      if (summary && getStageNumber(summary.textContent) !== null) {
        stageDetails.push(d);
      }
    });

    if (stageDetails.length < 3) return; // Not a stage page

    // 1. Add stage number badge inside each summary
    stageDetails.forEach((d, i) => {
      const summary = d.querySelector('summary');
      if (!summary || summary.querySelector('.stage-num-badge')) return;

      const badge = document.createElement('span');
      badge.className = 'stage-num-badge';
      badge.textContent = `${i + 1} / ${stageDetails.length}`;
      summary.insertBefore(badge, summary.firstChild);

      // Add ID for scroll target
      d.id = `stage-${i + 1}`;
    });

    // 2. Build floating stage navigator
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
        // Close all
        stageDetails.forEach(other => {
          if (other !== d) other.open = false;
        });
        // Open target
        d.open = true;
        // Smooth scroll
        setTimeout(() => {
          d.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);

        // Update active state
        document.querySelectorAll('.stage-nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });

      btnContainer.appendChild(btn);
    });

    nav.appendChild(btnContainer);

    // Insert nav before first details
    stageDetails[0].parentElement.insertBefore(nav, stageDetails[0]);

    // 3. Listen for accordion open/close to update active button
    stageDetails.forEach((d, i) => {
      d.addEventListener('toggle', () => {
        if (d.open) {
          // Update nav button state
          document.querySelectorAll('.stage-nav-btn').forEach(b => b.classList.remove('active'));
          const btn = document.querySelector(`.stage-nav-btn[data-stage="${i + 1}"]`);
          if (btn) btn.classList.add('active');

          // Close others (one-at-a-time mode — optional, comment out to allow multi-open)
          // stageDetails.forEach(other => { if (other !== d) other.open = false; });
        }
      });
    });
  }

  // Run after MkDocs Material has rendered
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run on instant navigation (Material's instant loading feature)
  document.addEventListener('DOMContentSwitch', init);
  if (typeof document$ !== 'undefined') {
    document$.subscribe(init);
  }
})();
