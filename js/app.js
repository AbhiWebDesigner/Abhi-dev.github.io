(() => {
  const ready = () => {
    const loader = document.getElementById('loader');
    if (loader) window.setTimeout(() => loader.classList.add('done'), 250);
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('open', !expanded);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
    }));
  }

  const dialog = document.getElementById('portal-dialog');
  if (dialog) {
    document.querySelectorAll('[data-open-portal]').forEach(button => button.addEventListener('click', () => {
      if (typeof dialog.showModal === 'function') dialog.showModal();
    }));
    dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
    dialog.querySelector('.dialog-done')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  }

  const chips = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-category]');
  chips.forEach(chip => chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    chips.forEach(item => {
      const active = item === chip;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  }));

  const glow = document.querySelector('.pointer-glow');
  if (glow && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('pointermove', event => {
      glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    }, { passive: true });
  }
})();
