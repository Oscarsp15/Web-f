# La fila desplegable

*Traducción de `references/table-and-detail.md`. El original en inglés es la fuente
de verdad.*

Aquí está todo el producto: una tabla de stock donde cualquier fila se abre en sitio
para mostrar el registro completo del artículo, sin navegar fuera y sin modal.

## Estructura

El detalle es un **`<tr>` hermano**, no un elemento anidado. Un `<td>` no puede
contener una fila, y envolver cada pareja en su propio `<tbody>` rompería el rayado
y las cabeceras sticky.

```js
const row =
  `<tr class="row${isOpen ? ' is-open' : ''}" data-row="${item.id}"> … </tr>`;
return isOpen ? row + detailRow(item) : row;
```

```html
<tr class="detail"><td colspan="8"> … </td></tr>
```

El `colspan` debe igualar el número real de columnas, incluidas las invisibles. Esta
tabla tiene ocho: selección, foto, ID, nombre, talla, precio, stock y el chevron. Si
lo cuentas mal, la celda de detalle se queda corta, y eso solo se ve como un borde
derecho desalineado cuando hay una fila abierta.

## El tratamiento del borde, que es lo delicado

En la referencia la fila abierta es el único sitio donde el diseño dibuja un borde
completo: la fila y su detalle forman juntos una tarjeta con contorno, levantada de
la lista.

Eso significa que el contorno está **repartido entre dos filas**:

```css
.row.is-open td            { border-top: 1px solid var(--line);
                             border-bottom-color: transparent;
                             background: var(--panel); }
.row.is-open td:first-child{ border-left: 1px solid var(--line);
                             border-top-left-radius: var(--r-md); }
.row.is-open td:last-child { border-right: 1px solid var(--line);
                             border-top-right-radius: var(--r-md); }
.detail > td               { border: 1px solid var(--line); border-top: 0;
                             border-bottom-left-radius: var(--r-md);
                             border-bottom-right-radius: var(--r-md); }
```

Tres cosas lo hacen funcionar: `border-collapse: collapse` en la tabla (para que las
dos mitades se junten sin doblarse), borde inferior transparente — no ausente — en la
fila abierta (para que su altura no cambie al abrirse, lo que haría saltar toda la
tabla), y los radios solo en las esquinas exteriores.

## Accesibilidad

El chevron es un botón real que lleva el estado:

```html
<button class="chev" data-toggle="A91LI6H"
        aria-expanded="true" aria-controls="d-A91LI6H"
        aria-label="Details for Air Jordan 13 He Got Game!">
```

El `aria-label` nombra el artículo, no la acción. "Detalles" a secas le da a quien usa
un lector de pantalla ocho botones idénticos.

Rota el chevron con una transición sobre el estado abierto en vez de intercambiar
iconos: un elemento, una propiedad, y respeta `prefers-reduced-motion` por la regla
global.

## Re-renderizar frente a mutar

Esta construcción re-renderiza el cuerpo de la tabla en cada cambio (abrir, cerrar,
filtrar, cambiar de vista). Para unas decenas de filas es más simple y menos
propenso a errores que actualizar el DOM quirúrgicamente, y mantiene un solo camino
de código.

Lo que cuesta: **el estado no puede vivir en el DOM**, porque el DOM se tira. Guárdalo
fuera, en conjuntos indexados por id:

```js
const open = new Set(ITEMS.filter((i) => i.open).map((i) => i.id));
const checked = new Set(ITEMS.filter((i) => i.checked).map((i) => i.id));
```

Una casilla cuyo estado vive solo en el marcado lo pierde a la siguiente pulsación en
el buscador. Ese es el bug que esta estructura evita.

Si la tabla crece por encima de unos cientos de filas, pasa a actualizaciones por
clave — pero hazlo cuando vaya lenta, no antes.

## El buscador tiene que buscar

El panel lateral se titula "Search for items" y su campo dice "search for items".
Conectarlo para que filtre de verdad son diez líneas:

```js
const matches = (item) => {
  if (!query) return true;
  const q = query.toLowerCase();
  return item.name.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
};
```

Busca por nombre y por ID, porque el subtítulo promete "type id number or name of
items" — lee la microcopia del propio diseño como especificación.

Y publica el **estado vacío**. Un filtro sin resultados debe decirlo; una tabla que se
queda en cero filas en silencio parece rota.

```html
<tr><td colspan="8" class="empty">No items match that search.</td></tr>
```

## La vista de rejilla

El conmutador de vista de la barra tampoco es decoración: son dos botones con
`aria-pressed`, y la rejilla es una representación alternativa real de la misma lista
filtrada. Reutiliza los datos y el filtro; solo cambia la función de marcado.
