---
name: inventory-dashboard
description: Traducción de SKILL.md. El original en inglés es la fuente de verdad y es el fichero que carga el agente.
---

# Inventory — panel de administración en pastel

Cuarto de este conjunto. Donde Stakent y Sequence son dashboards de gráficos y
Camellia es imprenta, este es un **producto de tabla**: la pantalla existe para
encontrar una fila y abrirla. Eso cambia qué significa "fiel": si la tabla está mal,
ningún lavanda bien igualado lo salva.

## El escenario, no el shell

Este género presenta la app como una **tarjeta flotando sobre un fondo decorado**, no
como una aplicación a sangre. Así que la página exterior es un escenario con relleno,
el título encima de la tarjeta, campos de puntos en las esquinas, y la app como una
tarjeta de 26px de radio con una sombra amplia y suave.

Es una estructura distinta a la de las skills de dashboard, y su
`height: 100dvh; overflow: hidden` sigue aplicando — pero a la *tarjeta*, no al
documento. La tarjeta posee la altura; la tabla hace scroll dentro.

Dibuja la decoración en CSS, no en el marcado:

```css
.stage::before { background-image: radial-gradient(#d8d2f2 1.4px, transparent 1.5px);
                 background-size: 15px 15px; }
```

## Lo que de verdad importa aquí

1. **La fila desplegable** — la única interacción real. Ver
   `references/table-and-detail.md`; el tratamiento del borde es lo delicado.
2. **El buscador tiene que buscar.** El panel se titula "Search for items". Un campo
   de búsqueda que solo lo parece es lo único deshonesto que puedes poner en esta
   pantalla, y hacerlo real cuesta diez líneas.
3. **La proporción de la paleta** — `references/stage-and-palette.md`. El acento es
   el 2.2% de la referencia; casi todo es campo tranquilo.

## Paleta medida

```
escenario lavanda #efecff   (34.3% de la referencia)
superficie app    #fcfbff   (43.6%)
paneles           #ffffff   bloom cálido #f8e7f4   bloom lavanda #ece8fb
violeta           #b492ff   intenso #8f6bff   suave #e9e2ff
coral (gráficos)  #fca1b0   línea #f8798d   celeste #64c3ff
tinta #39393c     tinta-2 #5b595d   tinta-3 #a8a7ac   línea #ececf2
```

La tinta es un gris-negro neutro, no azul — poco habitual en este género y conviene
no "corregirlo" hacia un pizarra azulado por costumbre.

## Tipografía

Poppins, por medición. La portada mide 1370px y el título "Inventory Dashboard" unos
24px de alto, cómodamente por encima del suelo de resolución que detuvo el ranking
en la lámina de Camellia, así que el método de
`../../stakent-dashboard/es/references/font-matching.md` aplica completo.

Media de IoU sobre `a e o y D b`, segmentados del título con componentes conexos
(18 componentes, que cuadran con las 18 letras):

| fuente | media |
|---|---|
| **Poppins** | **.826** |
| Outfit | .801 |
| Plus Jakarta Sans | .724 |
| Manrope | .710 |
| Nunito | .688 |
| Montserrat | .685 |
| Quicksand | .598 |

Poppins se lleva cuatro de los seis glifos y las puntuaciones son altas en términos
absolutos (.8+), un match más fuerte que el de cualquier otra reconstrucción de este
repositorio.

## Trampas encontradas en esta construcción

- **`<span class="thumb">` con un ancho no hace nada.** Un span es inline; la
  miniatura se colapsaba a un pelo hasta que recibió `display: block`. Cualquier
  "caja" que construyas con un span necesita su display.
- **Texto blanco sobre formas recortadas blancas.** Los círculos decorativos de la
  tarjeta promocional son blancos; el párrafo de encima desaparecía donde se
  solapaban. Acota la medida del texto en vez de mover el arte.
- **Una rejilla de detalle cuya imagen no abarca sus filas** deja un vacío del tamaño
  de las celdas que faltan. `grid-row: span 3` en la imagen, y campos que llenan 3×3.

## Sigue siendo cierto de las otras skills

Solo `tokens.css` lleva colores literales; los ajustes responsive de un componente
viven en el fichero de ese componente; resetea los márgenes de `p`; genera la
geometría de los gráficos desde los datos; ninguna cifra en dos ficheros; y comprueba
**cada contenedor con scroll** en cada breakpoint —
`../../stakent-dashboard/es/references/verification.md`.

## Procedencia

El diseño es un artículo de Envato Elements de su autor. Solo estaba disponible la
portada — las páginas de producto devuelven 403 a todo lo que no sea un navegador —
así que esto se reconstruyó desde una sola imagen, y la maquetación más allá de esa
vista es inferida. La implementación es código original; la fotografía de producto
está sustituida por marcadores dibujados.
