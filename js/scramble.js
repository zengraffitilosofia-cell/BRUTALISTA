// Módulo compartido: efecto "scramble" (descodificación tipo hacker) que
// revela un texto letra por letra sustituyendo caracteres aleatorios.
// Usado por las tarjetas de la galería (js/gallery.js) y por los 3 titulares
// grandes vía LetterHover (js/letter-hover.js) — misma lógica, un solo sitio.
const Scramble = (() => {
  const CHARS = "!<>-_\\/[]{}=+*^?#";
  const TOTAL_FRAMES = 9;
  const FRAME_MS = 45;

  function frameText(finalText, frame) {
    const lockedCount = Math.floor((finalText.length * frame) / TOTAL_FRAMES);
    return finalText.split("").map((ch, idx) => {
      if (ch === " ") return " ";
      if (idx < lockedCount) return ch;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join("");
  }

  // Arranca el ciclo de scramble. onFrame(text) se llama en cada tick,
  // onDone() cuando termina. Devuelve una función para cancelarlo a mitad.
  function run({ finalText, onFrame, onDone }) {
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      onFrame(frameText(finalText, frame));
      if (frame >= TOTAL_FRAMES) {
        clearInterval(timer);
        onFrame(finalText);
        if (onDone) onDone();
      }
    }, FRAME_MS);
    return () => clearInterval(timer);
  }

  return { CHARS, TOTAL_FRAMES, FRAME_MS, run };
})();
