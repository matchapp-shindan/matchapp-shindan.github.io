/**
 * サイト全体の設定
 * ------------------------------------------------------------
 * 公開前に siteUrl を本番ドメインに変更してください。
 * （sitemap.xml / robots.txt / 各HTMLの canonical・OGP も同じドメインに置換）
 */
window.SITE_CONFIG = {
  siteName: 'マッチングアプリ診断',
  siteUrl: 'https://matchapp-shindan.github.io', // 末尾スラッシュなし

  // 広告表記（ステルスマーケティング規制対応）
  // [data-ad-disclosure] 要素にこの文言が差し込まれます。空文字にすると非表示。
  adDisclosure: '当サイトには広告・アフィリエイト広告が含まれています。',

  // Google Analytics 4 の測定ID（例: 'G-XXXXXXXXXX'）。空なら読み込みません。
  gaMeasurementId: '',

  // 診断結果のシェア
  share: {
    // 有効にするシェア先（js/common.js の SHARE_TARGETS のキー）
    enabledTargets: ['x', 'copy'],
    hashtags: ['マッチングアプリ診断'],
  },

  // 診断結果ページのローディング演出（ミリ秒）
  analyzingDelayMs: 1400,
};
