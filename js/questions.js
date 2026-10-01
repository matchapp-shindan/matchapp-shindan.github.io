/**
 * 診断の質問と配点
 * ------------------------------------------------------------
 * ■ 構造
 *   id       : 質問ID（結果URLには回答の「順番」だけが入るため、質問の並び替え・追加をすると
 *              既存のシェアURLの結果が変わる点に注意）
 *   text     : 質問文
 *   options  : 選択肢
 *     label  : 選択肢の文言
 *     trait  : 結果の「おすすめ理由」に使う短いフレーズ（「〜」という回答から、の形で表示）
 *     scores : アプリIDごとの加算点（書いていないアプリは0点）
 *
 * ■ 配点の考え方（初期ロジック・仮説）
 *   各アプリの一般的な位置づけ（真剣度・気軽さ・会員規模・価値観重視・スピード・対象年代・再婚）に
 *   沿って 0〜4 点で設定しています。
 *   ※ 選択肢を追加するときは末尾に足してください（途中に挿入すると既存のシェアURLの結果が変わります）。実際のユーザー反応を見ながら調整してください。
 *
 * ■ 将来の拡張（男女別・年代別・恋活/婚活別）
 *   別の配列（例: QUESTIONS_KONKATSU）を用意し、shindan.html?type=konkatsu のように
 *   切り替える想定です。js/page-shindan.js の getQuestionSet() を参照。
 */
