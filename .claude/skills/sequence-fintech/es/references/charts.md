# El gráfico divergente de flujo de caja

*Traducción de `references/charts.md`. El original en inglés es la fuente de verdad.*

Ingresos por encima de una línea de cero, gastos por debajo, un par de barras por
día.

## Una escala, una línea de cero

El modo de fallo es aplicar la escala dos veces — una para las barras hacia arriba y
otra para las de abajo — lo que deja a las dos mitades en desacuerdo sobre dónde está
el cero por un píxel o dos. La señal es un hueco o un solape de un pelo a lo largo
del eje.

```js
const max = 5;            // € 5K
const min = -3;           // € 3K, dibujado por debajo
const span = max - min;
const y = (v) => PAD.top + ((max - v) / span) * plotH;
const zero = y(0);        // calculado una vez, usado por ambos sentidos y el eje
```

Ambas barras se posicionan entonces relativas a ese único `zero`:

```js
const incH = Math.max(2, zero - y(d.income) - gap);
const expH = Math.max(2, y(-d.expense) - zero - gap);
// ingreso: y = zero - gap - incH      gasto: y = zero + gap
```

El `gap` (unos 3px) es deliberado: en la referencia las dos barras de un día no
tocan el eje, lo dejan libre. `Math.max(2, …)` mantiene visible como muñón un día
casi a cero en vez de desaparecer.

## Escala y maquetación

- `viewBox="0 0 720 260"` con `preserveAspectRatio="none"` y un ancho CSS del 100%:
  el gráfico se estira horizontalmente con su tarjeta mientras la escala vertical
  queda fija. Padding: 44 a la izquierda (etiquetas del eje), 8 a la derecha, 14
  arriba, 26 abajo (marcas de fecha).
- Ancho de barra: `Math.min(14, slot * 0.46)` donde `slot = plotW / bars.length`. El
  tope evita que las barras se conviertan en losas cuando hay pocos días.
- Radio 2.5 en cada barra, en ambos extremos. La referencia redondea el extremo
  exterior y el redondeo junto al eje queda oculto tras el hueco de todas formas.

## Eje y rejilla

Líneas de rejilla solo en valores que el gráfico alcanza de verdad: `€ 5K`, `€ 0`,
`€ 3K`. Las etiquetas van alineadas a la derecha en `PAD.left - 10`, con la línea
base desplazada `+4` para quedar visualmente centradas sobre la línea.

Las marcas de fecha son líneas verticales `--hairline-2` en días de muestra
equiespaciados, con la etiqueta centrada debajo en `VIEW.h - 8`. Cuatro etiquetas
para ~19 barras: avanza con `bars.length / ticks.length` en vez de codificar
índices, para que los datos puedan crecer.

La línea de cero se dibuja **la última**, sobre las barras, en `--ink-3` al 45% de
opacidad, para que se lea como eje y no como otra línea de rejilla.

## Color y tema

Ingreso `var(--teal)`, gasto `var(--green)` — los dos colores de marca, que es lo
que hace que este gráfico parezca de esta marca y no un gráfico cualquiera. El texto
del gráfico toma `fill: var(--ink-3)` desde el CSS, no un literal, para que siga a
los tokens.

Cada forma dibujada lleva `fill` explícito. Una forma SVG sin atributo de relleno
hereda negro, que es invisible en un tema oscuro y erróneo en uno claro.

## Accesibilidad

El `<svg>` lleva `role="img"` y una `aria-label` que declara qué muestra el gráfico y
sobre qué periodo. Diecinueve barras sin etiquetar son ruido para un lector de
pantalla; una frase precisa, no.
