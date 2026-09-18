# Identificar una tipografía desde una captura

*Traducción de `references/font-matching.md`. El original en inglés es la fuente de
verdad.*

La premisa: los dashboards de este género suelen ir compuestos en una grotesca
comercial — Aeonik, PP Neue Montreal, Söhne — así que el trabajo no es "nombrar la
fuente" sino "encontrar la libre más cercana", y la cercanía es medible. No elijas
de memoria. Yo lo hice, escogí Space Grotesk, y quedó **última de siete** al medir.

## Conseguir los ficheros

En un entorno aislado el navegador a menudo no llega a los CDN de fuentes (el TLS a
través del proxy falla) mientras que `curl` sí. Descarga con `curl` y sirve en
local.

**Google Fonts** — el CSS contiene varios bloques `@font-face`, uno por subconjunto
Unicode. El **último** es `latin`; el primero suele ser `latin-ext` o cirílico y le
falta casi todo lo que quieres probar:

```bash
UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
curl -s -A "$UA" "https://fonts.googleapis.com/css2?family=DM+Sans:wght@500" -o dmsans.css
url=$(grep -o "https://fonts.gstatic.com[^)]*\.woff2" dmsans.css | tail -1)
curl -s -o dmsans.woff2 "$url"
```

Sin el user-agent de escritorio, Google sirve `.ttf` en vez de `.woff2`.

**Fontshare** — sus URLs son relativas al protocolo, así que antepón el esquema:

```bash
curl -s "https://api.fontshare.com/v2/css?f%5B%5D=general-sans@500" -o gs.css
url=$(grep -o "//cdn\.fontshare\.com[^')]*\.woff2" gs.css | head -1)
curl -s -o general-sans.woff2 "https:${url}"
```

Comprueba los tamaños. Un "woff2" de 4KB es un subconjunto casi sin glifos; un
subconjunto latino real pesa entre 13 y 26KB.

Candidatas útiles para la familia Aeonik/Neue Montreal: **General Sans, Switzer,
Satoshi** (Fontshare) y **DM Sans, Onest, Instrument Sans** (Google). Incluye la que
ibas a elegir a ojo, para que la comparación sea honesta.

## No puntúes frases enteras

Mi primer intento renderizaba "Top Staking Assets" por candidata y lo comparaba con
un recorte. El ranking cambiaba entre cadenas de prueba — Satoshi ganaba el titular,
Switzer los dígitos, Space Grotesk una tercera cadena — porque **el interletraje
domina el solape de píxeles**. Acabas midiendo tracking, no formas de letra.

Puntúa glifos sueltos. No tienen tracking.

## Segmentar glifos de la referencia

Localízalos estructuralmente. Las coordenadas a ojo me salieron mal a la primera —
la celda que etiqueté `g` contenía en realidad "As" — y un recorte equivocado
produce un número confiado y sin sentido.

Umbraliza la región y etiqueta componentes conexos a 8 vecinos:

```js
const components = ({ m, w, h }, minArea) => {
  const seen = new Uint8Array(w * h);
  const boxes = [];
  for (let i = 0; i < w * h; i++) {
    if (!m[i] || seen[i]) continue;
    const stack = [i];
    seen[i] = 1;
    let x0 = w, y0 = h, x1 = -1, y1 = -1, area = 0;
    while (stack.length) {
      const q = stack.pop();
      const qx = q % w, qy = (q - qx) / w;
      area++;
      if (qx < x0) x0 = qx; if (qx > x1) x1 = qx;
      if (qy < y0) y0 = qy; if (qy > y1) y1 = qy;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = qx + dx, ny = qy + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const ni = ny * w + nx;
        if (m[ni] && !seen[ni]) { seen[ni] = 1; stack.push(ni); }
      }
    }
    if (area >= minArea) boxes.push({ x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1 });
  }
  return boxes.sort((a, b) => a.x0 - b.x0);
};
```

Luego identifica por estructura:

- **`g`** — en "Top Staking Assets" los únicos descendentes son `p` y `g`, así que
  toma los componentes cuyo fondo caiga por debajo de la mediana y quédate con el
  más a la derecha.
