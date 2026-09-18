# Trabajar desde un brand guide

*Traducción de `references/brand-spec.md`. El original en inglés es la fuente de
verdad.*

## Mira todas las imágenes antes de empezar

La referencia de Sequence llegó como cuatro imágenes. Tres eran pantallas; la cuarta
era un "Mini Brand Guide" con la tipografía y los dos colores de marca con sus
rampas de tintes. Abrir primero las pantallas y ponerse a medir habría sido trabajo
perdido sobre la parte que el guide responde exactamente.

Siempre que te entreguen un conjunto de referencias, míralas todas antes de escribir
nada. Un guide, un style tile, una hoja de componentes o incluso la captura de la
página de un sistema de diseño cambian el método de *extraer* a *cumplir*.

## Mide igualmente — para confirmar, no para decidir

Muestrear el dashboard devolvió `#025864` para el banner y `#00d47e` para las barras
del gráfico: exactamente los valores del guide. Esa coincidencia es el resultado
útil, porque te dice que pantallas y guide son la misma versión de la marca.

Cuando discrepan:

- **Colores de marca** — gana el guide. Una pantalla puede ser una exportación
  antigua.
- **Neutros, hairlines, colores de estado, hovers** — gana la medición. Los guides
  casi nunca documentan el gris que usa un separador, e inventarlo es como una
  construcción se va a la deriva.

## Las rampas oficiales

Cada paso es aproximadamente un 20% hacia el blanco. Muestreadas de las muestras del
guide:

```
teal    #025864   #2a737d   #538d96   #7ba8ae   #a4c3c7
verde   #00d47e   #29db93   #52e2a7   #7ae9bc   #a3f0d1
```

Usa estas y ninguna otra. Un tinte que mezcles tú quedará lo bastante cerca como
para parecer un error en vez de una decisión.

## Neutros y estados, medidos de las pantallas

```
fondo de página  #e0e5eb     sidebar   #f5f7f9     superficie  #ffffff
tinta            #001c2c     apagado   #7d8594     hairline    #e6e9ee
texto positivo   #008229     texto negativo #ee0037
```

Fíjate en que la tinta es `#001c2c` — un casi negro con matiz azul, no `#111`. Los
temas claros tienen muy poco margen para separar superficies por luminosidad, así
que los pocos puntos de matiz en la tinta y el hairline están haciendo trabajo real.

## Dos verdes, a propósito

`--green` (`#00d47e`) es el verde de **relleno**: barras, botón Add, cara de la
tarjeta. `--pos` (`#008229`) es el verde de **texto**: "+15.8%", "45.0%".

El verde de marca da aproximadamente 1.9:1 sobre blanco — ilegible como texto de
12px. El más oscuro supera 4.5:1. Mantenlos como tokens separados con nombres que
digan para qué son, o alguien cogerá el color de marca para una etiqueta y publicará
tipografía ilegible creyendo que está siendo fiel.

La misma división aplica a los fondos de las píldoras: `--pos-soft` (`#e6f6ec`)
detrás de texto `--pos`, nunca verde de marca detrás de blanco.

## Helvetica

El guide dice Helvetica, en Bold / SemiBold / Medium / Regular. Helvetica no tiene
licencia libre para incrustar en web y no está en ningún CDN gratuito, así que un
`@font-face` no es opción. Lo que se publica:

```css
--ui: "Helvetica Neue", Helvetica, Arimo, Arial, "Liberation Sans", sans-serif;
```

- Los dispositivos Apple resuelven `Helvetica Neue` y renderizan la fuente real.
- El resto cae a **Arimo** (Google Fonts, OFL), métricamente compatible con Arial,
  que a su vez lo es con Helvetica. Mismos anchos de avance, así que los saltos de
  línea y el layout se mantienen idénticos entre plataformas aunque las formas
  difieran ligeramente — esa compatibilidad métrica es toda la razón para elegir
  Arimo sobre una grotesca "más bonita".
- No sustituyas por Inter. Su altura de x mayor y sus aperturas más abiertas se leen
  como otra marca, y no es métricamente compatible, así que tus saltos de línea se
  mueven.

Escríbelo en el README. Afirmar "usamos Helvetica" sería falso en la mayoría de
máquinas que carguen la página.
