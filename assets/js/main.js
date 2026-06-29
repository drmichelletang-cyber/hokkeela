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

  // Scroll reveal + stagger + seal stamp + stat count-up
  document.addEventListener('DOMContentLoaded', function () {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll('.reveal, .stagger, .seal-stamp');
    const counters = document.querySelectorAll('[data-count]');

    function countUp(el) {
      const target = parseFloat(el.getAttribute('data-count')) || 0;
      if (reduce) { el.textContent = String(target); return; }
      const dur = 900; let t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step); else el.textContent = String(target);
      }
      el.textContent = '0';
      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      counters.forEach(countUp);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));

    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { countUp(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => cio.observe(el));
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

  var currentFortune = null;

  function makeWish() {
    var well = document.getElementById('wish-well');
    var result = document.getElementById('wish-result');
    if (!well || !result) return;
    if (well.classList.contains('tossing')) return;
    well.classList.add('tossing');
    var pick = TIPS[Math.floor(Math.random() * TIPS.length)];
    var no = Math.floor(Math.random() * 88) + 1;
    currentFortune = { no: no, level: pick.level, title: pick.title, text: pick.text };
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
          '<div class="flex flex-wrap items-center gap-3 mt-6 pt-5" style="border-top:1.5px dashed var(--line)">' +
            '<button data-wish class="btn btn-orange text-sm"><i data-lucide="refresh-cw" class="w-4 h-4"></i>再抽一支籤</button>' +
            '<button data-share-wish class="btn btn-dark text-sm"><i data-lucide="share-2" class="w-4 h-4"></i>分享籤詩</button>' +
            '<a href="courses.html" class="btn btn-outline text-sm">深入學習<i data-lucide="arrow-right" class="w-4 h-4"></i></a>' +
          '</div>' +
        '</div>';
      if (window.lucide) window.lucide.createIcons();
    }, 700);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-wish]')) makeWish();
    if (e.target.closest('[data-share-wish]')) shareFortune(e.target.closest('[data-share-wish]'));
  });

  // ---- 分享籤詩卡片 ----
  function toast(msg) {
    var t = document.createElement('div');
    t.textContent = msg;
    t.setAttribute('role', 'status');
    t.style.cssText = 'position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:9999;' +
      'background:#1C1814;color:#FBF7EE;padding:.7rem 1.1rem;border-radius:8px;font-size:14px;' +
      'box-shadow:4px 4px 0 #EA580C;border:1.5px solid #1C1814;max-width:90vw;';
    document.body.appendChild(t);
    setTimeout(function () { t.style.transition = 'opacity .4s'; t.style.opacity = '0'; }, 2600);
    setTimeout(function () { t.remove(); }, 3100);
  }

  // wrap text by character (CJK-friendly) within maxWidth
  function wrapText(ctx, text, maxWidth) {
    var lines = [], line = '';
    for (var i = 0; i < text.length; i++) {
      var test = line + text[i];
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = text[i]; }
      else { line = test; }
    }
    if (line) lines.push(line);
    return lines;
  }

  function drawFortuneCard(cb) {
    var f = currentFortune;
    if (!f) return;
    var W = 1080, H = 1350, canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    var c = canvas.getContext('2d');
    var INK = '#1C1814', PAPER = '#FBF7EE', PAPER2 = '#EAE0CB', ORANGE = '#EA580C', ORANGEC = '#C2410C', SOFT = '#574E42', SEAL = '#A8362B';

    // background
    c.fillStyle = PAPER2; c.fillRect(0, 0, W, H);
    // faint grid
    c.strokeStyle = 'rgba(28,24,20,.05)'; c.lineWidth = 1;
    for (var x = 0; x <= W; x += 34) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, H); c.stroke(); }
    for (var y = 0; y <= H; y += 34) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }

    var m = 70, cardX = m, cardY = m, cardW = W - m * 2, cardH = H - m * 2;
    // hard offset shadow + card
    c.fillStyle = INK; c.fillRect(cardX + 16, cardY + 16, cardW, cardH);
    c.fillStyle = PAPER; c.fillRect(cardX, cardY, cardW, cardH);
    c.lineWidth = 4; c.strokeStyle = INK; c.strokeRect(cardX, cardY, cardW, cardH);

    var px = cardX + 70, pw = cardW - 140, ty = cardY + 90;

    // header: 福 seal + brand
    c.fillStyle = ORANGE; c.fillRect(px, ty, 76, 76);
    c.lineWidth = 3; c.strokeStyle = INK; c.strokeRect(px, ty, 76, 76);
    c.fillStyle = '#fff'; c.textBaseline = 'middle'; c.textAlign = 'center';
    c.font = '900 46px "Noto Serif TC", serif'; c.fillText('福', px + 38, ty + 42);
    c.textAlign = 'left'; c.fillStyle = INK;
    c.font = '900 34px "Noto Serif TC", serif'; c.fillText('福氣學院 Hokkeela', px + 96, ty + 24);
    c.fillStyle = SOFT; c.font = '500 24px "Noto Sans TC", sans-serif'; c.fillText('福氣籤詩 · 本日醫學小知識', px + 96, ty + 56);

    ty += 130;
    c.strokeStyle = '#D8C9AE'; c.lineWidth = 2; c.beginPath(); c.moveTo(px, ty); c.lineTo(px + pw, ty); c.stroke();

    ty += 50;
    // 第 X 籤 + level badge
    c.textBaseline = 'alphabetic'; c.fillStyle = ORANGEC; c.font = '700 30px "Noto Sans TC", sans-serif';
    c.fillText('第 ' + f.no + ' 籤', px, ty + 6);
    var badge = f.level, bw = c.measureText(badge).width + 44;
    c.font = '800 26px "Noto Serif TC", serif';
    bw = c.measureText(badge).width + 44;
    c.fillStyle = ORANGE; c.fillRect(px + pw - bw, ty - 28, bw, 46);
    c.lineWidth = 2.5; c.strokeStyle = INK; c.strokeRect(px + pw - bw, ty - 28, bw, 46);
    c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText(badge, px + pw - bw / 2, ty + 5);
    c.textAlign = 'left';

    ty += 70;
    // eyebrow
    c.fillStyle = ORANGEC; c.font = '700 24px Figtree, "Noto Sans TC", sans-serif';
    c.fillText('本日醫學小知識', px, ty);

    ty += 30;
    // title (serif bold, wrap)
    c.fillStyle = INK; c.font = '900 64px "Noto Serif TC", serif';
    var titleLines = wrapText(c, f.title, pw);
    titleLines.forEach(function (ln) { ty += 78; c.fillText(ln, px, ty); });

    ty += 50;
    // tip text (wrap)
    c.fillStyle = SOFT; c.font = '400 34px "Noto Sans TC", sans-serif';
    var tipLines = wrapText(c, f.text, pw);
    tipLines.forEach(function (ln) { ty += 52; c.fillText(ln, px, ty); });

    // footer pinned near bottom
    var fy = cardY + cardH - 130;
    c.strokeStyle = '#D8C9AE'; c.lineWidth = 2; c.setLineDash([8, 8]);
    c.beginPath(); c.moveTo(px, fy); c.lineTo(px + pw, fy); c.stroke(); c.setLineDash([]);
    c.fillStyle = INK; c.font = '900 40px "Noto Serif TC", serif';
    c.fillText('福氣，不是求來的，是佈局來的。', px, fy + 56);
    c.fillStyle = SOFT; c.font = '500 24px "Noto Sans TC", sans-serif';
    c.fillText('福氣學院 Hokkeela · 華人長壽醫學知識平台', px, fy + 96);
    // 籤 seal stamp bottom-right
    c.save(); c.translate(px + pw - 40, fy + 64); c.rotate(-0.08);
    c.strokeStyle = SEAL; c.lineWidth = 4; c.strokeRect(-34, -34, 68, 68);
    c.fillStyle = SEAL; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.font = '900 40px "Noto Serif TC", serif'; c.fillText('籤', 0, 2); c.restore();

    canvas.toBlob(function (blob) { cb(blob); }, 'image/png');
  }

  function shareFortune(btn) {
    if (!currentFortune) return;
    var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    if (btn) { btn.setAttribute('aria-busy', 'true'); }
    ready.then(function () {
      drawFortuneCard(function (blob) {
        if (btn) btn.removeAttribute('aria-busy');
        if (!blob) { toast('產生卡片失敗，請再試一次'); return; }
        var fname = 'hokkeela-福氣籤詩.png';
        var file = new File([blob], fname, { type: 'image/png' });
        var shareText = '我在福氣學院抽到「' + currentFortune.title + '」—— 福氣，不是求來的，是佈局來的。';
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({ files: [file], title: '福氣籤詩', text: shareText })
            .catch(function () {/* user cancelled */});
        } else {
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a'); a.href = url; a.download = fname; a.click();
          setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
          toast('已下載籤詩卡片，可分享到社群 🎴');
        }
      });
    });
  }

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
