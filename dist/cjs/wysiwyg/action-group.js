"use strict";
var Component = require("ember").Component;
var computed = require("ember").computed;
var Handlebars = require("ember").Handlebars;

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

exports["default"] = ActionGroup;;