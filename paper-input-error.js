/**
@license
Copyright 2017 Mulesoft.

All rights reserved.
*/
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';
import '@advanced-rest-client/anypoint-styles/colors.js';
import '@advanced-rest-client/anypoint-styles/typography.js';
/**
 * The `<paper-input-error>` is a container for an error message or list of validation
 * rules if the input element uses `validator`s.
 *
 * ### Styling
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--paper-input-error-container` | Mixin applied to the element | `{}`
 * `--paper-input-error-border-color` | Border color of the popover | `--anypoint-color-aluminum3`
 * `--paper-input-error-left-border` | Color of the right border of the popover | `--anypoint-color-steel4`
 * `--anypoint-text-container-invalid-color` | Color of error messages and borders when corresponding form control is invalid | `--anypoint-color-danger`
 * `--paper-input-error-message-size` | Font size of the validation message. | `12px`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @appliesMixin Polymer.IronOverlayBehavior
 * @memberof AnypointElements
 */
class PaperInputError extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      @apply --paper-input-error;
    }

    .container {
      padding: 5px;
      border-left: 2px var(--paper-input-error-border-color, var(--anypoint-color-aluminum3)) solid;
      border-right: 2px var(--paper-input-error-border-color, var(--anypoint-color-aluminum3)) solid;
      position: relative;
      @apply --paper-input-error-container;
    }

    :host([invalid]) .container {
      border-left-color: var(--anypoint-text-container-invalid-color, var(--anypoint-color-danger));
      border-right-color: var(--anypoint-text-container-invalid-color, var(--anypoint-color-danger));
    }

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }

    li {
      @apply --anypoint-font-body;
      color: var(--anypoint-color-steel3);
      font-size: var(--paper-input-error-message-size, 12px);
    }

    li[validated] {
      color: var(--anypoint-color-aluminum4);
      text-decoration: line-through;
    }
    </style>
    <div class="container">
      <ul>
        <template is="dom-repeat" items="{{_messages}}">
          <li validated\$="[[item.valid]]">[[item.message]]</li>
        </template>
      </ul>
      <slot></slot>
    </div>
`;
  }

  static get is() {
    return 'paper-input-error';
  }
  static get properties() {
    return {
      /**
       * A property bind to `<anypoint-input>`'s `invalid` property.
       */
      invalid: {
        type: Boolean,
        reflectToAttribute: true
      },
      /**
       * A property that should be bind to `<anypoint-input>`'s `validationStates` property.
       * This property is set by the `Anypoint.AnypointValidatableBehavior`.
       */
      validationStates: Array,
      /**
       * A property that should be bind to `<anypoint-input>`'s `focused` property. Should be
       * used when using `validationStates`
       */
      focused: Boolean,
      noCancelOnOutsideClick: {
        type: Boolean,
        value: true
      },
      /**
       * A list of messages to display at a time.
       * @type {Array<String>}
       */
      _messages: Array
    };
  }
  static get observers() {
    return [
      '_renderList(invalid, focused, validationStates.*)'
    ];
  }
  /**
   * Renders the list of validation messages based on the `validationStates` property
   */
  _renderList(invalid, focused, record) {
    if ((!focused && !invalid) || !record || !record.base || !record.base.length) {
      this.opened = false;
      return;
    }
    this._messages = record.base;
    this.opened = true;
  }
}
window.customElements.define(PaperInputError.is, PaperInputError);
