// Shopcord Linesheet: image slots.
// Each slot renders a visible placeholder until its file exists in /public/images/shopcord/.
// Add a file with the expected name and it replaces the placeholder. No HTML edit needed.
// data-src may list several candidates separated by commas (slot 9 tries .mp4, then .gif).
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fill(box, el) {
    box.textContent = '';
    box.appendChild(el);
    box.classList.add('is-filled');
    // optional figures (data-optional) stay hidden until their file loads
    var fig = box.closest('[data-optional]');
    if (fig) fig.hidden = false;
    if (box.hasAttribute('data-anno')) annotate(box, el);
  }

  // Optional annotations: data-anno names a <template> of .sc-mark markers positioned in % of the image.
  // They go on a layer that is resized and moved with the loaded image, so they stay aligned at every width.
  function annotate(box, media) {
    var tpl = document.getElementById(box.getAttribute('data-anno'));
    if (!tpl || !tpl.content) return;
    var layer = document.createElement('div');
    layer.className = 'sc-anno';
    layer.setAttribute('aria-hidden', 'true');
    layer.appendChild(tpl.content.cloneNode(true));
    box.appendChild(layer);
    function sync() {
      var b = box.getBoundingClientRect(), m = media.getBoundingClientRect();
      layer.style.left = (m.left - b.left - box.clientLeft) + 'px';
      layer.style.top = (m.top - b.top - box.clientTop) + 'px';
      layer.style.width = m.width + 'px';
      layer.style.height = m.height + 'px';
    }
    sync();
    if (window.ResizeObserver) { var ro = new ResizeObserver(sync); ro.observe(box); ro.observe(media); }
    else window.addEventListener('resize', sync);
  }

  function load(box, srcs, i) {
    if (i >= srcs.length) return; // nothing found: the placeholder stays
    var src = srcs[i];
    var alt = box.getAttribute('data-alt') || '';

    if (/\.(mp4|webm)$/i.test(src)) {
      var video = document.createElement('video');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', alt);
      if (reduce) video.controls = true;
      video.addEventListener('loadedmetadata', function () {
        fill(box, video);
        if (!reduce) { var p = video.play(); if (p && p.catch) p.catch(function () { video.controls = true; }); }
      });
      video.addEventListener('error', function () { load(box, srcs, i + 1); });
      video.src = src;
      return;
    }

    var img = new Image();
    img.alt = alt;
    img.decoding = 'async';
    img.onload = function () { fill(box, img); };
    img.onerror = function () { load(box, srcs, i + 1); };
    img.src = src;
  }

  function init() {
    var boxes = document.querySelectorAll('.sc-box[data-src], .sc-icon[data-src]');
    Array.prototype.forEach.call(boxes, function (box) {
      var srcs = box.getAttribute('data-src').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      load(box, srcs, 0);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

// Shopcord Linesheet: prototype modal.
// Buttons with data-proto-src open that local file in one reusable <dialog>.
// The iframe loads only on open and is cleared on close. The parent URL, hash and scroll stay as they are.
(function () {
  var TIMEOUT_MS = 20000;

  function init() {
    var dialog = document.getElementById('sc-proto');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    var frame = dialog.querySelector('.sc-proto-frame');
    var titleEl = dialog.querySelector('.sc-proto-title');
    var loading = dialog.querySelector('[data-proto-loading]');
    var error = dialog.querySelector('[data-proto-error]');
    var opener = null;
    var timer = null;
    var token = 0;

    function showState(state) {
      loading.hidden = state !== 'loading';
      error.hidden = state !== 'error';
    }

    // Escape pressed while focus is inside the (same-origin) prototype
    function frameKeydown(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
    }

    function open(btn) {
      var src = btn.getAttribute('data-proto-src');
      var title = btn.getAttribute('data-proto-title') || 'Prototype';
      var my = ++token;
      opener = btn;
      titleEl.textContent = title;
      frame.title = title;
      dialog.setAttribute('data-size', btn.getAttribute('data-proto-size') || 'wide');
      showState('loading');
      document.documentElement.classList.add('sc-proto-open');
      dialog.showModal();
      dialog.querySelector('[data-proto-close]').focus();

      clearTimeout(timer);
      timer = setTimeout(function () { if (my === token) showState('error'); }, TIMEOUT_MS);

      // check the file exists before loading it, so a missing file shows the error state
      fetch(src.split('#')[0], { method: 'HEAD', cache: 'no-store' }).then(function (r) {
        if (my !== token) return;
        if (!r.ok) { clearTimeout(timer); showState('error'); return; }
        frame.onload = function () {
          if (my !== token) return;
          // ignore the blank page left by the previous close; wait for the prototype itself
          var href = '';
          try { href = frame.contentWindow.location.href; } catch (err) {}
          if (href === 'about:blank') return;
          clearTimeout(timer);
          showState('none');
          try { frame.contentWindow.document.addEventListener('keydown', frameKeydown); } catch (err) {}
        };
        frame.src = src;
      }).catch(function () {
        if (my === token) { clearTimeout(timer); showState('error'); }
      });
    }

    // runs synchronously on every close path; safe to call twice
    function cleanup() {
      token++;
      clearTimeout(timer);
      try { frame.contentWindow.document.removeEventListener('keydown', frameKeydown); } catch (err) {}
      frame.onload = null;
      if (frame.getAttribute('src') !== 'about:blank') frame.src = 'about:blank';
      showState('none');
      document.documentElement.classList.remove('sc-proto-open');
      if (opener) { var o = opener; opener = null; o.focus({ preventScroll: true }); }
    }

    function close() {
      if (dialog.open) dialog.close();
      cleanup();
    }

    dialog.addEventListener('close', cleanup);

    // Escape while focus is in the parent page: the dialog's own cancel event
    dialog.addEventListener('cancel', function (e) { e.preventDefault(); close(); });

    // click on the dim backdrop (outside the card) closes
    dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });

    dialog.querySelector('[data-proto-close]').addEventListener('click', close);

    Array.prototype.forEach.call(document.querySelectorAll('[data-proto-src]'), function (btn) {
      btn.addEventListener('click', function () { open(btn); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
