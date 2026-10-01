"""Genera las imágenes del sitio a partir de originales/.

Uso:  python herramientas/fotos.py   (desde la raíz del repo, necesita Pillow)

Cada foto se recorta alrededor de un punto de interés (fx, fy entre 0 y 1).
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
ORIG = RAIZ / "originales"
IMG = RAIZ / "img"
PREFIJO = "WhatsApp Image 2026-10-01 at "

# slug: (archivo original sin prefijo, fx, fy)
GALERIA = {
    "tinglado-chapa":        ("19.08.42.jpeg", 0.5, 0.40),
    "tinglado-chapa-frente": ("19.08.41 (3).jpeg", 0.5, 0.45),
    "baranda-rampa":         ("19.08.39 (1).jpeg", 0.5, 0.50),
    "baranda-rampa-lateral": ("19.08.41 (1).jpeg", 0.5, 0.50),
    "rejas-metal-desplegado": ("19.08.41.jpeg", 0.5, 0.35),
    "parrilla-brasero":      ("19.08.38.jpeg", 0.52, 0.5),
    "parrilla":              ("19.08.40.jpeg", 0.5, 0.45),
    "pala-atizador":         ("19.08.38 (1).jpeg", 0.5, 0.55),
    "cartel-numero":         ("19.08.39.jpeg", 0.5, 0.38),
    "mensula":               ("19.08.41 (2).jpeg", 0.5, 0.35),
    "mensulas-par":          ("19.08.40 (1).jpeg", 0.5, 0.5),
    "pasillo-piso-verde":    ("19.08.43 (1).jpeg", 0.5, 0.55),
    "revestimiento-gris":    ("19.08.43 (3).jpeg", 0.5, 0.55),
    "sala-de-espera":        ("19.08.42 (2).jpeg", 0.5, 0.6),
    "pasillo":               ("19.08.45 (4).jpeg", 0.5, 0.55),
    "puerta-doble":          ("19.08.45 (5).jpeg", 0.5, 0.5),
    "puerta-vaiven":         ("19.08.46 (1).jpeg", 0.5, 0.5),
    "puertas-pasillo":       ("19.08.46 (2).jpeg", 0.5, 0.55),
    "puerta-paneles":        ("19.08.44.jpeg", 0.5, 0.5),
    "ascensor":              ("19.08.47 (2).jpeg", 0.5, 0.45),
    "terraza-piso":          ("19.08.48 (1).jpeg", 0.5, 0.6),
    "terraza-piso-patio":    ("19.08.47 (4).jpeg", 0.5, 0.6),
    "cielorraso":            ("19.08.44 (1).jpeg", 0.5, 0.4),
    "split-instalado":       ("19.08.45 (2).jpeg", 0.5, 0.65),
    "split-pared":           ("19.08.45.jpeg", 0.5, 0.45),
    "split-caneria" :         ("19.08.45 (3).jpeg", 0.3, 0.5),
}

# slug: (archivo, fx, fy) — recorte 4:5
PARES = {
    "tinglado-antes":  ("19.08.42 (1).jpeg", 0.5, 0.5),
    "tinglado-despues": ("19.08.42.jpeg", 0.5, 0.45),
    "puerta-antes":    ("19.08.43 (2).jpeg", 0.45, 0.5),
    "puerta-despues":  ("19.08.43 (1).jpeg", 0.5, 0.5),
    "pared-antes":     ("19.08.43.jpeg", 0.5, 0.45),
    "pared-despues":   ("19.08.43 (3).jpeg", 0.5, 0.5),
    "cartel-antes":    ("19.08.39 (3).jpeg", 0.5, 0.42),
    "cartel-despues":  ("19.08.39.jpeg", 0.5, 0.36),
}

AMARILLO = (255, 194, 26)
HIERRO = (23, 24, 26)
PAPEL = (243, 240, 232)


def abrir(nombre):
    return ImageOps.exif_transpose(Image.open(ORIG / (PREFIJO + nombre))).convert("RGB")


def recortar(im, proporcion, fx, fy):
    """Recorta al ancho/alto `proporcion` lo más grande posible, centrado en (fx, fy)."""
    w, h = im.size
    if w / h > proporcion:
        cw, ch = round(h * proporcion), h
    else:
        cw, ch = w, round(w / proporcion)
    x = min(max(round(fx * w - cw / 2), 0), w - cw)
    y = min(max(round(fy * h - ch / 2), 0), h - ch)
    return im.crop((x, y, x + cw, y + ch))


def guardar(im, destino, calidad=80):
    destino.parent.mkdir(parents=True, exist_ok=True)
    im.save(destino, "WEBP", quality=calidad, method=6)
    return destino.stat().st_size // 1024


def fuente(tam, variante=b"Bold Condensed"):
    f = ImageFont.truetype("C:/Windows/Fonts/bahnschrift.ttf", tam)
    f.set_variation_by_name(variante)
    return f


def galeria():
    for slug, (archivo, fx, fy) in GALERIA.items():
        im = abrir(archivo)
        chica = recortar(im, 1, fx, fy).resize((800, 800), Image.LANCZOS)
        grande = im.copy()
        grande.thumbnail((1400, 1400), Image.LANCZOS)
        kb1 = guardar(chica, IMG / "trabajos" / f"{slug}.webp")
        kb2 = guardar(grande, IMG / "trabajos" / "grande" / f"{slug}.webp", 75)
        print(f"{slug:26} {kb1:4} KB  grande {kb2:4} KB")


def pares():
    for slug, (archivo, fx, fy) in PARES.items():
        im = recortar(abrir(archivo), 4 / 5, fx, fy).resize((800, 1000), Image.LANCZOS)
        print(f"{slug:26} {guardar(im, IMG / 'antes-despues' / f'{slug}.webp'):4} KB")


def hero():
    archivo, fx, fy = GALERIA["tinglado-chapa"]
    im = recortar(abrir(archivo), 4 / 5, fx, fy).resize((960, 1200), Image.LANCZOS)
    print(f"{'hero':26} {guardar(im, IMG / 'hero.webp', 78):4} KB")


def og_image():
    lienzo = Image.new("RGB", (1200, 630), HIERRO)
    foto = recortar(abrir(GALERIA["tinglado-chapa"][0]), 520 / 630, 0.5, 0.42).resize((520, 630), Image.LANCZOS)
    lienzo.paste(foto, (680, 0))
    d = ImageDraw.Draw(lienzo)
    d.rectangle((0, 0, 680, 14), fill=AMARILLO)
    d.text((64, 70), "RUBÉN DARÍO ROJAS · MERLO, ZONA OESTE", font=fuente(40), fill=AMARILLO)
    titulo = fuente(96)
    for i, linea in enumerate(["HERRERÍA", "CERRAJERÍA", "PINTURA", "REFRIGERACIÓN"]):
        d.text((60, 128 + i * 92), linea, font=titulo, fill=PAPEL)
    boton, texto = fuente(38), "PEDÍ PRESUPUESTO POR WHATSAPP"
    caja = d.textbbox((0, 0), texto, font=boton)
    alto, ancho = caja[3] - caja[1], caja[2] - caja[0]
    d.rectangle((64, 516, 64 + ancho + 48, 516 + alto + 40), fill=AMARILLO)
    d.text((64 + 24 - caja[0], 516 + 20 - caja[1]), texto, font=boton, fill=HIERRO)
    lienzo.save(IMG / "og-image.jpg", quality=85, optimize=True)
    print(f"{'og-image':26} {(IMG / 'og-image.jpg').stat().st_size // 1024:4} KB")


def iconos():
    carpeta = IMG / "icons"
    carpeta.mkdir(parents=True, exist_ok=True)

    def icono(tam, margen=0.0):
        base = Image.new("RGB", (tam, tam), AMARILLO)
        d = ImageDraw.Draw(base)
        f = fuente(round(tam * (0.86 - margen)))
        caja = d.textbbox((0, 0), "R", font=f)
        x = (tam - (caja[2] - caja[0])) / 2 - caja[0]
        y = (tam - (caja[3] - caja[1])) / 2 - caja[1]
        d.text((x, y), "R", font=f, fill=HIERRO)
        return base

    for tam in (16, 32, 48, 180, 192, 512):
        nombre = "apple-touch-icon.png" if tam == 180 else f"icon-{tam}.png"
        icono(tam).save(carpeta / nombre)
    icono(512, margen=0.22).save(carpeta / "icon-maskable-512.png")
    icono(48).save(RAIZ / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("iconos listos")


if __name__ == "__main__":
    galeria()
    pares()
    hero()
    og_image()
    iconos()
