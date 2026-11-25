(function () {
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var navToggle = document.getElementById('nav-toggle');
  var navDrawer = document.getElementById('nav-drawer');
  var copyEmailBtn = document.getElementById('copy-email-btn');
  var copyContactBtn = document.getElementById('copy-contact-btn');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxTitle = document.getElementById('lightbox-title');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxClose = document.getElementById('lightbox-close');
  var lastFocusedElement = null;

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    updateThemeIcon(theme);
    try {
      localStorage.setItem('yiran-theme', theme);
    } catch (e) {}
  }

  var initialTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  updateThemeIcon(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  function setDrawerOpen(open) {
    if (!navToggle || !navDrawer) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navDrawer.classList.toggle('is-open', open);
    navDrawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  if (navToggle && navDrawer) {
    navToggle.addEventListener('click', function () {
      var isOpen = navDrawer.classList.contains('is-open');
      setDrawerOpen(!isOpen);
    });

    navDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setDrawerOpen(false);
      });
    });

    document.addEventListener('click', function (event) {
      if (
        navDrawer.classList.contains('is-open') &&
        !navDrawer.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        setDrawerOpen(false);
      }
    });
  }

  function wireCopyButton(button, email) {
    if (!button) return;
    var labelEl = button.querySelector('[data-copy-label]');
    var defaultLabel = labelEl ? labelEl.textContent : button.textContent;
    var resetTimer = null;

    button.addEventListener('click', function () {
      function showCopied() {
        button.classList.add('is-copied');
        if (labelEl) {
          labelEl.textContent = 'Copied';
        }
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          button.classList.remove('is-copied');
          if (labelEl) {
            labelEl.textContent = defaultLabel;
          }
        }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showCopied).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }

      function fallbackCopy() {
        var input = document.createElement('textarea');
        input.value = email;
        input.setAttribute('readonly', '');
        input.style.position = 'absolute';
        input.style.left = '-9999px';
        document.body.appendChild(input);
        input.select();
        try {
          document.execCommand('copy');
          showCopied();
        } catch (e) {}
        document.body.removeChild(input);
      }
    });
  }

  wireCopyButton(copyEmailBtn, 'y1ran@bu.edu');
  wireCopyButton(copyContactBtn, 'y1ran@bu.edu');

  function openLightbox(trigger) {
    if (!lightbox || !lightboxImg) return;
    var src = trigger.getAttribute('data-full-src') || '';
    var alt = trigger.getAttribute('data-alt') || '';
    var title = trigger.getAttribute('data-title') || '';
    var caption = trigger.getAttribute('data-caption') || '';

    lastFocusedElement = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCaption) lightboxCaption.textContent = caption;

    lightbox.hidden = false;
    requestAnimationFrame(function () {
      lightbox.classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!lightbox.classList.contains('is-open')) {
        lightbox.hidden = true;
        if (lightboxImg) lightboxImg.removeAttribute('src');
      }
    }, 160);
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  document.querySelectorAll('[data-lightbox-trigger]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      openLightbox(trigger);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (lightbox && !lightbox.hidden) {
        closeLightbox();
      }
      if (navDrawer && navDrawer.classList.contains('is-open')) {
        setDrawerOpen(false);
      }
    }
  });

  var sectionIds = ['about', 'research', 'experience', 'projects', 'contact'];
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var sections = sectionIds
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', isActive);
    });
  }

  if ('IntersectionObserver' in window && sections.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-22% 0px -64% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
