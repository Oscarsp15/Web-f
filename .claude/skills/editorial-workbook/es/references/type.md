# Elegir la tipografía cuando la referencia es demasiado pequeña para medir

*Traducción de `references/type.md`. El original en inglés es la fuente de verdad.*

## El método de solape por glifo tiene un suelo de resolución

La skill hermana `stakent-dashboard` ordena tipografías candidatas por solape de
píxeles por glifo contra glifos segmentados de la referencia. En una captura de
dashboard de 1600px, un glifo de titular mide de 20 a 45px de alto y eso funciona.

Esta referencia mide **600px de ancho**, y el titular de la portada unos 14px. A ese
tamaño un glifo son una docena de píxeles de antialiasing; el IoU entre dos
candidatas es ruido, y un ranking construido sobre eso sería un número confiado sin
nada detrás.

Así que: dilo, y recurre a una comparación visual hecha bien.

```html
<!-- amplía el recorte, sin suavizar -->
<div style="image-rendering: pixelated;
            background-image: url(/referencia.jpg);
            background-size: 2400px 4772px;      /* 4x el tamaño natural */
            background-position: -1224px -360px;
            width: 520px; height: 200px"></div>
```

Luego renderiza cada candidata debajo a un tamaño comparable y mira. Declara en el
informe que fue un juicio visual, no una medición. Un honesto "lo juzgué a ojo
porque el origen tiene 14 píxeles de titular" vale más que una tabla de IoU que la
imagen no sostiene.

## Qué mirar, en este orden

A 4x el recorte resuelve lo suficiente para responder a tres preguntas, y son las
que importan:

1. **Contraste de trazo** — ¿cuánto se diferencian los trazos gruesos de los finos?
   Esta referencia es de contraste *bajo*, lo que elimina de inmediato las didonas.
   Playfair Display, el recurso por defecto para "serif elegante", tiene finos que
   este diseño no tiene.
2. **Peso y bracketing de las serifas** — aquí son robustas y con bracket, no las
   finas y planas de una Cormorant o una Crimson. Esas dos se leen demasiado
   delicadas a cualquier tamaño.
3. **Peso** — DM Serif Display es una display *negra*; frente a un titular de peso
   de libro es sencillamente demasiado.

Candidatas que merece tener en la lámina: Lora, EB Garamond, Spectral, Libre
Baskerville, Crimson Pro, Playfair Display, Cormorant Garamond, DM Serif Display,
Instrument Serif. Nueve cuestan un render.

La elegida aquí fue **Lora**: contraste bajo, serifas robustas con bracket, un peso
de libro que encaja, y altura de x suficiente para aguantar en los pies de página.

## La segunda fuente

Las etiquetas de la referencia — `FOR COACHES`, `CAMELLIA SILLS`, `PHARETRA
DICTUMST` — son mayúsculas con tracking a un tamaño muy pequeño. Eso es un rol
propio, no un respaldo, y carga con tanta personalidad de la plantilla como la
serif.

**Jost** funciona: geométrica, ligera, y aguanta el tracking a 10px sin que las
letras se desmonten. Compón esas etiquetas a 10–11px con 1.4–1.6px de tracking;
dentro de una página, expresa el tracking en `cqw` para que escale con el tipo.

Dos fuentes son todo el sistema aquí. Una tercera sería una cuarta voz en un diseño
cuya contención es precisamente lo que lo define.

## Componer tipo dentro de una página escalable

Todo lo que hay dentro de `.page` va en unidades de container query, el tracking
incluido:

```css
.page__title   { font-size: 9cqw; letter-spacing: -0.14cqw; }
.page__eyebrow { font-size: 2.1cqw; letter-spacing: 0.22cqw; }
.page__foot    { font-size: 1.9cqw; letter-spacing: 0.24cqw; }
```

El tracking negativo en el tamaño de display y el positivo en las versalitas son
proporcionales, así que una miniatura es una verdadera reducción de la página en
lugar de la misma página con el espaciado equivocado.
