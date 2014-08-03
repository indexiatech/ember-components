"use strict";
var Component = require("ember").Component;
var ArrayProxy = require("ember").ArrayProxy;
var computed = require("ember").computed;
var run = require("ember").run;

var List, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * `{{em-list}}` component.
 *
 * Holds a list of `{{em-list-item}}` components.
 *
 * @class List
 */

List = Component.extend(WithConfigMixin, {
  tagName: 'ul',
  attributeBindings: ['style'],
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.list.listClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),

  /**
   * The current selected item
   *
   * @property selected
   * @type Item
   */
  selected: void 0,

  /**
   * True if this list supports selection
   */
  selection: true,

  /**
   * List can be bound to models, models can be a property or an object that the list is bound to.
   * When model changes, the list will give an opportunity to every item within the list to react upon the model change,
   * Items then can change their state according to the change.
   */
  models: void 0,

  /**
   * The selected item index
   *
   * @property selectedIdx
   * @type Number
   */
  selectedIdx: (function() {
    return this.get('items').indexOf(this.get('selected'));
  }).property('selected'),

  /**
   * Initialize an empty items array
   *
   * @method initItems
   * @private
   */
  initItems: (function() {
    return this.set('items', ArrayProxy.create({
      content: []
    }));
  }).on('init'),

  /**
   * Add an item to the item list
   *
   * @method addItem
   * @param item {Item} the item to add.
   * @private
   */
  addItem: function(item) {
    return this.get('items').addObject(item);
  },

  /**
   * Remove an item from the item list
   *
   * @method removeItem
   * @param item {Item} the item to remove.
   * @private
   */
  removeItem: function(item) {
    return this.get('items').removeObject(item);
  },

  /**
   * Select the given item.
   *
   * @method select
   * @param {Object} an item instance to select.
   * @see selected
   * @see selected-idx
   */
  select: function(item) {
    var _ref;
    if (!this.get('selection')) {
      return item.sendAction('on-click', item);
    } else {
      if (!item || this.get('selected') === item) {
        return;
      }
      Em.debug("Selecting tab: " + (item.get('index')));
      if ((_ref = this.get('selected')) != null ? _ref.sendAction : void 0) {
        this.get('selected').sendAction('on-deselect', this.get('selected'));
      }
      this.set('selected', item);
      this.get('selected').sendAction('on-select', this.get('selected'));
      this.set('selected-idx', item.get('index'));
      return this.get('items').forEach((function(_this) {
        return function(i) {
          if (_this.get('selected') === i) {
            return;
          }
          return i.sendAction('on-selection-change', i, _this.get('selected'));
        };
      })(this));
    }
  },
  notifyModelsChange: (function() {
    return run.next(this, function() {
      return this.modelsDidChange();
    });
  }).on('didInsertElement'),

  /**
   * Listen to models changes, if model has change notify all children that the model has changed
   */
  modelsDidChange: (function() {
    return this.get('items').forEach((function(_this) {
      return function(i) {
        return i.sendAction('on-model-change', i, _this.get('models'));
      };
    })(this));
  }).observes('models', 'models.@each')
});

exports["default"] = List;