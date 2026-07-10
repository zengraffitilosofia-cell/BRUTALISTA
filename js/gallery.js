// Galería: renderiza tarjetas de proyecto en mosaico bento (tamaño de celda
// según project.bento) con efecto scramble al hover (lógica compartida en
// js/scramble.js) y abre el modal de detalle al hacer click.
const Gallery = (() => {
  const CYCLE_BORDERS = ["var(--fg)", "var(--accent-navy)", "var(--accent-gold)"];
  const BENTO_CLASS = {
    large: "project-card--large",
    tall: "project-card--tall",
    wide: "project-card--wide",
  };

  const scrambleCancels = {};
  let onOpenProject = () => {};

  function startScramble(id, finalText, titleEl, onFrame) {
    if (scrambleCancels[id]) return;
    onFrame(true);
    scrambleCancels[id] = Scramble.run({
      finalText,
      onFrame: (text) => { titleEl.textContent = text; },
      onDone: () => {
        delete scrambleCancels[id];
        onFrame(false);
      },
    });
  }

  function endScramble(id, finalText, titleEl, onFrame) {
    if (scrambleCancels[id]) {
      scrambleCancels[id]();
      delete scrambleCancels[id];
    }
    titleEl.textContent = finalText;
    onFrame(false);
  }

  function applyCardState(card, { scrambling, isDemo, idx }) {
    const titleEl = card.querySelector(".project-card__title");
    const imageEl = card.querySelector(".project-card__image");
    const plusEl = card.querySelector(".project-card__plus");

    titleEl.style.color = scrambling ? "var(--accent-gold)" : isDemo ? "var(--accent-gold)" : "var(--fg)";
    titleEl.style.transform = scrambling
      ? "scale(1.04) skewX(-2deg)"
      : isDemo
        ? "scale(1.03) skewX(-2deg)"
        : "scale(1) skewX(0deg)";

    card.style.borderColor = isDemo || scrambling ? "var(--accent-orange)" : CYCLE_BORDERS[idx % 3];
    imageEl.style.transform = isDemo || scrambling ? "scale(1.06)" : "scale(1)";
    plusEl.classList.toggle("project-card__plus--visible", isDemo);
  }

  function renderCard(project, idx) {
    const card = document.createElement("div");
    card.className = "project-card";
    if (BENTO_CLASS[project.bento]) card.classList.add(BENTO_CLASS[project.bento]);
    card.dataset.projectId = project.id;

    const isDemoProject = project.id === "carteles";
    const demoText = "N1GRÁN J4ZZ · C4RTELER1A 2024";

    card.innerHTML = `
      <div class="project-card__plus">+</div>
      <div class="project-card__image">
        <img class="project-card__image-img" src="${project.images[0]}" alt="${project.title}" loading="lazy">
      </div>
      <span class="project-card__title"></span>
    `;

    const titleEl = card.querySelector(".project-card__title");
    const imageEl = card.querySelector(".project-card__image");
    titleEl.textContent = isDemoProject ? demoText : project.title;

    applyCardState(card, { scrambling: false, isDemo: isDemoProject, idx });

    card.addEventListener("mouseenter", () => {
      startScramble(project.id, project.title, titleEl, (active) => {
        applyCardState(card, { scrambling: active, isDemo: false, idx });
      });
    });

    card.addEventListener("mouseleave", () => {
      endScramble(project.id, project.title, titleEl, () => {
        applyCardState(card, { scrambling: false, isDemo: isDemoProject, idx });
      });
    });

    card.addEventListener("click", () => onOpenProject(project.id));

    return card;
  }

  function init({ projects, onOpen }) {
    onOpenProject = onOpen;
    const grid = document.querySelector("[data-gallery-grid]");
    const banner = grid.querySelector("[data-gallery-banner]");

    projects.forEach((project, idx) => {
      const card = renderCard(project, idx);
      grid.insertBefore(card, banner);
    });
  }

  return { init };
})();
