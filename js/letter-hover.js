// Módulo reutilizable: deforma un titular letra por letra según la posición
// del cursor (lift + rotación + "fantasma" naranja brutalista cerca del
// cursor), y al entrar el ratón dispara en paralelo el scramble dorado
// (js/scramble.js) — la misma decodificación que usan las tarjetas de la galería.
// Usado por hero, "DISEÑO GRÁFICO" y "CONTACTO" — misma física, tres titulares.
//
// `text` admite "\n" para forzar un salto de línea (p. ej. "ENRIQUE\nMALVAR")
// sin perder nada de lo anterior: la posición horizontal de cada letra se
// mide con getBoundingClientRect() en vez de asumir una única línea continua,
// así el hover/scramble/oscilación funcionan igual con una línea o con varias.
// Se mide en reposo (antes de aplicar transform) para no realimentar el
// cálculo con la propia animación.
const LetterHover = (() => {
  function isTouchDevice() {
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }

  function attach({ container, targetEl, text, letterClass = "chroma-letter" }) {
    targetEl.innerHTML = "";
    const lines = text.split("\n");
    const flatText = lines.join("");
    const letterEls = [];
    lines.forEach((line, lineIdx) => {
      if (lineIdx > 0) targetEl.appendChild(document.createElement("br"));
      line.split("").forEach((ch) => {
        const span = document.createElement("span");
        span.className = letterClass;
        span.textContent = ch === " " ? " " : ch;
        targetEl.appendChild(span);
        letterEls.push(span);
      });
    });

    let hovering = false;
    let ratio = 0.5;
    let scrambling = false;
    let cancelScramble = null;
    let letterRatios = letterEls.map(() => 0.5);

    function measureLetters() {
      const containerRect = container.getBoundingClientRect();
      const titleRect = targetEl.getBoundingClientRect();
      if (!containerRect.width) return;
      if (titleRect.width) {
        // Ancho del periodo que recorre --sweep en chroma.css: un periodo
        // completo = el titular entero pasa de blanco sólido a negro sólido.
        targetEl.style.setProperty("--title-width", `${titleRect.width}px`);
      }
      letterEls.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        letterRatios[idx] = (rect.left + rect.width / 2 - containerRect.left) / containerRect.width;
        if (titleRect.width) {
          // El corte blanco/negro (chroma.css) se dibuja como si fuera un
          // único degradado detrás de TODO el titular: cada letra recorta
          // (background-clip:text) su propio hueco de esa misma imagen,
          // desplazada según su posición real (--letter-offset) para que el
          // corte se vea continuo en vez de repetirse letra por letra. La
          // oscilación en sí (--sweep) la anima el @keyframes de chroma.css.
          const offsetX = rect.left - titleRect.left;
          el.style.backgroundSize = `${titleRect.width}px 100%`;
          el.style.setProperty("--letter-offset", `${-offsetX}px`);
        }
      });
    }

    function render() {
      letterEls.forEach((el, idx) => {
        const r = letterRatios[idx];
        const dist = Math.abs(r - ratio);
        const lift = hovering ? Math.max(0, 1 - dist * 2.4) * 30 : 0;
        const rot = hovering ? (r - ratio) * 16 : 0;
        const isGhost = hovering && dist < 0.05;

        el.style.transform = `translateY(${(-lift).toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`;
        if (scrambling) {
          // El scramble dorado sustituye temporalmente el corte blanco/negro.
          el.style.backgroundImage = "none";
          el.style.color = "#FFD700";
        } else if (isGhost) {
          // Naranja brutalista (mismo tono que las figuras del fondo) para
          // probar el contraste de las letras más cercanas al cursor.
          el.style.backgroundImage = "none";
          el.style.color = "#FF6A00";
        } else {
          // Reposo: vuelve al corte blanco/negro oscilante de chroma.css.
          el.style.backgroundImage = "";
          el.style.color = "";
        }
      });
    }

    function startScramble() {
      if (cancelScramble) return;
      scrambling = true;
      render();
      cancelScramble = Scramble.run({
        finalText: flatText,
        onFrame: (out) => {
          out.split("").forEach((ch, idx) => {
            letterEls[idx].textContent = ch === " " ? " " : ch;
          });
        },
        onDone: () => {
          cancelScramble = null;
          scrambling = false;
          render();
        },
      });
    }

    function endScramble() {
      if (cancelScramble) {
        cancelScramble();
        cancelScramble = null;
      }
      scrambling = false;
      flatText.split("").forEach((ch, idx) => {
        letterEls[idx].textContent = ch === " " ? " " : ch;
      });
      render();
    }

    measureLetters();
    render();

    window.addEventListener("resize", () => {
      // El salto de línea puede cambiar con el ancho: reposiciona sin animar.
      if (!hovering) measureLetters();
    });

    // En touch/sin hover real: se queda en reposo (texto final legible),
    // no se simula ni el lift/rotación ni el scramble con touchstart.
    if (isTouchDevice()) return;

    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      render();
    });

    container.addEventListener("mouseenter", () => {
      // Mide en reposo, antes de que el propio hover mueva las letras.
      measureLetters();
      hovering = true;
      startScramble();
      render();
    });

    container.addEventListener("mouseleave", () => {
      hovering = false;
      ratio = 0.5;
      endScramble();
      render();
    });
  }

  return { attach };
})();
