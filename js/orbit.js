// ORBIT case study — page behavior (ported 1:1 from the approved build)
(function () {
  var scaleProto = function () {
    var f = document.getElementById('orbit-proto');
    if (!f || !f.parentElement) return;
    var w = f.parentElement.clientWidth;
    if (w) f.style.transform = 'scale(' + (w / 1440) + ')';
  };

  function initProto() {
    scaleProto();
    window.addEventListener('resize', scaleProto);
    var f = document.getElementById('orbit-proto');
    var empty = document.getElementById('orbit-proto-empty');
    if (!f || !empty) return;
    var src = f.getAttribute('src');
    var full = document.getElementById('orbit-proto-full');
    var mob = document.getElementById('orbit-proto-mob');
    if (src) {
      empty.style.display = 'none';
      if (full) { full.setAttribute('href', src); full.style.display = ''; }
      if (mob) { mob.setAttribute('href', src); mob.removeAttribute('data-empty'); }
    } else {
      f.style.display = 'none';
      if (full) full.style.display = 'none';
      if (mob) mob.setAttribute('data-empty', '1');
      var card = document.querySelector('.proto-card');
      if (card) card.setAttribute('data-empty', '1');
    }
  }

  // Scenario clip: accept a dropped/browsed video or image for immediate local preview.
  function initScenarioDrop() {
    var zone = document.getElementById('scenario-drop');
    var vid = document.getElementById('scenario-video');
    var empty = document.getElementById('scenario-empty');
    var input = document.getElementById('scenario-file');
    if (!zone || !vid || !empty || !input) return;

    var show = function (file) {
      if (!file) return;
      var url = URL.createObjectURL(file);
      empty.style.display = 'none';
      zone.style.border = '1px solid #22262B';
      if (file.type.indexOf('image') === 0) {
        zone.style.background = 'center/cover no-repeat url("' + url + '") #0A0C0F';
        vid.style.display = 'none';
      } else {
        zone.style.background = '#0A0C0F';
        vid.src = url;
        vid.style.display = 'block';
        vid.play().catch(function () {});
      }
    };

    zone.addEventListener('click', function () { input.click(); });
    input.addEventListener('change', function (e) { show(e.target.files && e.target.files[0]); });
    ['dragenter', 'dragover'].forEach(function (t) {
      zone.addEventListener(t, function (e) {
        e.preventDefault(); e.stopPropagation();
        zone.style.borderColor = '#F97316';
      });
    });
    ['dragleave', 'drop'].forEach(function (t) {
      zone.addEventListener(t, function (e) {
        e.preventDefault(); e.stopPropagation();
        zone.style.borderColor = '#2A3037';
      });
    });
    zone.addEventListener('drop', function (e) {
      var dt = e.dataTransfer;
      show(dt && dt.files && dt.files[0]);
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!vid.src) return;
          if (en.isIntersecting) vid.play().catch(function () {});
          else vid.pause();
        });
      }, { threshold: 0.25 }).observe(zone);
    }
  }

  // Findings reveal in sequence when section 03 scrolls into view.
  function initFindingsReveal() {
    var tri = document.querySelector('.fnd-tri');
    if (!tri) return;
    var items = [].slice.call(tri.children);
    var targets = items.map(function (el) {
      return el.classList.contains('fnd-div') ? el : el.querySelector('.fnd-in');
    }).filter(Boolean);
    if (!targets.length) return;

    var reveal = function () {
      targets.forEach(function (el, i) {
        setTimeout(function () { el.classList.add('in'); }, 60 + i * 70);
      });
    };

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    // 04 · state model: quiet left-to-right phase progression
    (function () {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var svg = document.querySelector('.smod-wrap svg');
      if (!svg || !('IntersectionObserver' in window)) return;
      var wave;
      try {
        var els = [].slice.call(svg.querySelectorAll('text,circle,line,path,rect')).filter(function (e) { return !e.closest('defs'); });
        wave = [];
        els.forEach(function (e) {
          var bb; try { bb = e.getBBox(); } catch (_) { return; }
          if (bb.width > 620) return; // full-width baseline stays put
          wave.push([e, bb.x + bb.width / 2]);
        });
      } catch (_) { return; }
      wave.forEach(function (p) { p[0].style.opacity = '0.3'; p[0].style.transition = 'opacity .6s cubic-bezier(.22,1,.36,1)'; });
      new IntersectionObserver(function (ens, o) {
        ens.forEach(function (en) {
          if (!en.isIntersecting) return;
          o.disconnect();
          wave.forEach(function (p) {
            p[0].style.transitionDelay = (0.08 + (p[1] / 1200) * 0.7).toFixed(2) + 's';
            p[0].style.opacity = '';
          });
          setTimeout(function () {
            wave.forEach(function (p) { p[0].style.transitionDelay = ''; });
          }, 1500);
        });
      }, { threshold: 0.35 }).observe(svg);
    })();

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        reveal();
        io.disconnect();
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    io.observe(tri);
  }

  function init() {
    initScenarioDrop();
    initFindingsReveal();
    initProto();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
