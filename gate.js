/* Optische Passwortsperre für die Vorschau.
   Wichtig: Das ist nur Anschein, keine echte Sicherheit. Der Inhalt liegt öffentlich auf GitHub. */
(function () {
  'use strict';
  var HASH = '096b8865cc32029ae7ed3686e4fe253d9e9a5b972ed600c3affea10fa703c19e';
  var KEY = 'lb-vorschau-frei';
  var base = document.currentScript && document.currentScript.src;
  function frei() { try { return localStorage.getItem(KEY) === HASH; } catch (e) { return false; } }
  if (frei()) return;

  function font(name, file, style) {
    var u = base ? new URL('fonts/' + file, base).href : 'fonts/' + file;
    return '@font-face{font-family:"' + name + '";src:url(' + u + ') format("woff2");font-style:' + style + ';font-display:swap}';
  }
  var css = font('LB Serif', 'instrument-serif-400-normal.woff2', 'normal') + font('LB Sans', 'hanken-grotesk-400-normal.woff2', 'normal') +
    'html{visibility:hidden!important;overflow:hidden!important}' +
    '#lb-gate{visibility:visible;position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;padding:20px;background:#F6F3EE;color:#26221F;font:400 16px/1.6 "LB Sans",system-ui,sans-serif}' +
    '#lb-gate *{box-sizing:border-box}' +
    '#lb-gate .c{width:100%;max-width:420px;background:#fff;border:1px solid #E2DCD3;border-radius:24px;padding:36px 32px;text-align:center;box-shadow:0 18px 50px rgba(38,34,31,.1)}' +
    '#lb-gate .i{width:52px;height:52px;margin:0 auto 18px;border-radius:50%;background:#F6F3EE;display:grid;place-items:center}' +
    '#lb-gate h1{font:400 2.1rem/1.1 "LB Serif",Georgia,serif;margin:0 0 .4em}' +
    '#lb-gate p{margin:0 0 1.4em;color:#6A625B}' +
    '#lb-gate input{width:100%;font:inherit;padding:.8em 1.1em;border:1.5px solid #D6CEC2;border-radius:999px;text-align:center;background:#fff;color:#26221F}' +
    '#lb-gate input:focus{outline:none;border-color:#26221F;box-shadow:0 0 0 3px rgba(38,34,31,.12)}' +
    '#lb-gate button{margin-top:12px;width:100%;font:600 1rem "LB Sans",system-ui,sans-serif;padding:.85em 1.4em;border:0;border-radius:999px;background:#26221F;color:#fff;cursor:pointer}' +
    '#lb-gate button:hover{background:#000}' +
    '#lb-gate .e{min-height:1.5em;margin:10px 0 0;font-size:.92rem;color:#A33A3A}';
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  var g = document.createElement('div');
  g.id = 'lb-gate';
  g.setAttribute('role', 'dialog');
  g.setAttribute('aria-modal', 'true');
  g.setAttribute('aria-labelledby', 'lb-gate-t');
  g.innerHTML = '<form class="c" autocomplete="off">' +
    '<div class="i" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#26221F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg></div>' +
    '<h1 id="lb-gate-t">Passwortgeschützt</h1>' +
    '<p>Diese Vorschau ist nur für dich gedacht. Bitte gib das Passwort ein, das du erhalten hast.</p>' +
    '<label for="lb-pw" style="position:absolute;left:-9999px">Passwort</label>' +
    '<input id="lb-pw" type="password" placeholder="Passwort" autocomplete="off" required>' +
    '<button type="submit">Vorschau öffnen</button>' +
    '<p class="e" role="alert"></p></form>';
  document.documentElement.appendChild(g);

  function hash(t) {
    if (!(window.crypto && crypto.subtle)) return Promise.reject(new Error('nosubtle'));
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)).then(function (b) {
      return Array.prototype.map.call(new Uint8Array(b), function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
    });
  }
  var form = g.querySelector('form'), inp = g.querySelector('input'), err = g.querySelector('.e');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    hash(inp.value.trim()).then(function (h) {
      if (h === HASH) {
        try { localStorage.setItem(KEY, HASH); } catch (x) {}
        g.remove(); st.remove();
      } else {
        err.textContent = 'Das Passwort stimmt nicht. Bitte versuche es noch einmal.';
        inp.select();
      }
    }, function () { err.textContent = 'Bitte öffne die Seite über die https-Adresse.'; });
  });
  setTimeout(function () { inp.focus(); }, 50);
})();
