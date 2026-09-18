/**
 * period-slider.js — the Investment Period control.
 *
 * A real `<input type="range">` sits transparently over the drawn ruler, so
 * pointer, touch and keyboard all work while the visuals stay custom.
 */

import { STAKE } from '../data.js';

const TICKS = 44;

/** Ruler heights rise toward the middle, with a deterministic wobble. */
function tickHeight(i) {
  const centered = 1 - Math.abs(i / (TICKS - 1) - 0.5) * 2;
  const wobble = Math.abs(Math.sin(i * 1.7)) * 0.35;
  return Math.round(7 + centered * 14 + wobble * 6);
}

/**
 * Build the ruler and keep knob, bubble and value in sync.
 * @param {HTMLElement} root the `.app` element
 */
export function initPeriodSlider(root) {
  const slider = root.querySelector('#period-slider');
  if (!slider) return;

  const input = slider.querySelector('input[type="range"]');
  const knob = slider.querySelector('.slider__knob');
  const bubble = slider.querySelector('.slider__bubble');
  const ruler = slider.querySelector('.slider__ruler');

  ruler.innerHTML = Array.from(
    { length: TICKS },
    (_, i) => `<i style="height:${tickHeight(i)}px"></i>`
  ).join('');

  const plan = root.querySelector('#period-plan');
  if (plan) plan.textContent = STAKE.months.plan;

  const { min, max } = STAKE.months;
  input.min = String(min);
  input.max = String(max);
  input.value = String(STAKE.months.value);

  const sync = () => {
    const months = Number(input.value);
    const pct = ((months - min) / (max - min)) * 100;
    knob.style.left = `${pct}%`;
    bubble.style.left = `${Math.min(94, Math.max(6, pct))}%`;
    bubble.textContent = `${months} Month`;
    input.setAttribute('aria-valuetext', `${months} months`);
  };

  input.addEventListener('input', sync);
  sync();
}
