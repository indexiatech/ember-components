define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;
    var ArrayProxy = __dependency1__.ArrayProxy;

    var Toolbar, WithConfigMixin;

    WithConfigMixin = Em.Eu.WithConfigMixin;


    /**
     * Toolbar component
     *
     * @class Toolbar
     */

    Toolbar = Component.extend(WithConfigMixin, {
      classNameBindings: ['styleClasses'],
      styleClasses: (function() {
        var _ref;
        return (_ref = this.get('config.wysiwyg.toolbarClasses')) != null ? _ref.join(" ") : void 0;
      }).property(),
      groups: void 0,
      initGroups: (function() {
        return this.set('groups', ArrayProxy.create({
          content: []
        }));
      }).on('init'),
      wysiwyg: computed.alias('parentView'),
      register: (function() {
        return this.get('wysiwyg').addToolbar(this);
      }).on('didInsertElement'),
      unregister: (function() {
        return this.get('wysiwyg').removeToolbar(this);
      }).on('willDestroyElement'),
      addGroup: function(g) {
        return this.get('groups').addObject(g);
      },
      removeGroup: function(g) {
        return this.get('groups').removeObject(g);
      }
    });

    __exports__["default"] = Toolbar;;
  });