/**
 * アプリ詳細ページ（apps/*.html）の描画
 * <body data-app-id="pairs"> の値で js/apps.js から情報を読み込みます。
 * 料金・特徴などは js/apps.js を修正すれば全ページに反映されます。
 */
(function () {
  'use strict';
  var esc = window.Site.escapeHtml;
  var id = document.body.getAttribute('data-app-id');
  var app = window.getAppById(id);
  var root = document.getElementById('app-detail');
  if (!app) {
    root.innerHTML = '<p class="notice">アプリ情報が見つかりませんでした。<a href="../index.html">トップへ戻る</a></p>';
    return;
  }
  var official = window.Site.getOfficialUrl(app.id);
  var officialRel = window.Site.relFor(window.Site.isAffiliateOfficial(app.id));
  var platform = window.Site.detectPlatform();

  function list(items, cls) {
    return '<ul class="' + cls + '">' + items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
  }
  function officialBtn(pos, extra) {
    return '<a class="btn btn--primary btn--block ' + (extra || '') + '" href="' + esc(official) + '" target="_blank" rel="' + officialRel + '" data-cta="official" data-app-id="' + esc(app.id) + '" data-position="' + pos + '">公式サイトを見る<span class="ext" aria-hidden="true">↗</span></a>';
  }

  // ストアボタン（使っている端末のストアを先頭に）
  function storeButtons(pos) {
    var stores = window.Site.getStoreLinks(app.id);
    if (platform === 'android') stores.sort(function (a) { return a.store === 'googleplay' ? -1 : 1; });
    return '<div class="store-buttons">' + stores.map(function (st) {
      return '<a class="btn btn--store" href="' + esc(st.url) + '" target="_blank" rel="' + window.Site.relFor(st.affiliate) + '" data-cta="download" data-store="' + st.store + '" data-app-id="' + esc(app.id) + '" data-position="' + pos + '">' +
        '<small>ダウンロード</small>' + esc(st.label) + '</a>';
    }).join('') + '</div>';
  }

  var priceRows = app.pricing.items.map(function (p) {
    var v = p.value ? esc(p.value) : '<span class="muted">公式サイトでご確認ください</span>';
    return '<tr><th scope="row">' + esc(p.label) + '</th><td>' + v + '</td></tr>';
  }).join('');
  var hasPrice = app.pricing.items.some(function (p) { return !!p.value; });
  var priceHtml = hasPrice
    ? '<table class="price-table"><tbody>' + priceRows + '</tbody></table>'
    : '<p class="price-empty">最新の料金は公式サイトでご確認ください。</p>';
  var checked = app.infoCheckedAt ? '情報確認日：' + esc(app.infoCheckedAt) + '。' : '';

  var features = app.features.map(function (f) {
    return '<li class="feature"><h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + '</p></li>';
  }).join('');

  var fromResult = document.referrer && location.origin !== 'null' &&
    document.referrer.indexOf(location.origin + '/') === 0 && /result\.html\?a=/.test(document.referrer);

  root.innerHTML = '' +
    '<section class="app-hero card">' +
      '<span class="app-badge app-badge--lg" style="--app-color:' + esc(app.color) + '" aria-hidden="true">' + esc(app.name.charAt(0).toUpperCase()) + '</span>' +
      '<h1 class="app-hero__name">' + esc(app.name) + '<span>' + esc(app.kana) + '</span></h1>' +
      '<p class="app-hero__catch">' + esc(app.catchCopy) + '</p>' +
      '<ul class="chips chips--center">' + app.shortFeatures.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
      officialBtn('detail_top') +
      storeButtons('detail_top') +
    '</section>' +

    '<section class="card section-card"><h2 class="h-sec">こんな人に向いています</h2>' + list(app.targets, 'check-list') + '</section>' +
    '<section class="card section-card"><h2 class="h-sec">主な特徴</h2><ul class="feature-list">' + features + '</ul></section>' +
    '<section class="card section-card"><h2 class="h-sec">料金</h2>' +
      priceHtml +
      '<p class="note">' + esc(app.pricing.note) + checked + '最新の料金・プランは必ず公式サイトでご確認ください。</p>' +
    '</section>' +
    '<section class="card section-card"><h2 class="h-sec">安全性について</h2>' + list(app.safety, 'dot-list') +
      '<p class="note">個人情報を早い段階で教えない、初めて会うときは人の多い場所を選ぶなど、どのアプリでも基本的な対策を心がけましょう。</p>' +
    '</section>' +
    '<section class="card section-card"><h2 class="h-sec">おすすめポイント</h2>' + list(app.points, 'star-list') + '</section>' +

    '<section class="card section-card cta-card">' +
      '<p class="cta-card__lead">' + esc(app.name) + 'が気になったら、公式サイトやアプリストアでチェック</p>' +
      officialBtn('detail_bottom') +
      storeButtons('detail_bottom') +
      (fromResult
        ? '<a class="btn btn--ghost btn--block" href="' + esc(document.referrer) + '">診断結果に戻る</a>'
        : '<a class="btn btn--ghost btn--block" href="../shindan.html?new=1" data-cta="start" data-position="detail">自分に合うアプリを診断する</a>') +
    '</section>';

  // 下部固定CTA：スマホは端末のストアへ、PCは公式サイトへ
  var sticky = document.getElementById('sticky-cta');
  if (sticky) {
    var dl = window.Site.getDownloadLink(app.id);
    var stickyBtn = dl
      ? '<a class="btn btn--primary btn--block btn--sm" href="' + esc(dl.url) + '" target="_blank" rel="' + window.Site.relFor(dl.affiliate) + '" data-cta="download" data-app-id="' + esc(app.id) + '" data-position="detail_sticky">' + esc(dl.shortLabel) + '<span class="ext" aria-hidden="true">↗</span></a>'
      : officialBtn('detail_sticky', 'btn--sm');
    sticky.innerHTML = '<span class="sticky-cta__name">' + esc(app.name) + '</span>' + stickyBtn;
    sticky.hidden = false;
  }
  window.Site.Analytics.track('app_detail_view', { app_id: app.id });
})();
