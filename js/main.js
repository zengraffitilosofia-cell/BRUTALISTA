// Punto de entrada: inicializa todos los módulos.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("[data-config-name]").textContent = SITE_CONFIG.name;
  document.querySelector("[data-hero-subtitle]").innerHTML = SITE_CONFIG.heroSubtitle;
  document.querySelector("[data-about-dropcap]").textContent = SITE_CONFIG.aboutText.dropCap;
  document.querySelector("[data-about-body]").innerHTML = SITE_CONFIG.aboutText.body;
  document.querySelector("[data-contact-lead]").innerHTML = SITE_CONFIG.contactLead;
  document.querySelector("[data-contact-note]").textContent = SITE_CONFIG.contactNote;
  document.querySelector("[data-contact-phone]").textContent = SITE_CONFIG.phone;
  document.querySelector("[data-contact-email]").textContent = SITE_CONFIG.email;
  document.querySelector("[data-contact-whatsapp]").textContent = SITE_CONFIG.whatsapp;
  document.querySelector("[data-contact-footer]").textContent = SITE_CONFIG.footer;

  Loader.init({
    name: SITE_CONFIG.name,
    onDoneCallback: () => {},
  });

  // Los 3 titulares grandes comparten el mismo módulo de interacción.
  LetterHover.attach({
    container: document.querySelector("[data-hero-interactive]"),
    targetEl: document.querySelector("[data-hero-title]"),
    text: SITE_CONFIG.name,
  });
  LetterHover.attach({
    container: document.querySelector("[data-gallery-title]"),
    targetEl: document.querySelector("[data-gallery-title]"),
    text: SITE_CONFIG.galleryTitle,
  });
  LetterHover.attach({
    container: document.querySelector("[data-contact-title]"),
    targetEl: document.querySelector("[data-contact-title]"),
    text: SITE_CONFIG.contactTitle,
  });

  AboutReveal.init();
  ProjectModal.init({ projectsData: PROJECTS });
  Gallery.init({
    projects: PROJECTS,
    onOpen: (id) => ProjectModal.open(id),
  });
});