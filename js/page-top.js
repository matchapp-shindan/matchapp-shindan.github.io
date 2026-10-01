/**
 * トップページ：診断対象アプリの一覧を js/apps.js から自動生成
 * （アプリを追加すると自動で一覧に並びます）
 */
(function () {
  'use strict';
  var esc = window.Site.escapeHtml;
  var grid = document.getElementById('app-grid');
  if (!grid) return;
  grid.innerHTML = window.APPS.map(function (app) {
    return '<li><a class="card app-tile" href="apps/' + esc(app.id) + '.html" data-cta="detail" data-app-id="' + esc(app.id) + '" data-position="top_list">' +
      '<span class="app-badge app-badge--md" style="--app-color:' + esc(app.color) + '" aria-hidden="true">' + esc(app.name.charAt(0).toUpperCase()) + '</span>' +
      '<span class="app-tile__body"><span class="app-tile__name">' + esc(app.name) + '</span><br>' +
      '<span class="app-tile__catch">' + esc(app.catchCopy) + '</span></span>' +
      '<span class="app-tile__arrow" aria-hidden="true">›</span></a></li>';
  }).join('');
})();
