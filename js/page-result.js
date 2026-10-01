/**
 * 診断結果ページ（result.html）の描画
 * URL: result.html?a=<回答> （回答はURLに含まれるため、シェアされたURLでも同じ結果を再現できる）
 */
(function () {
  'use strict';
  var cfg = window.SITE_CONFIG || {};
  var esc = window.Site.escapeHtml;

  var params = new URLSearchParams(location.search);
  var answers = window.Diagnosis.decodeAnswers(params.get('a'), window.QUESTIONS);

  var loadingEl = document.getElementById('analyzing');
  var resultEl = document.getElementById('result');
  var errorEl = document.getElementById('result-error');

  if (!answers) {
    loadingEl.hidden = true;
    errorEl.hidden = false;
    return;
  }

  var data = window.Diagnosis.diagnose(answers, window.QUESTIONS, window.APPS);

  function badge(app, size) {
    return '<span class="app-badge app-badge--' + size + '" style="--app-color:' + esc(app.color) + '" aria-hidden="true">' +
      esc(app.name.charAt(0).toUpperCase()) + '</span>';
  }

  // スマホ（iOS/Android）のときだけ、その端末のストアへのボタンを出す
  function downloadBtn(app, position) {
    var dl = window.Site.getDownloadLink(app.id);
    if (!dl) return '';
    return '<a class="btn btn--store btn--block" href="' + esc(dl.url) + '" target="_blank" rel="' + window.Site.relFor(dl.affiliate) + '" data-cta="download" data-app-id="' + esc(app.id) + '" data-position="' + position + '">' +
      esc(dl.label) + '<span class="ext" aria-hidden="true">↗</span></a>';
  }

  function topCard(item, rank) {
    var app = item.app;
    var chips = app.shortFeatures.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
    return '' +
      '<article class="rank-card' + (rank === 1 ? ' rank-card--first' : '') + '">' +
        '<div class="rank-card__head">' +
          '<span class="rank-label rank-label--' + rank + '">' + rank + '<small>位</small></span>' +
          badge(app, 'md') +
          '<div class="rank-card__name"><h3>' + esc(app.name) + '</h3><span>' + esc(app.kana) + '</span></div>' +
          '<div class="match"><span class="match__label">相性</span><span class="match__num">' + item.percent + '<small>%</small></span></div>' +
        '</div>' +
        '<div class="meter" aria-hidden="true"><span style="width:' + item.percent + '%"></span></div>' +
        '<p class="rank-card__reason">' + esc(item.reason) + '</p>' +
        '<ul class="chips">' + chips + '</ul>' +
        '<div class="rank-card__cta">' +
          '<a class="btn btn--primary btn--block" href="apps/' + esc(app.id) + '.html" data-cta="detail" data-app-id="' + esc(app.id) + '" data-position="result_' + rank + '">' + esc(app.name) + 'を詳しく見る</a>' +
          '<a class="btn btn--outline btn--block" href="' + esc(window.Site.getOfficialUrl(app.id)) + '" target="_blank" rel="' + window.Site.relFor(window.Site.isAffiliateOfficial(app.id)) + '" data-cta="official" data-app-id="' + esc(app.id) + '" data-position="result_' + rank + '">公式サイトを見る<span class="ext" aria-hidden="true">↗</span></a>' +
          downloadBtn(app, 'result_' + rank) +
        '</div>' +
      '</article>';
  }

  function otherRow(item, rank) {
    var app = item.app;
    return '<li><a class="other-row" href="apps/' + esc(app.id) + '.html" data-cta="detail" data-app-id="' + esc(app.id) + '" data-position="result_' + rank + '">' +
      '<span class="other-row__rank">' + rank + '位</span>' + badge(app, 'sm') +
      '<span class="other-row__name">' + esc(app.name) + '</span>' +
      '<span class="other-row__pct">相性 ' + item.percent + '%</span><span class="other-row__arrow" aria-hidden="true">›</span></a></li>';
  }

  function render() {
    var n = window.Diagnosis.CONFIG.TOP_N;
    var top = data.ranking.slice(0, n);
    var others = data.ranking.slice(n);

    document.getElementById('result-type').textContent = data.type;
    document.getElementById('result-top-name').textContent = top[0].app.name;
    document.getElementById('result-list').innerHTML = top.map(function (it, i) { return topCard(it, i + 1); }).join('');

    var othersWrap = document.getElementById('result-others');
    if (others.length) {
      othersWrap.querySelector('ul').innerHTML = others.map(function (it, i) { return otherRow(it, n + i + 1); }).join('');
    } else {
      othersWrap.hidden = true;
    }

    var shareUrl = /^https?:$/.test(location.protocol)
      ? location.origin + location.pathname + '?a=' + params.get('a')
      : cfg.siteUrl + '/result.html?a=' + params.get('a');
    window.Site.renderShareButtons(document.getElementById('share-buttons'), {
      text: 'マッチングアプリ診断の結果、私は『' + data.type + '』でした。相性No.1は「' + top[0].app.name + '」（' + top[0].percent + '%）！',
      url: shareUrl,
      hashtags: (cfg.share && cfg.share.hashtags) || [],
    });

    document.title = '診断結果：' + top[0].app.name + 'がおすすめ｜' + cfg.siteName;
    window.Site.Analytics.track('result_view', {
      top1: top[0].app.id, top2: top[1] && top[1].app.id, top3: top[2] && top[2].app.id, type: data.type,
    });
  }

  render();
  // 一度表示した結果に「戻る」で戻ってきた場合は演出を省略
  var seenKey = 'matchapp_result_seen_' + params.get('a');
  var delay = cfg.analyzingDelayMs || 0;
  try {
    if (sessionStorage.getItem(seenKey)) delay = 0;
    sessionStorage.setItem(seenKey, '1');
  } catch (e) { /* noop */ }
  setTimeout(function () {
    loadingEl.hidden = true;
    resultEl.hidden = false;
    window.scrollTo(0, 0);
  }, delay);
})();
