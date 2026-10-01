/**
 * マッチングアプリ情報
 * ------------------------------------------------------------
 * ■ アプリを追加する手順
 *   1. 下の配列にオブジェクトを1つ追加（id は半角英小文字）
 *   2. js/affiliate.js に同じ id でリンクを追加（未提携なら url は空のままでOK）
 *   3. js/questions.js の各選択肢 scores に同じ id の点数を追加（未設定は0点扱い）
 *   4. apps/pairs.html をコピーして apps/<id>.html を作成し、data-app-id・title・description を変更
 *   5. sitemap.xml に URL を追加、各HTMLのフッターのアプリ一覧にリンクを追加
 *
 * ■ links（公式サイト・ストア）
 *   アフィリエイトURL（js/affiliate.js）が空のときは、ここの公式URL・ストアURLに直接リンクします。
 *   ストアURLは App Store / Google Play の公式アプリページです（2026-10-01 確認）。
 *
 * ■ 公開前チェック（重要）
 *   料金・機能・安全対策は各社で頻繁に変わります。
 *   pricing.items[].value は空欄にしてあり、空欄のときは
 *   「最新の料金は公式サイトでご確認ください」と表示されます。
 *   公式サイトで確認した値を入力し、infoCheckedAt に確認日を記入してください。
 *   features / safety の記述も公開前に必ず公式情報と照合してください。
 *
 * ※ 本サイトは各社の公式サイトではありません。ロゴ画像は使用せず、頭文字バッジで表示しています。
 */
