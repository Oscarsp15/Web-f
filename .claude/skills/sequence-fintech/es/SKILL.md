---
name: sequence-fintech
description: Traducción de SKILL.md. El original en inglés es la fuente de verdad y es el fichero que carga el agente.
---

# Sequence — panel fintech claro

Compañera de `stakent-dashboard`. Aquella extrae una especificación de los píxeles;
esta va de **cumplir una especificación que te han dado** — un trabajo distinto, y
más fácil, siempre que te des cuenta de que te la han dado.

## La regla

**Mira todas las imágenes de referencia antes de escribir nada.**

El conjunto de Sequence eran cuatro imágenes. Tres eran pantallas; la cuarta, un
Mini Brand Guide con la tipografía y ambos colores de marca con sus rampas de
tintes. Empezar por las pantallas habría significado medir hacia una respuesta que
ya estaba escrita.

Después mide igualmente — para *confirmar* el guide, no para decidir. Muestrear el
dashboard devolvió exactamente `#025864` y `#00d47e`. Esa coincidencia es la señal
útil: pantallas y guide son la misma versión de la marca.

## Orden de trabajo

1. **Inventaría las referencias.** ¿Hay guide? → `references/brand-spec.md`
2. **Construye el fichero de tokens** con el guide más los neutros medidos. Los
   guides nunca documentan hairlines, hovers ni colores de estado; mídelos.
3. **Maqueta las pantallas** → `references/screens.md`
4. **El gráfico es la parte difícil** → `references/charts.md`
5. **Oficio de tema claro** — hairlines antes que rellenos, y qué le hace un
   teléfono a este cromo denso → `references/light-theme.md`
6. **Diseña los estados que el mockup no muestra** → `../stakent-dashboard/es/references/ux-engineering.md`
7. **Verifica y reporta** → `../stakent-dashboard/es/references/verification.md`, y
   comprueba **cada contenedor con scroll**, no solo el documento: este shell
   mantiene el documento a cero desbordamiento mientras el panel se desliza bajo tu
   dedo.

## Esto es un producto, no una imagen

Una pantalla bancaria se opera, no se lee. Dos consecuencias que pesan más que la
fidelidad visual cuando entran en conflicto con ella:

- **El color semántico va separado del color de marca.** Éxito, pendiente y peligro
  forman una escala que el usuario lee de un vistazo; no son decoración y no son el
  acento.
- **Las cifras son tabulares.** `font-variant-numeric: tabular-nums` allí donde se
  apilen importes — la tabla, las tarjetas, el eje del gráfico, el saldo. Dígitos
  proporcionales en una columna de dinero es la señal más común de una pantalla
  fintech reconstruida.

## Las tres cosas que más probablemente salgan mal

**Dos verdes, no uno.** `--green` `#00d47e` es para rellenos (barras del gráfico,
botón Add, cara de la tarjeta). `--pos` `#008229` es para texto. El verde de marca
da ~1.9:1 sobre blanco y es ilegible a 12px; usarlo en una etiqueta creyendo que
estás siendo fiel es la trampa. Tokens separados, nombrados por su función.

**Helvetica no se puede publicar.** Sin licencia web libre, en ningún CDN gratuito.
Publica `"Helvetica Neue", Helvetica, Arimo, Arial, "Liberation Sans", sans-serif`:
los dispositivos Apple reciben la fuente real, el resto recibe Arimo, métricamente
compatible con Arial y por tanto con Helvetica, así que los saltos de línea son
idénticos en todas partes. Inter no — métricas distintas, voz distinta. Dilo en el
README; "usamos Helvetica" sería falso en la mayoría de máquinas.

**Los márgenes por defecto de `<p>`.** El margen `1em` del navegador se calcula
sobre el tamaño de fuente del propio párrafo, así que un importe de 26px arrastra un
margen de 26px. Esto infló cada tarjeta de estadística de 120px a 199px y parecía
espaciado deliberado en vez de un bug. Resetea `p` junto a `h1..h4`.

## Valores de marca

```
teal    #025864   #2a737d   #538d96   #7ba8ae   #a4c3c7
verde   #00d47e   #29db93   #52e2a7   #7ae9bc   #a3f0d1

fondo   #e0e5eb   rail #f5f7f9   superficie #ffffff
hairline #e6e9ee  tinta #001c2c  tinta-2 #4a5665   tinta-3 #7d8594
texto positivo #008229        texto negativo #ee0037
```

## Innegociables

Compartidos con `stakent-dashboard`, y cada uno está aquí porque rompió algo:

- Solo `tokens.css` lleva colores literales.
- Los ajustes responsive de un componente viven en el fichero de ese componente, o
  una hoja posterior gana silenciosamente a la media query.
- El shell posee el viewport (`height: 100dvh; overflow: hidden`); el panel de
  contenido hace scroll dentro.
- La geometría del gráfico se genera desde los datos, con una escala y una línea de
  cero.
- Ninguna cifra aparece en dos ficheros — `data.js` es la fuente de cada pantalla.
- Las tablas llevan `overflow-x: auto` en un envoltorio para que la página nunca se
  desplace de lado.

## Procedencia

El diseño visual es un shot de Dribbble de su autor (el brand guide acreditado a
Dipa.inhouse); la implementación es código original, y no se incluye ningún recurso
de marca de terceros: las banderas, el motivo de la tarjeta y cada icono están
dibujados.
