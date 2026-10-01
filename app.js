/* =====================================================================
   DATOS EDITABLES
   Para cambiar teléfono, horario, redes o fotos, tocá solo esto.
   (La zona de trabajo está escrita en index.html para que la lea Google.)
   ===================================================================== */

const NEGOCIO = {
  // Número para WhatsApp y llamadas: código de país + 9 + área + número, sin espacios ni signos.
  telefono: "5491156970035",
  // Cómo se lee el número en la página.
  telefonoVisible: "11 5697-0035",
  // Ej.: "Lunes a sábado, de 8 a 19". Si queda vacío, no se muestra.
  horario: "",
  // Ej.: { nombre: "Instagram", url: "https://instagram.com/..." }
  redes: [],
  // Primer mensaje cuando tocan cualquier botón de WhatsApp.
  mensajeInicial: "Hola Rubén, te escribo desde tu página. Quería pedirte un presupuesto.",
};

// Cuántas fotos se ven antes de tocar "Ver más trabajos".
const FOTOS_INICIALES = 12;

// foto: nombre del archivo en /img/trabajos/ (sin .webp). oficio: herreria | pintura | refrigeracion
const TRABAJOS = [
  { foto: "tinglado-chapa", oficio: "herreria", titulo: "Tinglado de chapa", alt: "Tinglado de chapa con estructura de hierro negra sobre la entrada de un edificio" },
  { foto: "pasillo-piso-verde", oficio: "pintura", titulo: "Pasillo: piso, revestimiento y paredes", alt: "Pasillo con piso pintado de verde, revestimiento gris y paredes blancas" },
  { foto: "split-instalado", oficio: "refrigeracion", titulo: "Instalación de split", alt: "Aire acondicionado split instalado en lo alto de una pared blanca" },
  { foto: "baranda-rampa", oficio: "herreria", titulo: "Barandas para rampa", alt: "Barandas de caño negras a los dos lados de una rampa pintada de verde" },
  { foto: "terraza-piso", oficio: "pintura", titulo: "Piso de terraza", alt: "Terraza con el piso pintado de rojo óxido" },
  { foto: "cartel-numero", oficio: "herreria", titulo: "Cartel de numeración", alt: "Cartel con el número 6489 en hierro negro sobre fondo blanco" },
  { foto: "puerta-doble", oficio: "pintura", titulo: "Puerta doble", alt: "Puerta doble con vidrios, pintada de blanco" },
  { foto: "parrilla-brasero", oficio: "herreria", titulo: "Parrilla con brasero", alt: "Parrilla con brasero de ladrillo refractario y estructura de hierro" },
  { foto: "split-pared", oficio: "refrigeracion", titulo: "Split con cañería por caño", alt: "Equipo split en la pared con la cañería llevada por caño metálico" },
  { foto: "rejas-metal-desplegado", oficio: "herreria", titulo: "Rejas con metal desplegado", alt: "Dos hojas de reja con metal desplegado, pintadas de negro" },
  { foto: "ascensor", oficio: "pintura", titulo: "Ascensor", alt: "Puertas y marco de ascensor pintados de gris grafito" },
  { foto: "mensula", oficio: "herreria", titulo: "Ménsula de hierro", alt: "Ménsula de hierro pintada de blanco con refuerzo en diagonal" },
  { foto: "sala-de-espera", oficio: "pintura", titulo: "Sala de espera", alt: "Sala de espera pintada de blanco con guardasillas gris" },
  { foto: "parrilla", oficio: "herreria", titulo: "Parrilla a medida", alt: "Parrilla de hierro con varillas y una parte de metal desplegado" },
  { foto: "split-caneria", oficio: "refrigeracion", titulo: "Split con cañería prolija", alt: "Split instalado con la cañería a la vista, ordenada a lo largo de la pared" },
  { foto: "puerta-vaiven", oficio: "pintura", titulo: "Puerta vaivén", alt: "Puerta vaivén doble pintada de blanco con zócalo negro" },
  { foto: "baranda-rampa-lateral", oficio: "herreria", titulo: "Barandas para rampa", alt: "Vista de costado de las barandas negras de una rampa de acceso" },
  { foto: "pasillo", oficio: "pintura", titulo: "Pasillo", alt: "Pasillo largo con paredes y puertas pintadas de blanco" },
  { foto: "pala-atizador", oficio: "herreria", titulo: "Pala y atizador", alt: "Pala y atizador de hierro para parrilla, pintados de negro" },
  { foto: "puertas-pasillo", oficio: "pintura", titulo: "Puertas y rejas", alt: "Puerta lisa y puerta doble con reja, pintadas de blanco" },
  { foto: "mensulas-par", oficio: "herreria", titulo: "Ménsulas de hierro", alt: "Dos ménsulas de hierro blancas apoyadas contra la pared" },
  { foto: "revestimiento-gris", oficio: "pintura", titulo: "Revestimiento y piso", alt: "Pared con revestimiento pintado de gris y piso verde" },
  { foto: "tinglado-chapa-frente", oficio: "herreria", titulo: "Tinglado, vista de frente", alt: "Vista de frente del tinglado de chapa con columnas de hierro negras" },
  { foto: "puerta-paneles", oficio: "pintura", titulo: "Puerta de paneles", alt: "Puerta grande de paneles pintada de blanco junto a una pared gris" },
  { foto: "terraza-piso-patio", oficio: "pintura", titulo: "Piso de terraza", alt: "Otra vista de la terraza con el piso pintado de rojo" },
  { foto: "cielorraso", oficio: "pintura", titulo: "Cielorraso", alt: "Cielorraso y paredes pintados de blanco" },
];

