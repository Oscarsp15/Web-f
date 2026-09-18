---
name: stakent-dashboard
description: Traducción de SKILL.md. El original en inglés es la fuente de verdad y es el fichero que carga el agente.
---

# Stakent — panel de staking oscuro

Convertir la captura de un dashboard en una página funcional cuyo color y
tipografía **coincidan** con el original, en vez de simplemente parecerse.

## Dos reglas

**Mide la referencia; no la estimes a ojo.**

En este proyecto, cada valor que elegí a ojo lo detectó el usuario como erróneo, y
cada valor que medí sobrevivió a la revisión. La página se veía bien en cada
etapa — precisamente por eso estimar es peligroso. "Un dashboard oscuro" y *este*
dashboard oscuro se diferencian en unos diez puntos de luminosidad y en un matiz
que no puedes nombrar de memoria.

**Después diseña todo lo que la captura no contiene.** Un mockup es un estado, a un
ancho, con contenido ideal: quizá el 5% de lo que se publica. Reproducirlo a la
perfección y parar ahí produce una página correcta al píxel a 1440 e inservible en
un móvil. Pasó aquí: reporté la reconstrucción como limpia y el usuario encontró el
panel de contenido desplazándose lateralmente bajo su dedo.

## Orden de trabajo

1. **Mira todas las imágenes de referencia primero.** Si una es un brand guide, la
   identidad te la dan hecha y el trabajo cambia por completo — ver la skill
   hermana `sequence-fintech`.
2. **Mide la paleta** antes de escribir CSS → `references/measuring-color.md`
3. **Ordena las tipografías por solape de glifos** → `references/font-matching.md`
4. **Construye** sobre la estructura de módulos, vigilando las cuatro trampas →
   `references/architecture.md`
5. **Diseña el 95% que la captura no contiene** — otros anchos, estados de
   interacción, contenido vacío y de error, táctil y teclado →
   `references/ux-engineering.md`
6. **Verifica y reporta con honestidad** → `references/verification.md`

## Lo que dijeron las mediciones

Conviene interiorizarlo antes de la primera estimación en el próximo diseño:

| superficie | mi estimación | medido |
|---|---|---|
| sidebar / topbar | `#14161d` | `#060610` |
| fondo de contenido | `#101218` | `#090913` |
| tarjetas | `#181b23` **con degradado** | `#0b0b15`, **plano** |
| texto principal | `#e9ebf2` | `#ffffff` |

Las tarjetas no tenían degradado alguno — me lo había inventado. Los neutros tienen
matiz violeta (R≈G, B unos puntos más alto), no gris azulado. Y el texto apagado
resultó *más claro* de lo que estimé mientras las superficies resultaron *más
oscuras*: estimar comprime el contraste hacia el medio.

En tipografía, la media de IoU por glifo entre siete candidatas puso **General
Sans** primera con .752 y la Space Grotesk que yo había elegido a ojo **última**
con .589.

## Anatomía de la pantalla

Sidebar: marca, control segmentado de dos vías, lista de navegación con contadores y
una etiqueta `Beta`, grupo desplegable de posiciones y una tarjeta promocional
anclada abajo. Barra superior: chip de usuario, acción primaria con relleno de
acento, notificaciones con contador, búsqueda y ajustes. Contenido: línea de
antetítulo con chip de recuento, titular grande con chips de filtro empujados a la
derecha, tres tarjetas de activo con su tasa, su delta y una sparkline que sangra
hasta los bordes; tarjeta promocional con degradado al lado. Debajo: panel con el
resumen de la posición, un slider de regla, cuatro pestañas de métricas y cuatro
tarjetas de estadística que esas pestañas reescriben.

## Innegociables

- Solo `tokens.css` contiene colores literales.
- Los ajustes responsive de un componente viven en el fichero de ese componente, o
  una hoja posterior gana silenciosamente a la media query — así se volvió
  invisible el botón de menú móvil.
- Resetea los márgenes de `p` junto con los titulares; una cifra de 26px arrastra
  un margen por defecto de 26px e infla todas las tarjetas.
- El shell posee el viewport (`height: 100dvh; overflow: hidden`) y el panel de
  contenido hace scroll dentro, para que ambas columnas terminen juntas.
- La geometría de los gráficos se genera desde los datos, nunca se escribe a mano.
- Ninguna cifra aparece en dos ficheros.

## Procedencia

El diseño visual es un shot de Dribbble de su autor; la implementación es código
original. Nunca calques los contornos de una tipografía comercial: ordena las
libres y elige una, o bifurca una OFL y ajústala con otro nombre.
