/**
 * The "unofficial, untested" notice. The full box sits where a buyer or a
 * reader meets the issue first (the store, the letter, the mobile zine); the
 * one-line version rides on the cover and next to the buy buttons.
 */
import { html } from './dom.js';

export const disclaimerBox = (L, className = '') => html`
    <aside class="disclaimer ${className}" role="note">
      <p class="disclaimer-kicker">${L.disclaimer.kicker}</p>
      <strong>${L.disclaimer.title}</strong>
      <p>${L.disclaimer.body}</p>
    </aside>`;

export const disclaimerLine = (L, className = '') => html`<p class="disclaimer-line ${className}">${L.disclaimer.short}</p>`;