/* =====================================================================
   LÓGICA (no hace falta tocar de acá para abajo)
   ===================================================================== */

const $ = (sel, raiz = document) => raiz.querySelector(sel);
const $$ = (sel, raiz = document) => [...raiz.querySelectorAll(sel)];

const linkWhatsApp = (texto) => `https://wa.me/${NEGOCIO.telefono}?text=${encodeURIComponent(texto)}`;

function guardado(clave, valor) {
  try {
    if (valor === undefined) return JSON.parse(localStorage.getItem(clave) || "null");
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (_) {
    return null;
  }
}

/* ---- Datos del negocio en la página ---- */
function completarDatos() {
  $$(".js-wa, #consulta-enviar").forEach((a) => {
    a.href = linkWhatsApp(NEGOCIO.mensajeInicial);
    a.target = "_blank";
    a.rel = "noopener";
  });
  $$(".js-tel").forEach((a) => (a.href = `tel:+${NEGOCIO.telefono}`));
  $$(".js-tel-visible").forEach((el) => (el.textContent = NEGOCIO.telefonoVisible));
  $$(".js-anio").forEach((el) => (el.textContent = new Date().getFullYear()));

  if (NEGOCIO.horario) {
    $$(".js-horario").forEach((el) => (el.textContent = NEGOCIO.horario));
    $$(".js-dato-horario").forEach((el) => (el.hidden = false));
  }
  const redes = NEGOCIO.redes.filter((r) => r.url);
  if (redes.length) {
    $$(".js-redes").forEach((ul) => {
      ul.innerHTML = "";
      redes.forEach((r) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = r.url;
        a.rel = "me noopener";
        a.target = "_blank";
        a.textContent = r.nombre;
        li.append(a);
        ul.append(li);
      });
      ul.hidden = false;
    });
  }
}

/* ---- Animaciones al hacer scroll ----
   Cada elemento con .rv aparece una sola vez cuando entra en pantalla.
   Los hijos de .rv-grupo aparecen uno detrás de otro.
   Si la persona pidió menos movimiento, no se anima nada. */
let observador = null;

function revelar(el, orden = 0) {
  if (!observador) return;
  el.classList.add("rv");
  el.style.setProperty("--i", orden);
  observador.observe(el);
}

function prepararAnimaciones() {
  const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (menosMovimiento || !("IntersectionObserver" in window)) return;

  observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("visto");
        observador.unobserve(e.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  document.documentElement.classList.add("anim");

  $$(".rv-grupo").forEach((grupo) => [...grupo.children].forEach((hijo, i) => revelar(hijo, i)));
  $$(".rv").forEach((el) => observador.observe(el));
}

/* ---- Galería ---- */
const galeria = { filtro: "todos", todas: false, visibles: [] };

function dibujarGaleria(sinAnimarHasta = 0) {
  const lista = $("#galeria");
  const botonMas = $("#ver-mas");
  if (!lista) return;

  const filtradas = TRABAJOS.filter((t) => galeria.filtro === "todos" || t.oficio === galeria.filtro);
  galeria.visibles = galeria.todas ? filtradas : filtradas.slice(0, FOTOS_INICIALES);

  lista.innerHTML = "";
  galeria.visibles.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = "galeria-item";
    const boton = document.createElement("button");
    boton.type = "button";
    boton.setAttribute("aria-label", `Ver grande: ${t.titulo}`);
    const img = document.createElement("img");
    img.src = `/img/trabajos/${t.foto}.webp`;
    img.alt = t.alt;
    img.width = 800;
    img.height = 800;
    img.loading = "lazy";
    img.decoding = "async";
    const marco = document.createElement("span");
    marco.className = "galeria-marco";
    marco.append(img);
    const texto = document.createElement("span");
    texto.className = "galeria-titulo";
    texto.textContent = t.titulo;
    texto.setAttribute("aria-hidden", "true");
    boton.append(marco, texto);
    boton.addEventListener("click", () => abrirVisor(i));
    li.append(boton);
    lista.append(li);
    if (i >= sinAnimarHasta) revelar(li, (i - sinAnimarHasta) % 4);
  });

  const quedan = filtradas.length - galeria.visibles.length;
  botonMas.hidden = quedan <= 0;
  botonMas.textContent = `Ver ${quedan} trabajos más`;
}

