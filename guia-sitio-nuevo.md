# Guía para armar un sitio nuevo con Claude Code

Lo que funcionó en myapostres.com. Pegá este archivo en el repo nuevo (o adaptalo como `CLAUDE.md`) y pedile a Claude que lo lea antes de escribir una línea.

## 0. Antes de la primera línea de código

1. **Comprá el dominio primero.** Todo lo que sigue (canonical, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`) lleva la dirección final adentro. Si arrancás sin dominio, después hay que tocar seis archivos y es fácil olvidarse de uno.
2. **Decidí la dirección principal:** `midominio.com` **o** `www.midominio.com`, nunca las dos. La otra redirige con 301. Si las dos responden, Google ve dos sitios iguales y se reparte el valor.
3. **Escribí `CLAUDE.md` antes del código**, aunque sea corto: qué es el negocio, idioma y tono, reglas de diseño, estructura de archivos, datos editables y una lista de **Pendientes**. Ese archivo es lo que hace que la sesión número 10 no deshaga lo de la número 2.
4. **`git init` y primer commit enseguida**, antes de que haya 20 archivos sin historial.

## 1. Repo y commits

- **Todo en `trunk`, sin ramas** (en un proyecto personal de una sola persona, las ramas y los PR son fricción pura).
- **Un commit por cambio verificado**, no uno por día. Claude tiene que commitear solo, sin que se lo pidas.
- Mensajes que digan **qué cambió y por qué**, en pasado. Nada de "fix", "cambios", "update".
- **Nunca mencionar a Claude ni a ninguna IA** en los mensajes de commit.
- Cada commit debería dejar el sitio funcionando.
- `CLAUDE.md` se actualiza **en el mismo commit** que el cambio que documenta.

## 2. Reglas del proyecto que conviene fijar desde el día 1

- **Sin build step** mientras se pueda: HTML, CSS y JS estáticos. Cero `npm install`, cero esperas, el deploy es copiar archivos.
- **Tres archivos**, no uno: `index.html` (marcado y metadatos), `styles.css` (tokens de color en `:root`), `app.js` (configuración y lógica). Rutas absolutas (`/styles.css`), que funcionan igual en cualquier carpeta.
- **Datos editables arriba de todo en `app.js`**: productos, precios, teléfono, textos de los mensajes. Cambiar un precio no debería implicar leer código.
- **Mobile first.** Probar siempre a **390 px** y a **1366 px**.
- **Idioma y tono explícitos.** En este caso: español de Argentina con voseo, en todo lo visible, incluidos los mensajes de WhatsApp, los `alt` de las imágenes y los metadatos.
- **Que no parezca hecho por IA:** texto alineado a la izquierda, sin emojis como íconos, sin gradientes, sin grillas de tarjetas repetidas en cada sección, secciones que no se parezcan entre sí.
- **Accesibilidad como regla, no como revisión final:** áreas táctiles de 44 px, `:focus-visible`, contraste AA (4.5:1 en texto normal), `prefers-reduced-motion` desactivando todas las animaciones.
- **Modo oscuro** vía `prefers-color-scheme` desde el principio: agregarlo después obliga a reescribir todos los colores.

## 3. SEO (lo que hay que tener sí o sí)

- `title` y `meta description` con **qué vendés + dónde**, no solo el nombre de la marca.
- `<link rel="canonical">` con la dirección principal.
- **Open Graph y Twitter Card**, con `og-image` de **1200×630**. Es la imagen que ve todo el mundo cuando se comparte el link por WhatsApp.
- **JSON-LD** con el tipo que corresponda (`Bakery`, `Restaurant`, `LocalBusiness`, `Product`…), dirección, teléfono, redes en `sameAs`. Verificar en https://search.google.com/test/rich-results
- `robots.txt` (con la línea `Sitemap:`), `sitemap.xml`, `site.webmanifest` y favicons en **varios tamaños** (16/32/48 + `.ico` + `apple-touch-icon`).
- **Imágenes optimizadas:** WebP, recorte cuadrado, ~800×800, calidad 0,8, 40-100 KB cada una. Guardar también los originales en el repo.
- Las redes sociales van en el pie **y** en `sameAs`.

## 4. Deploy: GitHub + Cloudflare Pages + Namecheap

El camino que usamos. Es gratis, sin build, y cada `git push` publica solo.

**a. GitHub.** Repo (puede ser privado), `git remote add origin …`, `git push -u origin trunk`.

**b. Cloudflare Pages.** Workers & Pages → Create → Pages → conectar el repo.
- **Rama de producción: `trunk`.** Viene con `main` por defecto; si no lo cambiás, no publica nunca.
- Framework preset `None`, build command vacío, output `/`.
- Probar primero en la dirección `*.pages.dev` que te da.
- **Ojo:** Pages publica *todos* los archivos del repo. `CLAUDE.md` y las fotos originales quedan accesibles por URL.

**c. DNS.** Agregar el dominio en Cloudflare (plan Free).
- El escaneo importa los registros del registrador: **borrar los de parking** (el `A` a la IP de Namecheap y el `CNAME` `www` a `parkingpage.namecheap.com`), y los `MX`/`TXT` de reenvío de correo si no los usás. No crear a mano los registros del sitio: los crea Pages.
- En Namecheap: Domain List → Manage → **Custom DNS** → los dos nameservers de Cloudflare → guardar con el tilde verde (si no lo tocás, no se guarda).
- **DNSSEC apagado** antes de mudar los nameservers.
- Tarda entre 5 minutos y 24 horas.

**d. Dominio y HTTPS.**
- En el proyecto de Pages → **Custom domains** → agregar `midominio.com` **y** `www.midominio.com`.
- **Redirect Rule** (patrón comodín): `https://www.midominio.com/*` → `https://midominio.com/${1}`, **301**, conservando la query string.
- **SSL/TLS → Edge Certificates → Always Use HTTPS** encendido. Ojo: "Reescrituras automáticas HTTPS" es otra opción distinta.
- Verificar las cuatro entradas: con y sin `www`, en `http` y en `https`.

**e. Google.**
- Search Console → propiedad de tipo **Dominio** → verificar (Cloudflare lo hace de un clic).
- En Sitemaps hay que poner la **URL completa**: `https://midominio.com/sitemap.xml`. Con solo `sitemap.xml` lo rechaza.
- **Inspeccionar URL → Solicitar indexación** para no esperar semanas.
- **Perfil de Empresa de Google** si hay un negocio local: para búsquedas del estilo "X en <pueblo>" pesa más que la web.

## 5. Trampas que nos costaron tiempo

- **La imagen para compartir se cachea.** WhatsApp y Facebook guardan la primera que ven. Dejala bien *antes* de mandar el link. Para forzarla: https://developers.facebook.com/tools/debug/ → Scrape Again.
- **El navegador cachea el JS.** Después de editar, el primer reload puede correr el código viejo: Ctrl+F5.
- **Si hay carrito o formulario, todo tiene que sobrevivir a una recarga** (`localStorage`). Y los `id` de los productos son claves guardadas: si los cambiás, el pedido de la gente se pierde.
- **Los links a apps externas (WhatsApp, mail) van como `<a href>` real**, no `window.open`: Safari y los navegadores dentro de Instagram lo bloquean.
- **Verificar midiendo, no mirando.** El panel del navegador a veces no renderiza; medir posiciones y tamaños con JS (`getBoundingClientRect`) y revisar que `scrollWidth` no supere el ancho de la ventana da una respuesta confiable. Y si Claude no pudo ver la página, tiene que **decirlo**, no suponer que está bien.
- **El contraste se calcula, no se estima.** Texto claro sobre rosa dio 3:1; hubo que rehacerlo.
- **Logos e imágenes ajenas pueden venir descentradas.** Medir y compensar en el CSS, y usar el mismo encuadre después en la `og-image` para que todo se vea igual.
- **Los logos oficiales (ANMAT, certificaciones) no se usan sin estar registrado.** Dibujo genérico.
- Si usás una librería por CDN (animaciones, etc.), que el sitio **funcione igual si no carga**.

## 6. Cómo trabajar con Claude en esto

- Dale **una tarea por vez** y pedile que commitee cada una.
- Pedile que **sirva la carpeta y pruebe** antes de decir que está listo: `python -m http.server`.
- Que mantenga **la lista de Pendientes en `CLAUDE.md`**, no en el chat: el chat se pierde.
- Que **reporte honestamente**: qué probó, qué no pudo probar y qué quedó a medias.
- Cuando algo se vea mal, **mandale una captura**. Para tablas o datos de un panel (como el DNS de Cloudflare), pegarle el HTML sale más barato que la imagen.
