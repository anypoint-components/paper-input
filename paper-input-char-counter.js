/**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {PaperInputAddonBehavior} from './paper-input-addon-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@advanced-rest-client/anypoint-styles/typography.js';
/**
 * `<paper-input-char-counter>` is a character counter for use with `<paper-input-container>`. It
 * shows the number of characters entered in the input and the max length if it is specified.
 *      <paper-input-container>
 *        <input maxlength="20">
 *        <paper-input-char-counter></paper-input-char-counter>
 *      </paper-input-container>
 *
 * ### Styling
 *
 * The following mixin is available for styling:
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--paper-input-char-counter` | Mixin applied to the element | `{}`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @appliesMixin Polymer.PaperInputAddonBehavior
 * @memberof AnypointElements
 */
class PaperInputCharCounter extends mixinBehaviors([PaperInputAddonBehavior], PolymerElement) {
  static get template() {
    return html`<style>
    :host {
      display: inline-block;
      float: right;
      @apply --arc-font-caption;
      @apply --paper-input-char-counter;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host(:dir(rtl)) {
      float: left;
    }
    </style>
    <span>[[_charCounterStr]]</span>`;
  }

  static get is() {
    return 'paper-input-char-counter';
  }

  static get properties() {
    return {
      _charCounterStr: {
        type: String,
        value: '0'
      }
    };
  }
  /**
   * This overrides the update function in PaperInputAddonBehavior.
   * @param {{
   *   inputElement: (Element|undefined),
   *   value: (string|undefined),
   *   invalid: boolean
   * }} state -
   *     inputElement: The input element.
   *     value: The input value.
   *     invalid: True if the input value is invalid.
   */
  update(state) {
    if (!state.inputElement) {
      return;
    }
    state.value = state.value || '';
    let counter = state.value.toString().length.toString();
    if (state.inputElement.hasAttribute('maxlength')) {
      counter += '/' + state.inputElement.getAttribute('maxlength');
    }
    this._charCounterStr = counter;
  }
}
window.customElements.define(PaperInputCharCounter.is, PaperInputCharCounter);
