"use strict";
var Component = require("ember").Component;
var computed = require("ember").computed;
var Handlebars = require("ember").Handlebars;

var Format, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

Format = Component.extend(WithConfigMixin, {
  tagName: 'a',
  layoutName: 'em-wysiwyg-action-format',
  classNameBindings: ['styleClasses', 'activeClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.wysiwyg.actionClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  activeClasses: (function() {
    var _ref;
    if (this.get('active')) {
      return (_ref = this.get('config.wysiwyg.actionActiveClasses')) != null ? _ref.join(" ") : void 0;
    }
  }).property('active'),
  'is-open': false,
  closeDropdown: function() {
    this.set('clickHanlder', !this.get('clickHanlder'));
    if (this.get('clickHanlder')) {
      this.set('is-open', false);
      return this.set('clickHanlder', false);
    }
  },
  click: function() {
    this.set('clickHanlder', true);
    return this.set('is-open', !this.get('is-open'));
  },
  wysiwyg: computed.alias('parentView.wysiwyg'),
  editor: computed.alias('wysiwyg.editor'),
  eventInit: (function() {
    this.set('closeDropdownCallback', (function() {
      return this.closeDropdown();
    }).bind(this));
    return document.addEventListener('click', this.get('closeDropdownCallback'), false);
  }).on('init'),
  eventDestroy: (function() {
    return document.removeEventListener('click', this.get('closeDropdownCallback'), false);
  }).on('willDestroyElement'),
  actions: {
    heading: function(type) {
      this.get('editor').restoreSelection();
      this.get('editor').$().focus();
      document.execCommand('formatBlock', 0, type);
      this.get('editor').saveSelection();
      return this.get('wysiwyg').trigger('update_actions');
    }
  }
});

exports["default"] = Format;;