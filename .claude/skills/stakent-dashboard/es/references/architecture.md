# Arquitectura, y las trampas que de verdad mordieron

*Traducción de `references/architecture.md`. El original en inglés es la fuente de
verdad.*

ES modules planos, sin bundler, sin framework, sin dependencias. Todo lo que un host
estático puede servir, que es el objetivo: la página carga desde GitHub Pages con
nada más que los ficheros del repo.

```
index.html                  # shell semántico — se ve antes de que corra el JS
assets/css/tokens.css       # tokens + reset. El único fichero con colores literales
assets/css/layout.css       # shell, rejillas, breakpoints
assets/css/components.css   # cada objeto repetido
assets/js/data.js           # única fuente de verdad de cada cifra
assets/js/icons.js          # marcadores data-icon, hidratados al cargar
assets/js/sparkline.js      # geometría del gráfico generada desde la serie
assets/js/coin-logos.js     # marcas SVG inline
assets/js/components/*.js   # un módulo por región de la pantalla
assets/js/app.js            # arranque
```

## Shell estático, listas guiadas por datos

`index.html` lleva el cromo estructural — sidebar, barra superior, contenedores de
sección — para que la página muestre algo aunque un módulo falle o la red se
atasque. Las partes **repetidas y portadoras de datos** (tarjetas de activo,
posiciones del sidebar, tarjetas de estadística) se renderizan desde `data.js`.

La regla no es "renderiza todo en servidor" ni "renderiza todo en JS". Es: **ninguna
cifra aparece en dos ficheros**. Cuando el saldo vive a la vez en el HTML y en el
objeto que alimenta el slider, se desincronizan. Un objeto, varios consumidores.

## Solo tokens.css lleva colores literales

Tras cualquier cambio de paleta, busca en las otras hojas:

```bash
grep -nE "#[0-9a-fA-F]{3,8}" assets/css/layout.css assets/css/components.css \
  | grep -v "rgba(255, 255, 255"
```

Lo que sobreviva debe ser una lista corta de excepciones deliberadas: texto sobre un
relleno de acento, stops de degradado, algún blanco translúcido fijo. Cualquier otra
cosa es un color que no seguirá al próximo retema.

## La trampa de la cascada que costó una ronda

`components.css` carga después de `layout.css`. Ambas las escribe la misma persona
el mismo día, así que es fácil poner la regla base de un componente en una y su
ajuste responsive en la otra:

```css
/* layout.css */
@media (max-width: 720px) { .search { display: none; } }

/* components.css — carga DESPUÉS */
.search { display: flex; }
```

Misma especificidad, gana el fichero posterior, **la media query es irrelevante**.
El buscador nunca se ocultó, y el botón de menú móvil — mismo patrón — nunca
apareció, así que el drawer era inalcanzable en un teléfono. El síntoma fueron 236px
de desbordamiento horizontal a 390px de ancho, que fue como se encontró.

Regla: **los ajustes responsive de un componente viven en el mismo fichero que el
componente.** Los breakpoints de nivel layout (número de columnas, comportamiento
del shell) van en `layout.css` porque los selectores que tocan solo se definen ahí.

## La trampa del margen de `<p>`

Resetea `p` junto con los titulares. El `p { margin: 1em 0 }` por defecto del
navegador se calcula sobre el **propio** tamaño de fuente del párrafo, así que una
cifra de 26px arrastra un margen de 26px. En la construcción de Sequence esto infló
cada tarjeta de estadística de 120px a 199px; las tarjetas parecían deliberadamente
espaciosas en vez de rotas, que es por lo que hizo falta medir para verlo:

```js
// los hijos suman 76px, el contenedor reporta 199px -> la diferencia es margen
[...card.children].map((k) => k.getBoundingClientRect().height)
```

Resetea `p` en el mismo bloque que `h1..h4` y `ul`, y deja que `gap` haga el
espaciado.

## Altura del shell

Un dashboard no es un documento:

```css
.app  { height: 100vh; height: 100dvh; overflow: hidden; }
.main { overflow-y: auto; min-height: 0; }
```

Sin esto el sidebar se queda en el viewport mientras la página crece con el
contenido, y las dos columnas terminan a alturas visiblemente distintas — reportado
por el usuario, dos veces, de dos formas distintas. `min-height: 0` en el hijo flex
que hace scroll es obligatorio o se niega a encoger por debajo de su contenido.

Después iguala el padding inferior del panel de contenido con el del sidebar. Al
final del scroll, el último panel y la tarjeta del pie del sidebar deben caer en la
misma línea; 12px de desfase se leen como "el sidebar es más largo" y así se
reportó, literalmente.

## Gráficos desde los datos

Nunca escribas datos de path a mano. Genéralos:

- **Sparkline** — mapea la serie al viewBox, convierte a béziers cúbicas con un
  spline de Catmull-Rom (puntos de control en `p1 ± (p2 − p0)/6`), y añade el
  relleno de área cerrando el mismo path contra la base, una regla punteada al nivel
  de apertura, puntos muestreados y un extremo destacado con halo.
- **Barras divergentes** — una sola escala para ambos sentidos y la línea de cero
  dibujada una vez, o las barras no llegarán a tocarla. Deja sitio en el `viewBox`
  para las etiquetas exteriores y el halo del extremo.

Da `fill` explícito a cada forma dibujada, toma el color del texto del gráfico de
los tokens del tema, y asegúrate de que cada etiqueta del eje nombra un valor que el
gráfico realmente alcanza.

## Iconos

Un registro de paths de 24×24 a trazo más marcadores `data-icon="name"` en el
marcado, hidratados una vez al cargar. Mantiene el HTML legible, hace del tamaño una
decisión por uso, y significa que un icono se cambia en un solo sitio.

Cuidado con el selector cuando el marcador envuelve al SVG: `.tab svg { margin-left:
auto }` no hace nada, porque el ítem flex es el `<span>` que envuelve, no el `<svg>`
de dentro. Apunta a `[data-icon]`.

## Accesibilidad que no cuesta nada

Nada de esto es caro si lo haces mientras escribes el componente:

- Landmarks (`<aside>`, `<header>`, `<main>`, `<nav>`), y un solo `<h1>`.
- `aria-pressed` en interruptores, `aria-selected` en pestañas, `aria-expanded` en
  desplegables, `aria-current="page"` en el ítem de navegación activo.
- `aria-label` en cada botón que solo lleva icono. "Más" no es una etiqueta; "Más
  acciones" sí.
- Un anillo `:focus-visible` visible en todas partes, incluidos los controles
  personalizados.
- Los gráficos llevan `role="img"` y una frase precisa. Diecinueve barras sin
  etiquetar son ruido para un lector de pantalla.
- Respeta `prefers-reduced-motion`, y nunca dejes contenido aparcado en
  `opacity: 0` esperando a un observer: el primer fotograma en reposo es lo que ven
  una miniatura, un enlace compartido y quien solo ojea.

## Control deslizante personalizado

Pon un `<input type="range">` real a `opacity: 0` sobre la pista dibujada y estiliza
el knob como hermano. Puntero, táctil y teclado funcionan, y
`:focus-visible ~ .knob` da el anillo de foco.
