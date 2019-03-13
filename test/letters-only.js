import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatorMixin} from '@polymer/iron-validator-behavior/iron-validator-behavior.js';
class LettersOnly extends IronValidatorMixin(PolymerElement) {
  static get is() {
    return 'letters-only';
  }

  validate(value) {
    return !value || value.match(/^[a-zA-Z]*$/) !== null;
  }
}
window.customElements.define(LettersOnly.is, LettersOnly);
