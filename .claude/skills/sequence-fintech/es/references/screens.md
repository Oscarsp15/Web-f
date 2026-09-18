# Las pantallas de Sequence, región por región

*Traducción de `references/screens.md`. El original en inglés es la fuente de
verdad.*

## Dashboard

### Sidebar

272px, `#f5f7f9`, hairline a la derecha, altura completa del viewport con su propio
scroll.

- Marca: el escudo en teal, el logotipo a 19px/700, y un botón de colapsar empujado
  a la derecha.
- Dos grupos etiquetados — `GENERAL` (Dashboard, Payment, Transaction, Cards) y
  `SUPPORT` (Capital, Vaults, Reports, Earn). La etiqueta va a 11px, 600, +0.6px de
  tracking, en mayúsculas y en `--ink-3`.
- `Cards` lleva un chevron (desplegable); `Earn` lleva una píldora `€ 150` en el
  tinte verde.
- El ítem **activo** es blanco con la sombra suave, no un relleno tintado. En una UI
  clara sobre un rail gris, "elevado y blanco" es el énfasis disponible; un relleno
  de color sería más ruidoso de lo que este diseño llega a ser.
- Anclado abajo: Settings, Help, una fila de Pro Mode con un interruptor real, un
  chip de usuario (avatar, nombre, email, chevron) en una caja blanca con borde, y
  una línea de copyright centrada.

### Barra superior

Buscador con la pista `⌘ + F` a la derecha del campo; a la derecha del todo, un
botón de rango de fechas, un selector "Last 30 days" y Export. Los tres son el mismo
botón discreto: blanco, borde hairline, 38px.

### Banner de saldo

Panel teal a ancho completo, `--r-lg`. Etiqueta a 13.5px en blanco al 78%; el
importe a clamp(26px, 3.2vw, 34px)/500 con cifras tabulares; un delta con tinte
verde al lado. Acciones a la derecha: **Add** en verde de marca con texto verde
oscuro, **Send** y **Request** en blanco translúcido sobre teal, y un botón de
desbordamiento `…`.

El fondo lleva el motivo de cuadrados redondeados de la marca al 7% de blanco:
cuadrados sobredimensionados en contorno, recortados por el panel. Mantenlo *apenas*
visible; renderízalo con `preserveAspectRatio="xMaxYMid slice"` para que los
cuadrados sigan siendo cuadrados y se recorten por la izquierda en vez de estirarse.

### Flujo de caja

Cabecera de tarjeta: icono de intercambio en teal, el título, y luego un control
segmentado Weekly/Daily y un botón Manage a la derecha.

El gráfico es de barras divergentes — ver `charts.md`. A su derecha, separados por un
hairline vertical (que pasa a horizontal cuando el layout se apila), los totales de
ingreso y gasto: una ficha de icono de 40px, una etiqueta, un importe de 22px y un
delta. La ficha de ingreso es teal; la de gasto, verde de marca.

### Tres tarjetas de cuenta

Icono, etiqueta, "Last 30 days" a la derecha; un importe grande con su delta; una
nota `vs. … Last Period` en `--ink-3`. Compactas: unos 120px de alto. Si las tuyas
rondan los 200px, no has reseteado los márgenes de `<p>`.

### Actividad reciente

Tabla con cabeceras `TYPE / AMOUNT / STATUS / METHOD` a 11px/600 con tracking, entre
dos hairlines. Cada fila: una marca circular verde suave con un icono de dirección,
el nombre de la contraparte y debajo `tipo · fecha`; el importe con su divisa
secundaria debajo; una píldora de estado (Success en tinte verde, Pending en gris);
el método con un número enmascarado debajo.

La línea secundaria de cada celda es un elemento de bloque — si la principal es un
`<b>` en línea, ambas se juntan en la misma línea, que es un bug real que publiqué
una vez.

Envuelve la tabla en `overflow-x: auto` con un `min-width` en la propia tabla, para
que los viewports estrechos desplacen la tabla y no la página.

### My Cards

Una cara de tarjeta teal a `aspect-ratio: 1.62`, con el motivo otra vez al 7% de
blanco, el logotipo VISA en cursiva, un número enmascarado y el saldo abajo. Una
franja verde asoma por detrás del borde superior para sugerir una segunda tarjeta.

## Flujo de transferencia

Una página aparte; sin sidebar.

- **Barra**: marca a la izquierda, un raíl de cuatro pasos centrado (Amount →
  Recipient → Review → Pay), y un botón de cerrar a la derecha que vuelve al
  dashboard. El punto del paso actual es verde de marca con un anillo suave; el
  resto son huecos con borde gris; un conector de 2px corre entre ellos. Oculta el
  raíl en teléfonos en vez de dejar que se apriete.
- **Columna**: 640px, centrada, con ritmo vertical generoso.
- **Campo de importe**: caja con borde y radio de 14px con el símbolo de divisa, un
  campo de 24px y un botón de divisa con una bandera circular pequeña (dibuja las
  banderas, no descargues imágenes para dos).
- **Desglose de comisiones**: panel con borde cuyas filas van precedidas de glifos de
  operador tenues — `·`, `·`, `−`, luego una regla, luego `=` y `×`. Esos operadores
  son lo que hace que el panel se lea como un cálculo en vez de como una lista; son
  el detalle más característico de la pantalla. Las etiquetas enlazadas llevan un
  subrayado sutil con desplazamiento.
- **Recipient gets**: el mismo componente de campo con la otra divisa.
- **Línea de llegada**, y luego un botón cuadrado pequeño de "programar" junto a un
  botón Continue teal a ancho completo.
- **Aviso legal** al pie en `--ink-3`, de unos 62 caracteres de ancho como máximo.
  Mantén el texto legal real; es parte de por qué una pantalla fintech se lee como un
  producto de verdad y no como una maqueta.
