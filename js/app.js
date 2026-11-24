// Load the portfolio interaction helpers. The shared liquid-glass stylesheet
// is injected by this script so it also works on older pages in the project.
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

(() => {
  if (document.querySelector('link[data-liquid-glass]')) return;
  const theme = document.createElement('link');
  theme.rel = 'stylesheet';
  theme.href = 'css/liquid-glass.css';
  theme.dataset.liquidGlass = 'true';
  document.head.append(theme);
})();
