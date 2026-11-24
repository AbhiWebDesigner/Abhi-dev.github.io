function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Load the shared frosted-glass and colorful ambient background on portfolio pages.
(() => {
  if (!document.querySelector('link[data-liquid-glass]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = 'css/liquid-glass.css';
    theme.dataset.liquidGlass = 'true';
    document.head.append(theme);
  }
})();
