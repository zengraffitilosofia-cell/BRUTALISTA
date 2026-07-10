// Datos de proyectos reales (extraídos de diseno-grafico.html del portfolio
// original). Cada objeto puede llevar su propio `detail` (description +
// specs); si no lo lleva, se usa DEFAULT_DETAIL.
// `images`: rutas explícitas y reales — images[0] es la miniatura de la
// tarjeta, el resto (hasta 4) son las del carrusel del modal. Nada de
// adivinar extensión ni duplicar archivos.
// `ratio` = ancho/alto real de la imagen principal (mide el recuadro del
// modal). `bento` = tamaño de celda en el mosaico de la galería:
// "large" (2×2, protagonista), "tall" (1×2), "wide" (2×1), o nada (1×1).
const PROJECTS = [
  {
    id: "carteles",
    title: "NIGRÁN JAZZ · CARTELERÍA 2024",
    ratio: 0.72,
    bento: "large",
    images: [
      "assets/img/proyectos/carteles.jpg",
      "assets/img/proyectos/carteles-2.jpg",
      "assets/img/proyectos/carteles-3.jpg",
    ],
    detail: {
      description: "Cartel ganador del concurso para el Festival de Jazz de Nigrán. Diseño que evoca la noche, el ritmo y la fusión de instrumentos. 2024.",
      specs: [
        { label: "CLIENTE", value: "NIGRÁN JAZZ FESTIVAL" },
        { label: "AÑO", value: "2024", color: "var(--accent-gold)" },
        { label: "DISCIPLINA", value: "CARTELERÍA, DISEÑO EDITORIAL", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "martos",
    title: "FIESTA DE LA OLIVA · MARTOS 2023",
    ratio: 0.71,
    bento: "tall",
    images: [
      "assets/img/proyectos/martos.jpg",
      "assets/img/proyectos/martos-2.png",
      "assets/img/proyectos/martos-3.jpg",
    ],
    detail: {
      description: "Cartel ganador del concurso para la Fiesta de la Oliva de Martos. Ilustración y tipografía que celebran la tradición olivarera. 2023.",
      specs: [
        { label: "CLIENTE", value: "AYUNTAMIENTO DE MARTOS" },
        { label: "AÑO", value: "2023", color: "var(--accent-gold)" },
        { label: "DISCIPLINA", value: "CARTELERÍA, ILUSTRACIÓN", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "nfcuniverse",
    title: "NFC UNIVERSE · SISTEMA DE LOGOS",
    ratio: 1.78,
    bento: "wide",
    images: [
      "assets/img/proyectos/nfcuniverse.webp",
      "assets/img/proyectos/nfcuniverse-2.webp",
      "assets/img/proyectos/nfcuniverse-3.webp",
      "assets/img/proyectos/nfcuniverse-4.webp",
    ],
    detail: {
      description: "Identidad visual completa para NFC Universe, un ecosistema de soluciones basadas en tecnología NFC: sistema modular de logos (Masterbrand, NFC Menu, NFC Go, NFC Manager, NFC Folio), paleta de color (púrpura #652F8E y blanco) y tipografías propias. 2025.",
      specs: [
        { label: "CLIENTE", value: "NFC UNIVERSE" },
        { label: "AÑO", value: "2025", color: "var(--accent-gold)" },
        { label: "DISCIPLINA", value: "IDENTIDAD VISUAL, SISTEMAS GRÁFICOS", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "cannabalism",
    title: "CANNABALISM · IDENTIDAD CBD",
    ratio: 1.56,
    bento: "wide",
    images: [
      "assets/img/proyectos/cannabalism.png",
      "assets/img/proyectos/cannabalism-2.png",
      "assets/img/proyectos/cannabalism-3.png",
    ],
    detail: {
      description: "Identidad visual para empresa especializada en extracciones de CBD y derivados del cannabis. Logotipo moderno con tipografía impactante y un isotipo que sugiere naturaleza y pureza. 2025.",
      specs: [
        { label: "CLIENTE", value: "CANNABALISM" },
        { label: "AÑO", value: "2025", color: "var(--accent-gold)" },
        { label: "DISCIPLINA", value: "BRANDING, DISEÑO DE MARCA", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "barruztattoo",
    title: "BARRUZTATTOO · TARJETA NFC",
    ratio: 1.5,
    bento: "wide",
    images: [
      "assets/img/proyectos/barruztattoo.png",
      "assets/img/proyectos/barruztattoo-2.png",
    ],
    detail: {
      description: "Tarjeta de visita inteligente para Barruztattoo (@barruztattoo), tatuador especializado en realismo, ilustración y color. El chip NFC dirige directamente a su perfil de Instagram. Diseño con texturas orgánicas, tipografía manuscrita y acabado mate.",
      specs: [
        { label: "CLIENTE", value: "BARRUZTATTOO" },
        { label: "INSTAGRAM", value: "@BARRUZTATTOO", color: "var(--accent-gold)" },
        { label: "TECNOLOGÍA", value: "NFC · ENLACE A INSTAGRAM", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "alberto",
    title: "ALBERTO SOEZ · TARJETA NFC",
    ratio: 1.54,
    bento: "wide",
    images: [
      "assets/img/proyectos/alberto.png",
      "assets/img/proyectos/alberto-2.png",
    ],
    detail: {
      description: "Tarjeta NFC para Alberto Soez (@albertosoez), tatuador especializado en new school, color saturado y personajes caricaturescos. El chip redirige a su Instagram. Diseño con fondo blanco brillante, tipografía gruesa e icono de pistola estilizada.",
      specs: [
        { label: "CLIENTE", value: "ALBERTO SOEZ" },
        { label: "INSTAGRAM", value: "@ALBERTOSOEZ", color: "var(--accent-gold)" },
        { label: "TECNOLOGÍA", value: "NFC · ENLACE A INSTAGRAM", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "juan",
    title: "JUAN HIERRO · TARJETA NFC",
    ratio: 1.54,
    bento: "wide",
    images: [
      "assets/img/proyectos/juan.png",
      "assets/img/proyectos/juan-2.png",
    ],
    detail: {
      description: "Tarjeta de visita inteligente para Juan Hierro (@juanihierretattoo), tatuador especializado en blackwork y línea fina. El chip NFC enlaza a su Instagram. Diseño en negro mate con relieve, tipografía metálica y símbolo de escuadra.",
      specs: [
        { label: "CLIENTE", value: "JUAN HIERRO TATTOO" },
        { label: "INSTAGRAM", value: "@JUANIHIERRETATTOO", color: "var(--accent-gold)" },
        { label: "TECNOLOGÍA", value: "NFC · ENLACE A INSTAGRAM", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "moontower",
    title: "MOONTOWER EDUCATION · BRANDING",
    ratio: 1.0,
    images: [
      "assets/img/proyectos/moontower.png",
      "assets/img/proyectos/moontower-2.png",
      "assets/img/proyectos/moontower-3.png",
    ],
    detail: {
      description: "Branding para proyecto educativo. Logotipo moderno y juguetón que transmite aprendizaje dinámico y creativo, inspirado en una torre y la luna como símbolo de guía. 2024.",
      specs: [
        { label: "CLIENTE", value: "MOONTOWER EDUCATION" },
        { label: "AÑO", value: "2024", color: "var(--accent-gold)" },
        { label: "DISCIPLINA", value: "BRANDING, DISEÑO DE MARCA", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "cham",
    title: "CHAM · STREAMER",
    ratio: 1.0,
    images: [
      "assets/img/proyectos/cham.png",
      "assets/img/proyectos/cham-2.png",
    ],
    detail: {
      description: "Identidad visual para streamer de videojuegos. Logotipo moderno, dinámico y con carácter, para pantalla, redes sociales y merchandising, con una versión simplificada para avatar y emojis. 2025.",
      specs: [
        { label: "CLIENTE", value: "CHAM · STREAMER" },
        { label: "AÑO", value: "2025", color: "var(--accent-gold)" },
        { label: "DISCIPLINA", value: "BRANDING, IDENTIDAD DIGITAL", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "boda",
    title: "LAURA & MIGUEL · BODA",
    ratio: 1.0,
    images: [
      "assets/img/proyectos/boda.png",
      "assets/img/proyectos/boda-2.png",
    ],
    detail: {
      description: "Papelería e identidad gráfica para boda. Diseño elegante y romántico con ilustraciones florales, tipografía caligráfica y un monograma personalizado, aplicado a invitaciones, menús y etiquetas. 2025.",
      specs: [
        { label: "CLIENTE", value: "LAURA & MIGUEL" },
        { label: "AÑO", value: "2025", color: "var(--accent-gold)" },
        { label: "DISCIPLINA", value: "PAPELERÍA, DISEÑO GRÁFICO", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "entrelineas",
    title: "ENTRE LÍNEAS · GRUPO MUSICAL",
    ratio: 1.0,
    images: [
      "assets/img/proyectos/entrelineas.png",
      "assets/img/proyectos/entrelineas-2.png",
    ],
    detail: {
      description: "Logotipo e identidad visual para grupo de música indie. Diseño tipográfico expresivo con un isotipo que evoca ondas sonoras, aplicado a canal de YouTube, redes sociales y portadas de singles. 2025.",
      specs: [
        { label: "CLIENTE", value: "ENTRE LÍNEAS · MÚSICA" },
        { label: "AÑO", value: "2025", color: "var(--accent-gold)" },
        { label: "DISCIPLINA", value: "BRANDING, DISEÑO PARA STREAMING", color: "var(--accent-orange)" },
      ],
    },
  },
  {
    id: "lamas",
    title: "LAMAS FOTOGRAFÍA · IDENTIDAD",
    ratio: 1.01,
    images: [
      "assets/img/proyectos/lamas.png",
      "assets/img/proyectos/lamas-2.png",
    ],
    detail: {
      description: "Identidad visual para fotógrafo profesional. Logotipo elegante y minimalista que combina tipografía serif con un símbolo que evoca la mirada y el encuadre fotográfico. 2024.",
      specs: [
        { label: "CLIENTE", value: "LAMAS FOTOGRAFÍA" },
        { label: "AÑO", value: "2024", color: "var(--accent-gold)" },
        { label: "DISCIPLINA", value: "BRANDING, DISEÑO GRÁFICO", color: "var(--accent-orange)" },
      ],
    },
  },
];

const DEFAULT_DETAIL = {
  description: "Proyecto de diseño gráfico — identidad visual y sistema tipográfico.",
  specs: [
    { label: "FORMATO", value: "VARIABLE" },
    { label: "TÉCNICA", value: "IMPRESIÓN DIGITAL", color: "var(--accent-gold)" },
    { label: "COLOR", value: "CMYK", color: "var(--accent-orange)" },
    { label: "CLIENTE", value: "ESTUDIO PROPIO" },
  ],
};

function getProjectDetail(project) {
  return project.detail || DEFAULT_DETAIL;
}
