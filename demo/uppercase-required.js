/**
@license
Copyright 2017 Mulesoft.
All rights reserved.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatorMixin} from '@polymer/iron-validator-behavior/iron-validator-behavior.js';

class UppercaseRequired extends IronValidatorMixin(PolymerElement) {
  static get is() {
    return 'uppercase-required';
  }
  static get properties() {
    return {
      // Error message to display
      message: {
        type: String,
        value: 'Must have uppercase letter'
      }
    };
  }
  validate(value) {
    return /[A-Z]/.test(value);
  }
}
window.customElements.define(UppercaseRequired.is, UppercaseRequired);
