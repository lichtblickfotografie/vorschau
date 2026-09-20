// Alle Entwürfe der Vorschau. Reihenfolge und Namen hier ändern, dann wirkt es überall.
// "quelle" und "port" sind nur für das Bauen (tools/vorschau-bauen.mjs) und die Vorschaubilder wichtig.
(function () {
  // Seiten-Arten, die in der Ansicht als Reiter erscheinen
  var SEITEN = [
    ['start', 'Startseite'],
    ['outdoor', 'Outdoor-Galerie'],
    ['leinwand', 'Leinwand-Galerie'],
    ['about', 'Über mich'],
    ['links', 'Links'],
    ['impressum', 'Impressum'],
    ['datenschutz', 'Datenschutz']
  ];

  var eigene = {
    start: 'index.html', outdoor: 'galerie-outdoor.html', leinwand: 'galerie-leinwand.html',
    about: 'ueber-mich.html', links: 'links.html', impressum: 'impressum.html', datenschutz: 'datenschutz.html'
  };
  var einDatei = {
    start: 'index.html', outdoor: 'index.html?page=outdoor', leinwand: 'index.html?page=leinwand',
    about: 'index.html?page=about', links: 'index.html?page=links', impressum: 'index.html?page=impressum', datenschutz: 'index.html?page=datenschutz'
  };
  var galerieAbout = {
    start: 'index.html', outdoor: 'gallery.html',
    about: 'about.html', impressum: 'impressum.html', datenschutz: 'datenschutz.html'
  };

  window.LB = {
    SEITEN: SEITEN,
    VERSIONEN: [
      { id: 'v1-sanfte-boegen', nr: 1, name: 'Sanfte Bögen', text: 'Weich und warm: Eierschale, gedecktes Altrosa und ein Bogen-Foto im Kopfbereich.', farben: ['#FBF7F0', '#F2E0DD', '#A65A68'], seiten: eigene, quelle: 'entwurf-a', port: 4711 },
      { id: 'v2-editorial', nr: 2, name: 'Editorial', text: 'Ruhig und großzügig: viel Weißraum, klassische Serif, Galerien als Reiter und ein Zitat-Slider.', farben: ['#FFFEFB', '#231C1A', '#9B5666'], seiten: eigene, quelle: 'entwurf-b', port: 4712 },
      { id: 'v3-kacheln', nr: 3, name: 'Kacheln', text: 'Kräftig und modern: Foto-Kacheln im Kopfbereich, Rosé-Flächen und Schreibschrift-Akzent.', farben: ['#FFFDF9', '#F8E9E6', '#B0575F'], seiten: eigene, quelle: 'entwurf-c', port: 4713 },
      { id: 'v4-erdig-warm', nr: 4, name: 'Erdig & Warm', text: 'Natürlich und professionell: Terrakotta auf Hafer-Weiß, dunkles Herbst-Band, kursive Akzente.', farben: ['#FBF8F2', '#241C17', '#A5502D'], seiten: eigene, quelle: 'entwurf-d', port: 4714 },
      { id: 'v5-erinnerungen-mit-fell', nr: 5, name: 'Erinnerungen mit Fell', text: 'Organische Bögen, Garamond-Serif und eine feine Schreibschrift in Altrosa.', farben: ['#FAF7F2', '#EFE8DE', '#A85D68'], seiten: galerieAbout, labels: { outdoor: 'Galerie' }, quelle: 'version-3', port: 8003 },
      { id: 'v6-vier-pfoten', nr: 6, name: 'Vier Pfoten', text: 'Verspielte Atelier-Optik mit Schreibschrift, Klebeband-Details und Wesen-Finder.', farben: ['#FAF6F0', '#EFE7DC', '#9E4B56'], seiten: { start: 'index.html', outdoor: 'gallery.html', about: 'about.html', links: 'links.html', impressum: 'impressum.html', datenschutz: 'datenschutz.html' }, labels: { outdoor: 'Galerie' }, quelle: 'version-nature', port: 8004 },
      { id: 'v7-modernes-magazin', nr: 7, name: 'Modernes Magazin', text: 'Kräftige Grotesk-Überschriften und Schwarzweiß-Bildsprache wie in einem Magazin.', farben: ['#FFFFFF', '#171717', '#A94F66'], seiten: einDatei, quelle: 'notes-design-b', port: 9212 },
      { id: 'v8-organische-ruhe', nr: 8, name: 'Organische Ruhe', text: 'Sanfte Formen, Garamond-Überschriften und viel Ruhe im Bildaufbau.', farben: ['#FDFBF7', '#EFE7DC', '#A45D67'], seiten: einDatei, quelle: 'notes-design-c', port: 9213 }
    ]
  };
})();
