# Medir el color desde una imagen de referencia

*Traducción de `references/measuring-color.md`. El original en inglés es la fuente
de verdad.*

Todo esto existe porque estimar a ojo falló. En este proyecto cada valor que elegí
mirando resultó equivocado lo bastante como para que se notara, y cada valor que
medí sobrevivió a la revisión.

## Por qué un canvas, y por qué mismo origen

Leer píxeles requiere `getImageData`, que lanza `SecurityError` en un canvas
contaminado por una imagen de otro origen — o de `file://`. Servir la referencia
por HTTP plano desde el mismo origen que la página que lee es todo el truco:

```bash
cd <carpeta con la referencia>
python3 -m http.server 8099
```

```js
const page = await browser.newPage();
await page.goto('http://localhost:8099/');   // mismo origen que la imagen
const result = await page.evaluate(async () => {
  const img = new Image();
  img.src = '/design.jpg';                    // mismo origen -> canvas limpio
  await img.decode();
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  // ... muestrear aquí
});
```

`willReadFrequently: true` importa: sin él Chromium mantiene el canvas en la GPU y
cada `getImageData` va y vuelve, lo que convierte unos cientos de muestras en una
pausa visible.

## Muestrear superficies planas

Promedia un bloque. Nunca confíes en un píxel suelto: el submuestreo de croma del
JPEG y el ringing mueven un píxel varios puntos, y las capturas PNG de degradados
llevan dithering.

```js
const hex = (r, g, b) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

const avg = (ctx, x, y, size = 9) => {
  const d = ctx.getImageData(x - (size >> 1), y - (size >> 1), size, size).data;
  let r = 0, g = 0, b = 0;
  for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; }
  const n = d.length / 4;
  return hex(r / n, g / n, b / n);
};
```

Elige el punto en mitad de una zona realmente plana: lejos de bordes, texto, iconos
y del borde de un degradado. Si dos puntos candidatos difieren en más de uno o dos
puntos, uno de ellos está sobre algo que no pretendías muestrear.

## Muestrear texto

**No promedies el texto.** El antialiasing mezcla cada trazo hacia el fondo, así que
la media de la caja de un glifo es un color que no aparece en ningún sitio del
diseño: siempre queda entre el color del tipo y el de la superficie.

Toma el extremo:

```js
// UI oscura: el píxel más claro de la caja. UI clara: el más oscuro.
const textColor = (ctx, x0, y0, w, h, dark = true) => {
  const d = ctx.getImageData(x0, y0, w, h).data;
  let best = [0, 0, 0];
  let bestL = dark ? -1 : 1e9;
  for (let i = 0; i < d.length; i += 4) {
    const L = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    if (dark ? L > bestL : L < bestL) { bestL = L; best = [d[i], d[i + 1], d[i + 2]]; }
  }
  return hex(...best);
};
```

El píxel extremo se equivoca hacia el fondo, nunca más allá, así que es una cota
inferior de lo claro (o superior de lo oscuro) que es el color real. En texto fino
de 12px el trazo puede no alcanzar opacidad plena, así que tómalo como "esto o algo
más extremo".

Comprobación útil: si el texto principal sale `#ffffff` o `#000000`, tienes la
respuesta exacta, porque el extremo no puede pasarse.

## Muestrea toda la escalera, no una superficie

Las UI de producto oscuras suelen tener cuatro o cinco superficies dentro de diez
puntos entre sí, y una copia se siente mal cuando el *orden* o el *espaciado* de esa
escalera falla, aunque cada valor por separado parezca plausible. Muestrea cada
escalón:

- el cromo exterior (sidebar, barra superior)
- el fondo del contenido
- el relleno de tarjeta — **y su parte superior e inferior**, que es como descubres
  si existe un degradado
- superficies anidadas (una tarjeta de estadística dentro de un panel)
- filas activas, chips, pistas de controles segmentados y su píldora seleccionada
- botones, tanto el relleno de acento como cualquier variante translúcida
- los stops de cada degradado, muestreados a lo largo de su eje

Lo que produjo en Stakent, frente a mis estimaciones:

| superficie | estimado | medido |
|---|---|---|
| sidebar / topbar | `#14161d` | `#060610` |
| fondo de contenido | `#101218` | `#090913` |
| tarjetas, paneles | `#181b23` con degradado | `#0b0b15`, plano |
| tarjetas anidadas | `#181b23` | `#10101a` |
| fila activa, chips | `#1d212a` | `#13131b` |
| texto principal | `#e9ebf2` | `#ffffff` |
| texto secundario | `#a1a7b6` | `#97979f` |
| texto apagado | `#6c7382` | `#8c8d8f` |
| acento (botones) | `#bdaaf8` | `#bfb2fd` |

Dos hallazgos fueron estructurales, no cosméticos:

1. **Las tarjetas no llevan degradado.** Arriba y abajo muestrearon idéntico. Yo
   había construido un `linear-gradient(180deg, …)` de la imaginación.
2. **Los neutros tienen matiz violeta** — R≈G con B unos puntos más alto — no el
   gris azulado que supuse. Esa es la diferencia entre "un dashboard oscuro" y
   *este* dashboard oscuro.

Fíjate además en que el texto apagado salió **más claro** que mi estimación
mientras las superficies salieron **más oscuras**. Estimar comprime el contraste
hacia el medio; medir, no.

## Degradados

Muestrea a lo largo del eje en cinco o seis puntos y reconstruye, en vez de
aproximar con dos stops. La tarjeta promocional de Stakent:

```
sup-izq   #020317   sup-der #010214
med-izq   #0d082a   med-der #04041a
inf-izq   #7e66bc   inf-med #5e45a0   inf-der #7057b2
```

Ese orden dice que el resplandor sube desde el **borde inferior, centrado**, no
desde una esquina — que es lo que yo había construido. Rehecho como radial en
`50% 110%` sobre una base vertical oscura.

## Verificar tu propia construcción

El mismo montaje, apuntando a tu página en vez de a la imagen. `getComputedStyle`
basta y es más robusto que volver a capturar:

```js
const bg = (sel) => getComputedStyle(document.querySelector(sel)).backgroundColor;
```

Compara cada objetivo medido con el valor computado correspondiente. En Stakent
esto detectó dos superficies que seguían cableadas al token antiguo tras reescribir
la paleta.

## Contraste

Tras igualar una paleta medida, comprueba el texto apagado contra su superficie. Si
cae por debajo de ~4.5:1, mantén el tono de la referencia y sube solo la
luminosidad — y dilo. Publicar texto ilegible en silencio para parecerse a un
mockup no es fidelidad, es un bug.
