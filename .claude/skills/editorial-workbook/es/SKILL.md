---
name: editorial-workbook
description: Traducción de SKILL.md. El original en inglés es la fuente de verdad y es el fichero que carga el agente.
---

# Camellia — plantilla editorial de workbook

Tercera de este conjunto, y la primera que **no es UI de producto**. Esa diferencia
es toda la skill: las dos skills de dashboard asumen una pantalla que se opera, y
casi ninguno de sus instintos se transfiere a una página que se imprime.

## Qué cambia cuando la referencia es impresa

| | UI de producto | plantilla de página |
|---|---|---|
| unidad de maquetación | el viewport | una hoja de proporción fija |
| scroll | un panel dentro de un shell fijo | el documento, con normalidad |
| jerarquía | afordancias interactivas | ritmo tipográfico y espacio en blanco |
| repetición | componentes entre estados | un sistema de página en 100 páginas |
| contenido | datos reales | texto de relleno, que *es* el producto |
| éxito | se puede operar | se lee como una pieza impresa |

En concreto: **no** recurras aquí a `height: 100dvh; overflow: hidden`. Ese patrón
es correcto para un dashboard y erróneo para una lámina de muestras. Deja que la
página haga scroll.

## La unidad es una página, y tiene que escalar

Cada muestra de la lámina es el mismo objeto a tres tamaños: miniatura de 120px en
el muro, página de 260px en una fila, y 520px en el hero. Tipografía en `px` fija
dentro de ella se rompe en dos de los tres.

Usa **container queries**: `container-type: inline-size` en `.page`, y expresa todo
lo de dentro en `cqw`. Un titular a `9cqw` es el 9% del ancho de su página tanto si
es miniatura como si es hero, así que las proporciones internas — que es lo que una
plantilla de página realmente es — sobreviven a cada tamaño.

```css
.page { container-type: inline-size; aspect-ratio: 0.773; }  /* carta 8.5 x 11 in */
.page__title { font-size: 9cqw; line-height: 1.02; }
.page__eyebrow { font-size: 2.1cqw; letter-spacing: 0.22cqw; }
```

Fíjate en que el tracking también va en `cqw`. Un interletraje que se queda en
`1.6px` mientras el tipo escala de 6px a 48px es la señal de una plantilla
reconstruida sin esto.

## Fotografía que no puedes usar

La referencia se apoya en retratos. Pertenecen a su fotógrafo, y una reconstrucción
no tiene licencia sobre ellos.

Dibuja los huecos de imagen — y dibújalos como **gráficos, no como pseudofotos**. Mi
primer intento rellenó cada arco con una masa difusa con forma de figura; se leía
como una fotografía desenfocada, es decir, como un fallo de render y no como una
decisión. Sustituirlo por arcos concéntricos en el propio terracota de la plantilla
dice "aquí va una imagen" y se lee como dirección de arte. Dilo en el colofón de la
propia página: qué se sustituyó y por qué.

## Conserva el latín

El relleno de la referencia — *Class ridiculus facilisi lobortis* — no es algo que
sustituir por prosa real. En una plantilla el marcador de posición **es** el
contenido: es lo que ve el comprador y lo que muestra cómo se comporta la
maquetación con texto. Cambiarlo por texto real tergiversa lo que es el producto.
Consérvalo donde el original lo tenía, y usa lenguaje real solo en el texto de
presentación que rodea a las páginas.

## Referencias

- `references/motif-and-palette.md` — el arco, la paleta cálida medida, y por qué el
  truco del "píxel más saturado" falla en una lámina crema
- `references/type.md` — elegir la serif cuando la referencia es demasiado pequeña
  para medir, y el suelo de resolución del método de solape por glifo
- Compartidas: `../../stakent-dashboard/es/references/ux-engineering.md` y
  `../../stakent-dashboard/es/references/verification.md`

## Paleta medida

```
lámina #f0e7e0   (el fondo de presentación, 15.6% de la referencia)
papel  #fbf8f4   terracota #a45c45   terracota oscuro #8c4b37
tinte  #cf9f8c   lavado #ecd9cf
tinta  #241d19   tinta-2 #6b5f57   tinta-3 #9d9088   regla #ddd1c7
```

Casi negro cálido, nunca `#000`, sobre crema. Y la sombra de la página lleva el
matiz del fondo — `rgba(80, 56, 42, .06)` — porque una sombra gris neutra sobre una
lámina cálida se lee como suciedad.

## Sigue siendo cierto de las otras skills

- Solo `tokens.css` lleva colores literales.
- Los ajustes responsive de un componente viven en el fichero de ese componente.
- Resetea los márgenes de `p` junto con los titulares.
- Ninguna cifra aparece en dos ficheros; las páginas se renderizan desde `data.js`.
- Comprueba **cada contenedor con scroll** en cada breakpoint, no solo el documento.

## Procedencia

El diseño es una plantilla de workbook de Canva presentada en Behance por su autor.
Esta es una implementación original: no se incluye ningún recurso, fuente ni
fotografía del original, y las áreas de imagen están dibujadas.
