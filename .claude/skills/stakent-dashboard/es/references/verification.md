# Verificar una reconstrucción, y qué decir sobre ella

*Traducción de `references/verification.md`. El original en inglés es la fuente de
verdad.*

Una copia no está terminada cuando se ve bien en tu cabeza. Estas son las
comprobaciones que detectaron defectos reales en este proyecto, en el orden en que
los detectaron.

## El montaje

Un script de Playwright, ejecutado tras cada cambio significativo, que captura y
**cuenta nodos renderizados**. Contar vale tanto como la captura: falla ruidosamente
cuando un módulo lanza a medias y deja un contenedor vacío que una miniatura
mostraría como "un hueco".

## Comprobaciones

**El desbordamiento horizontal debe ser exactamente 0 — en cada contenedor con
scroll, no solo en el documento.** Esta es la comprobación que hice mal, y un
usuario la encontró en un teléfono real después de que yo reportara la página
limpia.

Con un shell de aplicación el documento nunca hace scroll:

```css
.app  { height: 100dvh; overflow: hidden; }
.main { overflow-y: auto; }          /* overflow-x pasa a auto también */
```

así que `document.documentElement.scrollWidth - clientWidth` es **0 por
construcción**, mientras `.main` se desplaza bajo el dedo del usuario. Comprueba
cada elemento cuyo `overflow-x` computado sea `auto` o `scroll`, más el documento:

```js
const INTENCIONALES = ['table-wrap', 'topbar__right'];   // scrollers deliberados
const bad = [];
const check = (el, label) => {
  const over = el.scrollWidth - el.clientWidth;
  if (over > 1 && !INTENCIONALES.some((c) => el.classList?.contains(c))) {
    bad.push(`${label} +${over}px`);
  }
};
check(document.documentElement, 'document');
document.querySelectorAll('*').forEach((el) => {
  const ox = getComputedStyle(el).overflowX;
  if (ox === 'auto' || ox === 'scroll') check(el, el.className);
});
```

Dos trampas dentro del propio arreglo:

1. **No excuses un elemento porque un ancestro lo recorte.** Mi primer comprobador
   corregido saltaba cualquier nodo con un ancestro que recorta — lo que saltaba
   `.main`, cuyo padre es `overflow: hidden`. Dio todo correcto con 14px de
   desplazamiento lateral aún presentes.
2. **Lista los scrollers deliberados explícitamente**, por clase. Una tabla ancha
   dentro de `overflow-x: auto` es el comportamiento diseñado; excusar en silencio
   *todo* contenedor `auto` esconde bugs reales.

Los dos culpables de este proyecto tenían la misma forma: una fila flex sin
`flex-wrap`. Una barra superior con tres botones largos y una cabecera de tarjeta
con tres botones de acción; ninguna podía envolver, así que ambas empujaban el panel
de lado a 390px. Ejecuta la comprobación a 360, 390, 414, 768, 1024 y 1440: 24
combinaciones en cuatro páginas tardaron segundos y son la diferencia entre "se ve
bien" y "está bien".

Cuando algo desborda, localiza al culpable en vez de adivinar: lista los elementos
cuyo borde derecho supera el ancho del viewport. Así se identificó el bug de
cascada: el culpable era `.search`, que debía estar en `display: none` a ese ancho.

**Los colores computados coinciden con los objetivos medidos.**
`getComputedStyle` sobre los elementos reales, comparado con la tabla del pase de
medición. Esto detectó dos superficies que seguían cableadas al token antiguo tras
reescribir la paleta.

**Las afirmaciones de geometría se miden, no se estiman.** "El sidebar parece más
largo que el contenido" se convirtió en un número concreto de 12px leyendo
`getBoundingClientRect().bottom` en ambas columnas al final del scroll, a dos
alturas de viewport. Arregla, vuelve a medir, cita los números.

**La webfont se aplicó de verdad.** Un fallback silencioso se ve bien y no es el
diseño. Compara el `font-family` computado y, si quieres certeza, el ancho renderizado
de una cadena de prueba contra la pila de respaldo.

**Teclado**: recorre con Tab la navegación, los chips, el slider y las pestañas;
cada parada visible.

## El lado a lado

Captura tu construcción a las proporciones de la referencia y apila la referencia
encima al mismo ancho en una página desechable. Las diferencias invisibles al
alternar entre dos ventanas son obvias cuando están a 40px en una sola imagen.

Espera una diferencia de escala: un mockup exportado a 1600px puede representar un
lienzo de 1728 o 1440px, así que tu tipografía puede ser proporcionalmente mayor con
todas las relaciones internas correctas. No lo persigas encogiendo todo: comprueba
las *relaciones*.

## Reportar

Di lo que no pudiste comprobar, en la misma frase que lo que sí.

Ejemplo real de este proyecto: el proxy del entorno rompía el TLS para Chromium, así
que el CDN de fuentes era inalcanzable en el navegador. Las capturas se tomaron con
el mismo `.woff2` inyectado como `@font-face` en base64, y la carga de la fuente en
la página publicada se verificó solo a nivel HTTP — la hoja devuelve 200 con cuatro
pesos. Eso es una afirmación materialmente más débil que "lo vi renderizar", y
decirlo es la diferencia entre un informe sobre el que se puede actuar y uno que hay
que volver a comprobar.

Igual con un despliegue: "subido" no es "publicado". Confirma que el workflow
terminó, que la URL devuelve 200 y que el recurso servido contiene de verdad el
cambio — para ES modules comprueba también el MIME, porque un `Content-Type`
incorrecto deja el shell renderizado y cada import muerto.

```bash
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' "$base/assets/js/app.js"
curl -s "$base/assets/css/tokens.css" | grep -- '--bg:'
```

## Corregirte

Cuando una medición contradice algo que ya afirmaste, dilo con claridad y sigue —
incluido cuando la afirmación anterior la ofreciste tú como evidencia. En este
proyecto describí los paréntesis de la referencia como "cuadrados" y lo usé como
criterio tipográfico; medir mostró que tienen 3 píxeles de ancho, donde ninguna
afirmación sobre forma se sostiene. Una frase, corrección hecha, el trabajo sigue.
