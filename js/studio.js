(() => {
  // Add the cafe as another portfolio project; keep existing AI and web work intact.
  const projectGrid = document.querySelector('.project-grid');
  if (projectGrid && !projectGrid.querySelector('[data-project="little-ritual"]')) {
    const cafeCard = document.createElement('article');
    cafeCard.className = 'project-card cafe-project reveal is-visible';
    cafeCard.dataset.category = 'web';
    cafeCard.dataset.project = 'little-ritual';
    cafeCard.innerHTML = `
      <a class="cafe-project-link" href="cafe.html" aria-label="Explore Little Ritual cafe shop concept">
        <div class="project-visual cafe-project-visual">
          <div class="visual-top"><span class="mini-window"><i></i><i></i><i></i></span><span>CAFE EXPERIENCE / 04</span></div>
          <div class="cafe-project-sun"></div><span class="cafe-project-cup" aria-hidden="true">☕</span><span class="cafe-project-cold" aria-hidden="true">🥤</span><span class="cafe-project-choco" aria-hidden="true">🍫</span>
          <span class="cafe-project-title">little ritual<small>COFFEE · TEA · TREATS</small></span>
          <div class="visual-caption">A LITTLE CAFE CONCEPT BY ABHI</div>
        </div>
        <div class="project-info">
          <div><p class="project-type">INTERACTIVE STORE · CAFE</p><h3>Little Ritual</h3></div><span class="project-arrow" aria-hidden="true">↗</span>
          <p class="project-description">A warm, animated cafe menu for coffee, cool drinks, tea, and chocolate—with category filters and an interactive demo tray.</p>
          <div class="tag-row"><span>Storefront UI</span><span>Menu filters</span><span>Cart demo</span></div>
        </div>
      </a>`;
    projectGrid.append(cafeCard);
  }

  const nav = document.querySelector('.main-nav');
  if (nav && !nav.querySelector('a[href="cafe.html"]')) {
    const link = document.createElement('a');
    link.href = 'cafe.html';
    link.textContent = 'Cafe ↗';
    const shopLink = nav.querySelector('a[href="#shop"]');
    if (shopLink) shopLink.after(link); else nav.append(link);
  }

  const canvas = document.querySelector('.hero-canvas');
  if (canvas) {
    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (context && !reducedMotion) {
      let width = 0;
      let height = 0;
      let points = [];
      let frame = 0;
      let lastFrame = 0;
      let paused = false;
      const spacing = 42;
      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        points = [];
        for (let y = -spacing; y < height + spacing; y += spacing) {
          for (let x = -spacing; x < width + spacing; x += spacing) points.push({ x, y, phase: Math.random() * Math.PI * 2, drift: 2 + Math.random() * 4 });
        }
      };
      const draw = time => {
        if (paused) return;
        if (time - lastFrame < 42) { frame = requestAnimationFrame(draw); return; }
        lastFrame = time;
        context.clearRect(0, 0, width, height);
        const positions = points.map(point => ({ x: point.x + Math.sin(time * .00045 + point.phase) * point.drift, y: point.y + Math.cos(time * .00035 + point.phase) * point.drift }));
        for (let i = 0; i < positions.length; i++) {
          const a = positions[i];
          for (let j = i + 1; j < positions.length; j++) {
            const b = positions[j]; const dx = a.x - b.x; const dy = a.y - b.y; const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < spacing * 1.28) { context.strokeStyle = `rgba(104,240,209,${(1 - distance / (spacing * 1.28)) * .16})`; context.lineWidth = .7; context.beginPath(); context.moveTo(a.x, a.y); context.lineTo(b.x, b.y); context.stroke(); }
          }
          context.fillStyle = 'rgba(144,245,219,.42)'; context.beginPath(); context.arc(a.x, a.y, 1, 0, Math.PI * 2); context.fill();
        }
        frame = requestAnimationFrame(draw);
      };
      resize();
      frame = requestAnimationFrame(draw);
      if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas.parentElement);
      document.addEventListener('visibilitychange', () => {
        paused = document.hidden;
        if (paused) cancelAnimationFrame(frame);
        else { lastFrame = 0; frame = requestAnimationFrame(draw); }
      });
    }
  }

  // Persistent, easy-to-find link to the standalone cafe experience.
  if (!document.querySelector('.cafe-launch')) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'css/cafe.css';
    document.head.append(style);
    const launch = document.createElement('a');
    launch.className = 'cafe-launch';
    launch.href = 'cafe.html';
    launch.innerHTML = '<span class="cafe-launch-icon" aria-hidden="true">☕</span><span><b>Little Ritual</b><small>OPEN THE CAFE CONCEPT ↗</small></span>';
    launch.setAttribute('aria-label', 'Explore Little Ritual coffee shop concept');
    document.body.append(launch);
  }
})();
