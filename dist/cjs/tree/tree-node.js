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
  attributeBindings: ['multi-selected'],

  /**
   * The model the tree node view is bound to
   */
  model: void 0,

  /**
   * A reference to the tree view, this property is auto set during component instantiation
   */
  tree: void 0,

  /**
   * A reference to the root model
   */
  rootModel: computed.alias('tree.model'),

  /**
   * True if the node is currently expanded, meaning its children are visible.
   */
  expanded: computed.alias('model.expanded'),

  /**
   * True if this node view is currently checked
   * This is only relevant if the tree configured to support multi selection
   */
  'multi-selected': computed.alias('model.selected'),

  /**
   * True if should render an icon tag for this node view
   */
  hasIcon: true,

  /**
   * True if this node can be single selected
   */
  selectable: true,

  /**
   * True if this node is currently single selected
   */
  isSelected: (function() {
    return this.get('tree.selected') === this.get('model');
  }).property('tree.selected'),

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
   * true if this is a leaf node, meaning it has no children
   */
  leaf: (function() {
    return !this.get('model.children') || this.get('model.children.length') === 0;
  }).property('model.children.length'),
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
  addMultiSelectionToTreeSelection: (function() {
    if (this.get('multi-selected')) {
      return this.get('tree.multi-selection').pushObject(this.get('model'));
    } else {
      return this.get('tree.multi-selection').removeObject(this.get('model'));
    }
  }).observes('multi-selected').on('init'),
  iconClass: (function() {
    var icons;
    icons = [];
    if (this.get('async')) {
      if (this.get('loading')) {
        icons = icons.concat(this.get('config.tree.nodeLoadingIconClasses'));
      } else if (!this.get('model.children')) {
        icons = icons.concat(this.get('config.tree.nodeCloseIconClasses'));
      } else {
        if (this.get('model.children.length') === 0) {
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
      if (this.get('async') && !this.get('expanded') && !this.get('model.children')) {
        this.set('loading', true);
        return this.sendAction('children', this.get('model'), this);
      } else {
        return this.toggleProperty('expanded');
      }
    },
    select: function() {
      if (!this.get('selectable')) {
        return;
      }
      return this.set('tree.selected', this.get('model'));
    },
    toggleSelection: function() {
      if (this.get('multi-selected')) {
        return this.set('multi-selected', '');
      } else {
        return this.set('multi-selected', 'true');
      }
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