window.QUESTIONS = [
  {
    id: 'purpose',
    text: 'マッチングアプリを使う目的は？',
    options: [
      { label: '真剣に恋人を探したい', trait: '真剣に恋人を探したい', scores: { pairs: 3, with: 3, omiai: 2, tapple: 1, tinder: 0, bachelor: 3, marrish: 1, bridalnet: 1, youbride: 1, match: 2 } },
      { label: '気軽に恋人を探したい', trait: '気軽に恋人を探したい', scores: { pairs: 1, with: 1, omiai: 0, tapple: 3, tinder: 2, bachelor: 1, marrish: 1, bridalnet: 0, youbride: 0, match: 1 } },
      { label: '結婚相手を探したい', trait: '結婚相手を探したい', scores: { pairs: 2, with: 0, omiai: 4, tapple: 0, tinder: 0, bachelor: 2, marrish: 2, bridalnet: 4, youbride: 3, match: 2 } },
      { label: 'まずは友達・気軽な出会いから始めたい', trait: 'まずは気軽な出会いから', scores: { pairs: 0, with: 1, omiai: 0, tapple: 3, tinder: 4, bachelor: 0, marrish: 0, bridalnet: 0, youbride: 0, match: 0 } },
      // 選択肢は末尾に追加（既存のシェアURLの回答番号がずれないように）
      { label: '再婚相手を探したい（子育て中の方も）', trait: '再婚相手を探したい', scores: { pairs: 1, with: 0, omiai: 2, tapple: 0, tinder: 0, bachelor: 0, marrish: 4, bridalnet: 2, youbride: 3, match: 1 } },
    ],
  },
  {
    id: 'age',
    text: 'あなたの年代は？',
    options: [
      { label: '20代前半', trait: '20代前半', scores: { pairs: 1, with: 3, omiai: 0, tapple: 3, tinder: 2, bachelor: 1, marrish: 0, bridalnet: 0, youbride: 0, match: 0 } },
      { label: '20代後半', trait: '20代後半', scores: { pairs: 2, with: 3, omiai: 1, tapple: 2, tinder: 1, bachelor: 3, marrish: 1, bridalnet: 1, youbride: 1, match: 1 } },
      { label: '30代', trait: '30代', scores: { pairs: 3, with: 1, omiai: 3, tapple: 0, tinder: 1, bachelor: 3, marrish: 3, bridalnet: 3, youbride: 3, match: 2 } },
      { label: '40代', trait: '40代', scores: { pairs: 3, with: 0, omiai: 3, tapple: 0, tinder: 0, bachelor: 1, marrish: 3, bridalnet: 3, youbride: 3, match: 3 } },
      { label: '50代以上', trait: '50代以上', scores: { pairs: 2, with: 0, omiai: 3, tapple: 0, tinder: 0, bachelor: 0, marrish: 2, bridalnet: 2, youbride: 2, match: 2 } },
    ],
  },
  {
    id: 'seek',
    text: '相手に求めるものは？',
    options: [
      { label: '価値観', trait: '価値観を重視', scores: { pairs: 1, with: 4, omiai: 1, tapple: 0, tinder: 0, bachelor: 0, marrish: 1, bridalnet: 1, youbride: 1, match: 1 } },
      { label: '趣味', trait: '趣味の合う相手がいい', scores: { pairs: 3, with: 1, omiai: 0, tapple: 3, tinder: 1, bachelor: 0, marrish: 0, bridalnet: 0, youbride: 0, match: 1 } },
      { label: '外見', trait: '見た目の好みも大事', scores: { pairs: 1, with: 0, omiai: 0, tapple: 2, tinder: 3, bachelor: 3, marrish: 0, bridalnet: 0, youbride: 0, match: 0 } },
      { label: '真剣度', trait: '相手の真剣度を重視', scores: { pairs: 2, with: 1, omiai: 3, tapple: 0, tinder: 0, bachelor: 2, marrish: 2, bridalnet: 3, youbride: 3, match: 2 } },
      { label: '安定性', trait: '安定した相手がいい', scores: { pairs: 1, with: 0, omiai: 3, tapple: 0, tinder: 0, bachelor: 2, marrish: 2, bridalnet: 3, youbride: 2, match: 1 } },
    ],
  },
  {
    id: 'message',
    text: 'メッセージのやり取りは？',
    options: [
      { label: 'たくさんしたい', trait: 'メッセージをたくさんしたい', scores: { pairs: 1, with: 3, omiai: 1, tapple: 0, tinder: 0, bachelor: 0, marrish: 2, bridalnet: 1, youbride: 1, match: 1 } },
      { label: '普通', trait: 'メッセージは普通くらい', scores: { pairs: 2, with: 1, omiai: 2, tapple: 1, tinder: 0, bachelor: 1, marrish: 1, bridalnet: 2, youbride: 1, match: 2 } },
      { label: '最低限で早く会いたい', trait: 'メッセージは最低限で早く会いたい', scores: { pairs: 0, with: 0, omiai: 0, tapple: 3, tinder: 3, bachelor: 4, marrish: 0, bridalnet: 0, youbride: 0, match: 0 } },
    ],
  },
  {
    id: 'meet',
    text: '実際に会うまでの期間は？',
    options: [
      { label: 'じっくりやり取りしたい', trait: '会う前にじっくり知りたい', scores: { pairs: 1, with: 3, omiai: 2, tapple: 0, tinder: 0, bachelor: 0, marrish: 2, bridalnet: 3, youbride: 3, match: 2 } },
      { label: '1〜2週間程度', trait: '1〜2週間で会いたい', scores: { pairs: 2, with: 1, omiai: 1, tapple: 2, tinder: 1, bachelor: 1, marrish: 1, bridalnet: 1, youbride: 1, match: 1 } },
      { label: 'できるだけ早く会いたい', trait: 'できるだけ早く会いたい', scores: { pairs: 0, with: 0, omiai: 0, tapple: 3, tinder: 4, bachelor: 4, marrish: 0, bridalnet: 0, youbride: 0, match: 0 } },
    ],
  },
  {
    id: 'experience',
    text: 'マッチングアプリの利用経験は？',
    options: [
      { label: '初めて', trait: 'アプリは初めて', scores: { pairs: 3, with: 2, omiai: 1, tapple: 2, tinder: 0, bachelor: 2, marrish: 1, bridalnet: 1, youbride: 1, match: 0 } },
      { label: '少し使ったことがある', trait: 'アプリを少し使ったことがある', scores: { pairs: 2, with: 2, omiai: 2, tapple: 1, tinder: 1, bachelor: 1, marrish: 1, bridalnet: 1, youbride: 1, match: 1 } },
      { label: '何度も使っている', trait: 'アプリに慣れている', scores: { pairs: 1, with: 1, omiai: 2, tapple: 1, tinder: 2, bachelor: 2, marrish: 1, bridalnet: 1, youbride: 1, match: 2 } },
    ],
  },
  {
    id: 'priority',
    text: 'アプリを選ぶときに重視するものは？',
    options: [
      { label: '会員数', trait: '会員数を重視', scores: { pairs: 4, with: 1, omiai: 0, tapple: 1, tinder: 2, bachelor: 0, marrish: 1, bridalnet: 0, youbride: 1, match: 1 } },
      { label: '安全性', trait: '安全性を重視', scores: { pairs: 2, with: 1, omiai: 3, tapple: 0, tinder: 0, bachelor: 2, marrish: 1, bridalnet: 3, youbride: 2, match: 1 } },
      { label: '料金', trait: '料金を重視', scores: { pairs: 1, with: 1, omiai: 1, tapple: 1, tinder: 1, bachelor: 0, marrish: 2, bridalnet: 1, youbride: 1, match: 1 } },
      { label: '価値観の相性', trait: '価値観の相性を重視', scores: { pairs: 1, with: 4, omiai: 1, tapple: 0, tinder: 0, bachelor: 0, marrish: 1, bridalnet: 1, youbride: 1, match: 1 } },
      { label: '出会いやすさ', trait: '出会いやすさを重視', scores: { pairs: 2, with: 0, omiai: 0, tapple: 3, tinder: 3, bachelor: 4, marrish: 1, bridalnet: 0, youbride: 0, match: 1 } },
    ],
  },
  {
    id: 'partnerAge',
    text: '相手に求める年齢は？',
    options: [
      { label: '同年代', trait: '同年代がいい', scores: { pairs: 2, with: 2, omiai: 1, tapple: 2, tinder: 1, bachelor: 1, marrish: 1, bridalnet: 1, youbride: 1, match: 1 } },
      { label: '年上', trait: '年上がいい', scores: { pairs: 2, with: 1, omiai: 2, tapple: 1, tinder: 1, bachelor: 1, marrish: 1, bridalnet: 1, youbride: 1, match: 1 } },
      { label: '年下', trait: '年下がいい', scores: { pairs: 2, with: 1, omiai: 2, tapple: 1, tinder: 1, bachelor: 1, marrish: 1, bridalnet: 1, youbride: 1, match: 1 } },
      { label: '特にこだわらない', trait: '年齢にこだわらない', scores: { pairs: 2, with: 1, omiai: 1, tapple: 1, tinder: 2, bachelor: 1, marrish: 1, bridalnet: 1, youbride: 1, match: 1 } },
    ],
  },
  {
    id: 'stance',
    text: '恋愛に対する現在のスタンスは？',
    options: [
      { label: '真剣', trait: '恋愛に真剣', scores: { pairs: 3, with: 2, omiai: 3, tapple: 0, tinder: 0, bachelor: 2, marrish: 1, bridalnet: 2, youbride: 2, match: 2 } },
      { label: 'まずは気軽に', trait: 'まずは気軽に', scores: { pairs: 0, with: 1, omiai: 0, tapple: 3, tinder: 4, bachelor: 1, marrish: 0, bridalnet: 0, youbride: 0, match: 0 } },
      { label: '良い人がいれば', trait: '良い人がいれば', scores: { pairs: 2, with: 2, omiai: 1, tapple: 2, tinder: 1, bachelor: 1, marrish: 2, bridalnet: 1, youbride: 1, match: 1 } },
      { label: '結婚を前提にしたい', trait: '結婚を前提にしたい', scores: { pairs: 2, with: 0, omiai: 4, tapple: 0, tinder: 0, bachelor: 1, marrish: 2, bridalnet: 4, youbride: 3, match: 2 } },
    ],
  },
  {
    id: 'personality',
    text: 'あなたの性格に近いものは？',
    options: [
      { label: '慎重', trait: '慎重な性格', scores: { pairs: 1, with: 2, omiai: 3, tapple: 0, tinder: 0, bachelor: 0, marrish: 1, bridalnet: 3, youbride: 2, match: 1 } },
      { label: '積極的', trait: '積極的な性格', scores: { pairs: 2, with: 0, omiai: 1, tapple: 2, tinder: 3, bachelor: 3, marrish: 1, bridalnet: 0, youbride: 0, match: 2 } },
      { label: 'マイペース', trait: 'マイペースな性格', scores: { pairs: 2, with: 2, omiai: 1, tapple: 1, tinder: 1, bachelor: 1, marrish: 2, bridalnet: 1, youbride: 2, match: 1 } },
      { label: '人と話すのが好き', trait: '人と話すのが好き', scores: { pairs: 1, with: 3, omiai: 0, tapple: 2, tinder: 1, bachelor: 0, marrish: 2, bridalnet: 0, youbride: 1, match: 1 } },
      { label: '価値観を重視する', trait: '価値観を大切にする', scores: { pairs: 1, with: 4, omiai: 1, tapple: 0, tinder: 0, bachelor: 0, marrish: 1, bridalnet: 1, youbride: 1, match: 1 } },
    ],
  },
];
