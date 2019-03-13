/**
@license
Copyright 2017 Mulesoft.
All rights reserved.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatorMixin} from '@polymer/iron-validator-behavior/iron-validator-behavior.js';

class MinimumMaximumLength extends IronValidatorMixin(PolymerElement) {
  static get is() {
    return 'minimum-maximum-length';
  }
  static get properties() {
    return {
      // Error message to display
      message: {
        type: String,
        value: 'Value too short or too long'
      },
      // Min value for the string value.
      min: {
        type: Number,
        value: 4
      },
      // Max value for the string value.
      max: {
        type: Number,
        value: 12
      }
    };
  }
  validate(value) {
    if (!value) {
      return false;
    }
    if (value.length < this.min || value.length > this.max) {
      return false;
    }
    return true;
  }
}
window.customElements.define(MinimumMaximumLength.is, MinimumMaximumLength);
