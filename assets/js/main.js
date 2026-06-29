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
      b.classList.toggle('btn-dark', active);
      b.classList.toggle('btn-outline', !active);
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

  // ---- 許願池：本日醫學小知識（長壽佈局錦囊）----
  // 品牌精神：福氣不是求來的，是佈局來的 —— 每個願望都換成一則可執行的醫學知識。
  var TIPS = [
    { level: '佈局・睡眠', title: '好眠是抗老的地基', text: '成人理想睡眠約 7–9 小時；長期睡眠不足與認知退化、代謝失調及免疫力下降有關。' },
    { level: '佈局・運動', title: '肌力，是老後的本錢', text: '每週 2 次阻力訓練加 150 分鐘有氧，有助維持肌肉量、平衡與獨立生活能力。' },
    { level: '佈局・飲食', title: '蛋白質別省', text: '年長者每公斤體重每日約需 1.0–1.2 克蛋白質，分散三餐攝取較利肌肉合成。' },
    { level: '佈局・血管', title: '血壓穩，腦袋清', text: '測量血壓前先靜坐休息 5 分鐘；中年期血壓控制良好與晚年失智風險較低有關。' },
    { level: '佈局・防跌', title: '防跌，就是防失能', text: '居家移除絆腳雜物、加裝扶手與夜燈，是長者預防骨折最具效益的一步。' },
    { level: '佈局・大腦', title: '社交也是處方', text: '規律的社交與學習活動，與較慢的認知退化速度相關 —— 孤獨也是健康風險。' },
    { level: '佈局・代謝', title: '腰圍是隱形指標', text: '腹部肥胖與胰島素阻抗、慢性發炎相關；腰圍控制比單看體重更能反映代謝健康。' },
    { level: '佈局・用藥', title: '多重用藥要定期盤點', text: '長者常見多重用藥，建議每年請醫師或藥師整體檢視，減少交互作用與副作用。' },
    { level: '佈局・骨骼', title: '陽光與鈣，存骨本', text: '適度日曬、足量鈣與維生素 D，加上負重運動，有助延緩骨質疏鬆。' },
    { level: '佈局・心念', title: '慢性壓力會加速老化', text: '長期壓力與發炎指標上升有關；規律呼吸、正念與休息是可練習的抗老技能。' },
    { level: '佈局・腸道', title: '纖維養好菌', text: '多元蔬果與全穀提供膳食纖維，有助腸道菌相與穩定血糖、膽固醇。' },
    { level: '佈局・篩檢', title: '定期篩檢，超前佈局', text: '依年齡與風險做好癌症與慢性病篩檢，早期發現往往是「活得久又活得好」的關鍵。' }
  ];

  function makeWish() {
    var well = document.getElementById('wish-well');
    var result = document.getElementById('wish-result');
    if (!well || !result) return;
    if (well.classList.contains('tossing')) return;
    well.classList.add('tossing');
    var pick = TIPS[Math.floor(Math.random() * TIPS.length)];
    var no = Math.floor(Math.random() * 88) + 1;
    setTimeout(function () {
      well.classList.remove('tossing');
      result.innerHTML =
        '<div class="wish-slip in">' +
          '<div class="flex items-center justify-between">' +
            '<span class="text-sm font-bold" style="color:var(--orange)">第 ' + no + ' 籤</span>' +
            '<span class="slip-level">' + pick.level + '</span>' +
          '</div>' +
          '<p class="eyebrow mt-5">本日醫學小知識</p>' +
          '<h3 class="font-display font-black text-2xl text-ink mt-1.5">' + pick.title + '</h3>' +
          '<p class="text-[15px] leading-relaxed mt-3" style="color:var(--ink-soft)">' + pick.text + '</p>' +
          '<div class="flex items-center gap-3 mt-6 pt-5" style="border-top:1.5px dashed var(--line)">' +
            '<button data-wish class="btn btn-orange text-sm"><i data-lucide="refresh-cw" class="w-4 h-4"></i>再抽一支籤</button>' +
            '<a href="courses.html" class="btn btn-outline text-sm">深入學習<i data-lucide="arrow-right" class="w-4 h-4"></i></a>' +
          '</div>' +
        '</div>';
      if (window.lucide) window.lucide.createIcons();
    }, 700);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-wish]')) makeWish();
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
