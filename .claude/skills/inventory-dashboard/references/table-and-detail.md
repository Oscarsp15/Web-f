# The expandable row

The whole product is here. A stock table where any row opens in place to show the
full item record, without navigating away and without a modal.

## Structure

The detail is a **sibling `<tr>`**, not a nested element. A `<td>` cannot contain a
row, and wrapping the pair in a `<tbody>` each would break `tbody` striping and
sticky headers.

```js
const row =
  `<tr class="row${isOpen ? ' is-open' : ''}" data-row="${item.id}"> … </tr>`;
return isOpen ? row + detailRow(item) : row;
```

```html
<tr class="detail"><td colspan="8"> … </td></tr>
```

`colspan` must equal the real column count — including the invisible ones. This
table has eight: select, photo, ID, name, size, price, stock, and the chevron.
Miscount it and the detail cell stops short, which shows up as a misaligned right
border only when a row is open.

## The border treatment, which is the fiddly part

In the reference the open row is the only place the design draws a full border: the
row and its detail together form one outlined card lifted out of the list.

That means the outline is **split across two rows**:

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

Three things make this work: `border-collapse: collapse` on the table (so the two
halves meet without doubling), transparent — not absent — bottom border on the open
row (so its height does not change when it opens, which would make the whole table
jump), and the radii only on the outer corners.

## Accessibility

The chevron is a real button carrying the state:

```html
<button class="chev" data-toggle="A91LI6H"
        aria-expanded="true" aria-controls="d-A91LI6H"
        aria-label="Details for Air Jordan 13 He Got Game!">
```

`aria-label` names the item, not the action. "Details" alone gives a screen-reader
user eight identical buttons.

Rotate the chevron with a transition on the open state rather than swapping icons —
one element, one property, and it respects `prefers-reduced-motion` through the
global rule.

## Re-rendering versus mutating

This build re-renders the table body on every change (open, close, filter, view
switch). For a few dozen rows that is simpler and less bug-prone than surgical DOM
updates, and it keeps one code path.

What it costs: **state cannot live in the DOM**, because the DOM is thrown away.
Keep it outside, in sets keyed by id:

```js
const open = new Set(ITEMS.filter((i) => i.open).map((i) => i.id));
const checked = new Set(ITEMS.filter((i) => i.checked).map((i) => i.id));
```

A checkbox whose checked state lives only in the markup loses it on the next
keystroke in the search box. That is the bug this structure prevents.

If the table grows past a few hundred rows, move to keyed updates — but do that when
it is slow, not before.

## The search must search

The side panel is titled "Search for items" and its input says "search for items".
Wiring it to actually filter is ten lines:

```js
const matches = (item) => {
  if (!query) return true;
  const q = query.toLowerCase();
  return item.name.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
};
```

Match on both the name and the ID, because the sub-label promises "type id number or
name of items" — read the design's own microcopy for the spec.

And ship the **empty state**. A filter with no matches must say so; a table that
silently becomes zero rows looks broken.

```html
<tr><td colspan="8" class="empty">No items match that search.</td></tr>
```

## The grid view

The view toggle in the toolbar is not decoration either — it is two buttons with
`aria-pressed`, and the grid is a real alternative rendering of the same filtered
list. Reuse the data and the filter; only the markup function changes.

## On a phone, the toggle stops being optional

Eight columns do not fit in 390px. The table's `overflow-x: auto` wrapper keeps it
usable, but a screen whose first impression is "ID Number" and half a name has
failed. So the grid view becomes the **default** below 720px:

```js
let view = window.matchMedia('(max-width: 720px)').matches ? 'grid' : 'list';
```

Read the media query once at module load, not on every render — the user's toggle
must win from the first tap, and re-reading it would keep overriding them.

Three more things break at phone width, and each has a one-rule fix:

- **The filter bar stacks.** Four `flex-wrap` controls become four rows of chrome
  before any stock is visible. Switch that one row to `flex-wrap: nowrap;
  overflow-x: auto` with the scrollbar hidden, and add `flex: none` to the children
  so they keep their natural width instead of being squeezed. This is a deliberate
  sideways scroller — **add its class to your overflow checker's allowlist**, or the
  checker will report it forever and you will learn to ignore the checker.
- **The detail image turns into a tall void.** `grid-row: span 3` is right beside
  three rows of fields; in the one-column grid it reserves three empty rows. Reset
  it to `grid-row: auto` and cap it with `max-width`.
- **The square card shows two items per screen.** Lay the tile on its side —
  `grid-template-columns: 76px minmax(0, 1fr)` with the thumbnail at `grid-row:
  span 3` — and the same card shows six. A stock list exists to be scanned.