function prepararGaleria() {
  $$(".filtro").forEach((b) =>
    b.addEventListener("click", () => {
      galeria.filtro = b.dataset.filtro;
      galeria.todas = false;
      $$(".filtro").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      dibujarGaleria();
    })
  );
  $("#ver-mas")?.addEventListener("click", () => {
    const primeraNueva = galeria.visibles.length;
    galeria.todas = true;
    dibujarGaleria(primeraNueva);
    $$("#galeria button")[primeraNueva]?.focus();
  });
  dibujarGaleria();
}

/* ---- Visor de fotos ---- */
let fotoActual = 0;
let origenVisor = null;

function mostrarFoto(i) {
  const total = galeria.visibles.length;
  fotoActual = (i + total) % total;
  const t = galeria.visibles[fotoActual];
  const img = $("#visor-img");
  img.src = `/img/trabajos/grande/${t.foto}.webp`;
  img.alt = t.alt;
  $("#visor-texto").textContent = `${t.titulo} · ${fotoActual + 1} de ${total}`;
}

function abrirVisor(i) {
  const visor = $("#visor");
  if (!visor || typeof visor.showModal !== "function") {
    window.location.href = `/img/trabajos/grande/${galeria.visibles[i].foto}.webp`;
    return;
  }
  origenVisor = document.activeElement;
  mostrarFoto(i);
  visor.showModal();
  $("#visor-cerrar").focus();
}

function prepararVisor() {
  const visor = $("#visor");
  if (!visor) return;
  $("#visor-cerrar").addEventListener("click", () => visor.close());
  $("#visor-ant").addEventListener("click", () => mostrarFoto(fotoActual - 1));
  $("#visor-sig").addEventListener("click", () => mostrarFoto(fotoActual + 1));
  visor.addEventListener("click", (e) => { if (e.target === visor) visor.close(); });
  visor.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mostrarFoto(fotoActual - 1);
    if (e.key === "ArrowRight") mostrarFoto(fotoActual + 1);
  });
  visor.addEventListener("close", () => origenVisor?.focus());

  let inicioX = null;
  visor.addEventListener("touchstart", (e) => (inicioX = e.touches[0].clientX), { passive: true });
  visor.addEventListener("touchend", (e) => {
    if (inicioX === null) return;
    const dx = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(dx) > 50) mostrarFoto(fotoActual + (dx < 0 ? 1 : -1));
    inicioX = null;
  });
}

/* ---- Consulta por WhatsApp ---- */
function prepararConsulta() {
  const form = $("#consulta");
  const enviar = $("#consulta-enviar");
  if (!form || !enviar) return;

  const CLAVE = "consulta-rdr";
  const previo = guardado(CLAVE);
  if (previo) {
    if (previo.oficio) {
      const radio = form.querySelector(`input[name="oficio"][value="${CSS.escape(previo.oficio)}"]`);
      if (radio) radio.checked = true;
    }
    ["detalle", "zona", "nombre"].forEach((k) => { if (previo[k]) form.elements[k].value = previo[k]; });
  }

  function actualizar() {
    const datos = {
      oficio: form.querySelector('input[name="oficio"]:checked')?.value || "",
      detalle: form.elements.detalle.value.trim(),
      zona: form.elements.zona.value.trim(),
      nombre: form.elements.nombre.value.trim(),
    };
    guardado(CLAVE, datos);

    const lineas = [datos.nombre ? `Hola Rubén, soy ${datos.nombre}. Te escribo desde tu página.` : "Hola Rubén, te escribo desde tu página."];
    lineas.push(datos.oficio ? `Necesito un presupuesto de ${datos.oficio.toLowerCase()}.` : "Necesito un presupuesto.");
    if (datos.detalle) lineas.push(`El trabajo: ${datos.detalle}`);
    if (datos.zona) lineas.push(`Estoy en ${datos.zona}.`);
    enviar.href = linkWhatsApp(lineas.join("\n"));
  }

  form.addEventListener("input", actualizar);
  form.addEventListener("change", actualizar);
  form.addEventListener("submit", (e) => { e.preventDefault(); enviar.click(); });
  actualizar();
}

completarDatos();
prepararAnimaciones();
prepararGaleria();
prepararVisor();
prepararConsulta();
