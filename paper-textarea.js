/**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {IronValidatableMixin} from '@polymer/iron-validatable-behavior/iron-validatable-behavior.js';
import {PaperInputBehavior} from './paper-input-behavior.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-a11y-announcer/iron-a11y-announcer.js';
import './paper-input-container.js';
import './paper-input-error.js';
/**
 * `<paper-textarea>` is a multi line text input styled for the Anypoint platform
 * as a Polymer powered web component
 *
 * ### Example
 *
 * ```html
 * <paper-textarea></paper-textarea>
 * ```
 *
 * ### Styling
 *
 * See `anypoint-text-container` for styling options.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @appliesMixin PaperInputBehavior
 * @appliesMixin IronValidatableMixin
 * @memberof AnypointElements
 */
class PaperTextarea extends IronValidatableMixin(PaperInputBehavior(PolymerElement)) {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }

    :host {
      display: block;
    }

    :host([hidden]) {
      display: none !important;
    }

    label {
      pointer-events: none;
    }

    paper-input-container {
      height: inherit;
    }

    textarea[slot="input"] {
      height: calc(100% - 5px);
      padding: 10px;
      box-sizing: border-box;
    }
    </style>
    <paper-input-container auto-validate\$="[[autoValidate]]" disabled\$="[[disabled]]" invalid="[[invalid]]">
      <label hidden\$="[[!label]]" aria-hidden="true" for\$="[[_inputId]]" slot="label">[[label]]</label>
      <textarea slot="input" id\$="[[_inputId]]" value="{{value::input}}" disabled\$="[[disabled]]" title\$="[[title]]" required\$="[[required]]" autocomplete\$="[[autocomplete]]" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" minlength\$="[[minlength]]" maxlength\$="[[maxlength]]" name\$="[[name]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" autocapitalize\$="[[autocapitalize]]" rows\$="[[rows]]"></textarea>
      <template is="dom-if" if="[[hasValidationMessage]]">
        <paper-input-error slot="add-on" aria-live="assertive" invalid="[[invalid]]" focused="[[focused]]" horizontal-align="right">[[errorMessage]]</paper-input-error>
      </template>
    </paper-input-container>
`;
  }

  static get is() {return 'paper-textarea'; }

  static get properties() {
    return {
      _ariaLabelledBy: {
        observer: '_ariaLabelledByChanged',
        type: String
      },

      _ariaDescribedBy: {
        observer: '_ariaDescribedByChanged',
        type: String
      },
      /**
       * The initial number of rows.
       *
       * @type number
       */
      rows: {
        type: Number,
        value: 3
      },

      _patternAlreadyChecked: {
        type: Boolean,
        value: false
      },

      value: {
        type: String,
        notify: true
      }
    };
  }

  get _focusableElement() {
    return this.inputElement;
  }

  get _patternRegExp() {
    let pattern;
    if (this.allowedPattern) {
      pattern = new RegExp(this.allowedPattern);
    } else {
      switch (this.type) {
        case 'number':
          pattern = /[0-9.,e-]/;
          break;
      }
    }
    return pattern;
  }

  constructor() {
    super();
    this._onInput = this._onInput.bind(this);
    this._onKeypress = this._onKeypress.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('input', this._onInput);
    this.addEventListener('keypress', this._onKeypress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('input', this._onInput);
    this.removeEventListener('keypress', this._onKeypress);
  }

  _ariaLabelledByChanged(ariaLabelledBy) {
    this.inputElement.setAttribute('aria-labelledby', ariaLabelledBy);
  }

  _ariaDescribedByChanged(ariaDescribedBy) {
    this.inputElement.setAttribute('aria-describedby', ariaDescribedBy);
  }

  _onInput() {
    // Need to validate each of the characters pasted if they haven't
    // been validated inside `_onKeypress` already.
    if (this.preventInvalidInput && !this._patternAlreadyChecked) {
      const valid = this._checkPatternValidity();
      if (!valid) {
        this._announceInvalidCharacter('Invalid string of characters not entered.');
        this.value = this._previousValidInput;
      }
    }
    this._previousValidInput = this.value;
    this._patternAlreadyChecked = false;
    this.inputElement.dispatchEvent(new CustomEvent('bind-value-changed', {
      detail: {
        value: this.value
      }
    }));
  }

  _checkPatternValidity() {
    const regexp = this._patternRegExp;
    if (!regexp) {
      return true;
    }
    for (let i = 0; i < this.value.length; i++) {
      if (!regexp.test(this.value[i])) {
        return false;
      }
    }
    return true;
  }

  _announceInvalidCharacter(message) {
    this.dispatchEvent(new CustomEvent('iron-announce', {
      detail: {
        text: message
      },
      bubbles: true,
      composed: true
    }));
  }

  _onKeypress(event) {
    if (!this.preventInvalidInput && this.type !== 'number') {
      return;
    }
    const regexp = this._patternRegExp;
    if (!regexp) {
      return;
    }
    // Handle special keys and backspace
    if (event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }
    // Check the pattern either here or in `_onInput`, but not in both.
    this._patternAlreadyChecked = true;
    const thisChar = String.fromCharCode(event.charCode);
    if (this._isPrintable(event) && !regexp.test(thisChar)) {
      event.preventDefault();
      this._announceInvalidCharacter('Invalid character ' + thisChar + ' not entered.');
    }
  }

  _isPrintable(event) {
    // What a control/printable character is varies wildly based on the browser.
    // - most control characters (arrows, backspace) do not send a `keypress` event
    //   in Chrome, but the *do* on Firefox
    // - in Firefox, when they do send a `keypress` event, control chars have
    //   a charCode = 0, keyCode = xx (for ex. 40 for down arrow)
    // - printable characters always send a keypress event.
    // - in Firefox, printable chars always have a keyCode = 0. In Chrome, the keyCode
    //   always matches the charCode.
    // None of this makes any sense.

    // For these keys, ASCII code == browser keycode.
    const anyNonPrintable =
      (event.keyCode === 8)   ||  // backspace
      (event.keyCode === 9)   ||  // tab
      (event.keyCode === 13)  ||  // enter
      (event.keyCode === 27);     // escape

    // For these keys, make sure it's a browser keycode and not an ASCII code.
    const mozNonPrintable =
      (event.keyCode === 19)  ||  // pause
      (event.keyCode === 20)  ||  // caps lock
      (event.keyCode === 45)  ||  // insert
      (event.keyCode === 46)  ||  // delete
      (event.keyCode === 144) ||  // num lock
      (event.keyCode === 145) ||  // scroll lock
      (event.keyCode > 32 && event.keyCode < 41)   || // page up/down, end, home, arrows
      (event.keyCode > 111 && event.keyCode < 124); // fn keys

    return !anyNonPrintable && !(event.charCode === 0 && mozNonPrintable);
  }
}
window.customElements.define(PaperTextarea.is, PaperTextarea);
