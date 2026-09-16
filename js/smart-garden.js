// Smart Garden — moisture demo (ported 1:1 from the approved handoff's logic class).
// Same threshold logic as the firmware: a reading below 40 registers as dry.
(function () {
  function init() {
    var slider = document.getElementById('sg-moisture');
    var readout = document.getElementById('sg-readout');
    var dots = Array.prototype.slice.call(document.querySelectorAll('[data-sg-led]'));
    if (!slider || !readout || !dots.length) return;

    var render = function () {
      var m = +slider.value, dry = m < 40;
      var color = dry ? '#e0472a' : '#2f6ccc';
      var glow = dry ? '0 0 14px 2px rgba(224,71,42,.5)' : '0 0 14px 2px rgba(47,108,204,.5)';
      dots.forEach(function (d) { d.style.background = color; d.style.boxShadow = glow; });
      readout.textContent = 'MOISTURE ' + m + ' · ' + (dry ? 'SOIL DRY — LED RED' : 'SOIL OK — LED BLUE');
    };

    slider.addEventListener('input', render);
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
