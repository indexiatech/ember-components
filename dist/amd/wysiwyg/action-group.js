define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;
    var Handlebars = __dependency1__.Handlebars;

    var ActionGroup, WithConfigMixin;

    WithConfigMixin = Em.Eu.WithConfigMixin;


    /**
     * ActionGroup component
     *
     * @class ActionGroup
     */

    ActionGroup = Component.extend(WithConfigMixin, {
      classNameBindings: ['styleClasses'],
      styleClasses: (function() {
        var _ref;
        return (_ref = this.get('config.wysiwyg.actionGroupClasses')) != null ? _ref.join(" ") : void 0;
      }).property(),
      toolbar: computed.alias('parentView'),
      wysiwyg: computed.alias('parentView.parentView'),
      register: (function() {
        return this.get('toolbar').addGroup(this);
      }).on('didInsertElement'),
      unregister: (function() {
        return this.get('toolbar').removeGroup(this);
      }).on('willDestroyElement')
    });

    __exports__["default"] = ActionGroup;;
  });