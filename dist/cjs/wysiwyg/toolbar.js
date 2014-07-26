"use strict";
var Component = require("ember").Component;
var computed = require("ember").computed;
var ArrayProxy = require("ember").ArrayProxy;

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

exports["default"] = Toolbar;;