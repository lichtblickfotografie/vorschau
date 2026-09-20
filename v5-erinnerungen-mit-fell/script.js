// Version 3: Script für Lichtblick Fotografie (Erinnerungen mit Fell)
document.addEventListener('DOMContentLoaded', () => {
  // Copyright Year
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.arch-nav-links');
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

  // Gallery Filter (Subpage)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-masonry-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

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

  // Form Handling
  const form = document.getElementById('arch-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Wird gesendet...';

      setTimeout(() => {
        btn.textContent = '✓ Anfrage erfolgreich gesendet!';
        btn.style.backgroundColor = '#628B65';
        btn.style.borderColor = '#628B65';
        form.reset();

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
        }, 4000);
      }, 700);
    });
  }
});
