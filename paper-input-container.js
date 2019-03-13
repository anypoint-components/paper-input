/**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {dashToCamelCase} from '@polymer/polymer/lib/utils/case-map.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import '@polymer/polymer/lib/elements/custom-style.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@advanced-rest-client/anypoint-styles/typography.js';
import '@advanced-rest-client/anypoint-styles/colors.js';
const $documentContainer = document.createElement('template');
$documentContainer.innerHTML = `<custom-style>
  <style is="custom-style">
    html {
      --paper-input-container-shared-input-style: {
        position: relative; /* to make a stacking context */
        outline: none;
        box-shadow: none;
        padding: 0;
        margin: 0;
        width: 100%;
        max-width: 100%;
        background: transparent;
        border: none;
        color: var(--paper-input-container-input-color, var(--anypoint-color-steel5));
        -webkit-appearance: none;
        text-align: inherit;
        vertical-align: bottom;
        height: 40px;
        @apply --anypoint-font-body;
      };
    }
  </style>
</custom-style>`;

document.head.appendChild($documentContainer.content);
/**
 * The `<paper-input-container>` is a container for a `label` and input text styled to match the
 * Anypoint platform styling.
 *
 * ### Styling
 *
 * `<paper-input-field>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--paper-input-container` | Mixin applied to the input container | `{}`
 * `--paper-input-container-disabled` | Mixin applied to the disabled container | `{}`
 * `--paper-input-container-border` | Mixin applied to the border element on the left and right hand side of the input | ``
 * `--paper-input-container-border-focused` | Mixin applied to the border element on the left and right hand side of the input | ``
 * `--paper-input-container-border-color` | Color of the right and left border of the input | `--anypoint-color-aluminum4`
 * `--paper-input-container-border-focused-color` | Color of the right and left border of the input when the input is focused | `--anypoint-color-steel2`
 * `--paper-input-container-invalid-color,` | Error color | `--anypoint-color-danger`
 * `--paper-input-container-label-color` | Color of the label | `--anypoint-color-aluminum5`
 * `--paper-input-container-label` | Mixin applied to the label | `{}`
 * `--paper-input-container-label-focus` | Mixin applied to the label when focused | `{}`
 * `--paper-input-container-focus-color` | Color applied to the label and input when focused | `--anypoint-color-aluminum5`
 * `--paper-input-field-prefix` | Mixin applied to any prefix element added to the container | `{}`
 * `--paper-input-field-suffix` | Mixin applied to any suffix element added to the container | `{}`
 * `--paper-input-container-input` | Mixin applied to the input control | ``
 * `--paper-input-container-input-color` | Color of the input control | `--anypoint-color-steel5`
 * `--paper-input-container-input-focus-color` | Color of the input control when focused | `--anypoint-color-steel5`
 * `--paper-input-container-input-background-colol` | Background color of the input element | `#fff`
 * `--paper-input-container-input-focus-background-color` | Background color of the input element when focused | `#fff`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * memberof AnypointElements
 */
