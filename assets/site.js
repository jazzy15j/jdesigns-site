/* JDesigns Strategist — shared site behavior (nav, reveal, count-up, scramble-text, sticky CTA) */
(function () {

  // mobile nav toggle
  var btn = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (btn && links) {
    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); });
    });
  }

  // scroll progress bar
  var bar = document.getElementById('storyProgress');
  if (bar) {
    var onScroll = function () {
      var h = document.documentElement;
      var pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = Math.min(pct, 100) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // reveal-on-scroll
  var revealEls = document.querySelectorAll('.reveal:not(.in)');
  if (revealEls.length) {
    var revealIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: .2 });
    revealEls.forEach(function (el) { revealIo.observe(el); });
  }

  // count-up numbers: any element with data-count inside a wrapper with data-count-group
  document.querySelectorAll('[data-count-group]').forEach(function (wrap) {
    var done = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !done) {
          done = true;
          wrap.classList.add('in');
          wrap.querySelectorAll('[data-count]').forEach(function (el) {
            var raw = el.getAttribute('data-count');
            var target = parseFloat(raw);
            var suffix = el.getAttribute('data-suffix') || '';
            var isDecimal = raw.indexOf('.') > -1;
            var dur = 1100, t0 = null;
            function step(ts) {
              if (!t0) t0 = ts;
              var p = Math.min((ts - t0) / dur, 1);
              var val = target * p;
              el.textContent = (isDecimal ? val.toFixed(2) : Math.round(val).toLocaleString('en-US')) + suffix;
              if (p < 1) requestAnimationFrame(step);
            }
            setTimeout(function () { requestAnimationFrame(step); }, 250);
          });
        }
      });
    }, { threshold: .5 });
    io.observe(wrap);
  });

  // scramble-text reveal — any element with [data-scramble-on-view]
  function scramble(el) {
    var finalText = el.getAttribute('data-scramble-text') || el.textContent;
    el.setAttribute('data-scramble-text', finalText);
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var totalFrames = 16;
    var frame = 0;
    var len = finalText.length;
    function revealAt(i) { return Math.floor(totalFrames * (i / len)); }
    function tick() {
      var out = '';
      for (var i = 0; i < len; i++) {
        var ch = finalText[i];
        if (ch === ' ') { out += ' '; continue; }
        out += (frame >= revealAt(i) + 5) ? ch : chars[Math.floor(Math.random() * chars.length)];
      }
      el.textContent = out;
      frame++;
      if (frame < totalFrames + 6) requestAnimationFrame(tick);
      else el.textContent = finalText;
    }
    tick();
  }
  var scrambleEls = document.querySelectorAll('[data-scramble-on-view]');
  if (scrambleEls.length) {
    var scrambleIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { scramble(e.target); scrambleIo.unobserve(e.target); }
      });
    }, { threshold: .5 });
    scrambleEls.forEach(function (el) { scrambleIo.observe(el); });
  }

  // generic "pop in on view" helper for simple visual rows (data-pop-in)
  document.querySelectorAll('[data-pop-in]').forEach(function (el) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) el.classList.add('in'); });
    }, { threshold: .4 });
    io.observe(el);
  });

  // parallax depth on the hero photo — subtle, capped, skipped for reduced-motion users
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var heroAvatar = document.querySelector('.hero-avatar-lg, .hero-full .profile-avatar');
  if (heroAvatar && !prefersReducedMotion) {
    var ticking = false;
    var applyParallax = function () {
      var y = window.scrollY;
      var offset = Math.min(y * 0.18, 70);
      var scale = Math.max(1 - y / 2400, 0.85);
      heroAvatar.style.transform = 'translateY(' + offset + 'px) scale(' + scale + ')';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(applyParallax); ticking = true; }
    }, { passive: true });
    applyParallax();
  }

  // persistent CTA — shows once the hero scrolls out of view
  var cta = document.getElementById('stickyCta');
  var hero = document.querySelector('.hero-full, .hero');
  if (cta && hero) {
    var ctaIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { cta.classList.toggle('show', !e.isIntersecting); });
    }, { threshold: 0 });
    ctaIo.observe(hero);
  }

})();
