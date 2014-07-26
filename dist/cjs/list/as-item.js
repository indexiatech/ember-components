"use strict";
var Mixin = require("ember").Mixin;

var computed = require("ember").computed;


/**
 * Indicate that the component is an item with a list.
 */
var AsItem;

AsItem = Mixin.create({
  attributeBindings: ['active', 'disabled'],
  classNameBindings: ['selectedClass'],

  /**
   * A reference to the {{#crossLink "List"}}List{{/crossLink}} instance.
   * 
   * @property list
   * @type List
   */
  list: computed.alias('parentView'),

  /**
   * Get the index of this item within the list
   * 
   * @property index
   * @type int
   */
  index: (function() {
    return this.get('list.items').indexOf(this);
  }).property('list.items.@each'),

  /**
   * Register this item in the {{#crossLink "List"}}List{{/crossLink}} component instance.
   *
   * @method register
   * @private
   */
  register: (function() {
    return this.get('list').addItem(this);
  }).on('didInsertElement'),

  /**
   * Unregister this item from the {{#crossLink "List"}}List{{/crossLink}} component instance.
   *
   * @method unregister
   * @private
   */
  unregister: (function() {
    return this.get('list').removeItem(this);
  }).on('willDestroyElement'),

  /**
   * Select this item.
   *
   * Bound to `click` event.
   *
   * @method select
   */
  select: (function() {
    return this.get('list').select(this);
  }).on('click'),
  selectedClass: (function() {
    var _ref;
    if (this.get('selected')) {
      return ((_ref = this.get('config.list.itemSelectedClasses')) != null ? _ref.join(" ") : void 0) || this.get('list.selectedClass');
    } else {
      return null;
    }
  }).property('selected'),

  /**
   * true if this item is currently selected.
   *
   * @property selected
   * @type Boolean
   */
  selected: (function() {
    return this.get('list.selected') === this;
  }).property('list.selected'),
  active: (function() {
    if (this.get('selected')) {
      return "true";
    } else {
      return null;
    }
  }).property('selected'),

  /**zTODOTODO
   * Select this tab if it matches the {{#crossLink "Tabs/select:method"}}selected-idx{{/crossLink}} property set by the Tabs component.
   *
   * @method selectByTabsParam
   * @private
   */
  selectByTabsParam: (function() {
    var idx;
    if ((this.get('tabs.selected') != null) === this) {
      return;
    }
    idx = parseInt(this.get('tabs.selected-idx', 10));
    if (idx === this.get('index')) {
      return this.select();
    }
  }).observes('tabs.selected-idx').on('didInsertElement')
});

exports["default"] = AsItem;