(function () {
  var tabs = document.querySelectorAll('.brand-tab');
  var panels = document.querySelectorAll('[data-brand-panel]');

  function setBrand(brand) {
    tabs.forEach(function (tab) {
      var active = tab.dataset.brand === brand;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.dataset.brandPanel !== brand;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var brand = tab.dataset.brand;
      setBrand(brand);
      history.replaceState(null, '', brand === 'gana' ? location.pathname : '#' + brand);
    });
  });

  var initial = location.hash === '#loti' ? 'loti' : 'gana';
  setBrand(initial);
})();
