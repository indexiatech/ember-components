"use strict";
var Component = require("ember").Component;
var ArrayProxy = require("ember").ArrayProxy;

var Accordion, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * Accordion component
 *
 * @class Accordion
 */

Accordion = Component.extend(WithConfigMixin, {
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.accordion.classes')) != null ? _ref.join(" ") : void 0;
  }).property(),
  'selected-idx': 0,

  /**
   * A list of {{#crossLink "AccordionItem"}}accordion-item{{/crossLink}} instances.
   */
  items: void 0,
  selected: void 0,
  initItems: (function() {
    return this.set('items', ArrayProxy.create({
      content: []
    }));
  }).on('init'),

  /**
   * Add the given `AccordionItem` instance.
   */
  addItem: function(item) {
    return this.get('items').addObject(item);
  },

  /**
   * Remove the given `AccordionItem` instance.
   */
  removeItem: function(item) {
    return this.get('items').removeObject(item);
  },

  /**
   * Select the given item.
   *
   * @method select
   * @param {Object} an item instance to select.
   */
  select: function(item) {
    if (!item) {
      return;
    }
    Em.debug("Selecting item: " + (item.get('index')));
    this.set('selected', item);
    return this.set('selected-idx', item.get('index'));
  }
});

exports["default"] = Accordion;;