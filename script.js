(() => {
  const stage = document.getElementById('stage');
  const screens = Object.fromEntries(
    [...document.querySelectorAll('.screen')].map((el) => [el.id, el])
  );

  /* ---------- Motion helpers ----------
     State changes follow the Figma prototype (spring / bezier curves),
     slowed slightly (SLOW) so they read as smooth rather than snappy. */
  const EASE = {
    s: 'var(--spring)', out: 'var(--ease-out)', in: 'var(--ease-in)', io: 'var(--ease-io)',
    smooth: 'var(--smooth)', travel: 'var(--smooth-io)',
  };
  const SLOW = 1.25;
  const ENTER_DELAY = 450; // let the page cross-fade begin before its content moves
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  let token = 0; // bumps on every navigation; running sequences check it and stop

  function setState(el, s, ms = 0, e = 's') {
    el.style.setProperty('--d', `${ms}ms`);
    el.style.setProperty('--e', EASE[e]);
    el.dataset.s = s;
  }
  async function steps(t, list) {
    for (const [el, s, ms, e, before] of list) {
      if (t !== token) return false;
      if (before) before();
      const d = Math.round(ms * SLOW);
      setState(el, s, d, e);
      await sleep(d);
    }
    return t === token;
  }

  /* ---------- Fit the canvas to the window ---------- */
  const mFrame = document.getElementById('mFrame');
  let isMobile = false;
  let W = 1440, H = 1024;

  /* The gold border has notched (inward-curving) corners with a small step,
     so the clip that hides everything outside it uses the same shape. */
  // desktop: the Figma border path itself (stroke centre), mapped onto the stage
  const DESK_CLIP = 'M838 996 L1356.68 996 C1356.68 974.66 1373.98 957.36 1395.32 957.36 L1405 957.36 ' +
    'L1405 67.27 L1394.95 67.27 C1373.81 67.27 1356.68 50.13 1356.68 29 L78.15 29 ' +
    'C78.15 50.13 61.02 67.27 39.89 67.27 L36 67.27 L36 957.36 L39.51 957.36 C60.85 957.36 78.15 974.66 78.15 996 Z';
  // phones: the same notched shape, drawn for the portrait canvas
  function notchCorners(L, T, R, B, r, s) {
    const a = `A${r} ${r} 0 0 1`;
    return `${a} ${R - s} ${B - r} H${R} V${T + r} H${R - s} ${a} ${R - s - r} ${T} ` +
      `H${L + s + r} ${a} ${L + s} ${T + r} H${L} V${B - r} H${L + s} ${a} ${L + s + r} ${B}`;
  }
  const M = { m: 12, r: 24, s: 3, gap: 150 };
  function drawPortraitFrame() {
    const { m, r, s, gap } = M;
    const d = `M${W / 2 + gap / 2} ${H - m} H${W - m - s - r} ${notchCorners(m, m, W - m, H - m, r, s)} H${W / 2 - gap / 2}`;
    // a dot sits in each notch, as on the desktop border
    const k = s + 7;
    const dots = [[m + k, m + 7], [W - m - k, m + 7], [m + k, H - m - 7], [W - m - k, H - m - 7]]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#c9a46c"/>`).join('');
    mFrame.innerHTML =
      `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="mfg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#DAB787"/><stop offset="1" stop-color="#9E7639"/></linearGradient></defs>
        <path d="${d}" fill="none" stroke="url(#mfg)" stroke-width="2"/>${dots}</svg>`;
  }

  const fit = () => {
    const vw = window.innerWidth, vh = window.innerHeight;
    if (!vw || !vh) return;
    isMobile = vw < 700 || vw / vh < 0.8;
    let scale, clip;
    if (isMobile) {
      W = Math.min(Math.max(vw, 430), 640);
      scale = vw / W;
      H = vh / scale;
      drawPortraitFrame();
      clip = `M${W - M.m - M.s - M.r} ${H - M.m} ${notchCorners(M.m, M.m, W - M.m, H - M.m, M.r, M.s)} Z`;
    } else {
      W = 1440; H = 1024;
      scale = Math.min(vw / 1440, vh / 1024);
      clip = DESK_CLIP;
    }
    stage.classList.toggle('m', isMobile);
    stage.style.setProperty('--scale', scale);
    stage.style.setProperty('--W', `${W}px`);
    stage.style.setProperty('--H', `${H}px`);
    stage.style.setProperty('--Wn', W);
    stage.style.setProperty('--Hn', H);
    stage.style.setProperty('--clip', `path("${clip}")`);
    sizeStars();
  };

  /* ---------- Sky: twinkling stars on one canvas ----------
     Positions from Figma "Group 11"; each star holds on 2 s, fades 1.2 s,
     rests 2.4 s, fades back 1.2 s (the "Animated" component timing).
     One canvas instead of 200 blended images keeps every page smooth. */
  const STARS = [[25,243,9],[666,249,9],[282,770,9],[923,776,9],[361,781,9],[1002,787,9],[605,251,9],[1246,257,9],[1325,262,9],[132,141,9],[773,147,9],[175,872,9],[816,878,9],[468,883,9],[1109,889,9],[498,149,9],[1139,155,9],[1432,160,9],[152,7,9],[793,13,9],[155,1006,9],[796,1012,9],[488,1017,9],[1129,1023,9],[478,15,9],[1119,21,9],[121,597,9],[762,603,9],[186,416,9],[827,422,9],[457,427,9],[1098,433,9],[509,605,9],[1150,611,9],[1421,616,9],[65,775,9],[706,781,9],[242,238,9],[883,244,9],[401,249,9],[1042,255,9],[565,783,9],[1206,789,9],[1365,794,9],[71,452,9],[712,458,9],[236,561,9],[877,567,9],[407,572,9],[1048,578,9],[559,460,9],[1200,466,9],[1371,471,9],[25,169,9],[666,175,9],[282,844,9],[923,850,9],[361,855,9],[1002,861,9],[605,177,9],[1246,183,9],[1325,188,9],[54,56,9],[695,62,9],[253,957,9],[894,963,9],[390,968,9],[694,201,9],[254,818,9],[895,824,9],[389,829,9],[1030,835,9],[577,203,9],[1218,209,9],[1353,214,9],[180,42,9],[821,48,9],[127,971,9],[768,977,9],[516,982,9],[1157,988,9],[1414,993,9],[450,50,9],[1091,56,9],[25,503,24],[666,509,24],[282,510,24],[923,516,24],[361,521,24],[1002,527,24],[605,511,24],[1246,517,24],[1325,522,24],[19,311,24],[660,317,24],[288,702,24],[929,708,24],[355,713,24],[996,719,24],[611,319,24],[1252,325,24],[1319,330,24],[4,29,24],[645,35,24],[303,984,24],[944,990,24],[340,995,24],[981,1001,24],[626,37,24],[1267,43,24],[1304,48,24],[19,826,24],[660,832,24],[288,187,24],[929,193,24],[355,198,24],[996,204,24],[611,834,24],[1252,840,24],[1319,845,24],[7,957,24],[648,963,24],[300,56,24],[941,62,24],[343,67,24],[984,73,24],[623,965,24],[1264,971,24],[1307,976,24],[68,534,24],[709,540,24],[239,479,24],[880,485,24],[404,490,24],[1045,496,24],[562,542,24],[1203,548,24],[1368,553,24],[50,353,24],[691,359,24],[257,660,24],[898,666,24],[386,671,24],[1027,677,24],[580,361,24],[1221,367,24],[1350,372,24],[66,75,24],[707,81,24],[241,938,24],[993,376,24],[614,662,24],[1255,668,24],[1316,673,24],[66,924,24],[707,930,24],[241,89,24],[882,95,24],[402,100,24],[1043,106,24],[564,932,24],[1205,938,24],[1366,943,24],[28,403,15],[669,409,15],[279,610,15],[920,616,15],[364,621,15],[1005,627,15],[602,411,15],[1243,417,15],[1328,422,15],[35,114,15],[676,120,15],[272,899,15],[913,905,15],[371,910,15],[1012,916,15],[595,122,15],[1236,128,15],[1335,133,15],[65,16,15],[706,22,15],[242,997,15],[883,1003,15],[401,1008,15],[1042,1014,15],[565,24,15],[1206,30,15],[1365,35,15],[34,606,15],[675,612,15],[273,407,15],[914,413,15],[370,418,15],[1011,424,15],[596,614,15],[1237,620,15],[1334,625,15],[34,931,15],[675,937,15]]
    .map(([x, y, s]) => ({ x: x / 1440, y: y / 1024, s, phase: Math.random() * 6.8 }));
  const canvas = document.getElementById('twinkles');
  const ctx = canvas.getContext('2d');
  const sprites = {};
  let dpr = 1;
  function sprite(size) {
    const px = Math.ceil(size * dpr);
    const key = `${size}@${dpr}`;
    if (sprites[key]) return sprites[key];
    const c = document.createElement('canvas');
    c.width = c.height = px;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(px / 2, px / 2, 0, px / 2, px / 2, px / 2);
    grad.addColorStop(0, 'rgba(255,255,255,.95)');
    grad.addColorStop(0.22, 'rgba(255,252,210,.55)');
    grad.addColorStop(0.55, 'rgba(253,253,0,.12)');
    grad.addColorStop(1, 'rgba(253,253,0,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, px, px);
    return (sprites[key] = c);
  }
  function sizeStars() {
    dpr = Math.min(window.devicePixelRatio || 1, 2) * (parseFloat(stage.style.getPropertyValue('--scale')) || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
  }
  const level = (t) => { // 0..6.8 s cycle → brightness
    if (t < 2) return 1;
    if (t < 3.2) return 1 - 0.85 * (0.5 - 0.5 * Math.cos(((t - 2) / 1.2) * Math.PI));
    if (t < 5.6) return 0.15;
    return 0.15 + 0.85 * (0.5 - 0.5 * Math.cos(((t - 5.6) / 1.2) * Math.PI));
  };
  let lastDraw = 0;
  function drawStars(now) {
    requestAnimationFrame(drawStars);
    if (now - lastDraw < 33 || document.hidden) return; // ~30 fps is plenty for a twinkle
    lastDraw = now;
    const t = now / 1000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const st of STARS) {
      ctx.globalAlpha = 0.75 * level((t + st.phase) % 6.8);
      const sp = sprite(st.s);
      ctx.drawImage(sp, st.x * canvas.width - sp.width / 2, st.y * canvas.height - sp.height / 2);
    }
  }

  fit();
  window.addEventListener('resize', fit);
  requestAnimationFrame(drawStars);

  document.querySelectorAll('.frame-dots').forEach((row) =>
    row.dataset.dots.split(',').forEach((x) => {
      const span = document.createElement('span');
      span.style.left = `${x}px`;
      span.innerHTML = '<img src="assets/dot.svg" alt="">';
      row.appendChild(span);
    })
  );

  /* ---------- Screen routing ---------- */
  const SKY = {
    splash: [-1947, -2008], intro: [-1947, -2008], home: [-2283, -1655],
    about: [-573, -306], work: [0, -1832], contact: [-804, -3723],
  };
  const MAIN = ['home', 'about', 'work', 'contact'];
  const INITIAL = { intro: '1', home: '1', about: 'default', contact: '1' };
  let current = null;

  function go(name, { push = true, fromIntro = false } = {}) {
    if (!screens[name] || name === current) return;
    const prev = current;
    current = name;
    const t = ++token;

    if (window.closeForm) window.closeForm();
    if (window.closeProjects) window.closeProjects();
    if (prev) {
      screens[prev].classList.remove('active');
      setTimeout(() => { if (current !== prev) resetScreen(prev); }, 750);
    }
    screens[name].classList.add('active');
    stage.dataset.screen = name;

    const [x, y] = SKY[name];
    stage.style.setProperty('--bx', `${x - 215.7}px`);
    stage.style.setProperty('--by', `${y - 148.3}px`);

    document.querySelectorAll('#nav a').forEach((a) => a.classList.toggle('current', a.dataset.go === name));
    if (name !== 'intro') stage.dataset.hdr = 'show';
    stage.dataset.navin = fromIntro ? '0' : '1';

    ENTER[name]?.(t);
    if (push && MAIN.includes(name) && location.hash !== `#${name}`) history.pushState(null, '', `#${name}`);
  }

  function resetScreen(name) {
    const el = screens[name];
    if (INITIAL[name]) setState(el, INITIAL[name], 0);
    if (name === 'home') stopTitles();
    if (name === 'work') resetWork();
    if (name === 'about') resetAbout();
  }

  /* ---------- Entry sequences ---------- */
  const ENTER = {
    async intro(t) {
      stage.dataset.hdr = 'hide';
      await sleep(ENTER_DELAY);
      await steps(t, [
        [screens.intro, '2', 420, 'smooth'],
        [screens.intro, '3', 511, 's', () => { stage.dataset.hdr = 'show'; }],
        [screens.intro, '4', 511, 's'],
      ]);
    },
    async home(t) {
      await sleep(ENTER_DELAY + 500);
      if (t !== token) return;
      stage.dataset.navin = '1';
      showFirstTitle();
      setState(screens.home, '2', 750, 'smooth');
      startTitles();
    },
    async about(t) {
      resetAbout();
      await sleep(ENTER_DELAY);
      const ok = await steps(t, [
        [screens.about, 'hover', 511, 's'],
        [screens.about, 'up', 511, 's'],
        [screens.about, 'content', 260, 'smooth'],
      ]);
      // the card has landed face-down: turn it over sideways
      if (ok) spin(isMobile ? aboutMCard : centerCard());
    },
    async contact(t) {
      await sleep(ENTER_DELAY);
      if (t === token) setState(screens.contact, '3', 1100, 'smooth');
    },
    async work(t) {
      await sleep(ENTER_DELAY);
      if (t === token) workEnter(t);
    },
  };

  /* ---------- Splash: CSS timeline, then the dot shrinks into the Intro ---------- */
  const splash = screens.splash;
  function runSplash() {
    const t = token;
    // wait for the artwork + script font so nothing pops in mid-animation
    const imgs = [...splash.querySelectorAll('img')].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })));
    Promise.race([Promise.all([...imgs, document.fonts?.ready]), sleep(1500)]).then(() => {
      if (t !== token) return;
      splash.classList.add('play');
      setTimeout(() => { if (t === token) go('intro', { push: false }); }, 5000);
    });
  }

  // Explore → everything zooms past the viewer → Home
  document.getElementById('exploreBtn').addEventListener('click', async () => {
    if (screens.intro.dataset.s !== '4') return;
    const t = token;
    setState(screens.intro, '5', 650, 'smooth');
    await sleep(420);
    if (t === token) go('home', { fromIntro: true });
  });

  window.addEventListener('popstate', () => {
    const h = location.hash.slice(1);
    go(MAIN.includes(h) ? h : 'intro', { push: false });
  });

  /* ---------- Nav ---------- */
  const nav = document.getElementById('nav');
  const openNav = () => { if (!isMobile) nav.classList.add('open'); };
  nav.addEventListener('mouseenter', openNav);
  nav.addEventListener('mouseleave', () => nav.classList.remove('open'));
  nav.addEventListener('focusin', openNav);
  nav.addEventListener('focusout', (e) => { if (!nav.contains(e.relatedTarget)) nav.classList.remove('open'); });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      nav.classList.remove('open');
      go(a.dataset.go);
    })
  );

  /* ---------- Home: rotating titles (every 3.194 s, as the Figma TITLE loop) ---------- */
  const titles = [...document.querySelectorAll('.home-titles p')];
  let titleIdx = 0;
  let titleTimer = null;
  const snap = (p, fn) => { p.classList.add('reset'); fn(); void p.offsetWidth; p.classList.remove('reset'); };
  function showFirstTitle() {
    titleIdx = 0;
    titles.forEach((p, i) => snap(p, () => { p.classList.remove('out'); p.classList.toggle('show', i === 0); }));
  }
  function startTitles() {
    clearInterval(titleTimer);
    titleTimer = setInterval(() => {
      titles.forEach((p) => { if (p.classList.contains('out')) snap(p, () => p.classList.remove('out')); });
      const cur = titles[titleIdx];
      titleIdx = (titleIdx + 1) % titles.length;
      cur.classList.remove('show');
      cur.classList.add('out');
      titles[titleIdx].classList.add('show');
    }, 3194);
  }
  function stopTitles() {
    clearInterval(titleTimer);
    titles.forEach((p) => snap(p, () => p.classList.remove('show', 'out')));
  }

  /* ---------- About: three cards — Everyday / Professional / Freelance ----------
     Desktop: a spread; the middle card is face-up, a side card swaps into the middle.
     Phones: one card plus a switch; changing it turns the card edge-on and back. */
  const ABOUT = {
    everyday: {
      title: 'EVERYDAY ME',
      lead: 'The Jana behind the screen: curious, dreamy and always making something.',
      body: [
        'Away from deadlines I’m still a maker at heart. I play games to understand why they feel the way they do, notice the little design details hiding in everyday apps, and keep a growing list of ideas I can’t wait to build.',
        'I love starry skies, soft colours and a good story, which is probably why this portfolio looks like a night full of tarot cards. I’m always learning something new, and I love sharing it with the people around me.',
      ],
    },
    pro: {
      title: 'PROFESSIONAL ME',
      lead: 'Know more about me Jana, the Software Engineer with a Vision.',
      body: [
        'I’m here to create experiences that leave a mark. Whether I’m building immersive game mechanics, designing & engineering seamless systems, or turning complex problems into beautiful, intuitive solutions, I bring both creativity and precision to the table.',
        'Tech excites me. Challenges fuel me. I see every project as a chance to innovate, elevate, and make something unforgettable. With a mind wired for problem-solving and a heart set on innovation, I push boundaries and bring bold ideas to life. I’m the one you want when you need brilliance wrapped in confidence and style.',
      ],
    },
    freelance: {
      title: 'FREELANCE ME',
      lead: 'Have an idea? Let’s build it together.',
      body: ['I take on freelance projects from the first sketch to launch day, with clear communication and honest timelines along the way.'],
      chips: ['Game Development', 'Websites & Web Apps', 'UX / UI Design', 'Custom Software'],
      after: 'Big product or small fix, tell me what you need and I’ll get back to you.',
      cta: true,
    },
  };
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  function fillFace(el, k) {
    const c = ABOUT[k];
    el.dataset.fill = k;
    el.innerHTML = `<span class="cf-t">${c.title}</span><span class="cf-body"><span class="cf-l">${esc(c.lead)}</span>` +
      c.body.map((p) => `<span>${esc(p)}</span>`).join('') +
      (c.chips ? `<span class="cf-chips">${c.chips.map((x) => `<span>${esc(x)}</span>`).join('')}</span>` : '') +
      (c.after ? `<span>${esc(c.after)}</span>` : '') +
      (c.cta ? '<a class="cf-cta" href="#contact" data-go="contact">Let’s work together →</a>' : '') + '</span>';
  }
  document.querySelectorAll('.cface').forEach((el) => fillFace(el, el.dataset.fill));
  document.addEventListener('click', (e) => {
    const a = e.target.closest('.cf-cta');
    if (!a) return;
    e.preventDefault();
    if (a.closest('.flipped') || a.closest('.tcard:not([data-slot="c"])')) return; // face-down: the click turns the card instead
    e.stopPropagation();
    go('contact');
    setTimeout(() => { if (current === 'contact') openForm(); }, 1100);
  }, true);

  const tcards = [...document.querySelectorAll('.tcard')];
  const aboutMCard = document.getElementById('aboutMCard');
  const amTabs = [...document.querySelectorAll('.am-tabs button')];
  const HOME_SLOTS = { everyday: 'l', pro: 'c', freelance: 'r' };
  const centerCard = () => tcards.find((c) => c.dataset.slot === 'c');
  // put a card face-down instantly (no animation)
  function showBack(card) {
    const inner = card.querySelector('.flip-inner');
    inner.classList.add('snap');
    card.classList.add('flipped');
    void inner.offsetWidth;
    inner.classList.remove('snap');
  }
  function resetAbout() {
    tcards.forEach((c) => { c.dataset.slot = HOME_SLOTS[c.dataset.c]; c.classList.remove('moving'); showBack(c); });
    showBack(aboutMCard);
    fillFace(aboutMCard.querySelector('.cface'), 'pro');
    amTabs.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.c === 'pro')));
  }
  function spin(card, face) {
    if (screens.about.dataset.s !== 'content') return;
    if (face === undefined) card.classList.toggle('flipped');
    else card.classList.toggle('flipped', !face);
    card.classList.remove('lift');
    void card.offsetWidth;
    card.classList.add('lift');
  }
  let swapping = false;
  function pick(card) {
    if (screens.about.dataset.s !== 'content' || swapping) return;
    if (card.dataset.slot === 'c') return spin(card);
    swapping = true;
    const mid = centerCard();
    mid.dataset.slot = card.dataset.slot;
    card.dataset.slot = 'c';
    card.classList.add('moving');
    spin(mid, false);
    setTimeout(() => spin(card, true), 160);
    setTimeout(() => { card.classList.remove('moving'); swapping = false; }, 1000);
  }
  tcards.forEach((c) => {
    c.addEventListener('click', () => pick(c));
    c.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(c); } });
  });
  aboutMCard.addEventListener('click', () => spin(aboutMCard));
  aboutMCard.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); spin(aboutMCard); } });
  // phone switch: turn edge-on, change the words, turn back
  let tabBusy = false;
  amTabs.forEach((b) => b.addEventListener('click', async () => {
    const face = aboutMCard.querySelector('.cface');
    if (tabBusy || face.dataset.fill === b.dataset.c) return;
    amTabs.forEach((x) => x.setAttribute('aria-selected', String(x === b)));
    if (aboutMCard.classList.contains('flipped')) { fillFace(face, b.dataset.c); spin(aboutMCard, true); return; }
    tabBusy = true;
    const inner = aboutMCard.querySelector('.flip-inner');
    await inner.animate([{ transform: 'rotateY(0deg)' }, { transform: 'rotateY(90deg)' }], { duration: 260, easing: 'cubic-bezier(.42,0,1,1)' }).finished;
    fillFace(face, b.dataset.c);
    face.scrollTop = 0;
    await inner.animate([{ transform: 'rotateY(-90deg)' }, { transform: 'rotateY(0deg)' }], { duration: 380, easing: 'cubic-bezier(.22,1,.36,1)' }).finished;
    tabBusy = false;
  }));

  /* ---------- Work: Game → Web → UX/UI → Program ----------
     Same layers and directions as the Figma WORK variants (the card stack
     slides by the variant's y change), with longer, overlapping eases.
     Arrows switch off at the first / last category. */
  const CATS = ['game', 'web', 'ux', 'program'];
  const LABELS = {
    game: 'Game Development — The art of building worlds from bugs and ideas—where every glitch teaches, and every fix brings you closer to something that feels alive.',
    web: 'Web Development — What started as an empty page turned into a front-row pass — pulling in real-time data, dynamic content, and personalized experiences.',
    ux: 'UX / UI Design — From digital reads to doorstep-delivered books, every page is a step toward something greater.',
    program: 'Program Coder — From a blank screen to a seamless solution—connecting dots, solving problems, and making complexity effortless.',
  };
  // stack offsets between neighbouring categories (Figma Group 132 y changes)
  const DELTA = { 'game>web': 923, 'web>ux': -968, 'ux>program': 902 };
  /* Each category's intro, from the Figma prototype. A layer is
     [file, x, y, w, h, rotate°, states]; x/y/w/h is its final box, and each state is
     [dx, dy, scale, rotate°, opacity] (missing = final). STEPS gives each state change. */
  const I = 'assets/intro/';
  const up = (dy, dx = 0, s = 1) => [dx, dy, s, null, 1];
  const INTROS = {
    game: { // 9885 → 9886 → 9890 → 9893 → 9919, smart animate 0.51s spring each
      steps: [[0, 's'], [510, 's'], [510, 's'], [510, 's'], [510, 's']],
      layers: [
        ['game-controller.png', 833, 696, 615, 799, 0, [[637.5, -341.5, .673], [98.5, -335.5], [98.5, -341.5]]],
        ['game-switch.png', 780, 62, 336, 194, 0, [up(1146), up(1146), up(1146), up(1146)]],
        ['game-g116.png', 1204, 76, 25.3, 22.7, 0, [up(1211), up(1211), up(1211), up(1211)]],
        ['game-image2.png', 1253, 112, 120, 178, 9, [up(1200.5, 18.5, .742), up(1200.5, 18.5, .742), up(1200.5, 18.5, .742), up(1200.5, 18.5, .742)]],
        ['game-poly1.png', 1100, 290, 26, 24, 0, [up(1070), up(1070), up(1070), up(1070)]],
        ['game-iphone.png', 940, 318, 102, 102, 0, [up(879.5, -16.5, .676), up(879.5, -16.5, .676), up(879.5, -16.5, .676), up(879.5, -16.5, .676)]],
        ['game-ell33.png', 1313, 369, 21.3, 21.3, 0, [up(1170), up(1170), up(1170), up(1170)]],
        ['game-ps5.png', 1150, 386.4, 197, 156.2, 36, [up(1160.5, -4, .888), up(1160.5, -4, .888), up(1160.5, -4, .888), up(1160.5, -4, .888)]],
        ['game-g117.png', 833, 405, 25.3, 22.7, 0, [up(1180), up(1180), up(1180), up(1180)]],
        ['game-photoroom.png', 904.5, 445.5, 151, 151, 17, [up(1038.5, -32.5, .656), up(1038.5, -32.5, .656), up(1038.5, -32.5, .656), up(1038.5, -32.5, .656)]],
        ['game-g115.png', 1368, 579, 25.3, 22.7, 0, [up(1050), up(1050), up(1050), up(1050)]],
        ['game-rect14.png', 1095, 585, 40.7, 40.7, 0, [up(974), up(974), up(974), up(974)]],
        ['game-g118.png', 885, 624, 16, 16, 0, [up(1028), up(1028), up(1028), up(1028)]],
      ],
    },
    web: { // V1 → V2 (0.30s ease-in) → V3 (0.89s spring)
      steps: [[0, 's'], [300, 'in'], [890, 's']],
      layers: [
        ['web-goal.png', 720, 56, 289, 685, 0, [[142, 0, 1, null, 0], [142, 0, 1, null, 0]]],
        ['web-ball.png', 696.5, 312, 441, 478, -140, [[694, .5, 1, 118, 0], [694, .5, 1, 118, 1]]],
        ['web-player.png', 952, 193, 522, 522, 0, [[0, 127, 1, null, 0], [0, 127, 1, null, 0]]],
        ['web-laptop.png', 737, 377, 703, 536, 0, [[0, 101, 1, null, 0]]],
        ['web-logo.png', 624, 496, 513, 245, 0, [[344, 0, 1, null, 0], [-177, 0]]],
      ],
    },
    ux: { // D0 → D1 (2.1s, the phones fly by) → D2 (0.51s spring)
      // then the "Like 2" heart on the book app: it pops in red and bursts four small hearts
      steps: [[0, 's'], [350, 'io'], [510, 's'], [300, 'io'], [300, 'out'], [300, 'io']],
      layers: [
        ['ux-titles.png', 820, 245, 418, 116, 0, [[-354, 0, 1, null, 0], [-354, 0, 1, null, 0]]],
        ['ux-mock.png', 456, 358, 984, 666, 0, [[0, 633, 1, null, 0], [0, 633, 1, null, 0]]],
        ['ux-heart.svg', 1083.2, 751.2, 25.6, 25.6, 22, [[0, 0, .667, null, 0], [0, 0, .667, null, 0], [0, 0, .667, null, 0], [0, 0, .667, null, 0]]],
        ['ux-heart.svg', 1113.83, 752.63, 5.33, 5.33, 22, [[-20.5, 8.7, 1, null, 0], [-20.5, 8.7, 1, null, 0], [-20.5, 8.7, 1, null, 0], [-20.5, 8.7, 1, null, 0], [0, 0], [0, 0, 1, null, 0]]],
        ['ux-heart.svg', 1084.63, 740.83, 5.33, 5.33, 22, [[8.7, 20.5, 1, null, 0], [8.7, 20.5, 1, null, 0], [8.7, 20.5, 1, null, 0], [8.7, 20.5, 1, null, 0], [0, 0], [0, 0, 1, null, 0]]],
        ['ux-heart.svg', 1072.83, 770.03, 5.33, 5.33, 22, [[20.5, -8.7, 1, null, 0], [20.5, -8.7, 1, null, 0], [20.5, -8.7, 1, null, 0], [20.5, -8.7, 1, null, 0], [0, 0], [0, 0, 1, null, 0]]],
        ['ux-heart.svg', 1102.03, 781.83, 5.33, 5.33, 22, [[-8.7, -20.5, 1, null, 0], [-8.7, -20.5, 1, null, 0], [-8.7, -20.5, 1, null, 0], [-8.7, -20.5, 1, null, 0], [0, 0], [0, 0, 1, null, 0]]],
      ],
    },
    program: { // 693:9618 → 704:9870 (0.51s spring): the spheres rise into place,
      // then (not in Figma) one family of devices lines up on a glowing floor: every screen shows < >
      steps: [[0, 's'], [510, 's'], [700, 's']],
      layers: [
        ['p-6.png', 902, 137, 36.7, 36.7, 0, [up(742)]],
        ['p-9.png', 1415, 52, 25.3, 69.3, 0, [up(1006, 88)]],
        ['p-1024021.png', 1415, 240, 24.7, 58.7, 0, [up(742)]],
        ['p-7.png', 820, 276, 54.7, 54.7, 0, [up(742)]],
        ['p-13.png', 1306, 281, 78, 78, 0, [up(742)]],
        ['p-10.png', 1356, 296, 24, 24, 0, [up(574)]],
        ['p-8.png', 1327, 365, 113.3, 183.3, 0, [up(742)]],
        ['p-11.png', 946, 389, 33.3, 33.3, 0, [up(742)]],
        ['p-01.png', 778, 402, 145.3, 148.7, 0, [up(742)]],
        ['p-2.png', 882, 467, 80.7, 80.7, 0, [up(574)]],
        ['p-03.png', 917, 597, 91.3, 91.3, 0, [up(741)]],
        ['p-17.png', 820, 698, 72, 74, 0, [up(574)]],
        ['p-1024020.png', 741, 759, 133.3, 133.3, 0, [up(741)]],
        ['p-18.png', 1319, 796, 67.3, 67.3, 0, [up(742)]],
        ['p-12.png', 649, 815, 147.3, 147.3, 0, [up(870)]],
        ['p-15.png', 1357, 901, 83.3, 114, 0, [up(574)]],
        ['p-04.png', 753, 952, 52.7, 52.7, 0, [up(717)]],
        ['dev-floor.svg', 590, 770, 900, 160, 0, [[0, 0, .3, null, 0], [0, 0, .3, null, 0]]],
        ['dev-monitor.svg', 790, 330, 540, 450, 0, [[0, 90, .92, null, 0], [0, 90, .92, null, 0]]],
        ['dev-tablet.svg', 1132, 566, 200, 270, 0, [[70, 30, .92, null, 0], [70, 30, .92, null, 0]]],
        ['dev-laptop.svg', 698, 548, 470, 300, 0, [[-60, 60, .94, null, 0], [-60, 60, .94, null, 0]]],
        ['dev-phone.svg', 1268, 610, 118, 236, 0, [[60, 40, .9, null, 0], [60, 40, .9, null, 0]]],
        ['dev-watch.svg', 636, 730, 76, 118, 0, [[-30, 30, .5, null, 0], [-30, 30, .5, null, 0]]],
      ],
    },
  };
  const introEl = (k) => work.querySelector(`.intro[data-k="${k}"]`);
  const layerEls = {};
  function buildIntros() {
    for (const [k, def] of Object.entries(INTROS)) {
      const box = introEl(k);
      layerEls[k] = def.layers.map(([src, x, y, w, h]) => {
        const img = new Image();
        img.src = I + src; img.alt = ''; img.decoding = 'async';
        Object.assign(img.style, { left: `${x}px`, top: `${y}px`, width: `${w}px`, height: `${h}px` });
        box.appendChild(img);
        return img;
      });
    }
  }
  function placeLayers(k, n, ms = 0, e = 's') {
    INTROS[k].layers.forEach(([, , , , , rot, states], i) => {
      const [dx = 0, dy = 0, sc = 1, r = null, o = 1] = states[n] || [];
      tr(layerEls[k][i], { transform: `translate(${dx}px, ${dy}px) rotate(${r ?? rot}deg) scale(${sc})`, opacity: o }, ms, e);
    });
  }
  const MOVE_MS = 950;

  const work = screens.work;
  const bg = (k) => work.querySelector(`.wbgs img[data-k="${k}"]`);
  const stack = (k) => work.querySelector(`.stack[data-k="${k}"]`);
  const prevBtn = work.querySelector('.work-arrow.prev');
  const nextBtn = work.querySelector('.work-arrow.next');
  const workLabel = document.getElementById('workLabel');
  let idx = 0;
  let busy = false;

  const tr = (el, props, ms = 0, e = 'travel', delay = 0) => {
    el.style.transition = ms ? Object.keys(props).map((p) => `${p.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase())} ${ms}ms ${EASE[e]} ${delay}ms`).join(', ') : 'none';
    Object.assign(el.style, props);
  };
  const reflow = (el) => void el.offsetWidth;

  function updateArrows() {
    // only the ends switch off; clicks during a move are simply ignored
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === CATS.length - 1;
  }

  const bgTimers = {};
  // the category's empty background fades in, then its own intro plays out
  function showBg(k, t, delay = 0) {
    const base = bg(`${k}-0`), box = introEl(k);
    clearTimeout(bgTimers[k]);
    tr(base, { opacity: 0, transform: 'scale(1.08)' });
    reflow(base);
    tr(base, { opacity: 1, transform: 'scale(1)' }, MOVE_MS + 200, 'smooth', delay);
    placeLayers(k, 0);
    box.classList.add('on');
    const run = async () => {
      for (const [n, [ms, e]] of INTROS[k].steps.entries()) {
        if (t !== token || CATS[idx] !== k) return;
        const d = Math.round(ms * SLOW);
        if (n) placeLayers(k, n, d, e);
        await sleep(d);
      }
    };
    bgTimers[k] = setTimeout(run, delay + 450);
  }
  function hideBg(k) {
    clearTimeout(bgTimers[k]); // a pending intro must not bring this background back
    tr(bg(`${k}-0`), { opacity: 0, transform: 'scale(1.04)' }, 700, 'smooth');
    introEl(k).classList.remove('on');
  }
  // Both stacks are cut from one continuous strip of cards (Figma Group 132),
  // so they move by exactly the same offset, together, with one easing — the
  // incoming cards are already lined up with the outgoing ones: one connected slide.
  function moveStack(from, to, delta) {
    const a = stack(from), b = stack(to);
    tr(b, { transform: `translateY(${-delta}px)`, opacity: 1 });
    b.style.zIndex = 2; a.style.zIndex = 1;
    reflow(b);
    tr(a, { transform: `translateY(${delta}px)` }, MOVE_MS, 'travel');
    tr(b, { transform: 'translateY(0px)' }, MOVE_MS, 'travel');
    setCur(to);
    setTimeout(() => tr(a, { opacity: 0 }), MOVE_MS);
  }

  const dots = [...work.querySelectorAll('.work-dots span')];
  // only the visible stack's Explore button can be clicked
  function setCur(k) {
    work.querySelectorAll('.stack').forEach((s) => s.classList.toggle('cur', s.dataset.k === k));
    dots.forEach((d, i) => d.classList.toggle('on', CATS[i] === k));
  }
  function resetWork() {
    Object.values(bgTimers).forEach(clearTimeout);
    busy = false;
    idx = 0;
    work.classList.remove('ready');
    work.querySelectorAll('.wbgs > img, .stack').forEach((el) => tr(el, { opacity: 0, transform: '' }));
    setCur(null);
    work.querySelectorAll('.intro').forEach((el) => el.classList.remove('on'));
    updateArrows();
  }
  buildIntros();
  resetWork();

  // first visit: the stack drops in from above (Figma Variant1 → 2), arrows rise in
  function workEnter(t) {
    resetWork();
    workLabel.textContent = LABELS.game;
    const s = stack('game');
    tr(s, { transform: 'translateY(-1414px)', opacity: 1 });
    reflow(s);
    tr(s, { transform: 'translateY(0px)' }, 1100, 'smooth');
    showBg('game', t);
    setCur('game');
    setTimeout(() => { if (t === token) work.classList.add('ready'); }, 350);
  }

  async function workGo(dir) {
    const to = idx + dir;
    if (busy || current !== 'work' || to < 0 || to >= CATS.length) return;
    const t = token;
    const from = CATS[idx], next = CATS[to];
    // next: the strip slides down (new cards come from above); previous: it slides up
    const delta = dir * Math.abs(dir > 0 ? DELTA[`${from}>${next}`] : DELTA[`${next}>${from}`]);
    busy = true;
    idx = to;
    updateArrows();
    workLabel.textContent = LABELS[next];
    moveStack(from, next, delta);
    hideBg(from);
    showBg(next, t, 250);
    await sleep(MOVE_MS);
    if (t !== token) return;
    busy = false;
    updateArrows();
  }
  prevBtn.addEventListener('click', () => workGo(-1));
  nextBtn.addEventListener('click', () => workGo(1));

  let touchX = null;
  work.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  work.addEventListener('touchend', (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) workGo(dx < 0 ? 1 : -1);
    touchX = null;
  });

  document.addEventListener('keydown', (e) => {
    if (current === 'work' && !proj.classList.contains('open') && e.key === 'ArrowRight') workGo(1);
    if (current === 'work' && !proj.classList.contains('open') && e.key === 'ArrowLeft') workGo(-1);
    if (current === 'splash' && (e.key === 'Enter' || e.key === ' ')) go('intro', { push: false });
  });

  /* ---------- Project viewer: each Explore button opens its category ---------- */
  const PROJECTS = {
    game: { name: 'GAMES', list: [{ name: 'Recycling Kingdom', dir: 'rk' }, { name: 'The Patient', dir: 'patient' }] },
    web: { name: 'WEB', list: [{ name: 'NBA', dir: 'nba' }, { name: 'Plants & Gardening', dir: 'fs' }] },
    ux: { name: 'UX / UI', list: [{ name: 'Ana Huna', dir: 'ah' }, { name: 'Abyan', dir: 'abyan' }] },
    program: { name: 'PROGRAMMING', list: [{ name: 'Taptical', dir: 'taptical' }] },
  };
  const proj = document.getElementById('proj');
  const projTabs = document.getElementById('projTabs');
  const projScroll = document.getElementById('projScroll');
  let projCat = null, projLastFocus = null, projIO = null, projTimers = [], projRaf = 0;
  const pxEls = [];
  let reels = [], stepLists = [], bands = [], heroEl = null, vidIO = null, projObservers = [];
  const progress = document.createElement('i');
  progress.className = 'pv-progress';
  proj.appendChild(progress);
  const lb = document.createElement('div');
  lb.className = 'pv-lb';
  lb.innerHTML = '<img alt="" />';
  proj.appendChild(lb);
  lb.addEventListener('click', () => lb.classList.remove('open'));
  const sc = () => proj.getBoundingClientRect().height / projScroll.clientHeight || 1; // stage scale
  const relTop = (el) => (el.getBoundingClientRect().top - projScroll.getBoundingClientRect().top) / sc() + projScroll.scrollTop;
  // everything that follows the scroll: progress bar, parallax, the sideways screen reels, the step line
  function onScroll() {
    projRaf = 0;
    const st = projScroll.scrollTop, h = projScroll.clientHeight;
    progress.style.setProperty('--sp', (st / Math.max(1, projScroll.scrollHeight - h)).toFixed(4));
    if (heroEl) heroEl.style.setProperty('--hp', Math.min(1, st / Math.max(1, heroEl.offsetHeight)).toFixed(3)); // 0 at the top, 1 once the hero has scrolled away
    const m = stage.classList.contains('m');
    if (!m) reels.forEach((rl) => {
      const top = relTop(rl.el), span = rl.el.offsetHeight - h;
      const p = Math.min(1, Math.max(0, (st - top) / Math.max(1, span)));
      const max = rl.track.scrollWidth - rl.el.clientWidth;
      rl.track.style.setProperty('--tx', `${(-p * max).toFixed(1)}px`);
      rl.bar.style.setProperty('--rp', p.toFixed(4));
      const i = Math.min(rl.shots.length - 1, Math.round(p * (rl.shots.length - 1)));
      if (i !== rl.cur) { rl.cur = i; rl.shots.forEach((s, j) => s.classList.toggle('on', j === i)); rl.count.textContent = String(i + 1).padStart(2, '0'); }
    });
    bands.forEach((b) => { // the mood photo drifts slower than the page
      const top = relTop(b);
      b.style.setProperty('--bp', Math.min(1, Math.max(0, (st + h - top) / (h + b.offsetHeight))).toFixed(3));
    });
    stepLists.forEach((ol) => {
      const top = relTop(ol);
      ol.style.setProperty('--prog', Math.min(1, Math.max(0, (st + h * .8 - top) / (ol.offsetHeight + h * .3))).toFixed(3));
    });
  }
  projScroll.addEventListener('scroll', () => { if (!projRaf) projRaf = requestAnimationFrame(onScroll); }, { passive: true });
  // split a title into letters that rise in one after another (words never break)
  function split(el) {
    let n = 0;
    el.innerHTML = el.textContent.split(' ').map((w) => `<span class="w">${[...w].map((c) => `<span style="--i:${n++}">${c.replace(/&/, '&amp;').replace(/</, '&lt;')}</span>`).join('')}</span>`).join(' ');
  }
  // a quote that lights up word by word
  function wordLight(el) {
    let n = 0;
    el.innerHTML = el.textContent.split(' ').map((w) => `<span class="wd" style="--i:${n++}">${w.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</span>`).join(' ');
    el.setAttribute('data-r', 'words');
  }
  function wirePage(root) {
    root.querySelectorAll('[data-split]').forEach(split);
    root.querySelectorAll("[data-words]").forEach(wordLight);
    reels = [...root.querySelectorAll('.pv-reel')].map((el) => ({ el, track: el.querySelector('.pv-track'), bar: el.querySelector('.pv-reel-bar'), shots: [...el.querySelectorAll('.pv-shot')], count: el.querySelector('.pv-reel-count b'), cur: -1 }));
    stepLists = [...root.querySelectorAll('.pv-steps, .pv-vsteps')];
    bands = [...root.querySelectorAll('.pv-band')];
    // videos only play while they are on screen
    if (vidIO) vidIO.disconnect();
    vidIO = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { if (v.preload === 'none') v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
    }), { root: projScroll, threshold: 0.25 });
    root.querySelectorAll('video').forEach((v) => vidIO.observe(v));
    projIO = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      projIO.unobserve(e.target);
    }), { root: projScroll, threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    root.querySelectorAll('[data-r]').forEach((el) => projIO.observe(el));
    // every hero follows the pointer: --px/--py run -0.5..0.5 (parallax), --mx/--my are the pointer spot (the horror flashlight)
    heroEl = root.querySelector('.pv-hero');
    if (heroEl) {
      heroEl.addEventListener('pointermove', (e) => {
        const b = heroEl.getBoundingClientRect();
        const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
        heroEl.style.setProperty('--px', (x - .5).toFixed(3));
        heroEl.style.setProperty('--py', (y - .5).toFixed(3));
        heroEl.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        heroEl.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
      });
      heroEl.addEventListener('pointerleave', () => { heroEl.style.setProperty('--px', 0); heroEl.style.setProperty('--py', 0); });
    }
    // story chapters: the pinned picture changes to the chapter being read
    root.querySelectorAll('.pv-chapters').forEach((sec) => {
      const imgs = [...sec.querySelectorAll('.pv-ch-img img')];
      const num = sec.querySelector('.pv-ch-n b');
      const roman = ['I', 'II', 'III', 'IV'];
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = +e.target.dataset.ch;
        imgs.forEach((im, j) => im.classList.toggle('on', j === i));
        sec.querySelectorAll('li[data-ch]').forEach((li) => li.classList.toggle('cur', li === e.target));
        if (num) num.textContent = roman[i];
      }), { root: projScroll, rootMargin: '-45% 0px -45% 0px' });
      sec.querySelectorAll('li[data-ch]').forEach((li) => io.observe(li));
      projObservers.push(io);
    });
    // the trailer starts muted; this button turns the sound on and off
    root.querySelectorAll('.pv-sound').forEach((b) => b.addEventListener('click', () => {
      const v = b.closest('.pv-hero').querySelector('video');
      v.muted = !v.muted;
      if (!v.muted) v.play().catch(() => {});
      b.setAttribute('aria-pressed', String(!v.muted));
    }));
    // the App Store strip: drag it sideways with the mouse
    root.querySelectorAll('.pv-strip').forEach((st) => {
      let x0 = null, s0 = 0, moved = false;
      st.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; x0 = e.clientX; s0 = st.scrollLeft; moved = false; });
      st.addEventListener('pointermove', (e) => {
        if (x0 == null) return;
        const dx = (e.clientX - x0) / sc();
        if (!moved && Math.abs(dx) > 4) { moved = true; st.classList.add('drag'); st.setPointerCapture(e.pointerId); }
        if (moved) st.scrollLeft = s0 - dx;
      });
      const end = () => { x0 = null; st.classList.remove('drag'); };
      st.addEventListener('pointerup', end);
      st.addEventListener('pointercancel', end);
      st.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    });
    // cards that flip over
    root.querySelectorAll('.pv-flip').forEach((b) => b.addEventListener('click', () => {
      const on = b.classList.toggle('on');
      b.setAttribute('aria-pressed', String(on));
    }));
    // before / after: the slider moves the wipe
    root.querySelectorAll('.pv-cmp').forEach((c) => c.querySelector('input').addEventListener('input', (e) => c.style.setProperty('--c', `${e.target.value}%`)));
    // a deck of screens: the top one flies to the back
    root.querySelectorAll('.pv-shuffle-sec').forEach((sec) => {
      const cards = [...sec.querySelectorAll('.pv-sh')];
      const cap = sec.querySelector('.pv-sh-cap');
      const num = sec.querySelector('.pv-sh-n');
      let order = cards.map((_, i) => i), busy = false;
      sec.querySelector('.pv-shuffle').addEventListener('click', () => {
        if (busy) return;
        busy = true;
        const top = cards[order[0]];
        top.classList.add('out');
        order = [...order.slice(1), order[0]];
        order.forEach((ci, k) => { if (ci !== order[order.length - 1]) cards[ci].style.setProperty('--k', k); });
        cap.textContent = cards[order[0]].dataset.cap;
        num.textContent = order[0] + 1;
        setTimeout(() => { // tuck the old top card in at the back
          top.style.setProperty('--k', order.length - 1);
          top.classList.remove('out');
          busy = false;
        }, 420);
      });
    });
    // click a screen to see it large
    root.querySelectorAll('[data-zoom]').forEach((b) => b.addEventListener('click', () => {
      lb.querySelector('img').src = b.dataset.zoom;
      lb.querySelector('img').alt = b.querySelector('img').alt;
      lb.classList.toggle('tall', !!b.closest('.tall'));
      lb.scrollTop = 0;
      lb.classList.add('open');
    }));
    onScroll();
  }
  function showProject(i) {
    const cat = PROJECTS[projCat];
    [...projTabs.children].forEach((b, j) => b.setAttribute('aria-selected', String(j === i)));
    projTimers.forEach(clearTimeout); projTimers = [];
    if (projIO) projIO.disconnect();
    lb.classList.remove('open');
    projScroll.scrollTop = 0;
    projScroll.classList.remove('swap'); void projScroll.offsetWidth; projScroll.classList.add('swap');
    const p = cat.list[i];
    reels = []; stepLists = []; bands = []; heroEl = null;
    if (vidIO) vidIO.disconnect();
    projObservers.forEach((o) => o.disconnect()); projObservers = [];
    if (!p) {
      projScroll.innerHTML = '<div class="proj-soon"><h2>COMING SOON</h2><p>Programming projects are on their way.</p></div>';
      onScroll();
      return;
    }
    const nextP = cat.list[i + 1];
    const info = nextP && window.PROJECT_INFO[nextP.dir];
    projScroll.innerHTML = window.PROJECT_PAGES[p.dir]() + '<div class="proj-end">' +
      (info ? `<button type="button" class="pv-next" data-pnext><img src="${info.img}" alt="" /><span><small>Next project</small><b>${esc(info.title)}</b></span><i aria-hidden="true">→</i></button>`
        : '<button type="button" class="pv-back" data-pclose>Back to my work</button>') + '</div>';
    wirePage(projScroll);
    projScroll.querySelector('[data-pnext]')?.addEventListener('click', () => showProject(i + 1));
    projScroll.querySelector('.proj-end [data-pclose]')?.addEventListener('click', closeProjects);
  }
  function openProjects(k) {
    projCat = k;
    const cat = PROJECTS[k];
    document.getElementById('projCat').textContent = cat.name;
    projTabs.innerHTML = cat.list.map((p, i) => `<button type="button" role="tab" data-i="${i}">${esc(p.name)}</button>`).join('');
    projLastFocus = document.activeElement;
    proj.inert = false;
    proj.classList.add('open');
    showProject(0);
    setTimeout(() => proj.querySelector('.proj-close').focus({ preventScroll: true }), 400);
  }
  function closeProjects() {
    if (!proj.classList.contains('open')) return;
    proj.classList.remove('open');
    proj.inert = true;
    if (projIO) projIO.disconnect();
    projTimers.forEach(clearTimeout); projTimers = [];
    setTimeout(() => { if (!proj.classList.contains('open')) projScroll.innerHTML = ''; }, 550);
    if (projLastFocus && document.contains(projLastFocus)) projLastFocus.focus({ preventScroll: true });
  }
  projTabs.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) showProject(+b.dataset.i); });
  proj.querySelector('.proj-bar [data-pclose]').addEventListener('click', closeProjects);
  work.querySelectorAll('.stack .explore').forEach((b) => b.addEventListener('click', () => openProjects(b.closest('.stack').dataset.k)));
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (lb.classList.contains('open')) { lb.classList.remove('open'); e.stopImmediatePropagation(); return; }
    closeProjects();
  }, true);
  window.closeProjects = closeProjects;

  /* ---------- Contact form: a pop-up above everything ---------- */
  const modal = document.getElementById('formModal');
  const openBtn = document.getElementById('openForm');
  let lastFocus = null;
  function openForm() {
    lastFocus = document.activeElement;
    modal.inert = false;
    modal.classList.add('open');
    setTimeout(() => modal.querySelector('input').focus({ preventScroll: true }), 350);
  }
  function closeForm() {
    if (!modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.inert = true;
    (lastFocus && document.contains(lastFocus) ? lastFocus : openBtn).focus({ preventScroll: true });
  }
  openBtn.addEventListener('click', openForm);
  modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeForm));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeForm(); });
  window.closeForm = closeForm;

  /* the form opens the visitor's mail app with everything filled in */
  const form = document.getElementById('cform');
  const cfCount = document.getElementById('cfCount');
  const cfNote = document.getElementById('cfNote');
  const MAX_WORDS = 300;
  const words = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);
  form.message.addEventListener('input', () => {
    const n = words(form.message.value);
    cfCount.textContent = `${n} / ${MAX_WORDS} words`;
    cfCount.classList.toggle('over', n > MAX_WORDS);
  });
  form.addEventListener('input', (e) => e.target.classList.remove('bad'));
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = form.elements;
    const bad = [];
    if (!f.name.value.trim()) bad.push(f.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())) bad.push(f.email);
    if (f.phone.value.trim() && !/^[+\d][\d\s()-]{5,}$/.test(f.phone.value.trim())) bad.push(f.phone);
    if (!f.type.value) bad.push(f.type);
    const n = words(f.message.value);
    if (!n || n > MAX_WORDS) bad.push(f.message);
    bad.forEach((el) => el.classList.add('bad'));
    cfNote.classList.toggle('err', bad.length > 0);
    if (bad.length) {
      cfNote.textContent = n > MAX_WORDS ? `Please keep the message under ${MAX_WORDS} words.` : 'Please fill in the highlighted fields.';
      bad[0].focus();
      return;
    }
    const body = `Name: ${f.name.value.trim()}\nEmail: ${f.email.value.trim()}\nPhone: ${f.phone.value.trim() || '-'}\nRequest: ${f.type.value}\n\n${f.message.value.trim()}`;
    location.href = `mailto:janamalibari21@gmail.com?subject=${encodeURIComponent(`${f.type.value} from ${f.name.value.trim()}`)}&body=${encodeURIComponent(body)}`;
    cfNote.textContent = 'Your email app is opening with the message ready to send. Thank you!';
  });

  /* ---------- Start ---------- */
  const startHash = location.hash.slice(1);
  if (MAIN.includes(startHash)) {
    go(startHash, { push: false });
  } else {
    current = 'splash';
    splash.style.transition = 'none';
    splash.classList.add('active');
    void splash.offsetWidth;
    splash.style.transition = '';
    stage.dataset.screen = 'splash';
    splash.addEventListener('click', () => go('intro', { push: false }));
    runSplash();
  }
})();
