define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var run = __dependency1__.run;

    var ModalTitle, StyleBindingsMixin, WithConfigMixin;

    WithConfigMixin = Em.Eu.WithConfigMixin;

    StyleBindingsMixin = Em.Eu.StyleBindingsMixin;


    /**
     * `{{em-modal-title}}` component.
     *
     * The title of the modal
     *
     * @class ModalTitle
     * @public
     */

    ModalTitle = Component.extend(WithConfigMixin, StyleBindingsMixin, {
      classNameBindings: ['styleClasses'],

      /**
       * The CSS classes that will be attached to the DOM element of the modal
       * Classes should be configured externally by using the `config` object.
       *
       * @property styleClasses
       * @private
       * @type String
       */
      styleClasses: (function() {
        var _ref;
        return (_ref = this.get('config.modal.titleClasses')) != null ? _ref.join(" ") : void 0;
      }).property(),

      /**
       * Register the title within the modal
       * Note: Expects this title to be the direct descendant of the modal component
       *
       * @method registerInModal
       * @private
       */
      registerInModal: function() {
        return (this.get('parentView').setTitle(this)).on('init');
      }
    });

    __exports__["default"] = ModalTitle;
  });