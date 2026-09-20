(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Mobile-Navigation
  var toggle = $('.nav-toggle');
  var nav = $('#nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Tabs (Galerie-Vorschau)
  $$('[data-tabs]').forEach(function (wrap) {
    var tabs = $$('[role="tab"]', wrap);
    var panels = $$('[role="tabpanel"]', wrap);
    function show(i) {
      tabs.forEach(function (t, j) {
        t.setAttribute('aria-selected', i === j ? 'true' : 'false');
        t.tabIndex = i === j ? 0 : -1;
      });
      panels.forEach(function (p, j) { p.hidden = i !== j; });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        if (n !== null) { show(n); tabs[n].focus(); }
      });
    });
    show(0);
  });

  // Zitat-Slider
  $$('[data-slider]').forEach(function (s) {
    var slides = $$('.slide', s);
    var dots = $$('.dot', s);
    var cur = 0;
    function go(i) {
      cur = (i + slides.length) % slides.length;
      slides.forEach(function (el, j) { el.hidden = j !== cur; });
      dots.forEach(function (d, j) { d.setAttribute('aria-current', j === cur ? 'true' : 'false'); });
    }
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
    var prev = $('[data-prev]', s), next = $('[data-next]', s);
    if (prev) prev.addEventListener('click', function () { go(cur - 1); });
    if (next) next.addEventListener('click', function () { go(cur + 1); });
    go(0);
  });

  // Lightbox
  var items = $$('[data-lb]');
  if (items.length) {
    var box = document.createElement('div');
    box.className = 'lb';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Bildansicht');
    box.innerHTML = '<button class="lb-x" aria-label="Schließen">×</button>' +
      '<button class="lb-p" aria-label="Vorheriges Bild">‹</button>' +
      '<img alt=""><button class="lb-n" aria-label="Nächstes Bild">›</button>';
    document.body.appendChild(box);
    var big = $('img', box), idx = 0, last = null;
    var open = function (i) {
      idx = (i + items.length) % items.length;
      var a = items[idx];
      big.src = a.getAttribute('href');
      big.alt = (a.querySelector('img') || {}).alt || '';
      if (box.hidden) { last = document.activeElement; box.hidden = false; document.body.style.overflow = 'hidden'; $('.lb-x', box).focus(); }
    };
    var close = function () {
      box.hidden = true; document.body.style.overflow = ''; big.removeAttribute('src');
      if (last) last.focus();
    };
    items.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    });
    $('.lb-x', box).addEventListener('click', close);
    $('.lb-p', box).addEventListener('click', function () { open(idx - 1); });
    $('.lb-n', box).addEventListener('click', function () { open(idx + 1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    document.addEventListener('keydown', function (e) {
      if (box.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') open(idx - 1);
      if (e.key === 'ArrowRight') open(idx + 1);
    });
  }

  // Kontaktformular: Vorauswahl über ?thema= / ?paket=, Versand per mailto
  var form = $('#kontakt-form');
  if (form) {
    var params = new URLSearchParams(location.search);
    var sel = form.elements['interesse'];
    var map = { herbst: 'Herbst-Special', outdoor: 'Outdoor-Shooting', leinwand: 'Leinwand-Shooting', schnuppern: 'Paket Schnuppern', lieblingsmoment: 'Paket Lieblingsmoment', rundum: 'Paket Rundum' };
    var want = map[params.get('thema')] || map[params.get('paket')];
    if (want && sel) {
      for (var i = 0; i < sel.options.length; i++) if (sel.options[i].text === want) sel.selectedIndex = i;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var f = form.elements;
      var body = 'Hallo,\n\nich interessiere mich für: ' + f['interesse'].value +
        '\n\nMein Hund: ' + (f['hund'].value || '-') +
        '\n\n' + f['nachricht'].value +
        '\n\nViele Grüße\n' + f['name'].value + '\n' + f['email'].value;
      var to = form.getAttribute('data-to');
      var url = 'mailto:' + to + '?subject=' + encodeURIComponent('Anfrage: ' + f['interesse'].value) + '&body=' + encodeURIComponent(body);
      var ok = $('.form-ok', form);
      if (ok) ok.hidden = false;
      window.location.href = url;
    });
  }
})();
