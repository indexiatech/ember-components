define(
  ["ember","./as-item","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;
    var Handlebars = __dependency1__.Handlebars;

    var AsListMixin = __dependency2__["default"] || __dependency2__;
    var ListItem, WithConfigMixin;

    WithConfigMixin = Em.Eu.WithConfigMixin;


    /**
     * `{{em-list-item}}` component
     * Add a new item to a list
     *
     * @class ListItem
     */

    ListItem = Component.extend(WithConfigMixin, AsListMixin, {
      tagName: 'li',

      /**
       * Bind the specified attributes to the DOM element
       *
       * @property attributeBindings
       * @type Array
       */
      attributeBindings: ['css'],
      classNameBindings: ['styleClasses'],
      styleClasses: (function() {
        var _ref;
        return (_ref = this.get('config.list.itemClasses')) != null ? _ref.join(" ") : void 0;
      }).property()
    });

    __exports__["default"] = ListItem;;
  });