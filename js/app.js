// Keep the portfolio responsive, and never let the intro screen block the page.
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

(() => {
  const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (!loader) return;
    loader.classList.add('done');
    // Remove it after the fade so it cannot cover the page if CSS fails to load.
    window.setTimeout(() => loader.remove(), 700);
  };

  // This script is deferred, so DOM is normally ready; keep both paths safe.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.setTimeout(hideLoader, 150), { once: true });
  } else {
    window.setTimeout(hideLoader, 150);
  }
  // Failsafe for slow fonts, images, or other resources: don't wait for window.load.
  window.setTimeout(hideLoader, 1800);

  // Load shared liquid-glass styling on pages that don't include it directly.
  if (!document.querySelector('link[data-liquid-glass]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = 'css/liquid-glass.css';
    theme.dataset.liquidGlass = 'true';
    document.head.append(theme);
  }
})();
