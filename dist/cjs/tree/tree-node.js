"use strict";
var Component = require("ember").Component;
var ArrayProxy = require("ember").ArrayProxy;
var computed = require("ember").computed;

var TreeNode, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * A node of a tree.
 *
 * @class TreeNode
 */

TreeNode = Component.extend(WithConfigMixin, {

  /**
   * The node model the tree node view is bound to
   */
  node: void 0,

  /**
   * true if the node of this view is a root node
   */
  isRootNode: computed.not('node.hasParent'),

  /**
   * The root node model
   */
  root: computed.alias('node.root'),

  /**
   * True if the node is currently expanded, meaning its children are visible.
   */
  expanded: false,

  /**
   * True if this node is currently checked
   * This is only relevant if the tree configured to support selection
   */
  checked: false,

  /**
   * True if should render an icon tag for this node
   */
  hasIcon: true,

  /**
   * True if nodes can be selected
   */
  selectable: true,

  /**
   * True if this node is currently selected
   */
  isSelected: (function() {
    return this.get('rootBranchView.selected') === this.get('node');
  }).property('rootBranchView.selected'),

  /**
   * True if this node is currently loading,
   * Usually that means the node is defined asynchronously and its children are currently being loaded
   */
  loading: false,
  branch: computed.alias('parentView'),

  /**
   * true if the loading mode of the node's children should be async
   */
  async: computed.alias('parentView.async'),

  /**
   * Get the view of the root node
   */
  rootNodeView: (function() {
    var view;
    if (this.get('isRootNode')) {
      return this;
    }
    view = this.get('parentView');
    while (view) {
      if (view.get('isRootNode')) {
        return view;
      }
      view = view.get('parentView');
    }
  }).property('node'),

  /**
   * The root branch view
   */
  rootBranchView: (function() {
    return this.get('rootNodeView.parentView');
  }).property('rootNodeView'),
  leaf: (function() {
    return this.get('node.children.length') === 0;
  }).property('node.children.length'),
  tagName: 'li',
  layoutName: 'em-tree-node',
  classNameBindings: ['styleClasses', 'expandedClasses', 'leafClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.tree.nodeClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  expandedClasses: (function() {
    var _ref, _ref1;
    if (this.get('expanded')) {
      return (_ref = this.get('config.tree.nodeOpenClasses')) != null ? _ref.join(" ") : void 0;
    } else {
      return (_ref1 = this.get('config.tree.nodeCloseClasses')) != null ? _ref1.join(" ") : void 0;
    }
  }).property('expanded', 'leaf', 'loading'),
  nodeSelectedClasses: (function() {
    var _ref;
    if (this.get('isSelected')) {
      return (_ref = this.get('config.tree.nodeSelectedClasses')) != null ? _ref.join(" ") : void 0;
    } else {
      return null;
    }
  }).property('isSelected'),
  iconClass: (function() {
    var icons;
    icons = [];
    if (this.get('async')) {
      if (this.get('loading')) {
        icons = icons.concat(this.get('config.tree.nodeLoadingIconClasses'));
      } else if (!this.get('node.children')) {
        icons = icons.concat(this.get('config.tree.nodeCloseIconClasses'));
      } else {
        if (this.get('node.children.length') === 0) {
          icons = icons.concat(this.get('config.tree.nodeLeafIconClasses'));
        } else {
          icons = this.get('expanded') ? icons.concat(this.get('config.tree.nodeOpenIconClasses')) : icons.concat(this.get('config.tree.nodeCloseIconClasses'));
        }
      }
    } else {
      if (this.get('leaf')) {
        icons = icons.concat(this.get('config.tree.nodeLeafIconClasses'));
      } else {
        icons = this.get('expanded') ? icons.concat(this.get('config.tree.nodeOpenIconClasses')) : icons.concat(this.get('config.tree.nodeCloseIconClasses'));
      }
    }
    return icons.join(" ");
  }).property('expanded', 'leaf', 'loading'),
  leafClasses: (function() {
    var _ref;
    if (this.get('leaf')) {
      return (_ref = this.get('config.tree.nodeLeafClasses')) != null ? _ref.join(" ") : void 0;
    }
  }).property('leaf'),
  actions: {
    toggle: function() {
      if (this.get('async') && !this.get('expanded') && !this.get('node.children')) {
        this.set('loading', true);
        return this.sendAction('children', this.get('node'), this);
      } else {
        return this.toggleProperty('expanded');
      }
    },
    select: function() {
      if (!this.get('selectable')) {
        return;
      }
      return this.set('rootBranchView.selected', this.get('node'));
    }
  },
  children: 'getChildren',
  loadingHasChanged: (function() {
    if (!this.get('loading')) {
      return this.toggleProperty('expanded');
    }
  }).observes('loading')
});

exports["default"] = TreeNode;;