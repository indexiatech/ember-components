"use strict";
var Ember = require("ember")["default"] || require("ember");
var Node;

Node = Ember.Object.extend({
  children: void 0,
  parent: void 0,
  addChild: function(node) {
    if (!this.get('children')) {
      this.emptyChildren();
    }
    node.set('parent', this);
    this.children.addObject(node(object));
    return node;
  },
  createChild: function(object) {
    var c, c1;
    if (!this.get('children')) {
      this.emptyChildren();
    }
    c = Node.create(object);
    c.set('parent', this);
    this.get('children').pushObject(c);
    c1 = Node.create();
    return c;
  },
  removeChild: function(node) {
    node.set('parent', void 0);
    children.removeObject(node);
    return node;
  },
  hasChildren: (function() {
    return this.get('children').length > 0;
  }).property('children.length'),
  emptyChildren: (function() {
    return this.set('children', Em.A());
  }),
  hasParent: (function() {
    return this.get('parent.parent') != null;
  }).property('parent'),
  root: (function() {
    var node;
    node = this;
    while (node.get('hasParent')) {
      if (!node.get('hasParent')) {
        return node;
      }
      node = node.get('parent');
    }
    return node;
  }).property('parent'),
  level: (function() {
    var currObj, i;
    i = 0;
    currObj = this;
    while (currObj.get('hasParent')) {
      i++;
      currObj = currObj.get('parent');
    }
    return i;
  }).property('children.length'),
  isLevel1: (function() {
    return this.get('level') === 0;
  }).property('children.length')
});

exports["default"] = Node;