/*
Copyright (C) Mulesoft Inc.
All rights reserved.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-element.js';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {IronA11yKeysBehavior} from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import {IronControlState} from '@polymer/iron-behaviors/iron-control-state.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';

// Generate unique, monotonically increasing IDs for labels (needed by
// aria-labelledby) and add-ons.
export const PaperInputHelper = {};
PaperInputHelper.NextLabelID = 1;
PaperInputHelper.NextAddonID = 1;
PaperInputHelper.NextInputID = 1;

/**
 * Use `Polymer.PaperInputBehavior` to implement inputs with `<paper-input-container>`. This
 * behavior is implemented by `<paper-input>`. It exposes a number of properties from
 * `<paper-input-container>` and `<input is="iron-input">` and they should be bound in your
 * template.
 *
 * The input element can be accessed by the `inputElement` property if you need to access
 * properties or methods that are not exposed.
 *
 * @polymer
 * @mixinFunction
 * @appliesMixin Polymer.IronControlState
 * @appliesMixin Polymer.IronA11yKeysBehavior
 */
export const PaperInputBehavior = dedupingMixin((base) =>
  class extends mixinBehaviors([IronControlState, IronA11yKeysBehavior], base) {
    static get properties() {
      return {
        /**
         * The label for this input. If you're using PaperInputBehavior to
         * implement your own paper-input-like element, bind this to
         * `<label>`'s content and `hidden` property, e.g.
         * `<label hidden$="[[!label]]">[[label]]</label>` in your `template`
         */
        label: {
          type: String
        },

        /**
         * The value for this input. If you're using PaperInputBehavior to
         * implement your own paper-input-like element, bind this to
         * the `<input is="iron-input">`'s `bindValue`
         * property, or the value property of your input that is `notify:true`.
         */
        value: {
          notify: true,
          type: String
        },

        /**
         * Set to true to disable this input. If you're using PaperInputBehavior to
         * implement your own paper-input-like element, bind this to
         * both the `<paper-input-container>`'s and the input's `disabled` property.
         */
        disabled: {
          type: Boolean,
          value: false
        },

        /**
         * Returns true if the value is invalid. If you're using PaperInputBehavior to
         * implement your own paper-input-like element, bind this to both the
         * `<paper-input-container>`'s and the input's `invalid` property.
         *
         * If `autoValidate` is true, the `invalid` attribute is managed automatically,
         * which can clobber attempts to manage it manually.
         */
        invalid: {
          type: Boolean,
          value: false,
          notify: true
        },

        /**
         * Set to true to prevent the user from entering invalid input. If you're
         * using PaperInputBehavior to  implement your own paper-input-like element,
         * bind this to `<input is="iron-input">`'s `preventInvalidInput` property.
         */
        preventInvalidInput: {
          type: Boolean
        },

        /**
         * Set this to specify the pattern allowed by `preventInvalidInput`. If
         * you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `allowedPattern`
         * property.
         */
        allowedPattern: {
          type: String
        },

        /**
         * The type of the input. The supported types are `text`, `number` and `password`.
         * If you're using PaperInputBehavior to implement your own paper-input-like element,
         * bind this to the `<input is="iron-input">`'s `type` property.
         */
        type: {
          type: String
        },

        /**
         * The datalist of the input (if any). This should match the id of an existing `<datalist>`.
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `list` property.
         */
        list: {
          type: String
        },

        /**
         * A pattern to validate the `input` with. If you're using PaperInputBehavior to
         * implement your own paper-input-like element, bind this to
         * the `<input is="iron-input">`'s `pattern` property.
         */
        pattern: {
          type: String
        },

        /**
         * Set to true to mark the input as required. If you're using PaperInputBehavior to
         * implement your own paper-input-like element, bind this to
         * the `<input is="iron-input">`'s `required` property.
         */
        required: {
          type: Boolean,
          value: false
        },

        /**
         * The error message to display when the input is invalid. If you're using
         * PaperInputBehavior to implement your own paper-input-like element,
         * bind this to the `<paper-input-error>`'s content, if using.
         */
        errorMessage: {
          type: String
        },

        /**
         * After calling `validate()` this will be populated by latest result of the test for each
         * validator. Result item will contain following properties:
         *
         * - validator {String} Name of the validator
         * - valid {Boolean} Result of the test
         * - message {String} Error message, populated only if `valid` equal `false`
         *
         * This property is `undefined` if `validator` is not set.
         */
        validationStates: {
          type: Array,
          notify: true,
          observer: '_validationStatesChanged'
        },
        /**
         * Value computed from `errorMessage`, `invalid` and `validationStates`.
         * True if the validation message should be displayed.
         */
        hasValidationMessage: {
          type: Boolean,
          notify: true
        },

        /**
         * Set to true to auto-validate the input value. If you're using PaperInputBehavior to
         * implement your own paper-input-like element, bind this to
         * the `<paper-input-container>`'s `autoValidate` property.
         */
        autoValidate: {
          type: Boolean,
          value: false
        },

        /**
         * Name of the validator to use. If you're using PaperInputBehavior to
         * implement your own paper-input-like element, bind this to
         * the `<input is="iron-input">`'s `validator` property.
         */
        validator: {
          type: String
        },

        // HTMLInputElement attributes for binding if needed

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `autocomplete` property.
         */
        autocomplete: {
          type: String,
          value: 'off'
        },

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `autofocus` property.
         */
        autofocus: {
          type: Boolean,
          observer: '_autofocusChanged'
        },

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `inputmode` property.
         */
        inputmode: {
          type: String
        },

        /**
         * The minimum length of the input value.
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `minlength` property.
         */
        minlength: {
          type: Number
        },

        /**
         * The maximum length of the input value.
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `maxlength` property.
         */
        maxlength: {
          type: Number
        },

        /**
         * The minimum (numeric or date-time) input value.
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `min` property.
         */
        min: {
          type: String
        },

        /**
         * The maximum (numeric or date-time) input value.
         * Can be a String (e.g. `"2000-01-01"`) or a Number (e.g. `2`).
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `max` property.
         */
        max: {
          type: String
        },

        /**
         * Limits the numeric or date-time increments.
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `step` property.
         */
        step: {
          type: String
        },

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `name` property.
         */
        name: {
          type: String
        },

        /**
         * A placeholder string in addition to the label. If this is set, the label will always float.
         */
        placeholder: {
          type: String
        },

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `readonly` property.
         */
        readonly: {
          type: Boolean,
          value: false
        },

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `size` property.
         */
        size: {
          type: Number
        },

        // Nonstandard attributes for binding if needed

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `autocapitalize` property.
         */
        autocapitalize: {
          type: String,
          value: 'none'
        },

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `autocorrect` property.
         */
        autocorrect: {
          type: String,
          value: 'off'
        },

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `autosave` property,
         * used with type=search.
         */
        autosave: {
          type: String
        },

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `results` property,
         * used with type=search.
         */
        results: {
          type: Number
        },

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the `<input is="iron-input">`'s `accept` property,
         * used with type=file.
         */
        accept: {
          type: String
        },

        /**
         * If you're using PaperInputBehavior to implement your own paper-input-like
         * element, bind this to the`<input is="iron-input">`'s `multiple` property,
         * used with type=file.
         */
        multiple: {
          type: Boolean
        },

        tabindex: Number,

        _ariaDescribedBy: {
          type: String,
          value: ''
        },

        _ariaLabelledBy: {
          type: String,
          value: ''
        },

        _inputId: {
          type: String,
          value: ''
        }
      };
    }

    static get observers() {
      return [
        '_computeValidityStatus(invalid, errorMessage)'
      ];
    }

    get keyBindings() {
      return {
        'shift+tab:keydown': '_onShiftTabDown'
      };
    }

    /**
     * Returns a reference to the input element.
     */
    get inputElement() {
      if (!this.$) {
        this.$ = {};
      }
      if (!this.$.input) {
        this._generateInputId();
        this.$.input = this.shadowRoot.querySelector('#' + this._inputId);
      }
      return this.$.input;
    }

    /**
     * Returns a reference to the focusable element.
     */
    get _focusableElement() {
      return this.inputElement;
    }

    constructor() {
      super();
      this._onAddonAttached = this._onAddonAttached.bind(this);
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener('addon-attached', this._onAddonAttached);
      if (!this.hasAttribute('tabindex')) {
        this.setAttribute('tabindex', '0');
      }
      this._updateAriaLabelledBy();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('addon-attached', this._onAddonAttached);
    }

    _appendStringWithSpace(str, more) {
      if (str) {
        str = str + ' ' + more;
      } else {
        str = more;
      }
      return str;
    }

    _onAddonAttached(event) {
      const target = event.path ? event.path[0] : event.target;
      if (target.id) {
        this._ariaDescribedBy = this._appendStringWithSpace(this._ariaDescribedBy, target.id);
      } else {
        const id = 'paper-input-add-on-' + PaperInputHelper.NextAddonID++;
        target.id = id;
        this._ariaDescribedBy = this._appendStringWithSpace(this._ariaDescribedBy, id);
      }
    }

    /**
     * Validates the input element and sets an error style if needed.
     *
     * @return {boolean}
     */
    validate() {
      return this.inputElement.validate();
    }

    /**
     * Forward focus to inputElement. Overriden from IronControlState.
     * @param {Event} event
     */
    _focusBlurHandler(event) {
      IronControlState._focusBlurHandler.call(this, event);

      // Forward the focus to the nested input.
      if (this.focused && !this._shiftTabPressed) {
        this._focusableElement.focus();
      }
    }

    /**
     * Handler that is called when a shift+tab keypress is detected by the menu.
     *
     * @param {CustomEvent} event A key combination event.
     */
    _onShiftTabDown() {
      const oldTabIndex = this.getAttribute('tabindex');
      this._shiftTabPressed = true;
      this.setAttribute('tabindex', '-1');
      setTimeout(() => {
        this.setAttribute('tabindex', oldTabIndex);
        this._shiftTabPressed = false;
      }, 1);
    }

    /**
     * If `autoValidate` is true, then validates the element.
     */
    _handleAutoValidate() {
      if (this.autoValidate) {
        this.validate();
      }
    }

    /**
     * Restores the cursor to its original position after updating the value.
     * @param {string} newValue The value that should be saved.
     */
    updateValueAndPreserveCaret(newValue) {
      // Not all elements might have selection, and even if they have the
      // right properties, accessing them might throw an exception (like for
      // <input type=number>)
      try {
        const start = this.inputElement.selectionStart;
        this.value = newValue;
        // The cursor automatically jumps to the end after re-setting the value,
        // so restore it to its original position.
        this.inputElement.selectionStart = start;
        this.inputElement.selectionEnd = start;
      } catch (e) {
        // Just set the value and give up on the caret.
        this.value = newValue;
      }
    }

    _updateAriaLabelledBy() {
      const label = this.shadowRoot.querySelector('label');
      if (!label) {
        this._ariaLabelledBy = '';
        return;
      }
      let labelledBy;
      if (label.id) {
        labelledBy = label.id;
      } else {
        labelledBy = 'paper-input-label-' + PaperInputHelper.NextLabelID++;
        label.id = labelledBy;
      }
      this._ariaLabelledBy = labelledBy;
    }

    _onChange(event) {
      // In the Shadow DOM, the `change` event is not leaked into the
      // ancestor tree, so we must do this manually.
      // See https://w3c.github.io/webcomponents/spec/shadow/
      // #events-that-are-not-leaked-into-ancestor-trees.
      if (this.shadowRoot) {
        this.dispatchEvent(new CustomEvent(event.type, {
          detail: {
            sourceEvent: event
          },
          bubbles: event.bubbles,
          cancelable: event.cancelable
        }));
      }
    }

    _autofocusChanged() {
      // Firefox doesn't respect the autofocus attribute if it's applied after
      // the page is loaded (Chrome/WebKit do respect it), preventing an
      // autofocus attribute specified in markup from taking effect when the
      // element is upgraded. As a workaround, if the autofocus property is set,
      // and the focus hasn't already been moved elsewhere, we take focus.
      if (this.autofocus && this._focusableElement) {
        // In IE 11, the default document.activeElement can be the page's
        // outermost html element, but there are also cases (under the
        // polyfill?) in which the activeElement is not a real HTMLElement, but
        // just a plain object. We identify the latter case as having no valid
        // activeElement.
        const activeElement = document.activeElement;
        const isActiveElementValid = activeElement instanceof HTMLElement;

        // Has some other element has already taken the focus?
        const isSomeElementActive = isActiveElementValid &&
            activeElement !== document.body &&
            activeElement !== document.documentElement; /* IE 11 */
        if (!isSomeElementActive) {
          // No specific element has taken the focus yet, so we can take it.
          this._focusableElement.focus();
        }
      }
    }

    _validationStatesChanged(validationStates) {
      const has = !!validationStates;
      this.hasValidationMessage = has;
    }

    _computeValidityStatus(invalid, errorMessage) {
      const has = invalid && !!errorMessage;
      this.hasValidationMessage = has;
    }

    _generateInputId() {
      if (!this._inputId || this._inputId === '') {
        this._inputId = 'input-' + PaperInputHelper.NextInputID++;
      }
    }
    /**
     * Fired when the input changes due to user interaction.
     *
     * @event change
     */
  }
);
