(() => {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
    observer.observe(item);
  });
})();
