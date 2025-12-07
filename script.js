
/* DEBOUNCE */
function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

/* MENÚ MÓVIL */
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-principal");
  const burger = document.querySelector(".btn-burger");
  if (!nav || !burger) return;

  burger.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav-open");

    if (isOpen) {
      document.body.style.overflow = "hidden";     // Bloquear fondo
      nav.style.maxHeight = "100vh";               // Limitar el alto del menú
      nav.style.overflowY = "auto";                // Habilitar scroll dentro del menú
    } else {
      document.body.style.overflow = "";           // Restaurar scroll del documento
      nav.style.overflowY = "";
      nav.style.maxHeight = "";
    }
  });
});


/* BUSCADOR DE PRODUCTOS */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input-busqueda");
  const grid = document.querySelector(".grid-categorias, .grid-suelos");

  if (!input || !grid) return;

  const tarjetas = [...grid.querySelectorAll(".tarjeta, .item-suelo")];

  const items = tarjetas.map(el => {
    const tituloEl = el.querySelector(".titulo-tarjeta") || el.querySelector("h3");
    const titulo = tituloEl ? tituloEl.textContent.toLowerCase() : "";
    return { el, titulo };
  });

  input.addEventListener("input", debounce(() => {
    const texto = input.value.toLowerCase();
    items.forEach(it => {
      it.el.style.display = it.titulo.includes(texto) ? "" : "none";
    });
  }, 150));
});

/* SCROLL REVEAL */
document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(".tarjeta, .item-suelo");
  if (!elementos.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, { threshold: 0.15 });

  elementos.forEach(el => obs.observe(el));
});

/* BOTÓN VOLVER ARRIBA */
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.className = "btn-arriba";
  btn.innerHTML = "↑";
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 500 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});