# El escenario, la paleta y la proporción

*Traducción de `references/stage-and-palette.md`. El original en inglés es la fuente
de verdad.*

## Una tarjeta de app sobre un fondo decorado

Este género — UI de administración en pastel como se vende en Envato y Dribbble — no
presenta una aplicación a sangre. Presenta una **tarjeta**:

- un escenario con relleno en el tinte de acento de la página,
- el título del producto fuera de la tarjeta, arriba a la izquierda,
- campos de puntos en las esquinas como decoración,
- la app con un radio grande (26px aquí) y una sombra amplia, suave y tintada.

La sombra es lo que más se falla. Es `0 24px 60px rgba(83, 66, 140, .1)`: grande,
desplazada hacia abajo y **violeta**, porque el fondo es lavanda. Una sombra negra
neutra bajo una tarjeta sobre un campo de color se lee como suciedad, la misma
lección que la lámina cálida de Camellia y el gris frío de Sequence.

Dibuja la decoración en CSS, no en el marcado. Dos pseudoelementos en el escenario
llevan los campos de puntos, lo que mantiene el DOM hablando del producto:

```css
.stage::before,
.stage::after {
  background-image: radial-gradient(#d8d2f2 1.4px, transparent 1.5px);
  background-size: 15px 15px;
}
```

Ocúltalos por debajo del breakpoint de móvil. La decoración que cuesta layout en una
pantalla pequeña deja de ser decoración.

## Los blooms detrás del panel lateral

La tarjeta de app de la referencia no es plana: su tercio izquierdo lleva un bloom
cálido, rosa fundiéndose en lavanda, bajo el panel de búsqueda. Dos radiales
superpuestos en un pseudoelemento, por detrás de todo, con `pointer-events: none`:

```css
.app::before {
  inset: 0 auto 0 0; width: 420px;
  background: radial-gradient(90% 70% at 18% 22%, var(--wash-pink), transparent 70%),
              radial-gradient(80% 60% at 6% 62%, var(--wash-lav), transparent 72%);
}
```

Todo lo que va encima necesita `position: relative; z-index: 1` o el contenido del
panel desaparece bajo el lavado.

## Mide la proporción, no solo los hexadecimales

Pasar la moda por familias de color sobre toda la portada (la técnica de
`../../editorial-workbook/es/references/motif-and-palette.md`) devuelve los valores
**y cuánto ocupa cada uno**:

```
#fcfbff  43.6%   la superficie de la app
#efecff  34.3%   el escenario lavanda
#b492ff   2.2%   el acento violeta
#fca1b0   0.24%  el coral de los gráficos
```

Esa distribución es el diseño. Casi cuatro quintas partes de la imagen son uno de dos
casi blancos; el acento aparece en un botón, una tarjeta promocional, un icono activo
del rail y la casilla seleccionada; el coral solo existe dentro de dos gráficos
pequeños.

Reproduce la proporción y la reconstrucción se siente bien antes de alinear nada.
Gasta el violeta en un segundo botón o tiñe unas filas de la tabla con él y la página
deja de parecerse a este diseño, aunque cada color sea correcto.

## Notas de muestreo propias de una UI pastel

- Las superficies caen a pocos puntos entre sí (`#fcfbff` frente a `#efecff`), así
  que promedia un bloque de 9×9 — un píxel suelto no puede separarlas.
- El texto es oscuro sobre claro, así que el píxel **más oscuro** de la caja del
  glifo es el color del texto, el espejo de la regla para UI oscura.
- La tinta salió `#39393c` / `#5b595d` / `#a8a7ac`: una rampa de grises neutros sin
  nada de azul. La costumbre dice "pizarra" para una UI de administración; la
  medición dice otra cosa, y la medición es el diseño.

## Una sola fuente

Las páginas de producto de Envato devuelven 403 a `curl` (protección antibots), así
que solo estaba disponible la portada. Merece decirse con claridad en la
construcción: todo lo que quede fuera de esa única vista — otras pantallas, estados
de hover, el diseño real de la vista de rejilla — está inferido, no copiado. Una
reconstrucción desde una imagen sigue siendo una reconstrucción, pero quien lo lea
debe saber qué partes se vieron y cuáles se razonaron.
