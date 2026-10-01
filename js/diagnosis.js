/**
 * 診断ロジック
 * ------------------------------------------------------------
 * 方針：診断結果は「ユーザーの回答」だけで決まります。
 *       アフィリエイト報酬額・ASP・広告枠などの情報はこのファイルでは一切参照しません。
 *
 * 計算手順
 *   1. 各回答の選択肢 scores をアプリごとに合計（生スコア）
 *   2. アプリごとに「取り得る最小〜最大スコア」の範囲で達成率(0〜1)を出す
 *      達成率 = (合計 - 最小) / (最大 - 最小)
 *      → 配点の多いアプリや、どの選択肢でも点が入るアプリが有利にならないよう正規化
 *   3. 達成率の高い順に並べる（同率なら生スコア → apps.js の並び順）
 *   4. 表示用の相性% = PERCENT_MIN + 達成率 × (PERCENT_MAX - PERCENT_MIN)
 */
(function () {
  'use strict';

  var CONFIG = {
    PERCENT_MIN: 55, // 相性%の下限（表示用）
    PERCENT_MAX: 98, // 相性%の上限（表示用）
    TOP_N: 3, // 表示するおすすめ件数
    REASON_MIN_POINT: 2, // 理由文に採用する回答の最低加算点
    REASON_COUNT: 2, // 理由文に入れる回答の数
  };

  // 「あなたは〇〇タイプ」の判定（シェア用）。上から順に最初に一致したものを採用。
  // when: { 質問id: [選択肢index, ...] }
  var TYPE_RULES = [
    { when: { purpose: [4] }, name: '新しい一歩を踏み出す再婚活タイプ' },
    { when: { purpose: [2] }, name: '将来を見据えた婚活タイプ' },
    { when: { stance: [3] }, name: '将来を見据えた婚活タイプ' },
    { when: { purpose: [0], seek: [0] }, name: '価値観重視の真剣恋活タイプ' },
    { when: { purpose: [0] }, name: 'じっくり真剣恋活タイプ' },
    { when: { purpose: [3] }, name: 'まずは気軽に出会いタイプ' },
    { when: { meet: [2] }, name: 'フットワーク軽めの行動派タイプ' },
    { when: { message: [2] }, name: 'まず会って確かめたい効率派タイプ' },
    { when: {}, name: '自然体で楽しむ恋活タイプ' },
  ];

  function scoreOf(option, appId) {
    return (option.scores && option.scores[appId]) || 0;
  }

  /** 回答配列 → URL用文字列（例: "0.2.1.0.1.0.3.2.0.4"） */
  function encodeAnswers(answers) {
    return answers.join('.');
  }

  /** URL用文字列 → 回答配列。不正な場合は null */
  function decodeAnswers(str, questions) {
    if (!str || typeof str !== 'string') return null;
    var parts = str.split('.');
    if (parts.length !== questions.length) return null;
    var answers = [];
    for (var i = 0; i < parts.length; i++) {
      if (!/^\d+$/.test(parts[i])) return null;
      var n = parseInt(parts[i], 10);
      if (n < 0 || n >= questions[i].options.length) return null;
      answers.push(n);
    }
    return answers;
  }

  function detectType(answers, questions) {
    var byId = {};
    questions.forEach(function (q, i) { byId[q.id] = answers[i]; });
    for (var r = 0; r < TYPE_RULES.length; r++) {
      var rule = TYPE_RULES[r];
      var ok = Object.keys(rule.when).every(function (qid) {
        return rule.when[qid].indexOf(byId[qid]) !== -1;
      });
      if (ok) return rule.name;
    }
    return '';
  }

  /**
   * 診断を実行
   * @returns {{ type: string, ranking: Array }}
   */
  function diagnose(answers, questions, apps) {
    var ranking = apps.map(function (app, order) {
      var score = 0;
      var max = 0;
      var min = 0;
      var contributions = [];
      questions.forEach(function (q, qi) {
        var qMax = -Infinity;
        var qMin = Infinity;
        q.options.forEach(function (o) {
          qMax = Math.max(qMax, scoreOf(o, app.id));
          qMin = Math.min(qMin, scoreOf(o, app.id));
        });
        max += qMax;
        min += qMin;
        var opt = q.options[answers[qi]];
        var pt = scoreOf(opt, app.id);
        score += pt;
        if (pt >= CONFIG.REASON_MIN_POINT) contributions.push({ trait: opt.trait, point: pt, qi: qi });
      });
      var ratio = max > min ? (score - min) / (max - min) : 0;
      contributions.sort(function (a, b) { return b.point - a.point || a.qi - b.qi; });
      var traits = contributions.slice(0, CONFIG.REASON_COUNT).map(function (c) { return c.trait; });
      var percent = Math.round(CONFIG.PERCENT_MIN + ratio * (CONFIG.PERCENT_MAX - CONFIG.PERCENT_MIN));
      var reason = traits.length
        ? traits.map(function (t) { return '「' + t + '」'; }).join('') + 'という回答から、' + app.fitMessage
        : app.fitMessage;
      return { app: app, order: order, score: score, min: min, max: max, ratio: ratio, percent: percent, traits: traits, reason: reason };
    });

    ranking.sort(function (a, b) {
      return b.ratio - a.ratio || b.score - a.score || a.order - b.order;
    });

    return { type: detectType(answers, questions), ranking: ranking };
  }

  window.Diagnosis = {
    CONFIG: CONFIG,
    TYPE_RULES: TYPE_RULES,
    encodeAnswers: encodeAnswers,
    decodeAnswers: decodeAnswers,
    diagnose: diagnose,
  };
})();
