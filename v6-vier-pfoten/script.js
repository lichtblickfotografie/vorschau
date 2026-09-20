// Atelier Visionnaire – Interaktive Logik (Lichtsimulator, Schrift-Wechsler, Wesen-Matcher & Erlebnis)
document.addEventListener('DOMContentLoaded', () => {
  // Copyright Year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  const toggle = document.querySelector('.nat-toggle');
  const nav = document.querySelector('.nat-nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
      });
    });
  }

  // 1. INTERAKTIVER FONT-WECHSLER (Schrift-Vorschau)
  const fontBtns = document.querySelectorAll('.font-dial-btn');
  if (fontBtns.length) {
    fontBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        fontBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const fontType = btn.getAttribute('data-font');
        document.body.classList.remove('font-alex', 'font-birthstone', 'font-sacramento', 'font-ephesis');
        document.body.classList.add(`font-${fontType}`);
      });
    });
  }

  // 2. HERO FOTO-DIASHOW (Automatischer sanfter Bildwechsel)
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slide-dot');
  let currentSlide = 0;
  let slideInterval = null;

  function goToSlide(index) {
    if (!slides.length) return;
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startSlideshow() {
    if (slides.length > 1 && !slideInterval) {
      slideInterval = setInterval(nextSlide, 4500);
    }
  }

  function stopSlideshow() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (slides.length > 1) {
    startSlideshow();

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        stopSlideshow();
        startSlideshow();
      });
    });

    const slideshowEl = document.getElementById('hero-slideshow');
    if (slideshowEl) {
      slideshowEl.addEventListener('mouseenter', stopSlideshow);
      slideshowEl.addEventListener('mouseleave', startSlideshow);
    }
  }

  // 3. WESEN-MATCHER (HUNDE-CHARAKTER-FINDER)
  const wesenChips = document.querySelectorAll('.wesen-chip');
  const resultCard = document.getElementById('wesen-result');
  const resultImg = document.getElementById('wesen-img');
  const resultTitle = document.getElementById('wesen-title');
  const resultDesc = document.getElementById('wesen-desc');
  const resultBadge = document.getElementById('wesen-badge');
  const resultBtn = document.getElementById('wesen-btn');

  const wesenData = {
    action: {
      title: 'Die wilde Lebensfreude: Outdoor & Freilauf',
      desc: 'Dein Hund rennt für sein Leben gern, liebt Bälle und erkundet jeden Grashalm? Für ihn ist unser weitläufiges Outdoor-Shooting im Schwarzwald das Paradies. Wir nutzen die Bewegung, um ungebremste Dynamik und Glücksmomente festzuhalten.',
      img: 'assets/outdoor-04.jpg',
      badge: 'Empfehlung: Outdoor-Shooting · Paket Herzensrunde',
      link: '#kontakt'
    },
    dreamer: {
      title: 'Der leise Seelenhund: Sanfte Natur & Geborgenheit',
      desc: 'Dein Liebling ist eher ruhig, beobachtet die Welt mit klugen Augen und kuschelt am liebsten? Wir nehmen uns unendlich viel Zeit in einer friedlichen Waldlichtung. Ohne Trubel, in harmonischem Abendlicht entstehen Bilder voller Zartheit.',
      img: 'assets/outdoor-05.jpg',
      badge: 'Empfehlung: Abendlicht-Shooting · Paket Kleine Auszeit',
      link: '#kontakt'
    },
    diva: {
      title: 'Der stolze Charakterkopf: Leinwand & Atelier',
      desc: 'Jede Haltung ein Kunstwerk, jeder Blick voller Ausdruckskraft: Vor unseren ruhigen, monochromen Studio-Leinwänden wird dein Hund zum zeitlosen Star. Hier gibt es keine Ablenkung durch Wind oder Gerüche – nur pure Persönlichkeit.',
      img: 'assets/studio-02.jpg',
      badge: 'Empfehlung: Leinwand-Atelier · Paket Herzensrunde',
      link: '#kontakt'
    },
    autumn: {
      title: 'Der Herbst-Genießer: Dunkle Halloween-Magie',
      desc: 'Goldene Blätter, Kürbisse und unsere exklusiven Porträts vor samtig schwarzem Studio-Hintergrund: Für Hunde, deren Fell vor dunklem Grund magisch leuchtet. Das limitierte 4-Wochen-Spezial für ganz besondere Erinnerungen.',
      img: 'assets/halloween-01.jpg',
      badge: 'Empfehlung: Limitiertes 4-Wochen Herbst-Special',
      link: '#special'
    }
  };

  if (wesenChips.length && resultCard) {
    wesenChips.forEach(chip => {
      chip.addEventListener('click', () => {
        wesenChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const type = chip.getAttribute('data-type');
        const data = wesenData[type];

        if (data) {
          resultCard.style.opacity = '0.4';
          resultCard.style.transform = 'translateY(6px)';

          setTimeout(() => {
            if (resultImg) resultImg.src = data.img;
            if (resultTitle) resultTitle.textContent = data.title;
            if (resultDesc) resultDesc.textContent = data.desc;
            if (resultBadge) resultBadge.textContent = data.badge;
            if (resultBtn) resultBtn.href = data.link;

            resultCard.style.opacity = '1';
            resultCard.style.transform = 'translateY(0)';
          }, 200);
        }
      });
    });
  }

  // 4. POSTKARTEN-TAGS
  const ptags = document.querySelectorAll('.ptag');
  const msgArea = document.getElementById('post-msg');

  if (ptags.length && msgArea) {
    ptags.forEach(tag => {
      tag.addEventListener('click', () => {
        tag.classList.toggle('selected');
        const selected = Array.from(document.querySelectorAll('.ptag.selected'))
          .map(t => t.textContent.trim())
          .join(', ');

        const prefix = selected ? `Mein Hund ist besonders: ${selected}.\n` : '';
        const currentText = msgArea.value.replace(/^Mein Hund ist besonders: .*\n/, '');
        msgArea.value = prefix + currentText;
      });
    });
  }

  // 5. FORMULAR
  const postForm = document.getElementById('postcard-form');
  if (postForm) {
    postForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = postForm.querySelector('button[type="submit"]');
      const orig = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Postkarte wird überbracht...';

      setTimeout(() => {
        btn.textContent = '✓ Postkarte erfolgreich überbracht!';
        btn.style.backgroundColor = '#5B785E';
        btn.style.borderColor = '#5B785E';
        postForm.reset();
        document.querySelectorAll('.ptag.selected').forEach(t => t.classList.remove('selected'));

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = orig;
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
        }, 4000);
      }, 750);
    });
  }

  // 6. GALERIE-FILTER (SUBPAGE)
  const filterPills = document.querySelectorAll('.filter-pill');
  const galleryItems = document.querySelectorAll('.nat-gallery-item');
  if (filterPills.length && galleryItems.length) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const filter = pill.getAttribute('data-filter');

        galleryItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});
