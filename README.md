# マッチングアプリ診断 MVP

HTML / CSS / JavaScript のみで動く静的サイト。サーバー不要（GitHub Pages・Netlify 等にそのまま置けます）。

## どこを編集するか

| 変更したいこと | ファイル |
|---|---|
| アフィリエイトURL・ASP（空欄なら公式サイト／ストアに直接リンク） | `js/affiliate.js` |
| 公式サイト・App Store・Google PlayのURL | `js/apps.js` の `links` |
| アプリ情報（料金・特徴・安全性など） | `js/apps.js` |
| 質問・選択肢・配点 | `js/questions.js` |
| 相性%の計算、タイプ名の判定 | `js/diagnosis.js` |
| ドメイン、広告表記、GA4 ID、シェア先 | `js/config.js` |
| シェア先の追加（LINE等） | `js/common.js` の `SHARE_TARGETS` |

## 公開前チェックリスト

- [ ] `js/apps.js` の料金・機能・安全性を各公式サイトで確認して記入し、`infoCheckedAt` に確認日を入れる
- [ ] ASPで提携承認後、`js/affiliate.js` の `url` にアフィリエイトURLを貼る（空欄の間は公式サイト・ストアに直接リンク）
- [ ] `https://example.com` を本番ドメインに一括置換（HTML の canonical/OGP、sitemap.xml、robots.txt、js/config.js）
- [ ] 運営者情報・プライバシーポリシーのページを追加（ASPの審査で求められることが多い）
- [ ] 必要なら `js/config.js` に GA4 の測定IDを設定

## ローカル確認

```
python3 -m http.server 8000
# http://localhost:8000/ を開く（index.html を直接ダブルクリックでも動作します）
```
