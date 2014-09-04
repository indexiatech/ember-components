define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var run = __dependency1__.run;

    var ModalComponent, StyleBindingsMixin, WithConfigMixin;

    WithConfigMixin = Em.Eu.WithConfigMixin;

    StyleBindingsMixin = Em.Eu.StyleBindingsMixin;


    /**
     * `{{em-modal}}` component.
     *
     * Define a modal component that can be opened and closed, the modal visibility is controlled by the 
     * {{#crossLink "ModalToggler"}}ModalToggler{{/crossLink}} component.
     *
     * ```handlebars
     * {{#em-modal id="modal1"}}
     *   {{#em-modal-title}}
     *     {{#em-modal-toggler}}<span>&times;</span>{{/em-modal-toggler}}
     *        <h4 class="modal-title">I'm a modal title</h4>
     *    {{/em-modal-title}}
     *    {{#em-modal-body}}
     *        One fine body…
     *    {{/em-modal-body}}
     *    {{#em-modal-footer}}
     *    {{#em-modal-toggler}}Close{{/em-modal-toggler}}
     *    {{/em-modal-footer}}
     * {{/em-modal}}
     * {{#em-modal-toggler modal-id="modal1"}}Click me!{{/em-modal-toggler}}
     * ```
     *
     * @class Modal
     * @event will-open
     * @event did-open
     * @event will-close
     * @public
     */

    ModalComponent = Component.extend(WithConfigMixin, StyleBindingsMixin, {
      layoutName: 'em-modal',

      /**
       * Properties bound as attributes the DOM element.
       * see documentation per property.
       * @property panels
       * @private
       * @type Array
       */
      attributeBindings: ['is-open', 'did-open', 'tabindex'],
      classNameBindings: ['styleClasses', 'styleOpenningClasses'],
      styleBindings: ['display'],

      /**
       * Define the tabindex DOM property.
       * Required otherwise no keyDown events
       * @property tabindex
       */
      tabindex: 0,

      /**
       * The CSS classes that will be attached to the DOM element of the modal
       * Classes should be configured externally by using the `config` object.
       * @property styleClasses
       * @private
       * @type String
       */
      styleClasses: (function() {
        var _ref;
        return (_ref = this.get('config.modal.classes')) != null ? _ref.join(" ") : void 0;
      }).property('config.modal.classes'),

      /**
       * The class name that will be set when the modal gets opened
       * @property styleOpenningClasses
       * @public
       */
      styleOpenningClasses: (function() {
        if (this.get('did-open')) {
          return "in";
        } else {
          return "";
        }
      }).property('did-open'),

      /*
       * The CSS `display` property state.
       * @property display
       * @public
       */
      display: (function() {
        if (this.get('did-open')) {
          return 'block';
        } else {
          return 'none';
        }
      }).property('did-open'),

      /**
       * `show` property is bound to the DOM element as an attribute.
       * This property is set to true immediately when the `toggleVisibility` method is invoked.
       *
       * This property can be used to start a transitioning effect, for example:
       * ```css
       *   em-modal[show] {
       *     opacity: 0;
       *     transition: opacity 100ms ease;
       *   }
       * ```
       * 
       * The transition effect should be ended when the modal is gets visible, see the property `shown` for more info.
       * @property opened
       * @see 'did-open'
       * @private
       */
      'is-open': false,

      /**
       * A property bound to the DOM element that indicates that the modal has been made visible to the user. 
       * (after the DOM element was set with `display: block;`)
       *
       * This proeprty can be used by CSS to end a transitioning effect by setting the CSS `opacity` to a higher number, for example:
       *
       * ```css
       *   em-modal[shown] {
       *     opacity: 1;
       *   }
      }
       * ```
       * @property did-open
       * @private
       */
      'did-open': false,

      /**
       * Open modal and make it visible.
       * @method open
       * @public
       */
      open: function() {
        this.sendAction('show', this);
        this.set('is-open', 'true');
        return run.schedule('afterRender', this, function() {
          this.set('did-open', 'true');
          return this.trigger('shown');
        });
      },

      /**
       * Close the modal by making it invisible.
       * @method close
       * @public
       */
      close: function() {
        this.sendAction('hide', this);
        this.set('is-open', void 0);
        return this.set('did-open', void 0);
      },

      /**
       * Toggle the visibility of the modal based on its current state.
       * @method toggleVisibility
       * @public
       */
      toggleVisibility: function() {
        if (this.get('is-open')) {
          return this.close();
        } else {
          return this.open();
        }
      },

      /**
       * Set the title of the modal.
       * @method setTitle
       * @private
       * @type ModalTitle
       */
      setTitle: function(title) {
        return this.set('title', title);
      },

      /**
       * Set the toggler of the modal
       * @method setToggler
       * @private
       * @type ModalToggler
       */
      setToggler: function(toggler) {
        return this.set('toggler', toggler);
      },

      /**
       * Close the modal if the user clicks outside of the modal space.
       * @method closeIfClickedOutside
       * @private
       */
      closeIfClickedOutside: (function(e) {
        if (e.target !== this.get('element')) {
          return;
        }
        return this.close();
      }).on('click'),

      /**
       * Handle keyboard events
       * @method handleKeyboard
       * @private
       */
      handleKeyboard: (function(e) {
        switch (e.keyCode) {
          case 27:
            return this.close();
        }
      }).on('keyDown'),

      /**
       * Consumer can bind this property for a more fine grained control over when the modal is opened,
       * This is good for situations where openning the modal via the `toggler` is not enough.
       *
       * @property open-if
       * @public
       */
      'open-if': false,

      /**
       * observers the `open-if` property, if set to true, then open the modal.
       * @method openIf
       * @private
       */
      openIf: (function() {
        if (!this.get('open-if')) {
          return;
        }
        this.open();
        return this.set('open-if', false);
      }).observes('open-if'),

      /**
       * Consumer can bind this property for a more fine grained control over when the modal is closed,
       * This is good for situations where closing the modal via the `toggler` is not enough.
       *
       * @property close-if
       * @public
       */
      'close-if': false,

      /**
       * observers the `close-if` property, if set to true, then close the modal.
       * @method closeIf
       * @private
       */
      closeIf: (function() {
        if (!this.get('close-if')) {
          return;
        }
        this.close();
        return this.set('close-if', false);
      }).observes('close-if')
    });

    __exports__["default"] = ModalComponent;
  });