// Simple fade-in animation
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.style.opacity = 1;
      sec.style.transform = "translateY(0)";
    }
  });
});

// initial state
sections.forEach(sec => {
  sec.style.opacity = 0;
  sec.style.transform = "translateY(50px)";
});