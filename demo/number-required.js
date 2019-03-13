/**
@license
Copyright 2017 Mulesoft.
All rights reserved.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatorMixin} from '@polymer/iron-validator-behavior/iron-validator-behavior.js';

class NumberRequired extends IronValidatorMixin(PolymerElement) {
  static get is() {
    return 'number-required';
  }
  static get properties() {
    return {
      // Error message to display
      message: {
        type: String,
        value: 'Must have number'
      }
    };
  }
  validate(value) {
    return /\d/.test(value);
  }
}
window.customElements.define(NumberRequired.is, NumberRequired);
