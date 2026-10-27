/* JDesigns theme behaviour — Oct 27 2026 preview */
(function () {
  var SP = ['#c97b5a', '#d9a066', '#bcb06a', '#9baa6b', '#6f9a68'];   // terracotta > honey > golden olive > olive > leaf
  var src = (document.currentScript && document.currentScript.src) || '';
  var isHttp = /^https?:$/.test(location.protocol);
  var ROOT = isHttp ? '/' : src.replace(/assets\/theme\.js.*$/, '');
  function U(p) { return isHttp ? p.replace(/index\.html/, '').replace(/\.html/, '') : p; }

  // rotate headshots: every page shows a different one; the homepage steps to the next on each visit
  var IDX = (function () { var p = location.pathname, h = 0; for (var i = 0; i < p.length; i++) h = (h * 31 + p.charCodeAt(i)) >>> 0; return h % 6; })();
  if (document.body.hasAttribute('data-home')) {
    try { var k = (parseInt(localStorage.getItem('jd-hs') || '-1', 10) + 1) % 6; localStorage.setItem('jd-hs', k); IDX = k; } catch (e) {}
  }
  document.querySelectorAll('img').forEach(function (im) {
    var s = im.getAttribute('src') || '', m;
    if (/assets\/jasmineheadshot\.png$/.test(s)) im.src = ROOT + 'assets/rot/sq-' + (IDX + 1) + '.jpg';
    else if (/assets\/jasmine-portrait-full\.png$/.test(s)) im.src = ROOT + 'assets/rot/portrait-' + (IDX + 1) + '.jpg';
    else if ((m = s.match(/assets\/photos\/jasmine-0([1-6])\.jpg$/))) im.src = ROOT + 'assets/photos/jasmine-0' + (((+m[1] - 1 + IDX) % 6) + 1) + '.jpg';
  });

  function hex(c) { return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16)]; }
  function at(f) {
    f = Math.max(0, Math.min(1, f)); var x = f * (SP.length - 1), i = Math.min(SP.length - 2, Math.floor(x)), t = x - i;
    var a = hex(SP[i]), b = hex(SP[i + 1]);
    return 'rgb(' + a.map(function (v, k) { return Math.round(v + (b[k] - v) * t); }).join(',') + ')';
  }

  // progress bar
  var bar = document.createElement('div'); bar.id = 'jd-progress'; document.body.appendChild(bar);
  function onScroll() {
    var h = document.documentElement, max = Math.max(1, h.scrollHeight - h.clientHeight), p = Math.min(1, (window.scrollY || 0) / max);
    bar.style.width = (p * 100) + '%';
    h.style.setProperty('--scroll-acc', at(p));
  }

  // each section / h2 gets the spectrum colour for where it sits on the page
  function colourSections() {
    var h = document.documentElement, total = Math.max(1, h.scrollHeight);
    var secs = document.querySelectorAll('section.band');
    secs.forEach(function (s, i) { s.style.setProperty('--acc', at(secs.length > 1 ? i / (secs.length - 1) : 0)); });
    document.querySelectorAll('h2').forEach(function (e) {
      if (e.closest('section.band')) return;
      var y = e.getBoundingClientRect().top + (window.scrollY || 0);
      e.style.setProperty('--acc', at(y / total));
    });
  }

  var PAGES = [
    ['ads', 'Meta Ads', 'meta-ads-fix.html', '#c97b5a'],
    ['repair', 'Account Repair', 'meta-checklist.html', '#d9a066'],
    ['content', 'Content & Pinterest', 'pinterest-case-studies.html', '#9baa6b'],
    ['systems', 'AI Systems', 'systemize-your-business.html', '#6f9a68'],
    ['general', 'Free Resources', 'index.html#free-resources', '#c9b29a']
  ];
  var NEXT = {
    ads: ['Meta Ads, next steps', 'See <em>real results</em>', [['See real campaign numbers', 'meta-ads-case-studies.html', '#c97b5a'], ['Get your ads audited', 'work-with-me.html', '#d9a066'], ['Run the free health check', 'meta-health-checker.html', '#9baa6b']]],
    repair: ['Account repair, next steps', 'Get <em>unlocked</em>', [['Run the free health check', 'meta-health-checker.html', '#d9a066'], ['Emergency checklist', 'meta-checklist.html', '#9baa6b'], ['Get it reviewed by me', 'work-with-me.html', '#c97b5a']]],
    content: ['Content, next steps', 'Build your <em>content system</em>', [['Pinterest results', 'pinterest-case-studies.html', '#9baa6b'], ['Work with me on content', 'work-with-me.html', '#d9a066'], ['Read the blog', 'blog/index.html', '#c97b5a']]],
    systems: ['AI systems, next steps', 'Build <em>your system</em>', [['Build your first AI agent', 'build-your-first-agent.html', '#6f9a68'], ['Systemize your business', 'systemize-your-business.html', '#d9a066'], ['How I run this', 'how-i-run-this.html', '#9baa6b']]],
    general: ['Next steps', 'Find what <em>you need</em>', [['Tell me what is wrong', 'index.html#start-here', '#9baa6b'], ['Browse the blog', 'blog/index.html', '#c97b5a'], ['Work with me', 'work-with-me.html', '#d9a066']]]
  };

  var topic = document.body.getAttribute('data-topic') || 'general';
  var home = document.body.hasAttribute('data-home');

  if (!home) {
    // topic ribbon under the header
    var rb = document.createElement('div'); rb.id = 'jd-ribbon';
    rb.innerHTML = '<div class="in"><span class="lbl">Jump to</span>' + PAGES.map(function (p) {
      return '<a href="' + ROOT + U(p[2]) + '" style="--c:' + p[3] + '" class="' + (p[0] === topic ? 'on' : '') + '">' + p[1] + '</a>';
    }).join('') + '</div>';
    var nav = document.querySelector('nav, .nav, .jdgnav');
    if (nav && nav.parentNode) nav.parentNode.insertBefore(rb, nav.nextSibling); else document.body.insertBefore(rb, document.body.firstChild);

    // where to next
    var n = NEXT[topic] || NEXT.general;
    var box = document.createElement('div'); box.id = 'jd-next';
    box.innerHTML = '<div class="in"><div class="eb">' + n[0] + '</div><h2>' + n[1] + '</h2><div class="grid">' +
      n[2].map(function (c) { return '<a href="' + ROOT + U(c[1]) + '" style="--c:' + c[2] + '"><b>' + c[0] + '</b><span>Go &rarr;</span></a>'; }).join('') + '</div></div>';
    var foot = document.querySelector('footer, .footer');
    if (foot && foot.parentNode) foot.parentNode.insertBefore(box, foot); else document.body.appendChild(box);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { colourSections(); onScroll(); });
  window.addEventListener('load', function () { colourSections(); onScroll(); });
  colourSections(); onScroll();
})();