- **dígitos** — ordena por x e indexa en la cadena, pero *escribe la cadena después
  de quitar los componentes filtrados*. En `31.39686` el punto decimal cae por el
  filtro de altura, dejando `3 1 3 9 6 8 6`; el índice 3 es el `9` y el 4 es un `6`.
  Yo mapeé el índice 4 al `9` y gasté una ronda comparando un `6` contra el `9` de
  cada candidata, lo que produjo una columna uniformemente mala con aspecto de
  hallazgo real.

Imprime las cajas y mira un recorte ampliado antes de fiarte de la ejecución.

## Puntuación

Normaliza la caja de cada máscara a un cuadrado fijo y calcula la intersección
sobre la unión:

```js
const iou = (a, b) => {
  let inter = 0, union = 0;
  for (let i = 0; i < a.length; i++) {
    const u = a[i] | b[i];
    if (u) { union++; if (a[i] & b[i]) inter++; }
  }
  return inter / union;
};
```

Renderiza el glifo candidato grande (130px) en su propio canvas, fusiona sus
componentes (el punto de una `i` va aparte), normaliza igual y compara.

**Descarta los glifos muy estrechos del promedio.** Normalizar la caja de un `1`,
`l` o `i` a un cuadrado la estira enormemente, así que una diferencia pequeña en el
asta hace oscilar la puntuación de 0.78 a 0.12. En mi ejecución Switzer sacó `.784`
en el `1` mientras el resto rondaba `.20` — un artefacto, no un hallazgo, y bastaba
para invertir el ranking. Usa `g 3 6 8 9 a S`.

## El resultado, para calibrar

Media de IoU sobre `g 3 6 8 9`:

| fuente | g | 3 | 9 | 6 | 8 | media |
|---|---|---|---|---|---|---|
| General Sans | .582 | .762 | .805 | .792 | .820 | **.752** |
| Satoshi | .563 | .501 | .855 | .811 | .823 | .711 |
| DM Sans | **.676** | .823 | .527 | .516 | .811 | .671 |
| Switzer | .590 | .837 | .543 | .523 | .787 | .656 |
| Instrument Sans | .568 | .833 | .484 | .492 | .813 | .638 |
| Onest | .562 | .770 | .518 | .515 | .784 | .630 |
| Space Grotesk | .563 | .539 | .552 | .538 | .752 | .589 |

Valores absolutos entre .6 y .8 son normales: el glifo de referencia mide de 20 a
45px de alto y el remuestreo lo difumina, así que el solape perfecto es
inalcanzable. Solo importa el orden.

Fíjate en que DM Sans gana la `g` mientras General Sans gana los dígitos redondos.
Cuando el ganador cambia por glifo, pondera por lo que el diseño muestra más: este
dashboard son cifras grandes de lado a lado, así que deciden los dígitos.

## Confirma con los ojos

Monta una lámina: los recortes de la referencia ampliados
(`image-rendering: pixelated`, escalando cada recorte para que mida ~150px de alto)
en la fila superior y cada candidata debajo al mismo tamaño. Los números ordenan;
la lámina detecta el caso en que los números miden otra cosa distinta de la que
crees.

## Hay un suelo de resolución

El método necesita píxeles. En una referencia de 600px de ancho, un titular mide
unos 14px de alto y el solape por glifo es ruido: ahí la comparación honesta es
visual, sobre un recorte ampliado, y hay que decirlo en vez de presentar un ranking
que la fuente no sostiene.

## Afirmaciones que evitar

A la resolución de la referencia, un paréntesis medía **3 píxeles de ancho**. Yo
había afirmado que el diseño usaba "paréntesis cuadrados" como rasgo distintivo.
Nada de 3px sostiene una afirmación sobre forma. Antes de citar un rasgo como
evidencia, comprueba que ese rasgo se resuelve en el origen.

## Licencias

Antes de commitear un binario de fuente, confirma que se permite redistribuir. La
OFL (la mayoría de Google Fonts) lo permite explícitamente, incluida la
modificación, con cambio de nombre si la fuente tiene *Reserved Font Name*. Si no
puedes leer el texto de la licencia — la página de licencia de Fontshare es una SPA
que `curl` no puede extraer — **no la auto-alojes**. Carga desde el CDN del propio
fundidor y deja constancia en el README de por qué el binario no está en el repo.
Publicar una fuente cuyos términos no has leído no es una decisión que tomar en el
repositorio de otra persona.