export class PaperInputContainer extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      padding: 2px 0;
      @apply --paper-input-container;
    }

    :host([inline]) {
      display: inline-block;
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: 0.33;
      @apply --paper-input-container-disabled;
    }

    :host([hidden]) {
      display: none !important;
    }

    .input-wrapper {
      @apply --layout-horizontal;
      @apply --layout-center;
      position: relative;
      border-left: 2px var(--paper-input-container-border-color, var(--anypoint-color-aluminum4)) solid;
      border-right: 2px var(--paper-input-container-border-color, var(--anypoint-color-aluminum4)) solid;
      height: inherit;
      background-color: var(--anypoint-color-aluminum2);
      -webkit-transition: background-color .2s ease-out;
      transition: background-color .2s ease-out;
    }

    .input-content {
      @apply --layout-flex-auto;
      @apply --layout-relative;
      max-width: 100%;
      height: inherit;
    }

    :host(:hover) .input-wrapper {
      background-color: var(--anypoint-color-aluminum1);
      border-color: var(--paper-input-container-hovered-border-color, var(--anypoint-color-aluminum5));
    }

    :host([invalid]) .input-wrapper {
      border-color: var(--paper-input-container-invalid-color, var(--anypoint-color-danger)) !important;
    }

    :host([disabled]) .input-wrapper {
      background-color: var(--anypoint-color-aluminum2);
    }

    :host ::slotted(label),
    :host ::slotted(.paper-input-label) {
      font: inherit;
      color: var(--paper-input-container-label-color, var(--anypoint-color-steel2));
      @apply --anypoint-font-common-nowrap;
      @apply --anypoint-font-body;
      @apply --paper-input-container-label;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      z-index: 1;
      margin-bottom: 10px;
      margin-top: 5px;
      display: block;
    }

    .input-content ::slotted(input),
    .input-content ::slotted(iron-input),
    .input-content ::slotted(textarea),
    .input-content ::slotted(.paper-input-input) {
      @apply --paper-input-container-shared-input-style;
      color: var(--paper-input-container-input-color, var(--anypoint-color-steel5));
      @apply --paper-input-container-input;
    }

    :host([focuesed]) .input-content ::slotted(input),
    :host([focuesed]) .input-content ::slotted(iron-input),
    :host([focuesed]) .input-content ::slotted(textarea),
    :host([focuesed]) .input-content ::slotted(iron-autogrow-textarea),
    :host([focuesed]) .input-content ::slotted(.paper-input-input) {
      color: var(--paper-input-container-input-focus-color, var(--anypoint-color-steel5));
      background-color: var(--paper-input-container-input-focus-background-color, transparent);
    }

    :host([invalid]) .input-content ::slotted(input),
    :host([invalid]) .input-content ::slotted(iron-input),
    :host([invalid]) .input-content ::slotted(textarea),
    :host([invalid]) .input-content ::slotted(iron-autogrow-textarea),
    :host([invalid]) .input-content ::slotted(.paper-input-input) {
      @apply --paper-input-container-input-invalid;
    }

    .input-content ::slotted(input::-webkit-outer-spin-button),
    .input-content ::slotted(input::-webkit-inner-spin-button) {
      @apply --paper-input-container-input-webkit-spinner;
    }

    :host([focuesed]) ::slotted(label),
    :host([focuesed]) ::slotted(.paper-input-label) {
      color: var(--paper-input-container-focus-color, var(--anypoint-color-aluminum5));
      @apply --paper-input-container-label-focus;
    }

    :host([invalid]) ::slotted(label),
    :host([invalid]) ::slotted(.paper-input-label) {
      color: var(--paper-input-container-invalid-color, var(--anypoint-color-danger));
    }

    .prefix ::slotted(*) {
      display: inline-block;
      @apply --paper-input-prefix;
      @apply --layout-flex-none;
    }

    .prefix ::slotted(:first-child) {
      margin-left: 5px;
    }

    .suffix ::slotted(*) {
      display: inline-block;
      @apply --paper-input-suffix;
      @apply --layout-flex-none;
    }

    .suffix ::slotted(:last-child) {
      margin-right: 5px;
    }

    /* Firefox sets a min-width on the input, which can cause layout issues */
    .input-content ::slotted(input),
    .input-content ::slotted(iron-input) {
      min-width: 0;
    }

    .input-content ::slotted(textarea) {
      resize: none;
    }

    .add-on-content {
      position: relative;
    }

    :host([invalid]) .add-on-content ::slotted(*) {
      color: var(--paper-input-container-invalid-color, var(--anypoint-color-danger));
    }

    :host([focused]) .add-on-content ::slotted(*) {
      color: var(--paper-input-container-focus-color, var(--anypoint-color-aluminum5));
    }
    </style>
    <slot name="label"></slot>
    <div class="input-wrapper">
      <span class="prefix"><slot name="prefix"></slot></span>
      <div class="input-content" id="labelAndInputContainer">
        <slot name="input"></slot>
      </div>

      <span class="suffix"><slot name="suffix"></slot></span>
    </div>

    <div class="add-on-content">
      <slot name="add-on"></slot>
    </div>
