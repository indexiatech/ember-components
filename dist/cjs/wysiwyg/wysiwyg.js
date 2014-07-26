"use strict";
var Component = require("ember").Component;
var ArrayProxy = require("ember").ArrayProxy;

var WithConfigMixin, Wysiwyg;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * WYSIWYG component
 *
 * @class Wysiwyg
 */

Wysiwyg = Component.extend(WithConfigMixin, {
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.wysiwyg.classes')) != null ? _ref.join(" ") : void 0;
  }).property(),

  /**
   * A list of {{#crossLink "Toolbar"}}toolbar{{/crossLink}} instances.
   */
  toolbars: void 0,

  /**
   * The editor view
   */
  editor: void 0,
  initToolbars: (function() {
    return this.set('toolbars', ArrayProxy.create({
      content: []
    }));
  }).on('init'),

  /**
   * Add the given `Toolbar` instance.
   */
  addToolbar: function(toolbar) {
    return this.get('toolbars').addObject(toolbar);
  },

  /**
   * Remove the given `Toolbar` instance.
   */
  removeToolbar: function(toolbar) {
    return this.get('toolbars').removeObject(toolbar);
  },

  /**
   * Set the editor instance
   */
  setEditor: function(editor) {
    return this.set('editor', editor);
  },
  asHtmlUpdater: (function() {
    return this.set('as_html', this.get('editor').$().html().replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, ''));
  }).on('update_actions')
});

exports["default"] = Wysiwyg;;