/**
 * アフィリエイトリンク設定
 * ------------------------------------------------------------
 * ★ アフィリエイトURLを変更するのはこのファイルだけです。
 *
 * - キーは js/apps.js の各アプリの id と一致させてください。
 * - asp : 利用するASP名（管理用メモ。表示には使いません）
 * - url : ASPで発行されたアフィリエイトURL（広告タグの <a href="…"> の部分）
 * - pixel : 広告タグに付いている 1x1 の計測用画像URL（<img src="…"> の部分。A8.netなど。無ければ省略可）
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
  // A8.net「いいね婚『マリッシュ』」（2026-10-02 設定）
  marrish:   {
    asp: 'A8.net',
    url: 'https://px.a8.net/svt/ejp?a8mat=4BE70Q+2HB1IQ+3N2M+67C4I',
    pixel: 'https://www13.a8.net/0.gif?a8mat=4BE70Q+2HB1IQ+3N2M+67C4I',
    downloadVia: 'affiliate',
  },
  bridalnet: { asp: '', url: '', downloadVia: 'affiliate' },
  youbride:  { asp: '', url: '', downloadVia: 'affiliate' },
  match:     { asp: '', url: '', downloadVia: 'affiliate' },
};
