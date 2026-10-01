/**
 * アフィリエイトリンク設定
 * ------------------------------------------------------------
 * ★ アフィリエイトURLを変更するのはこのファイルだけです。
 *
 * - キーは js/apps.js の各アプリの id と一致させてください。
 * - asp : 利用するASP名（管理用メモ。表示には使いません）
 * - url : ASPで発行されたアフィリエイトURL
 *
 * url が空（''）のときは、js/apps.js の links にある公式サイト／App Store／Google Play に
 * 直接リンクします（アフィリエイト報酬は発生しません）。
 * 提携が承認されたら url に貼り付けるだけで、全ページのボタンが切り替わります。
 *
 * downloadVia: 'affiliate' | 'store'
 *   url 設定後に「アプリをダウンロード」ボタンをどちらに向けるか。
 *   'affiliate' … ダウンロードボタンもアフィリエイトURLにする（成果計測のため通常はこちら）
 *   'store'     … ダウンロードボタンはストアに直接リンク（報酬対象外になる点に注意）
 *   ※ 案件によって「アプリインストール成果」の扱いが異なるため、ASPの案件条件を確認して選んでください。
 *
 * 重要：このファイルの内容（報酬額やASP）は診断結果の順位に一切影響しません。
 *       診断は js/questions.js の回答スコアのみで決まります。
 */
window.AFFILIATE_LINKS = {
  pairs:     { asp: '', url: '', downloadVia: 'affiliate' },
  with:      { asp: '', url: '', downloadVia: 'affiliate' },
  omiai:     { asp: '', url: '', downloadVia: 'affiliate' },
  tapple:    { asp: '', url: '', downloadVia: 'affiliate' },
  tinder:    { asp: '', url: '', downloadVia: 'affiliate' },
  bachelor:  { asp: 'A8.net', url: '', downloadVia: 'affiliate' },
  marrish:   { asp: '', url: '', downloadVia: 'affiliate' },
  bridalnet: { asp: '', url: '', downloadVia: 'affiliate' },
  youbride:  { asp: '', url: '', downloadVia: 'affiliate' },
  match:     { asp: '', url: '', downloadVia: 'affiliate' },
};
