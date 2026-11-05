// Scena case study: renders js/scena-content.js into the page, using the Shopcord page classes from css/shopcord.css.
// A missing image source or file becomes a labelled placeholder at the same ratio, never a broken-image icon.
(function () {
  var C = window.SCENA_CONTENT;
  var root = document.getElementById('scena-root');
  if (!C || !root) return;

  function e(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function map(a, fn) { return a.map(fn).join(''); }
  function paras(a) { return map(a, function (p) { return '<p>' + e(p) + '</p>'; }); }
  // A hyphenated word never breaks at its hyphen
  function keepHyphens(s) { return e(s).replace(/\S+-\S+/g, function (w) { return '<span class="sc-nowrap">' + w + '</span>'; }); }
  function bullets(a) { return '<div class="sc-prose"><ul>' + map(a, function (i) { return '<li>' + e(i) + '</li>'; }) + '</ul></div>'; }

  function placeholder(img) {
    return '<div class="sc-box" style="--r:' + img.w + ' / ' + img.h + '"><span class="sc-cap sc-slot-n">Placeholder</span><span class="sc-slot-t">' + e(img.label) + '</span></div>';
  }

  function media(img) {
    if (!img.src) return placeholder(img);
    // Markers go on Shopcord's annotation layer, placed in % of the screen's height
    var marks = img.marks ? '<div class="sc-anno" aria-hidden="true">' + map(img.marks, function (m) {
      return '<span class="sc-mark sc-mark--' + (m.side === 'right' ? 'out' : 'left') + '" style="--y:' + m.y + '%">' + m.n + '</span>';
    }) + '</div>' : '';
    return '<div class="sn-media"><img src="' + e(img.src) + '" width="' + img.w + '" height="' + img.h + '" alt="' + e(img.alt) + '" loading="lazy" decoding="async" data-label="' + e(img.label) + '">' + marks + '</div>';
  }

  // Shopcord's grey panel, which also gives a screen its radius and shadow
  function panel(img, cls) {
    return '<div class="sc-box sc-box--contain is-filled ' + cls + '">' + media(img) + '</div>';
  }

  function slot(inner, caption) {
    return '<figure class="sc-slot">' + inner + (caption ? '<figcaption>' + e(caption) + '</figcaption>' : '') + '</figure>';
  }

  // A full screen
  function stage(item) { return slot(panel(item.image, 'sn-stage'), item.caption); }

  // A close-up of part of a screen
  function closeUp(item) { return slot(panel(item.image, 'sn-crop'), item.caption); }

  // A photo slot
  function figure(item) { return slot(media(item.image), item.caption); }

  function notes(items) {
    return '<ul class="sc-duo-text sn-small sn-numbered">' + map(items, function (i) {
      return '<li><span class="sc-mark" aria-hidden="true">' + i.n + '</span><span><strong>' + e(i.t) + '.</strong> ' + e(i.d) + '</span></li>';
    }) + '</ul>';
  }

  // One ledger row: the label column and the body column from shopcord.css
  function row(tag, id, label, body) {
    return '<' + tag + ' class="sc-sec" id="' + id + '"><p class="sc-cap sc-label">' + e(label) + '</p><div class="sc-body">' + body + '</div></' + tag + '>';
  }

  function overview() {
    var o = C.overview;
    return '<header class="sc-hero" id="overview">' +
      '<p class="sc-cap sc-kicker rv">' + e(o.kicker) + '</p>' +
      '<h1 class="rv">' + e(o.title) + '</h1>' +
      '<div class="sc-thesis rv">' +
        '<p class="sn-tagline">' + o.tagline.map(function (t) { return '<span class="sc-nowrap">' + e(t) + '</span>'; }).join(' ') + '</p>' +
        '<p class="sn-description">' + keepHyphens(o.description[0]) + ' <span class="sn-line">' + keepHyphens(o.description[1]) + '</span></p>' +
      '</div>' +
      '<dl class="sc-meta rv">' + map(o.meta, function (m) { return '<div><dt class="sc-cap">' + e(m.label) + '</dt><dd>' + e(m.value) + '</dd></div>'; }) + '</dl>' +
      '<figure class="sc-slot rv">' +
        '<div class="sc-box sc-box--contain is-filled sn-screens" role="group" aria-label="' + e(o.screensLabel) + '">' + map(o.screens, media) + '</div>' +
        '<figcaption class="sc-figrow"><span>' + e(o.caption) + '</span><span class="sc-protos">' +
          '<a href="' + e(C.links.demo) + '" target="_blank" rel="noopener" aria-label="' + e(o.demoLabel) + ', opens in a new tab">' + e(o.demoLabel) + ' <span aria-hidden="true">↗</span></a>' +
          '<a href="' + e(C.links.video) + '" target="_blank" rel="noopener" aria-label="' + e(o.videoLabel) + ', opens in a new tab">' + e(o.videoLabel) + ' <span aria-hidden="true">↗</span></a>' +
        '</span></figcaption>' +
      '</figure>' +
      '</header>';
  }

  function problem() {
    var p = C.problem;
    return row('section', 'problem', p.label,
      '<h2>' + e(p.heading) + '</h2>' +
      '<div class="sc-prose"><p>' + e(p.body[0]) + '</p><p><strong>“' + e(p.question) + '”</strong></p><p>' + e(p.body[1]) + '</p></div>' +
      figure({ image: p.context }) +
      '<div class="sc-duo sn-even sn-pair">' + map(p.pair, function (f) { return figure(f); }) + '</div>' +
      '<h3>' + e(p.pivotHeading) + '</h3>' +
      '<div class="sc-prose"><p>' + e(p.pivotBody) + '</p></div>' +
      '<dl class="sc-compare sn-compare">' + map(p.compare, function (c) {
        return '<div><dt><span class="sc-cap">' + e(c.note) + '</span>' + e(c.title) + '</dt><dd>' + bullets(c.items) + '</dd></div>';
      }) + '</dl>');
  }

  function flow() {
    var f = C.flow;
    // explicit roles: the stacked layout sets display:block, which would otherwise drop the table semantics
    return row('section', 'flow', f.label,
      '<h2>' + e(f.heading) + '</h2>' +
      '<div class="sc-scroll"><table class="sn-map" role="table" aria-label="' + e(f.heading) + '"><thead role="rowgroup"><tr role="row">' + map(f.columns, function (c) { return '<th scope="col" role="columnheader">' + e(c) + '</th>'; }) + '</tr></thead><tbody role="rowgroup">' +
      map(f.rows, function (r) {
        return '<tr role="row"><th scope="row" role="rowheader">' + e(r[0]) + '</th><td role="cell" data-label="' + e(f.columns[1]) + '">' + e(r[1]) + '</td><td role="cell" data-label="' + e(f.columns[2]) + '">' + e(r[2]) + '</td></tr>';
      }) + '</tbody></table></div>');
  }

  function decisionA(a) {
    return row('article', 'decision-a', a.label,
      '<h3 class="sn-dh">' + e(a.heading) + '</h3>' +
      '<div class="sc-prose">' + paras(a.body) + '</div>' +
      '<div class="sc-duo sn-even">' + map(a.items, function (i) {
        return '<div class="sc-duo-item">' + stage(i) + notes(i.notes) + '</div>';
      }) + '</div>');
  }

  function decisionB(b) {
    return row('article', 'decision-b', b.label,
      '<h3 class="sn-dh">' + e(b.heading) + '</h3>' +
      '<div class="sc-prose">' + paras(b.body) + '</div>' +
      '<div class="sc-duo sn-even sn-center">' + stage(b.main) + notes(b.hierarchy) + '</div>' +
      '<div class="sc-duo sn-even">' +
        '<div class="sc-duo-item">' + closeUp(b.supportA) + '<p class="sc-duo-text sn-small">' + e(b.supportText) + '</p></div>' +
        '<div class="sc-duo-item">' + closeUp(b.supportB) + '<p class="sc-duo-text sn-small">' + e(b.historyText) + '</p></div>' +
      '</div>');
  }

  function decisionC(c) {
    return row('article', 'decision-c', c.label,
      '<h3 class="sn-dh">' + e(c.heading) + '</h3>' +
      '<div class="sc-prose"><p>' + e(c.lead) + '</p></div>' +
      '<div class="sc-duo sn-even">' + map([c.left, c.right], function (s) {
        return '<figure class="sc-slot sn-titled">' + panel(s.image, 'sn-stage') + '<figcaption><strong class="sc-role-t">' + e(s.title) + '</strong><span class="sc-role-d">' + e(s.caption) + '</span></figcaption></figure>';
      }) + '</div>' +
      '<div class="sc-ex"><span class="sc-ex-label">' + e(c.changesLabel) + '</span><span class="sc-ex-text">' + map(c.changes, function (i) {
        return '<span class="sc-ex-row"><span class="sc-mark" aria-hidden="true">' + i.n + '</span><span><b>' + e(i.t) + '.</b> ' + e(i.d) + '</span></span>';
      }) + '</span></div>' +
      '<h4 class="sn-h4">' + e(c.rulesHeading) + '</h4>' +
      '<div class="sc-scroll"><table class="sn-rules" aria-label="' + e(c.rulesHeading) + '"><thead><tr>' + map(c.rulesColumns, function (h) { return '<th scope="col">' + e(h) + '</th>'; }) + '</tr></thead><tbody>' +
        map(c.rules, function (r) {
          return '<tr class="' + (r.on ? '' : 'is-off') + '"><th scope="row">' + e(r.name) + '</th><td><span class="sn-rule-icon" aria-hidden="true">' + (r.on ? '✓' : '✕') + '</span> ' + e(r.state) + '</td></tr>';
        }) + '</tbody></table></div>' +
      '<div class="sc-prose">' + paras(c.why) + '</div>' +
      '<h4 class="sn-h4">' + e(c.distinctHeading) + '</h4>' +
      '<div class="sc-two sn-cards">' + map(c.distinct, function (x) {
        return '<div><strong class="sc-role-t">' + e(x.t) + '</strong><p>' + e(x.d) + '</p></div>';
      }) + '</div>' +
      '<p class="sc-note">' + e(c.reasonsLabel) + ': ' + map(c.reasons, function (r, i) { return (i ? ' · ' : '') + e(r); }) + '.</p>');
  }

  function decisions() {
    var d = C.decisions;
    return '<section id="decisions">' +
      row('div', 'decisions-intro', d.label, '<h2>' + e(d.heading) + '</h2><div class="sc-prose"><p>' + e(d.note) + '</p></div>') +
      decisionA(d.a) + decisionB(d.b) + decisionC(d.c) +
      '</section>';
  }

  function constraints() {
    var k = C.constraints;
    return row('section', 'constraints', k.label,
      '<h2>' + e(k.heading) + '</h2>' +
      map(k.cases, function (x) {
        return '<h3>' + e(x.title) + '</h3>' +
          '<dl class="sn-case"><div><dt>' + e(k.labels[0]) + '</dt><dd>' + e(x.constraint) + '</dd></div>' +
          '<div><dt>' + e(k.labels[1]) + '</dt><dd>' + e(x.response) + '</dd></div>' +
          '<div><dt>' + e(k.labels[2]) + '</dt><dd>' + closeUp(x.evidence) + (x.extra ? figure(x.extra) : '') + '</dd></div></dl>';
      }) +
      '<div class="sc-prose sn-collab"><p><strong>' + e(k.collaborationLabel) + '.</strong> ' + e(k.collaboration) + '</p></div>');
  }

  function validation() {
    var v = C.validation;
    return row('section', 'validation', v.label,
      '<h2>' + e(v.heading) + '</h2>' +
      '<h3>' + e(v.demonstrated.title) + '</h3>' + bullets(v.demonstrated.items) +
      '<div class="sc-two sn-cards">' + map(v.open, function (c) {
        return '<div><h3 class="sc-role-t">' + e(c.title) + '</h3>' + bullets(c.items) + '</div>';
      }) + '</div>' +
      '<div class="sc-prose"><p>' + e(v.note) + '</p></div>' +
      (v.reflection
        ? '<h3>' + e(v.reflectionLabel) + '</h3><div class="sc-prose"><p>' + e(v.reflection) + '</p></div>'
        : '<div class="sc-ex"><span class="sc-ex-label">' + e(v.reflectionLabel) + '</span><span class="sc-ex-text"><span>' + e(v.reflectionSlot) + '</span></span></div>'));
  }

  function next() {
    return '<div class="sc-next"><span class="sc-cap">Next project</span><a href="' + e(C.links.next.href) + '">' + e(C.links.next.label) + ' <span aria-hidden="true">→</span></a></div>';
  }

  root.innerHTML = overview() + problem() + flow() + decisions() + constraints() + validation() + next();

  // The hero screens scroll sideways on phones, and only then need to take keyboard focus
  var screens = root.querySelector('.sn-screens');
  function focusable() {
    if (screens.scrollWidth > screens.clientWidth) screens.setAttribute('tabindex', '0');
    else screens.removeAttribute('tabindex');
  }
  focusable();
  window.addEventListener('resize', focusable);

  // error events do not bubble, so listen in the capture phase
  root.addEventListener('error', function (ev) {
    var img = ev.target;
    if (!img || img.tagName !== 'IMG') return;
    var box = img.closest('.sn-media');
    if (!box) return;
    var holder = document.createElement('div');
    holder.innerHTML = placeholder({ w: img.getAttribute('width'), h: img.getAttribute('height'), label: img.getAttribute('data-label') });
    box.textContent = '';
    box.appendChild(holder.firstChild); // box keeps the screen's size limits
  }, true);

  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
})();
