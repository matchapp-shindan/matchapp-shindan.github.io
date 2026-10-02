/**
 * 全ページ共通処理
 *  - 広告表記の差し込み
 *  - アクセス解析（GA4。未設定時は何もしない）
 *  - アフィリエイトリンク取得
 *  - SNSシェア（拡張しやすいよう SHARE_TARGETS に追加するだけの構造）
 */
(function () {
  'use strict';
  var cfg = window.SITE_CONFIG || {};

  /* ---------- ユーティリティ ---------- */
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  // ページから見たサイトルートへの相対パス（<body data-root="../"> で指定）
  function rootPath() {
    return (document.body && document.body.getAttribute('data-root')) || '';
  }

  /* ---------- アクセス解析 ---------- */
  var Analytics = {
    init: function () {
      if (!cfg.gaMeasurementId) return;
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.gaMeasurementId);
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', cfg.gaMeasurementId);
    },
    /** イベント送信。例: Analytics.track('cta_click', { app_id: 'pairs' }) */
    track: function (name, params) {
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    },
  };

  /* ---------- アフィリエイト ---------- */
  // リンク先の決定ルール
  //   公式サイトボタン   : アフィリエイトURL → なければ公式サイト
  //   ダウンロードボタン : アフィリエイトURL（downloadVia='affiliate'時）→ なければ端末に合ったストア
  function getAffiliate(appId) {
    var a = (window.AFFILIATE_LINKS || {})[appId];
    return a && a.url ? a : null;
  }
  function getLinks(appId) {
    var app = window.getAppById ? window.getAppById(appId) : null;
    return (app && app.links) || {};
  }
  /** 'ios' | 'android' | 'other' */
  function detectPlatform() {
    var ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
    if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return 'ios'; // iPadOS
    if (/Android/.test(ua)) return 'android';
    return 'other';
  }
  function getOfficialUrl(appId) {
    var aff = getAffiliate(appId);
    if (aff) return aff.url;
    return getLinks(appId).official || '#';
  }
  function isAffiliateOfficial(appId) {
    return !!getAffiliate(appId);
  }
  /**
   * 端末に合ったダウンロードリンク。PCなど該当ストアがない場合は null。
   * @returns {{url:string, label:string, affiliate:boolean} | null}
   */
  function getDownloadLink(appId) {
    var platform = detectPlatform();
    var links = getLinks(appId);
    var aff = getAffiliate(appId);
    var label = platform === 'ios' ? 'App Storeでダウンロード' : platform === 'android' ? 'Google Playでダウンロード' : '';
    if (!label) return null;
    var shortLabel = platform === 'ios' ? 'App Storeで入手' : 'Google Playで入手';
    // アフィリエイト経由の場合は公式の案内ページに飛ぶため、ストア名は表示しない
    if (aff && aff.downloadVia !== 'store') return { url: aff.url, label: 'アプリをダウンロード', shortLabel: 'アプリを入手', affiliate: true };
    var url = platform === 'ios' ? links.appStore : links.googlePlay;
    return url ? { url: url, label: label, shortLabel: shortLabel, affiliate: false } : null;
  }
  /** 全ストアのリンク（詳細ページ用） */
  function getStoreLinks(appId) {
    var links = getLinks(appId);
    var aff = getAffiliate(appId);
    var viaAff = aff && aff.downloadVia !== 'store';
    if (viaAff) return [{ store: 'affiliate', label: 'アプリを入手する', url: aff.url, affiliate: true }];
    var out = [];
    if (links.appStore) out.push({ store: 'appstore', label: 'App Store', url: viaAff ? aff.url : links.appStore, affiliate: !!viaAff });
    if (links.googlePlay) out.push({ store: 'googleplay', label: 'Google Play', url: viaAff ? aff.url : links.googlePlay, affiliate: !!viaAff });
    return out;
  }
  /** 外部リンク用の rel 属性（アフィリエイトには sponsored・nofollow を付与） */
  function relFor(affiliate) {
    return affiliate ? 'sponsored nofollow noopener' : 'noopener';
  }
  /** ASPのインプレッション計測用 1x1 画像（affiliate.js の pixel）。未設定なら空文字 */
  function impressionPixel(appId) {
    var aff = getAffiliate(appId);
    if (!aff || !aff.pixel) return '';
    return '<img class="aff-pixel" src="' + escapeHtml(aff.pixel) + '" width="1" height="1" alt="" border="0">';
  }

  /* ---------- SNSシェア ---------- */
  // 各シェア先は href（リンクで開く）か action（ボタン処理）のどちらかを持つ。
  // 追加例: line: { label: 'LINEで送る', className: 'btn-share--line', icon: '...',
  //   href: function (d) { return 'https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(d.url); } }
  // ※ ポップアップブロック対策として window.open ではなく通常の <a target="_blank"> で開きます。
  var SHARE_TARGETS = {
    x: {
      label: 'Xでシェア',
      className: 'btn-share--x',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path fill="currentColor" d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8-9.2L1 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20Z"/></svg>',
      href: function (d) {
        return 'https://x.com/intent/post?text=' + encodeURIComponent(d.text) +
          '&url=' + encodeURIComponent(d.url) +
          (d.hashtags && d.hashtags.length ? '&hashtags=' + encodeURIComponent(d.hashtags.join(',')) : '');
      },
    },
    copy: {
      label: 'リンクをコピー',
      className: 'btn-share--copy',
      icon: '<svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
      action: function (d, btn) {
        var label = btn.querySelector('.btn-share__label');
        var orig = label.textContent;
        var flash = function (msg) {
          label.textContent = msg;
          setTimeout(function () { label.textContent = orig; }, 1800);
        };
        var fallback = function () {
          // クリップボードが使えない環境：URLを選択状態で表示して手動コピーしてもらう
          var box = btn.parentNode.querySelector('.share-url');
          if (!box) {
            box = document.createElement('input');
            box.type = 'text';
            box.readOnly = true;
            box.className = 'share-url';
            box.id = 'share-url';
            box.setAttribute('aria-label', 'シェア用URL');
            btn.parentNode.appendChild(box);
          }
          box.value = d.url;
          box.focus();
          box.select();
          flash('URLを選択しました');
        };
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(d.url).then(function () { flash('コピーしました'); }, fallback);
          } else {
            fallback();
          }
        } catch (e) { fallback(); }
      },
    },
  };

  /** container にシェアボタンを描画。data = { text, url, hashtags } */
  function renderShareButtons(container, data) {
    var targets = (cfg.share && cfg.share.enabledTargets) || ['x'];
    container.innerHTML = '';
    targets.forEach(function (key) {
      var t = SHARE_TARGETS[key];
      if (!t) return;
      var el;
      if (t.href) {
        el = document.createElement('a');
        el.href = t.href(data);
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      } else {
        el = document.createElement('button');
        el.type = 'button';
      }
      el.className = 'btn-share ' + t.className;
      el.innerHTML = t.icon + '<span class="btn-share__label">' + escapeHtml(t.label) + '</span>';
      el.addEventListener('click', function () {
        Analytics.track('share', { method: key });
        if (t.action) t.action(data, el);
      });
      container.appendChild(el);
    });
  }

  /* ---------- 初期化 ---------- */
  function initAdDisclosure() {
    var els = document.querySelectorAll('[data-ad-disclosure]');
    for (var i = 0; i < els.length; i++) {
      if (cfg.adDisclosure) els[i].textContent = cfg.adDisclosure;
      else els[i].hidden = true;
    }
  }
  function initCtaTracking() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-cta]');
      if (!a) return;
      Analytics.track('cta_click', {
        cta_type: a.getAttribute('data-cta'),
        app_id: a.getAttribute('data-app-id') || '',
        position: a.getAttribute('data-position') || '',
        page: location.pathname,
      });
    });
  }
  function initYear() {
    var els = document.querySelectorAll('[data-year]');
    for (var i = 0; i < els.length; i++) els[i].textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initAdDisclosure();
    initCtaTracking();
    initYear();
  });
  Analytics.init();

  window.Site = {
    escapeHtml: escapeHtml,
    rootPath: rootPath,
    Analytics: Analytics,
    getOfficialUrl: getOfficialUrl,
    isAffiliateOfficial: isAffiliateOfficial,
    getDownloadLink: getDownloadLink,
    getStoreLinks: getStoreLinks,
    detectPlatform: detectPlatform,
    relFor: relFor,
    impressionPixel: impressionPixel,
    SHARE_TARGETS: SHARE_TARGETS,
    renderShareButtons: renderShareButtons,
  };
})();
