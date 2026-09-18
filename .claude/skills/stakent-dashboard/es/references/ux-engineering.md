# Reconstruir como UX engineer, no como copista de capturas

*Traducción de `references/ux-engineering.md`. El original en inglés es la fuente de
verdad.*

Una copia visual que coincide píxel a píxel con la referencia puede seguir siendo un
mal producto. La referencia es **un estado, a un ancho, con contenido ideal**. Es
quizá el 5% de lo que hay que publicar. El otro 95% — cualquier otro ancho, cada
estado de interacción, cada longitud de contenido, cada dispositivo de entrada — no
está en la imagen, y nadie te lo va a dar.

Esta es la parte del trabajo donde dejas de transcribir y empiezas a diseñar.

## Lo que la captura no contiene

Para cada componente que reconstruyas, decide esto antes de darlo por terminado:

| dimensión | lo que muestra el mockup | lo que tienes que decidir |
|---|---|---|
| **ancho** | uno, normalmente ~1440 | de 360 a 1920, y dónde cambia de forma |
| **estado** | reposo | hover, focus-visible, activo, deshabilitado, cargando, error |
| **contenido** | longitud ideal | un nombre de 40 caracteres, una cifra de 9 dígitos, una lista vacía |
| **entrada** | un ratón | táctil, teclado, lector de pantalla |
| **movimiento** | congelado | qué se anima, y qué pasa con `prefers-reduced-motion` |

Si no puedes responder alguna desde el diseño, esa es una pregunta real para quien
sea dueño del producto, no un hueco que tapar en silencio.

## Responsive es una decisión de prioridad, no un encoger

El instinto es "que quepa". Eso produce una pantalla de móvil que técnicamente no
tiene scroll horizontal y sigue siendo inutilizable.

Un ejemplo trabajado de este proyecto. La barra superior de Sequence contiene un
botón de menú, un buscador, un rango de fechas, un selector de periodo y Export. En
un teléfono, el primer arreglo — dejar que la fila envuelva — quitó el
desplazamiento lateral y produjo **218px de cromo antes del contenido**, en una
pantalla de 844px. Un cuarto del viewport gastado en controles que nadie abrió la
app para usar.

El segundo arreglo preguntó qué es realmente primario:

- **Buscar** es primario → comparte la primera fila con el botón de menú, `flex: 1`.
- **Rango, periodo y Export** son secundarios → segunda fila, en una tira que se
  desplaza lateralmente *a propósito*. Todas las funciones siguen accesibles;
  ninguna cuesta espacio vertical que no se haya ganado.

Resultado: 122px en vez de 218px, todo accesible. El desbordamiento era el síntoma;
la jerarquía era el bug.

El mismo razonamiento aplica al banner de saldo: cuatro acciones no caben en una
fila de móvil, y envolver dejaba un botón de overflow `…` huérfano en su propia
fila, lo que se lee como algo roto. Dos por dos, objetivos a ancho completo, hecho.

## No pongas afordancias de escritorio en un teléfono

El buscador muestra la pista `⌘ + F`. En un teléfono no hay tecla Command, así que
la pista es decoración disfrazada de ayuda. Ocúltala bajo el breakpoint.

Audita el resto de la familia: revelados solo con hover, menús contextuales,
tooltips con contenido que no existe en ningún otro sitio, objetivos de arrastre por
debajo de 44px, y texto que dice "haz clic".

## Lo interactivo debe parecerlo y comportarse como tal

Si un mockup muestra un slider, publica un control que responda a puntero, táctil
**y** teclado. El patrón que no cuesta nada:

```html
<div class="slider">
  <input type="range" aria-label="Periodo de aportación en meses" />
  <span class="knob" aria-hidden="true"></span>
</div>
```

El `input` a `opacity: 0` estirado sobre la pista dibujada, el knob visible como
hermano, `:focus-visible ~ .knob` para el anillo. Obtienes la semántica nativa, el
manejo de teclado nativo y control total de los píxeles.

