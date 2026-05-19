/* ============================================================
   Schedule Filter — filter schedule rows by Offline/Online
   ============================================================
   Usage: any <table> wrapped with a sibling .schedule-filter-bar
   that has data-target="<table-id>". Rows must carry data-type.
   ============================================================ */

(function () {
  'use strict';

  function init() {
    document.querySelectorAll('.schedule-filter-bar').forEach(function (bar) {
      var targetId = bar.getAttribute('data-target');
      var table = targetId ? document.getElementById(targetId) : null;
      if (!table) return;

      var rows = Array.prototype.slice.call(table.querySelectorAll('tbody tr'));
      var counts = { all: rows.length, offline: 0, online: 0 };
      rows.forEach(function (tr) {
        var t = tr.getAttribute('data-type');
        if (t === 'offline') counts.offline++;
        else if (t === 'online') counts.online++;
      });

      bar.querySelectorAll('.sf-count').forEach(function (el) {
        var key = el.getAttribute('data-count');
        if (counts[key] !== undefined) el.textContent = counts[key];
      });

      bar.querySelectorAll('.sf-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var filter = btn.getAttribute('data-filter');

          bar.querySelectorAll('.sf-btn').forEach(function (b) {
            b.classList.toggle('is-active', b === btn);
          });

          var visible = 0;
          rows.forEach(function (tr) {
            var show = filter === 'all' || tr.getAttribute('data-type') === filter;
            tr.style.display = show ? '' : 'none';
            if (show) visible++;
          });

          var existing = table.parentNode.querySelector('.sf-empty');
          if (visible === 0) {
            if (!existing) {
              var empty = document.createElement('div');
              empty.className = 'sf-empty';
              empty.textContent = 'مفيش مجموعات مطابقة للفلتر ده.';
              table.parentNode.insertBefore(empty, table.nextSibling);
            }
          } else if (existing) {
            existing.remove();
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