`;
  }

  static get is() {
    return 'paper-input-container';
  }
  static get properties() {
    return {
      /**
       * The attribute to listen for value changes on.
       */
      attrForValue: {
        type: String,
        value: 'bind-value'
      },
      /**
       * Set to true to auto-validate the input value when it changes.
       */
      autoValidate: {
        type: Boolean,
        value: false
      },
      /**
       * True if the input is invalid. This property is set automatically when the input value
       * changes if auto-validating, or when the `iron-input-validate` event is heard from a
       * child.
       */
      invalid: {
        observer: '_invalidChanged',
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      /**
       * True if the input has focus.
       */
      focused: {
        readOnly: true,
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      },

      _addons: {
        type: Array
        // do not set a default value here intentionally - it will be initialized lazily when a
        // distributed child is attached, which may occur before configuration for this element
        // in polyfill.
      },
      /**
       * A placeholder string in addition to the label. If this is set, the label will always float.
       */
      placeholder: {
        type: String
      }
    };
  }

  get _valueChangedEvent() {
    return this.attrForValue + '-changed';
  }

  get _propertyForValue() {
    return dashToCamelCase(this.attrForValue);
  }

  get _inputElement() {
    const nodes = this.shadowRoot.querySelector('slot[name="input"]').assignedNodes();
    for (let i = 0, len = nodes.length; i < len; i++) {
      if (nodes[i].nodeType === Node.ELEMENT_NODE) {
        return nodes[i];
      }
    }
  }

  get _inputElementValue() {
    const input = this._inputElement;
    if (!input) {
      return;
    }
    return input[this._propertyForValue] || input.value;
  }

  constructor() {
    super();
    this._onValueChanged = this._onValueChanged.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onAddonAttached = this._onAddonAttached.bind(this);
    this._onIronInputValidate = this._onIronInputValidate.bind(this);
    this._typesThatHaveText = ['date', 'datetime', 'datetime-local', 'month',
        'time', 'week', 'file'];
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('addon-attached', this._onAddonAttached);
    this.addEventListener('iron-input-validate', this._onIronInputValidate);
    this.addEventListener('focus', this._onFocus);
    this.addEventListener('blur', this._onBlur);

    afterNextRender(this, () => {
      const input = this._inputElement;
      if (this.attrForValue) {
        input.addEventListener(this._valueChangedEvent, this._onValueChanged);
      } else {
        this.addEventListener('input', this._onInput);
      }
      // Only validate when attached if the input already has a value.
      if (this._inputElementValue !== '') {
        this._handleValueAndAutoValidate(input);
      } else {
        this._handleValue(this._inputElement);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('addon-attached', this._onAddonAttached);
    this.removeEventListener('iron-input-validate', this._onIronInputValidate);
    this.removeEventListener('focus', this._onFocus);
    this.removeEventListener('blur', this._onBlur);
  }

  ready() {
    super.ready();
    if (!this._addons) {
      this._addons = [];
    }
  }

  _onAddonAttached(event) {
    if (!this._addons) {
      this._addons = [];
    }
    const target = event.target;
    if (this._addons.indexOf(target) === -1) {
      this._addons.push(target);
      if (this.isAttached) {
        this._handleValue(this._inputElement);
      }
    }
  }

  _onFocus() {
    this._setFocused(true);
  }

  _onBlur() {
    this._setFocused(false);
    this._handleValueAndAutoValidate(this._inputElement);
  }

  _onInput(event) {
    this._handleValueAndAutoValidate(event.target);
  }

  _onValueChanged(event) {
    this._handleValueAndAutoValidate(event.target);
  }

  _handleValue(inputElement) {
    const value = this._inputElementValue;
    this.updateAddons({
      inputElement: inputElement,
      value: value,
      invalid: this.invalid
    });
  }

  _handleValueAndAutoValidate(inputElement) {
    if (this.autoValidate) {
      let valid;
      if (inputElement.validate) {
        valid = inputElement.validate(this._inputElementValue);
      } else {
        valid = inputElement.checkValidity();
      }
      this.invalid = !valid;
    }
    // Call this last to notify the add-ons.
    this._handleValue(inputElement);
  }

  _onIronInputValidate() {
    this.invalid = this._inputElement.invalid;
  }

  _invalidChanged() {
    if (this._addons) {
      this.updateAddons({
        invalid: this.invalid
      });
    }
  }

  /**
   * Call this to update the state of add-ons.
   * @param {Object} state Add-on state.
   */
  updateAddons(state) {
    let addon;
    for (let index = 0, len = this._addons.length; index < len; index++) {
      addon = this._addons[index];
      addon.update(state);
    }
  }
}
window.customElements.define(PaperInputContainer.is, PaperInputContainer);
