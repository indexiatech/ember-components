define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var Node, findChildrenOfNodeBy;

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
      }).property('children.length'),
      findChildBy: function(key, name) {
        return findChildrenOfNodeBy(this, key, name);
      }
    });

    __exports__["default"] = Node;

    findChildrenOfNodeBy = function(currChild, key, value) {
      var c, _i, _len, _ref, _ref1;
      if (currChild.get(key) === value) {
        return currChild;
      } else if (((_ref = currChild.get('children')) != null ? _ref.length : void 0) > 0) {
        _ref1 = currChild.get('children');
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          if (c.get(key) === value) {
            return c;
          } else {
            findChildrenOfNodeBy(c, key, value);
          }
        }
        return null;
      }
      return null;
    };
  });