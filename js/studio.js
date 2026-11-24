(() => {
  const canvas = document.querySelector('.hero-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!context || reducedMotion) return;
  let width = 0;
  let height = 0;
  let points = [];
  let frame = 0;
  let lastFrame = 0;
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
  resize(); frame = requestAnimationFrame(draw);
  const observer = new ResizeObserver(resize); observer.observe(canvas.parentElement);
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancelAnimationFrame(frame); else { lastFrame = 0; frame = requestAnimationFrame(draw); } });

  // Keep the cafe concept discoverable from the portfolio's digital shelf.
  const style = document.createElement('link'); style.rel = 'stylesheet'; style.href = 'css/cafe.css'; document.head.append(style);
  const launch = document.createElement('a'); launch.className = 'cafe-launch'; launch.href = 'cafe.html'; launch.innerHTML = '<span class="cafe-launch-icon">☕</span><span><b>Little Ritual</b><small>OPEN THE CAFE CONCEPT ↗</small></span>';
  launch.setAttribute('aria-label', 'Explore Little Ritual coffee shop concept');
  document.body.append(launch);
})();
