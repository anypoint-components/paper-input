/**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/
import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/**
 * Use `Polymer.PaperInputAddonBehavior` to implement an add-on for `<paper-input-container>`. A
 * add-on appears below the input, and may display information based on the input value and
 * validity such as a character counter or an error message.
 *
 * @polymer
 * @mixinFunction
 */
export const PaperInputAddonBehavior = dedupingMixin((base) => class extends base {
  connectedCallback() {
    super.connectedCallback();
    this.fire('addon-attached');
    this.dispatchEvent(new CustomEvent('addon-attached', {
      bubbles: true,
      composed: true
    }));
  }
  /**
   * The function called by `<paper-input-container>` when the input value or validity changes.
   * @param {{
   *   inputElement: (Element|undefined),
   *   value: (string|undefined),
   *   invalid: boolean
   * }} state -
   *     inputElement: The input element.
   *     value: The input value.
   *     invalid: True if the input value is invalid.
   */
  update(state) {}
});