window.APPS = [
  {
    id: 'pairs',
    name: 'Pairs',
    kana: 'ペアーズ',
    color: '#3B7DD8',
    // 公式サイト・ストアのURL（アフィリエイト未設定時のリンク先）
    links: {
      official: 'https://www.pairs.lv/',
      appStore: 'https://apps.apple.com/jp/app/id583376064',
      googlePlay: 'https://play.google.com/store/apps/details?id=jp.eure.android.pairs',
    },
    catchCopy: '会員の多さと検索のしやすさで、真剣な恋活を幅広く。',
    shortFeatures: ['会員数重視', '趣味コミュニティ', '幅広い年代'],
    // 診断結果の理由文の締めに使う
    fitMessage: '会員数が多く条件や趣味から相手を探しやすいPairsとの相性が高いです。',
    targets: [
      '初めてマッチングアプリを使う人',
      '真剣に恋人を探したい20〜40代',
      '共通の趣味から話のきっかけを作りたい人',
    ],
    features: [
      { title: '趣味・価値観のコミュニティ', text: '共通の趣味や価値観のグループから相手を探せるため、会話のきっかけを作りやすい仕組みです。' },
      { title: '細かな検索条件', text: '居住地・年齢などの条件で相手を絞り込めます。' },
      { title: '恋活から婚活まで', text: '真剣な恋人探しを中心に、将来を見据えた出会いにも使われています。' },
    ],
    pricing: {
      items: [
        { label: '登録', value: '' },
        { label: '男性 有料プラン', value: '' },
        { label: '女性', value: '' },
      ],
      note: '料金はプラン・支払い方法・期間によって異なります。',
    },
    safety: [
      '公的証明書による年齢確認（18歳以上）が必要です。',
      '通報・ブロック機能があります。',
    ],
    points: [
      '迷ったらまず候補に入れたい、利用者の多い定番アプリ',
      '趣味をきっかけに自然に会話を始めやすい',
    ],
    infoCheckedAt: '', // 例: '2026-10-01'
  },
  {
    id: 'with',
    name: 'with',
    kana: 'ウィズ',
    color: '#E0738A',
    // 公式サイト・ストアのURL（アフィリエイト未設定時のリンク先）
    links: {
      official: 'https://with.is/',
      appStore: 'https://apps.apple.com/jp/app/id1080235090',
      googlePlay: 'https://play.google.com/store/apps/details?id=is.with',
    },
    catchCopy: '性格や価値観の相性から、話の合う相手に出会う。',
    shortFeatures: ['価値観マッチ', '診断コンテンツ', '20代に人気'],
    fitMessage: '性格や価値観の相性を重視して相手を探せるwithとの相性が高いです。',
    targets: [
      '見た目より中身・価値観を大事にしたい人',
      'メッセージでじっくり仲を深めたい人',
      '20代〜30代前半で恋人を探している人',
    ],
    features: [
      { title: '性格・価値観の診断', text: '診断コンテンツの結果をもとに、相性の良い相手を見つけやすくなっています。' },
      { title: '共通点が見えるプロフィール', text: '好みや価値観の共通点が分かり、最初のメッセージを送りやすい設計です。' },
      { title: 'じっくり型のやり取り', text: '会う前に人となりを知りたい人に向いています。' },
    ],
    pricing: {
      items: [
        { label: '登録', value: '' },
        { label: '男性 有料プラン', value: '' },
        { label: '女性', value: '' },
      ],
      note: '料金はプラン・支払い方法・期間によって異なります。',
    },
    safety: [
      '公的証明書による年齢確認（18歳以上）が必要です。',
      '通報・ブロック機能があります。',
    ],
    points: [
      '価値観の合う相手と会話が続きやすい',
      '初対面前に相手の人柄をつかみやすい',
    ],
    infoCheckedAt: '',
  },
  {
    id: 'omiai',
    name: 'Omiai',
    kana: 'オミアイ',
    color: '#2E9E8F',
    // 公式サイト・ストアのURL（アフィリエイト未設定時のリンク先）
    links: {
      official: 'https://omiai-jp.com/',
      appStore: 'https://apps.apple.com/jp/app/id582566462',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.omiai_jp',
    },
    catchCopy: '真剣度の高い出会いを、落ち着いた環境で。',
    shortFeatures: ['真剣度重視', '婚活にも', '30代以上にも'],
    fitMessage: '真剣な出会いや結婚を見据えた相手探しに向くOmiaiとの相性が高いです。',
    targets: [
      '結婚を視野に入れて恋人を探したい人',
      '30代以上で落ち着いた出会いを求める人',
      '安全性や相手の真剣度を重視する人',
    ],
    features: [
      { title: '真剣な出会い向け', text: '恋活〜婚活の真剣な出会いを求める利用者が中心とされています。' },
      { title: '落ち着いた年齢層', text: '20代後半〜30代以上の利用者にも選ばれています。' },
      { title: '安心して使える環境づくり', text: 'マナー違反への対策など、安心して使える環境に力を入れています。' },
    ],
    pricing: {
      items: [
        { label: '登録', value: '' },
        { label: '男性 有料プラン', value: '' },
        { label: '女性', value: '' },
      ],
      note: '料金はプラン・支払い方法・期間によって異なります。',
    },
    safety: [
      '公的証明書による年齢確認（18歳以上）が必要です。',
      '通報・ブロック機能があります。',
    ],
    points: [
      '将来を考えられる相手を探したい人に',
      '遊び目的を避けたい人に向いている',
    ],
    infoCheckedAt: '',
  },
  {
    id: 'tapple',
    name: 'tapple',
    kana: 'タップル',
    color: '#F08A3C',
    // 公式サイト・ストアのURL（アフィリエイト未設定時のリンク先）
    links: {
      official: 'https://tapple.me/',
      appStore: 'https://apps.apple.com/jp/app/id852801905',
      googlePlay: 'https://play.google.com/store/apps/details?id=jp.co.matchingagent.cocotsure',
    },
    catchCopy: '好きなことをきっかけに、気軽に会える出会いを。',
    shortFeatures: ['趣味でつながる', '気軽な出会い', '早く会いたい人に'],
    fitMessage: '趣味をきっかけに気軽に会いやすいtappleとの相性が高いです。',
    targets: [
      'まずは気軽に恋人を探したい人',
      'メッセージより会って話したい人',
      '20代で趣味の合う相手を探したい人',
    ],
    features: [
      { title: '趣味からつながる', text: '好きなことを入口に相手を探せるため、共通の話題が見つけやすい仕組みです。' },
      { title: '会うまでがスムーズ', text: '長いやり取りより、早めに会って相性を確かめたい人に向いています。' },
      { title: '直感的な操作', text: 'シンプルな操作で気軽に使い始められます。' },
    ],
    pricing: {
      items: [
        { label: '登録', value: '' },
        { label: '男性 有料プラン', value: '' },
        { label: '女性', value: '' },
      ],
      note: '料金はプラン・支払い方法・期間によって異なります。',
    },
    safety: [
      '公的証明書による年齢確認（18歳以上）が必要です。',
      '通報・ブロック機能があります。',
    ],
    points: [
      '気負わず恋活を始めたい人に',
      '共通の趣味があるので初デートの話題に困りにくい',
    ],
    infoCheckedAt: '',
  },
  {
    id: 'tinder',
    name: 'Tinder',
    kana: 'ティンダー',
    color: '#E4526A',
    // 公式サイト・ストアのURL（アフィリエイト未設定時のリンク先）
    links: {
      official: 'https://tinder.com/ja',
      appStore: 'https://apps.apple.com/jp/app/id547702041',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.tinder',
    },
    catchCopy: 'スワイプで直感的に。まずは気軽な出会いから。',
    shortFeatures: ['スワイプ操作', '気軽な出会い', 'スピード重視'],
    fitMessage: '直感的な操作でテンポよく出会いを探せるTinderとの相性が高いです。',
    targets: [
      '友達探し・気軽な出会いから始めたい人',
      'テンポよく多くの人と出会いたい人',
      '積極的に自分から動ける人',
    ],
    features: [
      { title: 'スワイプで直感的に', text: '写真とプロフィールを見て、左右のスワイプで気軽に意思表示できます。' },
      { title: 'スピード感のある出会い', text: 'マッチングから会うまでを早めに進めたい人に向いています。' },
      { title: '気軽に始めやすい', text: '友達探しを含め、ライトな出会いを求める利用者が多いとされています。' },
    ],
    pricing: {
      items: [
        { label: '登録', value: '' },
        { label: '有料プラン', value: '' },
      ],
      note: '料金はプラン・支払い方法・期間によって異なります。',
    },
    safety: [
      '日本国内の利用では年齢確認が求められます。',
      '通報・ブロック機能があります。',
    ],
    points: [
      '真剣さより「まず会ってみたい」人に',
      '結婚目的の場合は他のアプリも併用がおすすめ',
    ],
    infoCheckedAt: '',
  },

  /* ===== ここから追加アプリ（2026-10 追加）=====
   * 特徴は各公式サイトの記載（2026-10-01 確認）をもとに要約しています。 */
  {
    id: 'bachelor',
    name: 'バチェラーデート',
    kana: 'Bachelor Date',
    color: '#2F3A56',
    links: {
      official: 'https://bachelorapp.net/',
      appStore: 'https://apps.apple.com/jp/app/id1583004685',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.bachelordate.bachelordate',
    },
    catchCopy: 'いいねもメッセージも不要。AIが選んだ相手とデートから始める。',
    shortFeatures: ['AIがデートを設定', 'メッセージ不要', 'すぐ会いたい人に'],
    fitMessage: 'メッセージなしでAIがデートを組んでくれるバチェラーデートとの相性が高いです。',
    targets: [
      '仕事が忙しく、メッセージに時間をかけられない人',
      'やり取りより実際に会って相性を確かめたい人',
      '相手探しを効率よく進めたい人',
    ],
    features: [
      { title: 'AIがデート相手を選ぶ', text: '好みに合う相手をAIが選び、デートを設定してくれる仕組みです。自分で検索する必要がありません。' },
      { title: 'いいね・メッセージ不要', text: 'マッチング後の長いやり取りなしで、デートから関係を始められます。' },
      { title: '審査制', text: '入会時に審査がある仕組みです。' },
    ],
    pricing: {
      items: [
        { label: '料金プラン', value: '' },
        { label: '初回のお試し', value: '' },
      ],
      note: '公式サイトでは、デートが成立しなかった場合の保証制度や、初回のお試しについて案内されています。条件は必ず公式サイトでご確認ください。',
    },
    safety: [
      '公的証明書による年齢確認（18歳以上）が必要です。',
      '入会時の審査があります。',
    ],
    points: [
      'メッセージが苦手な人でも会うところまで進めやすい',
      '日程調整などの手間を減らしたい人に',
    ],
    infoCheckedAt: '2026-10-01',
  },
  {
    id: 'marrish',
    name: 'マリッシュ',
    kana: 'marrish',
    color: '#E8839A',
    links: {
      official: 'https://marrish.com/',
      appStore: 'https://apps.apple.com/jp/app/id1211526840',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.marrish.app',
    },
    catchCopy: '再婚・シングルの人にもやさしい、婚活・恋活アプリ。',
    shortFeatures: ['再婚活に強い', 'シングル親を応援', 'ビデオ通話'],
    fitMessage: '再婚やシングルマザー・シングルファーザーの婚活を応援しているマリッシュとの相性が高いです。',
    targets: [
      '再婚を考えている人',
      'シングルマザー・シングルファーザーの人',
      '落ち着いた相手と真剣に出会いたい30代以上の人',
    ],
    features: [
      { title: 'リボンマーク', text: 'シングルマザー・シングルファーザーや、その理解者であることをプロフィールで示せる仕組みがあります。' },
      { title: 'ビデオ通話機能', text: '連絡先を交換しなくても、アプリ内でビデオ通話ができます。' },
      { title: '恋活・婚活・再婚活', text: '初婚・再婚を問わず、真剣な出会いを探せます。' },
    ],
    pricing: {
      items: [
        { label: '女性', value: '' },
        { label: '男性 有料プラン', value: '' },
      ],
      note: '料金はプラン・支払い方法・期間によって異なります。',
    },
    safety: [
      '公的証明書による年齢確認（18歳以上）が必要です。',
      '通報・ブロック機能があります。',
    ],
    points: [
      '再婚や子育て中であることを気兼ねなく伝えられる',
      '会う前にビデオ通話で雰囲気を確かめられる',
    ],
    infoCheckedAt: '2026-10-01',
  },
  {
    id: 'bridalnet',
    name: 'ブライダルネット',
    kana: 'Bridal Net',
    color: '#4E7FA8',
    links: {
      official: 'https://www.bridalnet.co.jp/',
      appStore: 'https://apps.apple.com/jp/app/id998420409',
      googlePlay: 'https://play.google.com/store/apps/details?id=jp.co.bridalnet',
    },
    catchCopy: '結婚に向けて、まじめに相手を探す婚活アプリ。',
    shortFeatures: ['婚活特化', '本人確認必須', '日記・紹介機能'],
    fitMessage: '結婚を真剣に考える人が集まる婚活特化のブライダルネットとの相性が高いです。',
    targets: [
      '結婚を前提に相手を探したい人',
      '遊び目的の相手を避けたい人',
      'プロフィールや日記で人柄を知ってから会いたい人',
    ],
    features: [
      { title: '婚活に特化', text: '結婚を真剣に考える独身者向けのサービスです（公式サイトでは20歳以上の独身者が対象とされています）。' },
      { title: '複数の出会い方', text: 'プロフィール検索のほか、日記機能や紹介機能など、いくつかの方法で相手を探せます。' },
      { title: '安心への取り組み', text: '本人確認が必須で、実名は公開されません。' },
    ],
    pricing: {
      items: [
        { label: '料金プラン', value: '' },
      ],
      note: '料金はプラン・支払い方法・期間によって異なります。',
    },
    safety: [
      '本人確認が必須です。',
      '実名は他の会員に公開されません。',
      '悪質なユーザーへの対策を行っていると案内されています。',
    ],
    points: [
      '婚活に集中したい人に向いている',
      '日記から相手の人柄や価値観を知れる',
    ],
    infoCheckedAt: '2026-10-01',
  },
  {
    id: 'youbride',
    name: 'youbride',
    kana: 'ユーブライド',
    color: '#C2885A',
    links: {
      official: 'https://youbride.jp/',
      appStore: 'https://apps.apple.com/jp/app/id872476884',
      googlePlay: 'https://play.google.com/store/apps/details?id=jp.youbride.android',
    },
    catchCopy: '人生経験を重ねた大人の、真剣なパートナー探し。',
    shortFeatures: ['30〜40代中心', '真剣度が高い', '多様な結婚の形'],
    fitMessage: '大人世代が多く、それぞれが望むパートナーシップの形を探せるyoubrideとの相性が高いです。',
    targets: [
      '30代・40代で真剣にパートナーを探している人',
      '再婚や事実婚など、自分に合う形を考えたい人',
      '価値観をじっくり共有してから会いたい人',
    ],
    features: [
      { title: 'つぶやき・お題投稿', text: '日常の考えや大切にしていることを投稿でき、プロフィールだけでは分からない人柄が伝わります。' },
      { title: '大人世代が中心', text: '人生経験を重ねた世代の利用が多いと案内されています。' },
      { title: '多様なパートナーシップ', text: '法律婚・事実婚・再婚など、それぞれが望む形を探せます。' },
    ],
    pricing: {
      items: [
        { label: '料金プラン', value: '' },
      ],
      note: '料金はプラン・支払い方法・期間によって異なります。',
    },
    safety: [
      '公的証明書による年齢確認（18歳以上）が必要です。',
      '通報・ブロック機能があります。',
    ],
    points: [
      '落ち着いた大人同士で出会いたい人に',
      '価値観を投稿で伝え合える',
    ],
    infoCheckedAt: '2026-10-01',
  },
  {
    id: 'match',
    name: 'Match',
    kana: 'マッチ',
    color: '#5B4B9A',
    links: {
      official: 'https://jp.match.com/',
      appStore: 'https://apps.apple.com/jp/app/id305939712',
      googlePlay: 'https://play.google.com/store/apps/details?id=com.match.android.matchmobile',
    },
    catchCopy: '30代・40代の、長く一緒にいられる相手探し。',
    shortFeatures: ['30〜40代向け', '真剣な恋愛・婚活', '詳細な検索条件'],
    fitMessage: '30代・40代を中心に、長く付き合える相手探しを支えるMatchとの相性が高いです。',
    targets: [
      '30代・40代で真剣な恋愛や婚活をしたい人',
      '条件を細かく指定して相手を探したい人',
      '結婚を意識しつつ、まずは良い関係を築きたい人',
    ],
    features: [
      { title: '30代・40代向け', text: '公式サイトでは「30代40代のマッチングサービス」として案内されています。' },
      { title: '恋愛から婚活まで', text: '長く一緒にいられるパートナー探しから、結婚を意識した出会いまで対応しています。' },
      { title: '詳細な検索', text: '年齢や居住地など、細かな条件で相手を探せます。' },
    ],
    pricing: {
      items: [
        { label: '料金プラン', value: '' },
      ],
      note: '料金はプラン・支払い方法・期間によって異なります。',
    },
    safety: [
      '日本国内の利用では年齢確認が求められます。',
      '通報・ブロック機能があります。',
    ],
    points: [
      '同世代の大人と出会いたい人に',
      '条件を絞ってじっくり探せる',
    ],
    infoCheckedAt: '2026-10-01',
  },
];

/** id からアプリ情報を取得 */
window.getAppById = function (id) {
  return window.APPS.find(function (a) { return a.id === id; }) || null;
};