A la inversa, no inventes interacciones que el diseño no implica. Un chip de filtro
en una reconstrucción estática puede alternar su propia apariencia; no debería
fingir que filtra datos que no existen. Dilo en un comentario.

## Estados que el diseño nunca muestra

- **Cargando** — algo que sustituye al contenido debe ser sustituido por algo, no
  por un colapso del layout.
- **Vacío** — una tabla vacía no son cero filas de nada; es una frase.
- **Error** — el visor de skills de la galería no siempre alcanza un fichero.
  Renderiza el motivo **y un enlace que sí funciona**, en vez de un panel vacío. Un
  estado de error que deja al usuario con una acción siguiente es una funcionalidad;
  una caja en blanco es un bug.
- **Contenido largo** — un nombre que envuelve, una cifra con cuatro dígitos más,
  una etiqueta en alemán. Prueba con la peor cadena plausible, no con la de demo.

## La accesibilidad es un paso de construcción, no de revisión

Nada de esto es caro si lo haces mientras escribes el componente:

- Landmarks (`<aside>`, `<header>`, `<main>`, `<nav>`), y un solo `<h1>`.
- `aria-pressed` en interruptores, `aria-selected` en pestañas, `aria-expanded` en
  desplegables, `aria-current="page"` en el ítem activo.
- `aria-label` en cada botón que solo lleva icono. "Más" no es etiqueta; "Más
  acciones" sí.
- Un anillo `:focus-visible` visible en todas partes, incluidos los controles
  personalizados.
- Los gráficos llevan `role="img"` y una frase precisa. Diecinueve barras sin
  etiquetar son ruido para un lector de pantalla.
- Respeta `prefers-reduced-motion`, y nunca dejes contenido aparcado en
  `opacity: 0` esperando a un observer: el primer fotograma en reposo es lo que ven
  una miniatura, un enlace compartido y quien solo ojea.

## El color semántico no es el color de marca

El verde de marca de Sequence `#00d47e` da ~1.9:1 sobre blanco — correcto como
relleno de barra, ilegible como etiqueta de 12px. El diseño necesita un segundo
verde más oscuro, `#008229`, para el texto. Nombra los tokens por su función
(`--green` frente a `--pos`) o alguien usará el color de marca en una etiqueta y
publicará texto ilegible creyendo que está siendo fiel.

La misma regla para el estado: éxito, aviso y peligro son una escala que el usuario
lee de un vistazo. No son decoración y no son el acento.

## El contenido es material de diseño

- Texto real, incluidas las partes aburridas. El aviso legal al pie de una pantalla
  de transferencia es parte de por qué se lee como un producto real.
- `font-variant-numeric: tabular-nums` allí donde se apilen cifras. Dígitos
  proporcionales en una columna de dinero es la señal más común de una pantalla
  fintech reconstruida.
- Nombra las cosas como las nombraría un usuario: una persona gestiona
  *notificaciones*, no *configuración de webhooks*. Un botón dice qué ocurre —
  "Publicar", y luego un aviso que dice "Publicado".

## Verifica el comportamiento, no solo la imagen

Una comparación de capturas no puede ver un contenedor con scroll que se mueve de
lado, un anillo de foco que nunca aparece o un objetivo táctil de 28px. Conduce la
página:

- Cada breakpoint que soportes, comprobando **cada contenedor con scroll** — ver
  `verification.md`, donde exactamente esto salió mal.
- Recorre toda la página con Tab; cada parada visible, el orden sensato.
- Abre el drawer, ciérralo con Escape y con el scrim.
- Mide la altura del cromo superior en un teléfono y pregúntate si se ha ganado ese
  espacio.

## El informe honesto

Cuando devuelvas el trabajo, separa lo que verificaste de lo que inferiste. "Sin
scroll horizontal a 390px" es una afirmación comprobable en una línea. "Se siente
bien en el móvil" no lo es. En este proyecto reporté lo primero y el usuario
encontró lo segundo — movimiento lateral en un teléfono real — porque mi
comprobación medía el documento mientras el shell desplazaba el panel de dentro. El
arreglo fue una propiedad CSS; la lección iba de la afirmación, no del código.
