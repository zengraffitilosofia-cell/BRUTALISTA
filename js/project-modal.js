// Modal de detalle de proyecto: título, carrusel de slides (nº dinámico
// según las imágenes reales de cada proyecto) y specs.
const ProjectModal = (() => {
  const DOT_COLORS = ["var(--accent-orange)", "var(--accent-navy)", "var(--accent-gold)", "var(--fg)"];

  const FRAME_MAX_HEIGHT = 460;
  const FRAME_MIN_HEIGHT = 240;

  let projects = [];
  let modalEl, closeBtn, prevBtn, nextBtn, titleEl, sliderFrame, sliderTrack, dotsEl, descEl, specsEl;
  let replayBtn, utilityBtns = [];
  let currentId = null;
  let sliderIndex = 0;
  let slideCount = 1;

  function renderSlides(project) {
    sliderTrack.innerHTML = "";
    dotsEl.innerHTML = "";
    slideCount = project.images.length;
    sliderTrack.style.width = `${slideCount * 100}%`;

    project.images.forEach((src, i) => {
      const slideEl = document.createElement("div");
      slideEl.className = "modal__slide";
      slideEl.style.width = `${100 / slideCount}%`;
      slideEl.innerHTML = `<img class="modal__slide-img" src="${src}" alt="${project.title} — imagen ${i + 1}" loading="lazy">`;
      sliderTrack.appendChild(slideEl);

      const dot = document.createElement("div");
      dot.className = "modal__dot";
      dot.style.background = DOT_COLORS[i % DOT_COLORS.length];
      dot.style.opacity = i === sliderIndex ? "1" : "0.4";
      dot.addEventListener("click", () => goSlide(i));
      dotsEl.appendChild(dot);
    });

    updateSliderTransform();
  }

  function updateSliderTransform() {
    sliderTrack.style.transform = `translateX(-${sliderIndex * (100 / slideCount)}%)`;
    Array.from(dotsEl.children).forEach((dot, i) => {
      dot.style.opacity = i === sliderIndex ? "1" : "0.4";
    });
  }

  function goSlide(i) {
    sliderIndex = i;
    updateSliderTransform();
  }

  function applyFrameHeight(project) {
    const ratio = project.ratio || 1;
    const frameWidth = sliderFrame.getBoundingClientRect().width;
    if (!frameWidth) return;
    const height = Math.min(FRAME_MAX_HEIGHT, Math.max(FRAME_MIN_HEIGHT, frameWidth / ratio));
    sliderFrame.style.height = `${Math.round(height)}px`;
  }

  function renderDetail(id) {
    const project = projects.find((p) => p.id === id) || projects[0];
    const detail = getProjectDetail(project);

    titleEl.textContent = project.title;
    descEl.textContent = detail.description;
    applyFrameHeight(project);

    specsEl.innerHTML = "";
    detail.specs.forEach((spec) => {
      const row = document.createElement("div");
      row.className = "modal__spec";
      row.innerHTML = `
        <span class="modal__spec-label">${spec.label}:</span>
        <span class="modal__spec-value" style="color:${spec.color || "var(--fg)"}">${spec.value}</span>
      `;
      specsEl.appendChild(row);
    });

    sliderIndex = 0;
    renderSlides(project);
  }

  function open(id) {
    currentId = id;
    renderDetail(id);
    modalEl.classList.add("modal--open");
    utilityBtns.forEach((btn) => btn.classList.add("replay-btn--hidden"));
  }

  function close() {
    modalEl.classList.remove("modal--open");
    utilityBtns.forEach((btn) => btn.classList.remove("replay-btn--hidden"));
  }

  function step(dir) {
    const ids = projects.map((p) => p.id);
    const i = ids.indexOf(currentId);
    const next = ids[(i + dir + ids.length) % ids.length];
    currentId = next;
    renderDetail(next);
  }

  function init({ projectsData }) {
    projects = projectsData;
    modalEl = document.querySelector("[data-modal]");
    closeBtn = document.querySelector("[data-modal-close]");
    prevBtn = document.querySelector("[data-modal-prev]");
    nextBtn = document.querySelector("[data-modal-next]");
    titleEl = document.querySelector("[data-modal-title]");
    sliderFrame = document.querySelector("[data-modal-slider-frame]");
    sliderTrack = document.querySelector("[data-modal-slider-track]");
    dotsEl = document.querySelector("[data-modal-dots]");
    descEl = document.querySelector("[data-modal-description]");
    specsEl = document.querySelector("[data-modal-specs]");
    utilityBtns = Array.from(document.querySelectorAll("[data-utility-btn]"));

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", () => step(-1));
    nextBtn.addEventListener("click", () => step(1));
  }

  return { init, open, close };
})();
