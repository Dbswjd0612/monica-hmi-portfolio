// Scena wireframe: the preview bar only. The page content is plain HTML in index.html.
(function () {
  var params = new URLSearchParams(location.search);

  // Same as js/scena.js: the hero screens scroll sideways on phones, and only then need keyboard focus
  var screens = document.querySelector('.sn-screens');
  function focusable() {
    if (screens.scrollWidth > screens.clientWidth) screens.setAttribute('tabindex', '0');
    else screens.removeAttribute('tabindex');
  }
  focusable();
  window.addEventListener('resize', focusable);

  // The copy of this page inside the mobile frame has no bar
  if (params.has('embed')) {
    document.documentElement.classList.add('wf-embed');
    return;
  }

  var bar = document.getElementById('wf-bar');
  var segs = Array.prototype.slice.call(bar.querySelectorAll('.wf-map a'));
  var buttons = Array.prototype.slice.call(bar.querySelectorAll('.wf-view button'));
  var page = document.querySelector('.sc-page');
  var phone = document.getElementById('wf-phone');
  var frame = phone.querySelector('iframe');
  var mobile = false;
  var on = 0; // the section at the top of the view
  var landing = null; // where to land when the frame finishes loading

  function currentDoc() { return mobile ? frame.contentDocument : document; }
  function sections() {
    var doc = currentDoc();
    if (!doc) return null;
    var els = segs.map(function (s) { return doc.getElementById(s.getAttribute('data-sec')); });
    return els.every(Boolean) ? els : null;
  }

  // Each block's width follows its section's real height
  function measure() {
    var els = sections();
    if (!els) return;
    var heights = els.map(function (el) { return el.getBoundingClientRect().height; });
    var total = heights.reduce(function (a, b) { return a + b; }, 0);
    segs.forEach(function (seg, i) {
      var pct = Math.round(heights[i] / total * 100);
      seg.style.flexGrow = Math.max(heights[i], 1);
      seg.querySelector('i').textContent = pct + '%';
      seg.title = seg.getAttribute('data-name') + ', ' + pct + '% of the page';
    });
    track();
  }

  // The block for the section at the top of the view stays dark
  function track() {
    var els = sections();
    if (!els) return;
    var line = (mobile ? 0 : bar.offsetHeight) + 80;
    on = 0;
    els.forEach(function (el, i) { if (el.getBoundingClientRect().top <= line) on = i; });
    segs.forEach(function (seg, i) {
      seg.classList.toggle('is-on', i === on);
      if (i === on) seg.setAttribute('aria-current', 'true');
      else seg.removeAttribute('aria-current');
    });
  }

  function listenInFrame() {
    var w = frame.contentWindow;
    w.addEventListener('scroll', track, { passive: true });
    w.addEventListener('resize', measure);
    frame.contentDocument.fonts.ready.then(measure);
    measure();
    if (landing !== null) { land(landing); landing = null; }
  }
  frame.addEventListener('load', listenInFrame);

  // Switching views stays on the same section, so the two reading orders can be compared
  function land(i) {
    var els = sections();
    if (!els) return;
    if (i === 0) (mobile ? frame.contentWindow : window).scrollTo(0, 0);
    else els[i].scrollIntoView();
    track();
  }

  function setView(view) {
    var from = on;
    mobile = view === 'mobile';
    page.hidden = mobile;
    phone.hidden = !mobile;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-view') === view)); });
    history.replaceState(null, '', mobile ? '?view=mobile' : location.pathname);
    window.scrollTo(0, 0);
    if (mobile && !frame.getAttribute('src')) {
      landing = from;
      frame.setAttribute('src', location.pathname + '?embed');
      return;
    }
    measure();
    land(from);
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { setView(b.getAttribute('data-view')); });
  });

  // In the frame, a block jumps inside the frame
  segs.forEach(function (seg, i) {
    seg.addEventListener('click', function (ev) {
      if (!mobile) return;
      ev.preventDefault();
      var els = sections();
      if (els) els[i].scrollIntoView();
    });
  });

  window.addEventListener('scroll', track, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);
  document.fonts.ready.then(measure);
  if (params.get('view') === 'mobile') setView('mobile');
  else measure();
})();
