# Oficio de tema claro

*Traducción de `references/light-theme.md`. El original en inglés es la fuente de
verdad.*

Una UI oscura separa superficies con luminosidad — cinco escalones entre `#060610` y
`#13131b` se leen como jerarquía. Una UI clara casi no tiene margen: blanco sobre
casi blanco es uno o dos puntos. La separación tiene que venir de otro sitio.

## Hairlines y un susurro de sombra

```css
--hairline:   #e6e9ee;
--hairline-2: #eef1f5;             /* dentro de una tarjeta: filas, subdivisores */
--lift: 0 1px 2px rgba(2, 32, 42, 0.04);
```

Las tarjetas son `#ffffff` sobre `#e0e5eb`, con un hairline de 1px **y** la
elevación. Ninguno basta por separado: el borde define el canto, la sombra dice qué
lado está encima. Resiste poner nada más pesado — este diseño es plano y nítido, y un
desenfoque de 12px lo convierte en otro producto, más blando.

Fíjate en que el color de la sombra no es negro. `rgba(2, 32, 42, .04)` lleva el
matiz azul de la tinta; una sombra negra neutra sobre un fondo gris frío se lee como
suciedad.

## Énfasis sin rellenos

El ítem de navegación activo en el sidebar es **blanco con la elevación**, sobre el
rail gris. Ese es el equivalente en tema claro del relleno más claro del tema
oscuro: el elemento se adelanta en vez de cambiar de matiz. Reserva los rellenos de
color para lo que sea de verdad un momento de marca — el banner de saldo, el botón
primario, el gráfico.

## Radios y ritmo

Consistentes y generosos: ~14px en tarjetas y campos, ~10px en botones y fichas de
icono, píldora en chips e insignias de estado. Una UI clara con radios mezclados
parece sin terminar de un modo que una oscura disimula.

## Tipografía

- Tinta `#001c2c` para principal, `#4a5665` para secundaria, `#7d8594` para
  etiquetas apagadas y notas.
- `font-variant-numeric: tabular-nums` allí donde se apilen importes — la tabla, las
  tarjetas, el eje del gráfico, el saldo. Dígitos proporcionales en una columna de
  dinero es la señal más común de una pantalla fintech reconstruida.
- Microetiquetas en mayúsculas (`GENERAL`, cabeceras de tabla) a 11px/600 con
  +0.5–0.6px de tracking. Las mayúsculas sin tracking se ven apretadas a ese tamaño.

## Iconos

Trazo de 1.5px en una rejilla de 24×24 — un punto más ligero que los 1.6px que van
bien en un tema oscuro, porque los fondos oscuros engrosan visualmente los trazos
claros y los claros hacen lo contrario.

Las fichas de icono cuadradas (40px, `--r-md`) llevan un relleno de marca sólido con
un glifo contrastado: blanco sobre teal, verde oscuro sobre verde de marca. Nunca
verde de marca con blanco.

## Colores de estado

Éxito es texto `--pos` sobre `--pos-soft`; pendiente es `--ink-3` sobre un tinte
neutro. Ambos discretos. En una UI bancaria, una píldora "Pendiente" ruidosa se lee
como un error, y el significado de la fila debe venir de su contenido, no de cuánto
grita la insignia.

## Qué le hace un teléfono a este layout

El cromo del dashboard es denso — buscador, rango de fechas, selector de periodo y
Export arriba; tres botones de acción en cada cabecera de tarjeta. Nada de eso cabe
en una fila de 390px, y el primer instinto (dejar que envuelva) es solo medio
arreglo.

Medido en esta construcción:

| | antes | después |
|---|---|---|
| alto de la barra superior a 390px | 218px | 122px |
| desplazamiento lateral en el panel | 14–163px | 0 |

Lo que cambió fue la **prioridad**, no los tamaños:

- Buscar es primario: primera fila, `flex: 1`, junto al botón de menú.
- Rango, periodo y Export son secundarios: segunda fila, en una tira que se desplaza
  lateralmente a propósito, así no cuestan espacio vertical que no se han ganado.
- La pista `⌘ + F` se oculta bajo el breakpoint. En un teléfono no hay tecla Command;
  una pista sobre la que no se puede actuar es decoración disfrazada de ayuda.
- Las cuatro acciones del banner pasan a una rejilla 2×2. Envolver dejaba el botón
  `…` solo en su propia fila, lo que se lee como algo roto en vez de como layout.
- Las cabeceras de tarjeta llevan `flex-wrap: wrap`; sin él, el tercer botón de
  acción empujaba todo el panel 14px de lado.

Los dos bugs de desbordamiento tenían la misma forma — **una fila flex sin
`flex-wrap`** — y ninguno era visible en una captura. Ver
`../../stakent-dashboard/es/references/ux-engineering.md` para la versión general, y
`../../stakent-dashboard/es/references/verification.md` para la comprobación que los
detecta.
