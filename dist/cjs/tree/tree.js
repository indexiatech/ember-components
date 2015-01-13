"use strict";
var Component = require("ember").Component;
var ArrayProxy = require("ember").ArrayProxy;
var computed = require("ember").computed;
var A = require("ember").A;
var Tree, WithConfigMixin, expandTree;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * A tree component
 *
 * @class Tree
 */

Tree = Component.extend(WithConfigMixin, {
  tagName: 'ul',
  layoutName: 'em-tree',
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.tree.classes')) != null ? _ref.join(" ") : void 0;
  }).property(),

  /**
   * The model to render as the root node of the tree
   * this property is expected to be defined by the user
   */
  model: void 0,

  /**
   * True if node's children should be loaded asynchronously
   * This gives the opportunity to the user to invoke an async call to the server to retrieve data for the current
   * branch being opened
   */
  async: false,
  'in-multi-selection': false,
  'multi-selection': A(),
  'selected-icon': 'fa fa-check',
  'unselected-icon': 'fa fa-times',
  'expand-depth': null,
  'auto-expand': false,
  expandByDepth: (function() {
    var depth;
    if (this.get('expand-depth')) {
      depth = parseInt(this.get('expand-depth'));
      if (depth === 0) {
        return;
      }
      return expandTree(this.get('model'), depth);
    }
  }).observes('expand-depth')
});

exports["default"] = Tree;

expandTree = function(node, depth) {
  var c, children, _i, _len, _results;
  if (depth === 0) {
    return;
  }
  node.set('expanded', true);
  children = node.get('children');
  if (children && "function" === typeof children.then) {
    return children.then((function(_this) {
      return function(loadedChildren) {
        return loadedChildren.forEach(function(c) {
          return expandTree(c, depth - 1);
        });
      };
    })(this));
  } else {
    if (children.get('length') === 0 || depth === 0) {
      return;
    }
    _results = [];
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      c = children[_i];
      _results.push(expandTree(c, depth - 1));
    }
    return _results;
  }
};