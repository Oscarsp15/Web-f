# El arco, y medir una paleta cálida

*Traducción de `references/motif-and-palette.md`. El original en inglés es la fuente
de verdad.*

## Una sola forma sostiene toda la plantilla

Reduce este diseño a lo esencial y queda un arco: un rectángulo con remate
semicircular. Aparece como hueco de retrato, como círculo completo, como cúpula
suavizada, como banda de color. Ese único motivo es lo que hace que 100 páginas se
lean como un mismo producto.

Dibújalo con el radio atado al contenedor, no a píxeles:

```css
.arch        { border-radius: 50cqw 50cqw 0 0; }  /* semicírculo real a cualquier tamaño */
.arch--full  { border-radius: 50cqw; }
.arch--soft  { border-radius: 46% 46% 6% 6%; }
```

`50cqw` es la mitad del ancho del contenedor, así que la curva sigue siendo un
semicírculo tanto si la página es miniatura como si es el hero. Un
`border-radius: 120px` fijo se aplanaría en una página pequeña y se redondearía de
más en una grande — la señal de un motivo dibujado a un solo tamaño.

Cuando identifiques un motivo así, aplícalo a **más que al elemento obvio**. Aquí:
los huecos de retrato, el avatar del autor, la insignia, el sello del logotipo y la
cúpula suavizada de las páginas de contenidos. Un motivo usado una vez es una forma;
usado en todo el sistema es una identidad.

## Medir una lámina cálida y de bajo contraste

Los dashboards de las skills hermanas son oscuros, con separaciones amplias entre
superficies. Una lámina editorial en crema es lo contrario: el fondo, el papel y los
paneles tintados caen dentro de veinte puntos entre sí, y el acento ocupa bastante
menos del 1% de la imagen.

**El truco del "píxel más saturado" falla aquí.** Con la saturación calculada como
`(max − min) / max`, un píxel de texto casi negro como `#411103` puntúa más alto que
el terracota plano que intentas encontrar. Muestrear el acento así devolvió casi
negro tres veces.

Lo que funciona es una **moda por familias de color**: cuantiza cada píxel de la
lámina, cuenta las cajas y toma la más poblada dentro de cada familia.

```js
const bins = new Map();
for (let k = 0; k < d.length; k += 4) {
  const key = `${d[k] >> 3}_${d[k + 1] >> 3}_${d[k + 2] >> 3}`;
  const e = bins.get(key) || { n: 0, r: 0, g: 0, b: 0 };
  e.n++; e.r += d[k]; e.g += d[k + 1]; e.b += d[k + 2];
  bins.set(key, e);
}
const all = [...bins.values()]
  .map((e) => ({ n: e.n, r: e.r / e.n, g: e.g / e.n, b: e.b / e.n }))
  .sort((a, z) => z.n - a.n);

// el acento: rojizo, luminosidad media
all.filter((e) => e.r > 130 && e.r - e.b > 45 && e.g > 80 && e.g < 170)[0];
```

Un relleno plano es, por definición, el color más común de su familia. Eso devolvió:

```
terracota #a45c45   (0.7% de la lámina — pequeño, pero dominante en su familia)
papel     #faf6f3 / #fcf9f5
lámina    #f0e7e0   (15.6%, el color más común de todos)
sombra    #ede4dd, #e4dbd4
```

Los porcentajes merecen leerse, no solo los hexadecimales. Que el acento sea menos
del 1% de una lámina de presentación te dice con qué parsimonia usarlo: dos tarjetas
sólidas de nueve, una insignia, un sello, un número de página. Reproduce esa
proporción y la reconstrucción se siente bien incluso antes de alinear nada.

## Los neutros cálidos lo necesitan todo cálido

- La tinta es `#241d19`, un casi negro cálido. `#000` puro sobre crema parece un
  error de impresión.
- La sombra de la página es `rgba(80, 56, 42, 0.06)` — el matiz del fondo con alfa
  baja. Una sombra gris neutra sobre una lámina cálida se lee como suciedad, igual
  que una sombra negra sobre gris frío en la construcción de Sequence.
- Las reglas son `#ddd1c7`, no grises. Cada hairline en una maquetación editorial es
  mobiliario visible junto al tipo; una regla fría sobre papel cálido parece otro
  diseño.

## La proporción antes que los píxeles

La lámina es una plantilla de impresión, así que las páginas mantienen una
proporción de papel (`0.773` para carta) en vez de rellenar nada. Defínela una vez
como token y deja que `aspect-ratio` haga el trabajo. Es también lo que permite
soltar una página en un muro de tres, una fila de cuatro o un hero sin escribir ni
un tamaño dos veces.
