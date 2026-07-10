// Loader: revela el nombre letra por letra y permite reiniciar la secuencia.
const Loader = (() => {
  let timer = null;
  let letterEls = [];
  let loaderEl = null;
  let replayBtn = null;
  let onDone = () => {};

  function buildLetters(name) {
    const nameEl = document.querySelector("[data-loader-name]");
    nameEl.innerHTML = "";
    letterEls = [];
    const lines = name.split("\n");
    lines.forEach((line, lineIdx) => {
      if (lineIdx > 0) {
        const br = document.createElement("br");
        nameEl.appendChild(br);
      }
      line.split("").forEach((ch) => {
        const span = document.createElement("span");
        span.className = "loader__letter";
        span.textContent = ch === " " ? " " : ch;
        nameEl.appendChild(span);
        letterEls.push({ el: span, idx: letterEls.length });
      });
    });
  }

  function applyLetterState(revealCount) {
    letterEls.forEach(({ el, idx }) => {
      const visible = idx < revealCount;
      const glitchy = idx % 3 === 0;
      const jitterX = glitchy ? (idx % 2 === 0 ? 6 : -5) : 0;
      const jitterY = glitchy ? -4 : 0;
      const yellowGlitch = idx % 5 === 2;

      el.style.opacity = visible ? "1" : "0";
      el.style.transform = visible ? `translate(${jitterX}px, ${jitterY}px)` : "translateY(-140%)";
      el.style.animation = visible && glitchy
        ? (yellowGlitch ? "rgbSplitYellow .4s steps(2) infinite" : "rgbSplit .4s steps(2) infinite")
        : "none";
    });
  }

  function start(name) {
    clearInterval(timer);
    let i = 0;
    applyLetterState(0);
    timer = setInterval(() => {
      i++;
      applyLetterState(i);
      if (i >= letterEls.length) {
        clearInterval(timer);
        setTimeout(() => {
          loaderEl.classList.add("loader--done");
          onDone();
        }, 650);
      }
    }, 95);
  }

  function replay(name) {
    loaderEl.classList.remove("loader--done");
    start(name);
  }

  function init({ name, onDoneCallback }) {
    loaderEl = document.querySelector("[data-loader]");
    replayBtn = document.querySelector("[data-replay-btn]");
    onDone = onDoneCallback || (() => {});

    buildLetters(name);
    start(name);

    replayBtn.addEventListener("click", () => replay(name));
  }

  return { init };
})();