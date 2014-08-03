define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var computed = __dependency1__.computed;

    var TreeBranch, WithConfigMixin;

    WithConfigMixin = Em.Eu.WithConfigMixin;


    /**
     * A branch of a tree.
     *
     * @class TreeBranch
     */

    TreeBranch = Component.extend(WithConfigMixin, {

      /**
       * The model to render its children within this branch
       * this property is set during component markup creation
       */
      model: void 0,

      /**
       * A list of {{#crossLink "TreeNode"}}nodes{{/crossLink}} instances.
       */
      children: computed.alias('model.children'),

      /**
       * True if node's children should be loaded asynchronously
       * This gives the opportunity to the user to invoke an async call to the server to retrieve data for the current
       * branch being opened
       */
      async: false,
      tagName: 'ul',
      layoutName: 'em-tree-branch',
      classNameBindings: ['styleClasses'],
      styleClasses: (function() {
        var _ref;
        return (_ref = this.get('config.tree.branchClasses')) != null ? _ref.join(" ") : void 0;
      }).property()
    });

    __exports__["default"] = TreeBranch;;
  });