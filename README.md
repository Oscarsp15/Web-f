# Stakent — Staking Dashboard

Recreación en HTML/CSS/JavaScript de un dashboard de staking cripto, construida a
partir de un mockup de referencia. Sin frameworks, sin bundler y sin dependencias:
sólo ES modules nativos y CSS con custom properties.

**Demo:** https://oscarsp15.github.io/Web-f/

## Qué incluye

- Sidebar con navegación, acordeón de *Active Staking* y drawer en móvil.
- Topbar con buscador, notificaciones y acciones de cuenta.
- Tres tarjetas de assets con sparklines generadas por código (spline
  Catmull-Rom → bezier, área con degradado y píldora de importe).
- Tarjeta promocional de *Liquid Staking Portfolio*.
- Panel "Your active stakings" con slider de periodo de inversión accesible
  (teclado incluido) y pestañas Momentum / General / Risk / Reward que reescriben
  las cuatro stat cards.
- Responsive de 1440px a 390px, con `prefers-reduced-motion` respetado.

## Estructura

```
index.html                      # marcado del shell; se ve aunque el JS falle
assets/css/tokens.css           # tokens de color/tipo/espaciado + reset
assets/css/layout.css           # shell, sidebar, topbar, grids y breakpoints
assets/css/components.css       # botones, chips, cards, panel, slider, stats
assets/js/data.js               # única fuente de datos de la UI
assets/js/icons.js              # registro de iconos SVG inline
assets/js/sparkline.js          # generación de las gráficas
assets/js/components/*.js       # un módulo por región de la interfaz
assets/js/app.js                # bootstrap
```

Los datos son de demostración: no hay backend ni feed de precios.

## Desarrollo

Los ES modules necesitan servirse por HTTP (no `file://`):

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Despliegue

`.github/workflows/deploy-pages.yml` publica la raíz del repo en GitHub Pages en
cada push a `main`. Requiere *Settings → Pages → Source: GitHub Actions*. Si la
fuente está configurada como *Deploy from a branch* (`main`, carpeta `/`), el sitio
se sirve igual: `index.html` está en la raíz y `.nojekyll` evita el paso por Jekyll.

## Tipografía y color

Ambos se eligieron midiendo el mockup de referencia, no a ojo:

- **Color**: los tokens de `assets/css/tokens.css` salen de muestrear los píxeles
  de la imagen (bloques de 9x9 promediados en zonas planas; para el texto, el píxel
  más luminoso de cada trazo). De ahí el negro con matiz violeta — `#060610` en el
  sidebar, `#090913` en el área principal, `#0b0b15` en tarjetas — y el blanco puro
  del texto principal.
- **Tipografía**: **General Sans** (Indian Type Foundry, vía el CDN de Fontshare).
  Se eligió comparando siete candidatas libres contra glifos recortados del mockup
  y midiendo el solape de píxeles (IoU) glifo a glifo. General Sans ganó de media
  (.752), por delante de Satoshi (.711), DM Sans (.671) y Switzer (.656).
  La fuente **no se auto-aloja**: no pude verificar desde el entorno de desarrollo
  si la ITF Free Font License permite redistribuir el binario, así que se carga
  desde el canal oficial del fundidor. Si se confirma que la licencia lo permite,
  auto-alojar el `.woff2` quitaría esa dependencia de terceros.

## Créditos

El diseño visual de partida es un shot publicado en Dribbble
(`cdn.dribbble.com/userupload/13799952`); los derechos del diseño son de su autor.
Este repositorio es una implementación propia con fines de práctica de front-end:
no contiene assets, código ni marca del original.
