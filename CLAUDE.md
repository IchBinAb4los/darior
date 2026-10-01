# Rubén Darío Rojas — sitio de oficios

Sitio de una sola página para conseguir clientes nuevos para Rubén Darío Rojas, de Merlo (trabaja en toda la Zona Oeste y Capital Federal): herrería, cerrajería, pintura y refrigeración (con título), más arreglos generales. El objetivo de cada sección es que la persona termine escribiendo por WhatsApp o llamando.

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
- Animaciones: cortas, una sola vez al entrar en pantalla, nada que se repita ni parallax. La portada entra con CSS puro al cargar; el resto usa `.rv` (aparece al hacer scroll) y `.rv-grupo` (los hijos aparecen en cascada), que activa `app.js` con IntersectionObserver. Con `prefers-reduced-motion` no se anima nada. Nada debe salirse del ancho de pantalla mientras está oculto (probar `scrollWidth` a 390 px).
- Accesibilidad: áreas táctiles de 44 px, `:focus-visible`, contraste AA calculado, `prefers-reduced-motion`.
- Probar a 390 px y a 1366 px.

## Archivos

- `index.html` — marcado, metadatos, JSON-LD.
- `styles.css` — estilos y tokens.
- `app.js` — **datos editables arriba de todo** (teléfono, horario, redes, fotos de la galería) y la lógica (galería, filtros, visor, armado del mensaje de WhatsApp).
- `img/trabajos/` — fotos de la galería en WebP 800×800; `img/trabajos/grande/` las mismas para el visor (lado largo 1400).
- `img/antes-despues/` — pares en 4:5. `img/hero.webp`, `img/og-image.jpg` (1200×630), favicons en `img/icons/`.
- `originales/` — fotos tal como llegaron por WhatsApp. No se publican en la página, pero quedan en el repo.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, `favicon.ico`.
- `herramientas/fotos.py` — genera todas las imágenes desde `originales/` (necesita Pillow). Para agregar una foto: sumala a la lista del script, correlo y agregala a `TRABAJOS` en `app.js`.

## Probar

`python -m http.server 8080` en la raíz (o la configuración `sitio` de `.claude/launch.json`) y abrir http://localhost:8080. Los botones de WhatsApp y teléfono los completa `app.js`; en el HTML quedan apuntando a `#contacto` como respaldo.

## Datos repetidos (cambiar en todos lados)

- Teléfono (+54 9 11 5697-0035): `app.js` (`NEGOCIO.telefono` y `telefonoVisible`), el JSON-LD de `index.html` y el texto de respaldo de los `.js-tel-visible` en `index.html`.
- Dominio: `index.html` (canonical, Open Graph, Twitter, JSON-LD), `robots.txt`, `sitemap.xml`.
- Zona: va escrita en `index.html` (no en `app.js`) para que la lea Google: `title`, `description`, Open Graph, Twitter, JSON-LD (`address`, `areaServed`), bajada de la portada, `.portada-zona`, sección `#zona`, dato "Zona" de contacto y pie. También en la imagen para compartir (`herramientas/fotos.py`).

## Publicación

- Dominio: **rubendariorojas.com** (comprado en Namecheap). Dirección principal sin `www`; `www` redirige con 301.
- Camino: GitHub → Cloudflare Pages (rama de producción `trunk`, sin build) → DNS en Cloudflare → dominio propio y HTTPS → Search Console. Detalle en la sección 4 de `guia-sitio-nuevo.md`.
- [ ] Repo en GitHub y primer push
- [ ] Proyecto de Cloudflare Pages andando en `*.pages.dev`
- [ ] Dominio agregado en Cloudflare y nameservers cambiados en Namecheap
- [ ] Dominio propio en Pages + redirección de `www` + Always Use HTTPS
- [ ] Search Console, sitemap e indexación
- [ ] Perfil de Empresa de Google

## Pendientes

- [ ] Confirmar la lista de localidades de la sección `#zona` (hoy: Merlo, Padua, Moreno, Ituzaingó, Morón, Castelar, Haedo, Hurlingham, La Matanza, Tres de Febrero, General Rodríguez y Capital Federal).
- [ ] Confirmar con Rubén la lista de servicios de cada oficio y cómo nombra su título de refrigeración.
- [ ] Redes sociales (si tiene) en `NEGOCIO.redes` y en `sameAs`.
- [ ] Horario de atención.
- [ ] Fotos de cerrajería (hoy no hay ninguna).
- [ ] Perfil de Empresa de Google.
