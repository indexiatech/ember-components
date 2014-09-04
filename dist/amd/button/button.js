define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var computed = __dependency1__.computed;

    var Button, WithConfigMixin;

    WithConfigMixin = Em.Eu.WithConfigMixin;


    /**
     * Button component
     * 
     * Styled button with async support.
     *
     * @class Button
     */

    Button = Component.extend(WithConfigMixin, {

      /**
       * The tag name the component is rendered as.
       * This theoretically can be a div or anything else.
       * @property tagName
       * @private
       */
      tagName: 'button',

      /**
       * The template of the component
       * @property layoutName
       * @private
       */
      layoutName: 'em-button',

      /**
       * Bind the specified properties as DOM attributes.
       * @property attributeBindings
       * @private
       */
      attributeBindings: ['disabled', 'state'],

      /**
       * Bind the specified properties as the classes of the DOM element.
       */
      classNameBindings: ['class'],

      /**
       * True if the button is disabled and cannot be clicked.
       * @property disabled
       * @public
       */
      disabled: computed.equal('state', 'executing'),

      /**
       * The state of the button, can be one of the following:
       * default - The button is enabled and ready to be clicked.
       * executing - The promise bound to the button was sent and the promise is still executing
       * resolved - The promise was resolved properly.
       * rejected - The promise bound to the button was finished as rejected.
       *
       * The state is also bound to the DOM as `state` property, this allows to easily change styles for every
       * state by using `.em-button[state=resolved]` syntax.
       *
       * The label of the button will change to the value of the component properties that correspond to the 
       * states mentioned above.
       *
       * @property state
       * @private
       */
      state: 'default',

      /**
       * The action name to invoke on the controller when the button is clicked.
       * @property on-click
       * @public
       */
      'on-click': void 0,

      /**
       * If set, an icon tag will be added as apart of the button and the given value here will be set
       * as the icon's `class` attribute.
       * @property icon-classes
       * @public
       */
      'icon-classes': (function() {
        var propName;
        propName = "icon-" + this.state;
        return this.getWithDefault(propName, this.get('icon-default'));
      }).property('state', 'icon-default', 'icon-executing', 'icon-resolved', 'icon-rejected'),

      /*
       * The label of the button, calculated according to the state of the button
       * See the `state` property documentation for more info.
       * @property label
       * @private
       */
      label: (function() {
        return this.getWithDefault(this.state, this.get('default'));
      }).property('state', 'default', 'executing', 'resolved', 'rejected'),

      /**
       * Set by the `onClick` callback, if set, the promise will be observed and the button's state will be
       * changed accordingly.
       * @property promise
       * @private
       */
      promise: void 0,

      /**
       * Triggered when the button is clicked
       * Invoke the action name on the controller defined in the `action` property, default is `onClick`.
       * The action on the controller recieves a property that should be set to the promise being invoked (if there is one)
       * If a promise was set, the button will move to 'executing' state until the promise will be resolved
       * @method onClick
       * @private
       */
      onClick: (function() {
        this.sendAction('on-click', (function(_this) {
          return function(promise) {
            _this.set('promise', promise);
            return _this.set('state', 'executing');
          };
        })(this));
        return false;
      }).on('click'),

      /*
       * Observes the promise property 
       * @property changeStateByPromise
       * @private
       */
      changeStateByPromise: (function() {
        return this.get('promise').then((function(_this) {
          return function() {
            return _this.set('state', 'resolved');
          };
        })(this), (function(_this) {
          return function(err) {
            _this.set('state', 'rejected');
            return _this.set('error', err);
          };
        })(this));
      }).observes('promise')
    });

    __exports__["default"] = Button;
  });