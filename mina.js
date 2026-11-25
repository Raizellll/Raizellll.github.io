(function () {
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var pawTrailToggle = document.getElementById('paw-trail-toggle');
  var petBtn = document.getElementById('pet-btn');
  var boopBtn = document.getElementById('boop-btn');
  var petCountEl = document.getElementById('pet-count');
  var minaSpeechEl = document.getElementById('mina-speech');
  var minaEmblem = document.getElementById('mina-emblem');
  var heroPolaroid = document.getElementById('hero-polaroid');

  var modeWallBtn = document.getElementById('mode-wall-btn');
  var modeStackBtn = document.getElementById('mode-stack-btn');
  var shuffleBtn = document.getElementById('shuffle-btn');
  var polaroidWall = document.getElementById('polaroid-wall');
  var cardStackView = document.getElementById('card-stack-view');
  var stackDeck = document.getElementById('stack-deck');
  var stackPrevBtn = document.getElementById('stack-prev-btn');
  var stackNextBtn = document.getElementById('stack-next-btn');
  var stackEnlargeBtn = document.getElementById('stack-enlarge-btn');
  var stackIndexEl = document.getElementById('stack-index');
  var stackTitleEl = document.getElementById('stack-title');
  var stackCaptionEl = document.getElementById('stack-caption');

  var lightbox = document.getElementById('mina-lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbTitle = document.getElementById('lb-title');
  var lbTag = document.getElementById('lb-tag');
  var lbCaption = document.getElementById('lb-caption');
  var lbPrev = document.getElementById('lb-prev');
  var lbNext = document.getElementById('lb-next');
  var lbClose = document.getElementById('lb-close');

  var playpen = document.getElementById('playpen');
  var laserDot = document.getElementById('laser-dot');
  var laserStatus = document.getElementById('laser-status');
  var leftPupilGroup = document.getElementById('playpen-pupil-left');
  var rightPupilGroup = document.getElementById('playpen-pupil-right');
  var irisLeft = document.getElementById('playpen-pupil-core-left');
  var irisRight = document.getElementById('playpen-pupil-core-right');
  var openEyesGroup = document.getElementById('playpen-eyes-open');
  var happyEyesGroup = document.getElementById('playpen-eyes-happy');

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var photos = [
    {
      src: 'assets/img/mina/mina_portrait.jpg',
      title: 'Official Portrait',
      tag: '#chief-morale',
      caption: 'Calm emerald gaze monitoring every experiment log.',
      focal: 'center 22%',
      tilt: '-2.2deg',
      tapeRot: '-3deg',
      tape: 'var(--tape-1)'
    },
    {
      src: 'assets/img/mina/mina_suitcase.jpg',
      title: 'Stowaway Inspection',
      tag: '#boston-prep',
      caption: 'Verifying carry-on dimensions for Boston (Spring 2027).',
      focal: 'center 25%',
      tilt: '1.8deg',
      tapeRot: '2deg',
      tape: 'var(--tape-2)'
    },
    {
      src: 'assets/img/mina/mina_blanket.jpg',
      title: 'Blanket Mode',
      tag: '#cozy-nap',
      caption: 'Low-power inference stretched across the grey faux-fur blanket.',
      focal: '62% 55%',
      tilt: '-1.4deg',
      tapeRot: '1.5deg',
      tape: 'var(--tape-3)'
    },
    {
      src: 'assets/img/mina/mina_shoulder.jpg',
      title: 'Late-Night Companion',
      tag: '#debugging',
      caption: 'Quietly resting her chin during late-night code reviews.',
      focal: '55% 28%',
      tilt: '2.1deg',
      tapeRot: '-2deg',
      tape: 'var(--tape-1)'
    },
    {
      src: 'assets/img/mina/mina_lap.jpg',
      title: 'Lap Guardian',
      tag: '#lap-cat',
      caption: 'One front paw neatly tucked; zero plans to relocate.',
      focal: 'center 35%',
      tilt: '-1.9deg',
      tapeRot: '2.5deg',
      tape: 'var(--tape-2)'
    },
    {
      src: 'assets/img/mina/mina_closeup.jpg',
      title: 'Summer Woven Mat',
      tag: '#emerald-eyes',
      caption: 'Afternoon window light catching jade-green irises.',
      focal: 'center 48%',
      tilt: '1.4deg',
      tapeRot: '-1.5deg',
      tape: 'var(--tape-3)'
    },
    {
      src: 'assets/img/mina/mina_chaos.jpg',
      title: 'Incoming Paw',
      tag: '#chaos-pov',
      caption: 'Rare action frame moments before tapping the camera lens.',
      focal: 'center 30%',
      tilt: '-2.4deg',
      tapeRot: '3deg',
      tape: 'var(--tape-1)'
    }
  ];

  // Theme sync with main site
  function updateThemeButton(theme) {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  updateThemeButton(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (next === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
      updateThemeButton(next);
      try {
        localStorage.setItem('yiran-theme', next);
      } catch (e) {}
    });
  }

  // Pet counter & speech reactions
  var petCount = 0;
  try {
    petCount = parseInt(localStorage.getItem('mina-pets') || '0', 10) || 0;
  } catch (e) {}
  if (petCountEl) petCountEl.textContent = String(petCount);

  var petLines = [
    'purr... 26 Hz steady',
    'slow blink unlocked',
    '*tucks left paw politely*',
    '*inspects Boston suitcase*',
    '*gentle headbutt*',
    '*ear twitch approval*'
  ];
  var boopLines = [
    '*nose boop accepted*',
    'mrrp?! (polite surprise)',
    '*pink nose wiggle*',
    '*licks whiskers calmly*'
  ];
  var petIdx = 0;
  var boopIdx = 0;

  var moodSpeeches = {
    observing: 'Monitoring attention heads & desk snacks from the corner.',
    suitcase: 'Carry-on weight check complete: room for 1 calico cat confirmed.',
    blanket: 'Warm plush detected. Entering low-power purr state.',
    zoomies: '3:00 AM corridor sprint speed benchmark scheduled.'
  };

  document.querySelectorAll('.mood-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var mood = chip.getAttribute('data-mood');
      document.querySelectorAll('.mood-chip').forEach(function (other) {
        other.classList.toggle('is-active', other === chip);
      });
      if (minaSpeechEl && moodSpeeches[mood]) {
        minaSpeechEl.textContent = moodSpeeches[mood];
      }
      wiggleEmblem();
    });
  });

  function wiggleEmblem() {
    if (!minaEmblem) return;
    minaEmblem.classList.remove('is-happy');
    void minaEmblem.offsetWidth;
    minaEmblem.classList.add('is-happy');
  }

  function spawnParticles(originEl, count) {
    if (prefersReducedMotion || !originEl) return;
    var rect = originEl.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    var colors = ['#d9823b', '#4e8a6e', '#e8989f', '#2c5266'];

    for (var i = 0; i < count; i++) {
      var el = document.createElement('span');
      el.className = 'float-particle';
      var angle = (Math.random() - 0.5) * 90;
      el.style.left = cx + (Math.random() - 0.5) * 36 + 'px';
      el.style.top = cy + (Math.random() - 0.5) * 14 + 'px';
      el.style.setProperty('--dx', Math.round(angle) + 'px');
      el.style.setProperty('--r0', Math.round((Math.random() - 0.5) * 24) + 'deg');
      el.style.setProperty('--r1', Math.round((Math.random() - 0.5) * 36) + 'deg');
      el.style.color = colors[i % colors.length];

      if (i % 2 === 0) {
        el.innerHTML =
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
          '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>' +
          '</svg>';
      } else {
        el.innerHTML =
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
          '<circle cx="6.2" cy="8.2" r="2.1"/><circle cx="10.2" cy="5.6" r="2.1"/>' +
          '<circle cx="14.6" cy="5.8" r="2.1"/><circle cx="18.2" cy="8.8" r="2"/>' +
          '<path d="M12 10.6c-3.1 0-5.4 2.4-5.4 5.1 0 1.9 1.3 3.1 3.1 3.1 1 0 1.6-.4 2.3-.4s1.3.4 2.3.4c1.8 0 3.1-1.2 3.1-3.1 0-2.7-2.3-5.1-5.4-5.1z"/>' +
          '</svg>';
      }

      document.body.appendChild(el);
      (function (node) {
        setTimeout(function () {
          if (node.parentNode) node.parentNode.removeChild(node);
        }, 1000);
      })(el);
    }
  }

  function givePet(triggerEl, mode) {
    petCount += 1;
    if (petCountEl) petCountEl.textContent = String(petCount);
    try {
      localStorage.setItem('mina-pets', String(petCount));
    } catch (e) {}

    if (minaSpeechEl) {
      if (mode === 'boop') {
        minaSpeechEl.textContent = boopLines[boopIdx % boopLines.length];
        boopIdx += 1;
      } else {
        minaSpeechEl.textContent = petLines[petIdx % petLines.length];
        petIdx += 1;
      }
    }

    wiggleEmblem();
    spawnParticles(triggerEl, 5);
  }

  if (petBtn) {
    petBtn.addEventListener('click', function () {
      givePet(petBtn, 'pet');
    });
  }

  if (boopBtn) {
    boopBtn.addEventListener('click', function () {
      givePet(boopBtn, 'boop');
    });
  }

  // 3D Hero Polaroid Tilt & Pet Click
  if (heroPolaroid) {
    heroPolaroid.addEventListener('pointermove', function (event) {
      if (prefersReducedMotion || event.pointerType === 'touch') return;
      var rect = heroPolaroid.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width;
      var y = (event.clientY - rect.top) / rect.height;
      var rx = (0.5 - y) * 10;
      var ry = (x - 0.5) * 12;
      heroPolaroid.style.transform =
        'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-2px)';
      heroPolaroid.style.setProperty('--sheen-x', (x * 100).toFixed(1) + '%');
      heroPolaroid.style.setProperty('--sheen-y', (y * 100).toFixed(1) + '%');
    });

    heroPolaroid.addEventListener('pointerleave', function () {
      heroPolaroid.style.transform = '';
    });

    heroPolaroid.addEventListener('click', function () {
      givePet(heroPolaroid, 'pet');
    });
  }

  // Subtle Pointer Paw-Print Trail
  var pawTrailEnabled = !prefersReducedMotion;
  var lastPawX = null;
  var lastPawY = null;
  var pawLeftStep = true;
  var pawColors = ['#d9823b', '#524942', '#4e8a6e'];
  var pawColorIdx = 0;

  function updatePawToggleUI() {
    if (!pawTrailToggle) return;
    pawTrailToggle.setAttribute('aria-pressed', pawTrailEnabled ? 'true' : 'false');
    pawTrailToggle.textContent = pawTrailEnabled ? 'Paw Trail: On' : 'Paw Trail: Off';
  }
  updatePawToggleUI();

  if (pawTrailToggle) {
    pawTrailToggle.addEventListener('click', function () {
      pawTrailEnabled = !pawTrailEnabled;
      updatePawToggleUI();
    });
  }

  document.addEventListener('pointermove', function (event) {
    if (!pawTrailEnabled || prefersReducedMotion || event.pointerType === 'touch') return;
    var x = event.clientX;
    var y = event.clientY;
    if (lastPawX === null) {
      lastPawX = x;
      lastPawY = y;
      return;
    }
    var dx = x - lastPawX;
    var dy = y - lastPawY;
    var dist = Math.hypot(dx, dy);
    if (dist < 78) return;

    var angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    var nx = -dy / dist;
    var ny = dx / dist;
    var side = pawLeftStep ? 10 : -10;
    pawLeftStep = !pawLeftStep;

    lastPawX = x;
    lastPawY = y;

    var paw = document.createElement('span');
    paw.className = 'trail-paw';
    paw.style.left = x + nx * side + 'px';
    paw.style.top = y + ny * side + 'px';
    paw.style.setProperty('--rot', angleDeg.toFixed(1) + 'deg');
    paw.style.color = pawColors[pawColorIdx % pawColors.length];
    pawColorIdx += 1;

    paw.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<circle cx="6.2" cy="8.2" r="2.1"/><circle cx="10.2" cy="5.6" r="2.1"/>' +
      '<circle cx="14.6" cy="5.8" r="2.1"/><circle cx="18.2" cy="8.8" r="2"/>' +
      '<path d="M12 10.6c-3.1 0-5.4 2.4-5.4 5.1 0 1.9 1.3 3.1 3.1 3.1 1 0 1.6-.4 2.3-.4s1.3.4 2.3.4c1.8 0 3.1-1.2 3.1-3.1 0-2.7-2.3-5.1-5.4-5.1z"/>' +
      '</svg>';

    document.body.appendChild(paw);
    setTimeout(function () {
      if (paw.parentNode) paw.parentNode.removeChild(paw);
    }, 1180);
  });

  // Gallery State (Polaroid Wall + 3D Card Stack + Shuffle + Lightbox)
  var deckOrder = photos.map(function (_, idx) {
    return idx;
  });
  var stackPos = 0;
  var activeLightboxPos = 0;
  var lastFocusedEl = null;

  function renderPolaroidWall() {
    if (!polaroidWall) return;
    polaroidWall.innerHTML = '';

    deckOrder.forEach(function (photoIndex, orderPos) {
      var item = photos[photoIndex];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'polaroid-card';
      btn.style.setProperty('--tilt', item.tilt);
      btn.style.setProperty('--tape-rot', item.tapeRot);
      btn.style.setProperty('--tape-bg', item.tape);

      btn.innerHTML =
        '<div class="polaroid-photo">' +
        '<img src="' +
        item.src +
        '" alt="Mina the calico cat: ' +
        item.title +
        '" style="--focal:' +
        item.focal +
        '" loading="lazy">' +
        '</div>' +
        '<div class="polaroid-meta">' +
        '<div class="polaroid-top-row">' +
        '<h3 class="polaroid-title">' +
        item.title +
        '</h3>' +
        '<span class="polaroid-tag">' +
        item.tag +
        '</span>' +
        '</div>' +
        '<p class="polaroid-caption">' +
        item.caption +
        '</p>' +
        '</div>';

      btn.addEventListener('click', function () {
        openLightbox(orderPos, btn);
      });

      polaroidWall.appendChild(btn);
    });
  }

  function renderCardStack() {
    if (!stackDeck) return;
    stackDeck.innerHTML = '';
    var total = deckOrder.length;

    for (var offset = total - 1; offset >= 0; offset--) {
      var orderPos = (stackPos + offset) % total;
      var item = photos[deckOrder[orderPos]];
      var card = document.createElement('div');
      card.className = 'stack-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', offset === 0 ? '0' : '-1');
      card.setAttribute('aria-label', 'Card ' + (orderPos + 1) + ' of ' + total + ': ' + item.title);
      card.setAttribute('data-depth', offset <= 2 ? String(offset) : 'hidden');

      card.innerHTML =
        '<div class="stack-photo">' +
        '<img src="' +
        item.src +
        '" alt="Mina: ' +
        item.title +
        '" style="--focal:' +
        item.focal +
        '">' +
        '</div>' +
        '<div class="stack-card-label">' +
        '<span>' +
        item.tag +
        '</span>' +
        '<span>Click to deal next</span>' +
        '</div>';

      if (offset === 0) {
        card.addEventListener('click', dealNextCard);
        card.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            dealNextCard();
          }
        });
      }

      stackDeck.appendChild(card);
    }

    var current = photos[deckOrder[stackPos]];
    if (stackIndexEl) stackIndexEl.textContent = stackPos + 1 + ' / ' + total;
    if (stackTitleEl) stackTitleEl.textContent = current.title;
    if (stackCaptionEl) stackCaptionEl.textContent = current.caption;
  }

  var dealingLock = false;
  function dealNextCard() {
    if (dealingLock || !stackDeck) return;
    var topCard = stackDeck.querySelector('[data-depth="0"]');
    if (!topCard || prefersReducedMotion) {
      stackPos = (stackPos + 1) % deckOrder.length;
      renderCardStack();
      return;
    }

    dealingLock = true;
    topCard.classList.add('is-dealing');
    setTimeout(function () {
      stackPos = (stackPos + 1) % deckOrder.length;
      renderCardStack();
      dealingLock = false;
    }, 240);
  }

  function dealPrevCard() {
    if (dealingLock) return;
    stackPos = (stackPos - 1 + deckOrder.length) % deckOrder.length;
    renderCardStack();
  }

  if (stackNextBtn) stackNextBtn.addEventListener('click', dealNextCard);
  if (stackPrevBtn) stackPrevBtn.addEventListener('click', dealPrevCard);
  if (stackEnlargeBtn) {
    stackEnlargeBtn.addEventListener('click', function () {
      openLightbox(stackPos, stackEnlargeBtn);
    });
  }

  function setGalleryMode(mode) {
    var isStack = mode === 'stack';
    if (modeWallBtn) {
      modeWallBtn.classList.toggle('is-active', !isStack);
      modeWallBtn.setAttribute('aria-pressed', isStack ? 'false' : 'true');
    }
    if (modeStackBtn) {
      modeStackBtn.classList.toggle('is-active', isStack);
      modeStackBtn.setAttribute('aria-pressed', isStack ? 'true' : 'false');
    }
    if (polaroidWall) polaroidWall.hidden = isStack;
    if (cardStackView) cardStackView.hidden = !isStack;
  }

  if (modeWallBtn) {
    modeWallBtn.addEventListener('click', function () {
      setGalleryMode('wall');
    });
  }
  if (modeStackBtn) {
    modeStackBtn.addEventListener('click', function () {
      setGalleryMode('stack');
      renderCardStack();
    });
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', function () {
      for (var i = deckOrder.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = deckOrder[i];
        deckOrder[i] = deckOrder[j];
        deckOrder[j] = tmp;
      }
      stackPos = 0;
      renderPolaroidWall();
      renderCardStack();
      if (polaroidWall) {
        polaroidWall.classList.remove('is-shuffling');
        void polaroidWall.offsetWidth;
        polaroidWall.classList.add('is-shuffling');
      }
    });
  }

  renderPolaroidWall();
  renderCardStack();

  // Lightbox
  function updateLightboxView() {
    var item = photos[deckOrder[activeLightboxPos]];
    if (!item || !lbImg) return;
    lbImg.src = item.src;
    lbImg.alt = 'Mina the calico cat: ' + item.title;
    if (lbTitle) lbTitle.textContent = item.title;
    if (lbTag) lbTag.textContent = item.tag;
    if (lbCaption) lbCaption.textContent = item.caption;
  }

  function openLightbox(orderPos, trigger) {
    if (!lightbox) return;
    lastFocusedEl = trigger || document.activeElement;
    activeLightboxPos = orderPos;
    updateLightboxView();
    lightbox.hidden = false;
    requestAnimationFrame(function () {
      lightbox.classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!lightbox.classList.contains('is-open')) {
        lightbox.hidden = true;
        if (lbImg) lbImg.removeAttribute('src');
      }
    }, 160);
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  if (lbPrev) {
    lbPrev.addEventListener('click', function () {
      activeLightboxPos = (activeLightboxPos - 1 + deckOrder.length) % deckOrder.length;
      updateLightboxView();
    });
  }

  if (lbNext) {
    lbNext.addEventListener('click', function () {
      activeLightboxPos = (activeLightboxPos + 1) % deckOrder.length;
      updateLightboxView();
    });
  }

  if (lbClose) {
    lbClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      activeLightboxPos = (activeLightboxPos - 1 + deckOrder.length) % deckOrder.length;
      updateLightboxView();
    } else if (event.key === 'ArrowRight') {
      activeLightboxPos = (activeLightboxPos + 1) % deckOrder.length;
      updateLightboxView();
    }
  });

  // Catch the Laser Toy Box (Smooth Eye Tracking + Blink + Purr Bubble)
  if (playpen && leftPupilGroup && rightPupilGroup) {
    var targetX = 0;
    var targetY = 0;
    var currX = 0;
    var currY = 0;
    var targetScale = 1;
    var currScale = 1;
    var animId = null;
    var playpenReactions = [
      'meow?',
      'almost got it!',
      '*tail swish*',
      '*wiggles butt*',
      'target locked!',
      'pounce ready'
    ];
    var reactionIdx = 0;

    function tickEyes() {
      currX += (targetX - currX) * 0.22;
      currY += (targetY - currY) * 0.22;
      currScale += (targetScale - currScale) * 0.18;

      var t = 'translate(' + currX.toFixed(2) + ' ' + currY.toFixed(2) + ')';
      leftPupilGroup.setAttribute('transform', t);
      rightPupilGroup.setAttribute('transform', t);
      if (irisLeft && irisRight) {
        irisLeft.setAttribute('r', (6.4 * currScale).toFixed(2));
        irisRight.setAttribute('r', (6.4 * currScale).toFixed(2));
      }

      if (
        Math.abs(targetX - currX) > 0.05 ||
        Math.abs(targetY - currY) > 0.05 ||
        Math.abs(targetScale - currScale) > 0.01
      ) {
        animId = requestAnimationFrame(tickEyes);
      } else {
        animId = null;
      }
    }

    function ensureTick() {
      if (!animId) animId = requestAnimationFrame(tickEyes);
    }

    playpen.addEventListener('pointermove', function (event) {
      var rect = playpen.getBoundingClientRect();
      var relX = event.clientX - rect.left;
      var relY = event.clientY - rect.top;

      if (laserDot) {
        laserDot.classList.add('is-active');
        laserDot.style.left = relX + 'px';
        laserDot.style.top = relY + 'px';
      }

      var nx = ((relX / rect.width) - 0.5) * 2;
      var ny = ((relY / rect.height) - 0.5) * 2;
      var mag = Math.hypot(nx, ny);
      var clampedMag = Math.min(1, mag);
      var angle = Math.atan2(ny, nx);

      targetX = Math.cos(angle) * clampedMag * 6.5;
      targetY = Math.sin(angle) * clampedMag * 5;
      targetScale = mag < 0.35 ? 1.24 : 1;

      if (laserStatus) {
        laserStatus.textContent = mag < 0.28 ? 'Pupils locked · ready to pounce!' : 'Tracking red dot...';
      }

      ensureTick();
    });

    playpen.addEventListener('pointerleave', function () {
      if (laserDot) laserDot.classList.remove('is-active');
      targetX = 0;
      targetY = 0;
      targetScale = 1;
      if (laserStatus) laserStatus.textContent = 'Move inside the box — Mina is locked on';
      ensureTick();
    });

    playpen.addEventListener('click', function (event) {
      var rect = playpen.getBoundingClientRect();
      var x = event.clientX - rect.left;
      var y = event.clientY - rect.top;

      if (openEyesGroup && happyEyesGroup) {
        openEyesGroup.style.display = 'none';
        happyEyesGroup.style.display = 'block';
        setTimeout(function () {
          openEyesGroup.style.display = '';
          happyEyesGroup.style.display = 'none';
        }, 420);
      }

      var bubble = document.createElement('span');
      bubble.className = 'purr-bubble';
      bubble.style.left = Math.min(Math.max(x, 60), rect.width - 60) + 'px';
      bubble.style.top = Math.min(Math.max(y, 44), rect.height - 24) + 'px';
      bubble.textContent = playpenReactions[reactionIdx % playpenReactions.length];
      reactionIdx += 1;
      playpen.appendChild(bubble);

      setTimeout(function () {
        if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
      }, 1150);
    });
  }
})();
