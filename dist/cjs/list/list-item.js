"use strict";
var Component = require("ember").Component;
var computed = require("ember").computed;
var Handlebars = require("ember").Handlebars;

var AsListMixin = require("./as-item")["default"] || require("./as-item");
var ListItem, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * `{{em-list-item}}` component
 * Add a new item to a list
 *
 * @class ListItem
 */

ListItem = Component.extend(WithConfigMixin, AsListMixin, {
  tagName: 'li',

  /**
   * Bind the specified attributes to the DOM element
   *
   * @property attributeBindings
   * @type Array
   */
  attributeBindings: ['css'],
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.list.itemClasses')) != null ? _ref.join(" ") : void 0;
  }).property()
});

exports["default"] = ListItem;;