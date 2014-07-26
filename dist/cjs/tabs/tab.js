"use strict";
var Component = require("ember").Component;
var computed = require("ember").computed;
var Handlebars = require("ember").Handlebars;

var Tab, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * `{{tab}}` component
 * Add a new tab
 *
 * @class Tab
 */

Tab = Component.extend(WithConfigMixin, {
  setTagName: (function() {
    return this.set('tagName', this.get('config.tabs.tabTag') || 'div');
  }).on('init'),

  /**
   * Bind the specified attributes to the DOM element
   *
   * @property attributeBindings
   * @type Array
   */
  attributeBindings: ['active'],
  classNameBindings: ['styleClasses', 'selectedClass'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.tabs.tabClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  selectedClass: (function() {
    var _ref;
    if (this.get('selected')) {
      return (_ref = this.get('config.tabs.tabSelectedClasses')) != null ? _ref.join(" ") : void 0;
    } else {
      return null;
    }
  }).property('selected'),

  /**
   * A reference to the {{#crossLink "Tabs"}}Tabs{{/crossLink}} instance.
   * 
   * @property tabs
   * @type Tabs
   */
  tabs: computed.alias('parentView.parentView'),

  /**
   * A reference to the {{#crossLink "TabList}}TabList{{/crossLink}} instance.
   *
   * @property tabList
   * @type TabList
   */
  tabList: computed.alias('parentView'),

  /**
   * true if this tab is currently selected.
   *
   * @property selected
   * @type Boolean
   */
  selected: (function() {
    return this.get('tabs.selected') === this;
  }).property('tabs.selected'),
  active: (function() {
    if (this.get('selected')) {
      return "true";
    } else {
      return null;
    }
  }).property('selected'),
  index: (function() {
    return this.get('tabList.tab_instances').indexOf(this);
  }).property('tabList.tab_instances.@each'),

  /**
   * Select this tab.
   *
   * Bound to `click` event.
   *
   * @method select
   */
  select: (function() {
    return this.get('tabs').select(this);
  }).on('click'),

  /**
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
  }).observes('tabs.selected-idx').on('didInsertElement'),

  /**
   * Register this tab in the {{#crossLink "TabList"}}{{/crossLink}} component instance.
   *
   * @method register
   * @private
   */
  register: (function() {
    return this.get('tabList').addTab(this);
  }).on('didInsertElement'),

  /**
   * Unregister this tab from the {{#crossLink "TabList"}}{{/crossLink}} component instance.
   *
   * @method unregister
   * @private
   */
  unregister: (function() {
    return this.get('tabList').removeTab(this);
  }).on('willDestroyElement')
});

exports["default"] = Tab;;