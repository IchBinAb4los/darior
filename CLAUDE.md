# Rubén Darío Rojas — sitio de oficios

Sitio de una sola página para conseguir clientes nuevos para Rubén Darío Rojas: herrería, cerrajería, pintura y refrigeración (con título), más arreglos generales. El objetivo de cada sección es que la persona termine escribiendo por WhatsApp o llamando.

Leé también `guia-sitio-nuevo.md`: las reglas de ahí valen para este repo.

## Idioma y tono

- Español de Argentina con voseo, en **todo** lo visible: textos, `alt`, metadatos, mensaje de WhatsApp.
- Habla Rubén en primera persona ("hago", "te paso presupuesto"). Directo, sin vueltas, sin palabras de marketing.
- No inventar datos: años de oficio, garantías, "presupuesto sin cargo", urgencias 24 h, opiniones de clientes o nombres de instituciones solo si Rubén los confirma.

## Diseño

- Concepto: cartel de obra / señalética. **Amarillo señal sobre negro hierro**, con papel claro en las secciones de lectura.
- Tokens de color en `:root` de `styles.css`, con modo oscuro por `prefers-color-scheme`. El amarillo siempre lleva texto negro encima (en los dos modos).
- Fuentes: **Barlow Condensed** (800, títulos en mayúsculas) y **Barlow** (400/600, texto). Google Fonts.
- Reglas: texto alineado a la izquierda, sin emojis, sin gradientes, sin grillas de tarjetas repetidas; cada sección con una forma distinta (lista numerada, pares antes/después, galería, pasos, formulario).
- Accesibilidad: áreas táctiles de 44 px, `:focus-visible`, contraste AA calculado, `prefers-reduced-motion`.
- Probar a 390 px y a 1366 px.

## Archivos

- `index.html` — marcado, metadatos, JSON-LD.
- `styles.css` — estilos y tokens.
- `app.js` — **datos editables arriba de todo** (teléfono, zona, horario, redes, fotos de la galería) y la lógica (galería, filtros, visor, armado del mensaje de WhatsApp).
- `img/trabajos/` — fotos de la galería en WebP 800×800; `img/trabajos/grande/` las mismas para el visor (lado largo 1400).
- `img/antes-despues/` — pares en 4:5. `img/hero.webp`, `img/og-image.jpg` (1200×630), favicons en `img/icons/`.
- `originales/` — fotos tal como llegaron por WhatsApp. No se publican en la página, pero quedan en el repo.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `favicon.ico`.
- `herramientas/fotos.py` — genera todas las imágenes desde `originales/` (necesita Pillow). Para agregar una foto: sumala a la lista del script, correlo y agregala a `TRABAJOS` en `app.js`.

## Probar

`python -m http.server 8080` en la raíz (o la configuración `sitio` de `.claude/launch.json`) y abrir http://localhost:8080. Los botones de WhatsApp y teléfono los completa `app.js`; en el HTML quedan apuntando a `#contacto` como respaldo.

## Datos repetidos (cambiar en todos lados)

- Teléfono: `app.js` (`NEGOCIO.telefono` y `telefonoVisible`) y el JSON-LD de `index.html`.
- Dominio: `index.html` (canonical, Open Graph, Twitter, JSON-LD), `robots.txt`, `sitemap.xml`.
- Zona: `app.js` y el JSON-LD (`areaServed`).

## Pendientes

- [ ] **Teléfono real** de Rubén (hoy hay uno de ejemplo, `11 0000-0000`): sin esto los botones no sirven.
- [ ] **Zona de trabajo** (ciudad/barrios) para el texto, el título SEO y `areaServed`.
- [ ] **Dominio**: comprarlo y reemplazar el provisorio `rubendariorojas.com.ar` en los archivos de arriba.
- [ ] Confirmar con Rubén la lista de servicios de cada oficio y cómo nombra su título de refrigeración.
- [ ] Redes sociales (si tiene) en `NEGOCIO.redes` y en `sameAs`.
- [ ] Horario de atención.
- [ ] Fotos de cerrajería (hoy no hay ninguna).
- [ ] Perfil de Empresa de Google.
