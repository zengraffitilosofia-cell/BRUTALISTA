// About: revela el párrafo (una sola vez) cuando entra en el viewport.
const AboutReveal = (() => {
  function init() {
    const aboutContent = document.querySelector("[data-about-content]");
    const overlay = document.querySelector("[data-about-overlay]");
    if (!aboutContent || !overlay) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          overlay.classList.add("about__overlay--revealed");
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });

    observer.observe(aboutContent);
  }

  return { init };
})();
