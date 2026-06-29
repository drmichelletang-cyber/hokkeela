/* 醫學堂 MediLearn — interactions */
(function () {
  // Render Lucide icons
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }
  document.addEventListener('DOMContentLoaded', renderIcons);

  // Mobile nav toggle
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('[data-nav-toggle]');
    if (toggle) {
      const menu = document.getElementById('mobile-menu');
      if (menu) {
        const open = menu.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', String(open));
      }
    }
    const link = e.target.closest('#mobile-menu a');
    if (link) {
      const menu = document.getElementById('mobile-menu');
      if (menu) menu.classList.add('hidden');
    }
  });

  // Scroll reveal
  document.addEventListener('DOMContentLoaded', function () {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  });

  // Course / article filtering (used on courses page)
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    const cat = btn.getAttribute('data-filter');
    document.querySelectorAll('[data-filter]').forEach((b) => {
      const active = b === btn;
      b.classList.toggle('btn-primary', active);
      b.classList.toggle('btn-ghost', !active);
    });
    document.querySelectorAll('[data-cat]').forEach((card) => {
      const show = cat === 'all' || card.getAttribute('data-cat') === cat;
      card.style.display = show ? '' : 'none';
    });
    const empty = document.getElementById('filter-empty');
    if (empty) {
      const visible = [...document.querySelectorAll('[data-cat]')].some((c) => c.style.display !== 'none');
      empty.classList.toggle('hidden', visible);
    }
  });

  // ---- 求籤小遊戲：本日醫學小知識 ----
  var FORTUNES = [
    { level: '上上籤', title: '每日好水，福氣自來', text: '成人每日建議補充約 1500–2000 c.c. 水分；但心臟或腎臟疾病者請依醫囑調整飲水量。' },
    { level: '上吉籤', title: '勤洗手，遠病厄', text: '以肥皂搓揉雙手至少 20 秒，是預防腸胃炎與呼吸道感染最有效的方法之一。' },
    { level: '中吉籤', title: '動則得福', text: '每週累積 150 分鐘中等強度運動，有助降低心血管疾病與代謝症候群風險。' },
    { level: '上吉籤', title: '好眠養元氣', text: '成人理想睡眠約 7–9 小時；長期睡眠不足與免疫力下降、代謝失調有關。' },
    { level: '中平籤', title: '量壓有方', text: '測量血壓前先靜坐休息 5 分鐘，避免剛運動、抽菸或喝咖啡後立刻測量。' },
    { level: '上上籤', title: '中風應變，分秒是金', text: '記住口訣 BE-FAST：平衡、眼睛、臉、手、說話出現異常，請立即撥打 119。' },
    { level: '吉籤', title: '燙傷莫慌', text: '燙傷請「沖脫泡蓋送」：以流動冷水沖 15–20 分鐘，切勿塗抹牙膏或醬油。' },
    { level: '中吉籤', title: '蔬果全穀，平安是福', text: '多吃蔬果與全穀、減少含糖飲料，有助穩定血糖、體重與腸道健康。' },
    { level: '上吉籤', title: '久坐傷身，起身得福', text: '每 30–60 分鐘起身活動一下，可降低下肢血栓與下背疼痛的風險。' },
    { level: '吉籤', title: '防曬護膚', text: '日常防曬可降低皮膚老化與皮膚癌風險，建議 SPF30 以上並定時補擦。' },
    { level: '中吉籤', title: '疫苗安心', text: '接種疫苗後手臂痠痛屬常見反應，通常 1–2 天內會自行緩解。' },
    { level: '上上籤', title: '噎到救命術', text: '成人哽塞可用哈姆立克法；一歲以下嬰兒則改用「拍背壓胸」交替處理。' }
  ];

  function drawFortune() {
    var cup = document.getElementById('draw-cup');
    var result = document.getElementById('fortune-result');
    if (!cup || !result) return;
    if (cup.classList.contains('shaking')) return;
    cup.classList.add('shaking');
    var pick = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    var no = Math.floor(Math.random() * 88) + 1;
    setTimeout(function () {
      cup.classList.remove('shaking');
      result.innerHTML =
        '<div class="fortune-slip in">' +
          '<div class="flex items-center justify-between">' +
            '<span class="text-sm font-semibold" style="color:#9E2A20">第 ' + no + ' 籤</span>' +
            '<span class="slip-level">' + pick.level + '</span>' +
          '</div>' +
          '<p class="text-xs font-semibold tracking-widest mt-5" style="color:#C0392B">本日醫學小知識</p>' +
          '<h3 class="font-display font-extrabold text-2xl text-ink mt-1.5">' + pick.title + '</h3>' +
          '<p class="text-[15px] leading-relaxed mt-3" style="color:#5b4a3a">' + pick.text + '</p>' +
          '<div class="flex items-center gap-3 mt-6 pt-5" style="border-top:1px dashed #E3CF9E">' +
            '<button data-draw class="btn btn-accent text-sm"><i data-lucide="refresh-cw" class="w-4 h-4"></i>再求一支</button>' +
            '<a href="courses.html" class="btn btn-ghost text-sm">深入學習<i data-lucide="arrow-right" class="w-4 h-4"></i></a>' +
          '</div>' +
        '</div>';
      if (window.lucide) window.lucide.createIcons();
    }, 750);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-draw]')) drawFortune();
  });

  // Live search on courses page
  document.addEventListener('input', function (e) {
    const input = e.target.closest('#course-search');
    if (!input) return;
    const q = input.value.trim().toLowerCase();
    document.querySelectorAll('[data-cat]').forEach((card) => {
      const text = (card.getAttribute('data-title') || '').toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
    const empty = document.getElementById('filter-empty');
    if (empty) {
      const visible = [...document.querySelectorAll('[data-cat]')].some((c) => c.style.display !== 'none');
      empty.classList.toggle('hidden', visible);
    }
  });
})();
