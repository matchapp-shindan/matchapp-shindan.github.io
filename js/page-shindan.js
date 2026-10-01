/**
 * 診断ページ（shindan.html）の画面制御
 * 1画面1問・進捗バー・戻る・ブラウザの戻る操作にも対応
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'matchapp_shindan_answers';
  var ADVANCE_DELAY_MS = 220; // 選択後に次の質問へ進むまでの間（選択状態を目で確認できる程度）

  // 将来：?type=konkatsu などで質問セットを切り替える場合はここで分岐
  function getQuestionSet() {
    return window.QUESTIONS;
  }

  var questions = getQuestionSet();
  var total = questions.length;
  // ?new=1 で開いたら最初から（トップの「無料で診断する」「もう一度診断する」）
  if (/[?&]new=1/.test(location.search)) {
    try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) { /* noop */ }
  }
  var answers = loadAnswers();
  var index = 0;
  var locked = false;

  var el = {
    count: document.getElementById('q-count'),
    bar: document.getElementById('q-bar'),
    progress: document.getElementById('q-progress'),
    num: document.getElementById('q-num'),
    text: document.getElementById('q-text'),
    options: document.getElementById('q-options'),
    back: document.getElementById('q-back'),
    card: document.getElementById('q-card'),
  };

  function loadAnswers() {
    try {
      var saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
      if (Array.isArray(saved) && saved.length === total) return saved;
    } catch (e) { /* ストレージ不可の環境では保存しない */ }
    return new Array(total).fill(null);
  }
  function saveAnswers() {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers)); } catch (e) { /* noop */ }
  }

  function render() {
    var q = questions[index];
    var pct = Math.round(((index + 1) / total) * 100);
    el.count.textContent = '質問 ' + (index + 1) + ' / ' + total;
    el.bar.style.width = pct + '%';
    el.progress.setAttribute('aria-valuenow', String(index + 1));
    el.num.textContent = 'Q' + (index + 1);
    el.text.textContent = q.text;
    el.back.textContent = index === 0 ? 'トップへ戻る' : '前の質問に戻る';

    el.options.innerHTML = '';
    q.options.forEach(function (opt, oi) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option';
      btn.setAttribute('aria-pressed', answers[index] === oi ? 'true' : 'false');
      btn.textContent = opt.label;
      btn.addEventListener('click', function () { choose(oi, btn); });
      el.options.appendChild(btn);
    });

    // 切り替わりが分かるよう軽くフェード（過剰にしない）
    el.card.classList.remove('is-enter');
    void el.card.offsetWidth;
    el.card.classList.add('is-enter');
    el.text.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  function choose(oi, btn) {
    if (locked) return;
    locked = true;
    answers[index] = oi;
    saveAnswers();
    var all = el.options.querySelectorAll('.option');
    for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-pressed', 'true');
    window.Site.Analytics.track('diagnosis_answer', { question_id: questions[index].id, option_index: oi });

    setTimeout(function () {
      locked = false;
      if (index < total - 1) {
        index++;
        history.pushState({ q: index }, '', '#q' + (index + 1));
        render();
      } else {
        finish();
      }
    }, ADVANCE_DELAY_MS);
  }

  function finish() {
    // 未回答が残っていれば（戻る操作で飛ばした等）そこへ移動
    var missing = answers.indexOf(null);
    if (missing !== -1) {
      index = missing;
      history.replaceState({ q: index }, '', '#q' + (index + 1));
      render();
      return;
    }
    window.Site.Analytics.track('diagnosis_complete', {});
    location.href = 'result.html?a=' + window.Diagnosis.encodeAnswers(answers);
  }

  el.back.addEventListener('click', function () {
    if (index === 0) {
      location.href = 'index.html';
    } else {
      history.back(); // popstate で1問戻る
    }
  });

  window.addEventListener('popstate', function (e) {
    var q = e.state && typeof e.state.q === 'number' ? e.state.q : 0;
    index = Math.max(0, Math.min(q, total - 1));
    locked = false;
    render();
  });

  // 初期表示：途中まで回答済みなら続きから（リロード・結果ページからの戻り対策）
  var firstUnanswered = answers.indexOf(null);
  index = firstUnanswered === -1 ? total - 1 : firstUnanswered;
  // 履歴を「1問目〜現在」まで積み直し、ブラウザの戻るで1問ずつ戻れるようにする
  history.replaceState({ q: 0 }, '', location.pathname + '#q1');
  for (var i = 1; i <= index; i++) history.pushState({ q: i }, '', '#q' + (i + 1));
  if (index === 0) window.Site.Analytics.track('diagnosis_start', {});
  render();
})();
