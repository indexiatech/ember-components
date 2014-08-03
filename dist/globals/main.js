!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.Em||(f.Em={})).EC=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("<!--panel-heading-->\n<!--panel-title-->\n<!--accordion-toggle-->\n\n<!--panel-collapse collapse-->\n<!--panel-body-->\n<div {{bind-attr class=panelHeaderClasses}}>\n    <h4 {{bind-attr class=panelTitleClasses}} style=\"cursor: pointer;\">\n        <a {{bind-attr class=panelTogglerClasses}}>\n            {{view.title}}\n        </a>\n    </h4>\n</div>\n<div {{bind-attr class=panelBodyContainerClasses}}>\n    <div {{bind-attr class=panelBodyClasses}}>{{yield}}</div>\n</div>");
},{}],2:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var computed = window.Ember.computed;
var ArrayProxy = window.Ember.ArrayProxy;

var AccordionItem, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * AccordionItem component
 *
 * @class AccordionItem
 */

AccordionItem = Component.extend(WithConfigMixin, {
  layoutName: 'em-accordion-item-tmpl',
  classNameBindings: ['styleClasses', 'selectedClass'],
  accordion: computed.alias('parentView'),
  content: Ember.computed.alias('accordion.content'),

  /**
   * Bind the specified attributes to the DOM element
   *
   * @property attributeBindings
   * @type Array
   */
  attributeBindings: ['active'],
  selectedClass: (function() {
    var _ref;
    if (this.get('selected')) {
      return (_ref = this.get('config.accordion.itemSelectedClasses')) != null ? _ref.join(" ") : void 0;
    } else {
      return null;
    }
  }).property('selected'),
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.accordion.itemClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  panelHeaderClasses: (function() {
    var _ref;
    return (_ref = this.get('config.accordion.panelHeaderClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  panelTitleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.accordion.panelTitleClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  panelTogglerClasses: (function() {
    var _ref;
    return (_ref = this.get('config.accordion.panelTogglerClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  panelBodyContainerClasses: (function() {
    var _ref;
    return (_ref = this.get('config.accordion.panelBodyContainerClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  panelBodyClasses: (function() {
    var _ref;
    return (_ref = this.get('config.accordion.panelBodyClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  index: (function() {
    return this.get('accordion.items').indexOf(this);
  }).property('accordion.items.@each'),
  register: (function() {
    return this.get('accordion').addItem(this);
  }).on('init'),
  unregister: (function() {
    return this.get('accordion').removeItem(this);
  }).on('willDestroyElement'),

  /**
   * true if this item is currently selected.
   *
   * @property selected
   * @type Boolean
   */
  selected: (function() {
    return this.get('accordion.selected') === this;
  }).property('accordion.selected'),
  active: (function() {
    if (this.get('selected')) {
      return "true";
    } else {
      return null;
    }
  }).property('selected'),

  /**
   * Select this item.
   *
   * Bound to `click` event.
   *
   * @method select
   */
  select: (function() {
    return this.get('accordion').select(this);
  }).on('click'),

  /**
   * Select this item if it matches the {{#crossLink "Accordiong/select:method"}}selected-idx{{/crossLink}} property set by the Accordion component.
   *
   * @method selectByAccordionParam
   * @private
   */
  selectByParam: (function() {
    var idx;
    if ((this.get('accordion.selected') != null) === this) {
      return;
    }
    idx = parseInt(this.get('accordion.selected-idx', 10));
    if (idx === this.get('index')) {
      return this.select();
    }
  }).observes('accordion.selected-idx').on('didInsertElement'),

  /**
   * Listen to `active` property changes and show / hide the item's content according to its state
   *
   * We use observes instead of properties as we need to invoke a method instead of calculating classes only
   * so in the future we can support a transition animation.
   */
  activeDidChange: (function() {
    if (this.get('active')) {
      return this.show();
    } else {
      return this.hide();
    }
  }).observes('active'),
  hide: function() {
    var $accordionBody;
    $accordionBody = this.$('.panel-collapse');
    return $accordionBody.removeClass('in');
  },
  show: function() {
    var $accordionBody;
    $accordionBody = this.$('.panel-collapse');
    return $accordionBody.addClass('in');
  }
});

exports["default"] = AccordionItem;;
},{}],3:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;

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
},{}],4:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("{{#if icon-classes}}\n    <i {{bind-attr class=\'icon-classes\'}}></i>\n{{/if}}\n{{label}}");
},{}],5:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var computed = window.Ember.computed;

var Button, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * Button component
 * 
 * Styled button with async support.
 *
 * @class Button
 */

Button = Component.extend(WithConfigMixin, {

  /**
   * The tag name the component is rendered as.
   * This theoretically can be a div or anything else.
   * @property tagName
   * @private
   */
  tagName: 'button',

  /**
   * The template of the component
   * @property layoutName
   * @private
   */
  layoutName: 'em-button',

  /**
   * Bind the specified properties as DOM attributes.
   * @property attributeBindings
   * @private
   */
  attributeBindings: ['disabled', 'state'],

  /**
   * Bind the specified properties as the classes of the DOM element.
   */
  classNameBindings: ['class'],

  /**
   * True if the button is disabled and cannot be clicked.
   * @property disabled
   * @public
   */
  disabled: computed.equal('state', 'executing'),

  /**
   * The state of the button, can be one of the following:
   * default - The button is enabled and ready to be clicked.
   * executing - The promise bound to the button was sent and the promise is still executing
   * resolved - The promise was resolved properly.
   * rejected - The promise bound to the button was finished as rejected.
   *
   * The state is also bound to the DOM as `state` property, this allows to easily change styles for every
   * state by using `.em-button[state=resolved]` syntax.
   *
   * The label of the button will change to the value of the component properties that correspond to the 
   * states mentioned above.
   *
   * @property state
   * @private
   */
  state: 'default',

  /**
   * The action name to invoke on the controller when the button is clicked.
   * @property on-click
   * @public
   */
  'on-click': void 0,

  /**
   * If set, an icon tag will be added as apart of the button and the given value here will be set
   * as the icon's `class` attribute.
   * @property icon-classes
   * @public
   */
  'icon-classes': (function() {
    var propName;
    propName = "icon-" + this.state;
    return this.getWithDefault(propName, this.get('icon-default'));
  }).property('state', 'icon-default', 'icon-executing', 'icon-resolved', 'icon-rejected'),

  /*
   * The label of the button, calculated according to the state of the button
   * See the `state` property documentation for more info.
   * @property label
   * @private
   */
  label: (function() {
    return this.getWithDefault(this.state, this.get('default'));
  }).property('state', 'default', 'executing', 'resolved', 'rejected'),

  /**
   * Set by the `onClick` callback, if set, the promise will be observed and the button's state will be
   * changed accordingly.
   * @property promise
   * @private
   */
  promise: void 0,

  /**
   * Triggered when the button is clicked
   * Invoke the action name on the controller defined in the `action` property, default is `onClick`.
   * The action on the controller recieves a property that should be set to the promise being invoked (if there is one)
   * If a promise was set, the button will move to 'executing' state until the promise will be resolved
   * @method onClick
   * @private
   */
  onClick: (function() {
    this.sendAction('on-click', (function(_this) {
      return function(promise) {
        _this.set('promise', promise);
        return _this.set('state', 'executing');
      };
    })(this));
    return false;
  }).on('click'),

  /*
   * Observes the promise property 
   * @property changeStateByPromise
   * @private
   */
  changeStateByPromise: (function() {
    return this.get('promise').then((function(_this) {
      return function() {
        return _this.set('state', 'resolved');
      };
    })(this), (function(_this) {
      return function(err) {
        _this.set('state', 'rejected');
        return _this.set('error', err);
      };
    })(this));
  }).observes('promise')
});

exports["default"] = Button;
},{}],6:[function(_dereq_,module,exports){
"use strict";
var Mixin = window.Ember.Mixin;

var computed = window.Ember.computed;


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
},{}],7:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var computed = window.Ember.computed;
var Handlebars = window.Ember.Handlebars;

var AsListMixin = _dereq_("./as-item")["default"] || _dereq_("./as-item");
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
},{"./as-item":6}],8:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var computed = window.Ember.computed;
var run = window.Ember.run;

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
},{}],9:[function(_dereq_,module,exports){
"use strict";
var TabsComponent = _dereq_("./tabs/tabs")["default"] || _dereq_("./tabs/tabs");

var TabsStyle = _dereq_("./tabs/tabs-css")["default"] || _dereq_("./tabs/tabs-css");

var TabListComponent = _dereq_("./tabs/tab-list")["default"] || _dereq_("./tabs/tab-list");

var TabComponent = _dereq_("./tabs/tab")["default"] || _dereq_("./tabs/tab");

var TabPanelComponent = _dereq_("./tabs/tab-panel")["default"] || _dereq_("./tabs/tab-panel");

var WysiwygComponent = _dereq_("./wysiwyg/wysiwyg")["default"] || _dereq_("./wysiwyg/wysiwyg");

var WysiwygToolbarComponent = _dereq_("./wysiwyg/toolbar")["default"] || _dereq_("./wysiwyg/toolbar");

var WysiwygActionGroupComponent = _dereq_("./wysiwyg/action-group")["default"] || _dereq_("./wysiwyg/action-group");

var WysiwygActionComponent = _dereq_("./wysiwyg/action")["default"] || _dereq_("./wysiwyg/action");

var WysiwygActionTmpl = _dereq_("./wysiwyg/actiontmpl")["default"] || _dereq_("./wysiwyg/actiontmpl");

var WysiwygEditorComponent = _dereq_("./wysiwyg/editor")["default"] || _dereq_("./wysiwyg/editor");

var AccordionComponent = _dereq_("./accordion/accordion")["default"] || _dereq_("./accordion/accordion");

var AccordionItemComponent = _dereq_("./accordion/accordion-item")["default"] || _dereq_("./accordion/accordion-item");

var AccordionItemTmpl = _dereq_("./accordion/accordion-item-tmpl")["default"] || _dereq_("./accordion/accordion-item-tmpl");

var TreeComponent = _dereq_("./tree/tree")["default"] || _dereq_("./tree/tree");
var TreeTmpl = _dereq_("./tree/tree-tmpl")["default"] || _dereq_("./tree/tree-tmpl");
var TreeStyle = _dereq_("./tree/tree-css")["default"] || _dereq_("./tree/tree-css");
var TreeNode = _dereq_("./tree/node")["default"] || _dereq_("./tree/node");
var TreeNodeComponent = _dereq_("./tree/tree-node")["default"] || _dereq_("./tree/tree-node");
var TreeNodeTmpl = _dereq_("./tree/tree-node-tmpl")["default"] || _dereq_("./tree/tree-node-tmpl");
var TreeNodeIconAction = _dereq_("./tree/tree-node-icon-action")["default"] || _dereq_("./tree/tree-node-icon-action");
var TreeBranchComponent = _dereq_("./tree/tree-branch")["default"] || _dereq_("./tree/tree-branch");
var TreeBranchTmpl = _dereq_("./tree/tree-branch-tmpl")["default"] || _dereq_("./tree/tree-branch-tmpl");
var ListComponent = _dereq_("./list/list")["default"] || _dereq_("./list/list");
var ListItemComponent = _dereq_("./list/list-item")["default"] || _dereq_("./list/list-item");
var ModalComponent = _dereq_("./modal/modal")["default"] || _dereq_("./modal/modal");
var ModalCss = _dereq_("./modal/modal-css")["default"] || _dereq_("./modal/modal-css");
var ModalFormComponent = _dereq_("./modal/modal-form")["default"] || _dereq_("./modal/modal-form");
var ModalEmFormComponent = _dereq_("./modal/modal-emform")["default"] || _dereq_("./modal/modal-emform");
var ModalTitleComponent = _dereq_("./modal/modal-title")["default"] || _dereq_("./modal/modal-title");
var ModalBodyComponent = _dereq_("./modal/modal-body")["default"] || _dereq_("./modal/modal-body");
var ModalFooterComponent = _dereq_("./modal/modal-footer")["default"] || _dereq_("./modal/modal-footer");
var ModalTogglerComponent = _dereq_("./modal/modal-toggler")["default"] || _dereq_("./modal/modal-toggler");
var ModalTmpl = _dereq_("./modal/modal-tmpl")["default"] || _dereq_("./modal/modal-tmpl");
var ModalConfirmComponent = _dereq_("./modal/modal-confirm")["default"] || _dereq_("./modal/modal-confirm");
var ModalConfirmTmpl = _dereq_("./modal/modal-confirm-tmpl")["default"] || _dereq_("./modal/modal-confirm-tmpl");
var ButtonComponent = _dereq_("./button/button")["default"] || _dereq_("./button/button");
var ButtonTmplComponent = _dereq_("./button/button-tmpl")["default"] || _dereq_("./button/button-tmpl");
var Application = window.Ember.Application;
var Namespace = window.Ember.Namespace;

Application.initializer({
  name: 'em-components',
  initialize: function(c) {
    var Config;
    Em.EmberComponents = Namespace.create({
      VERSION: '0.0.1'
    });
    Em.Config = Config = Em.Eu.Config.create();
    Config.addConfig('default', {
      tabs: {
        tabsTag: ['div'],
        tabTag: ['li'],
        tabListTag: ['ul']
      },
      tree: {
        classes: ['em-tree-branch', 'em-tree', 'fa-ul'],
        branchClasses: ['em-tree-branch', 'fa-ul'],
        nodeClasses: ['em-tree-node'],
        nodeOpenClasses: [],
        nodeCloseClasses: [],
        nodeOpenIconClasses: ['fa-li', 'fa', 'fa-minus-square-o'],
        nodeCloseIconClasses: ['fa-li', 'fa', 'fa-plus-square-o'],
        nodeLeafClasses: ['leaf'],
        nodeLeafIconClasses: ['fa-li', 'fa', 'fa-square-o'],
        nodeLoadingIconClasses: ['fa-li', 'fa', 'fa-spinner', 'fa-spin'],
        nodeSelectedClasses: ['em-tree-node-active']
      }
    });
    Config.addConfig('classic', {
      tabs: {
        tabsClasses: ['em-tabs'],
        tabClasses: ['em-tab'],
        tabListClasses: ['em-tab-list'],
        tabPanelClasses: ['em-tab-panel']
      }
    });
    Config.addConfig('bs', {
      tabs: {
        tabListClasses: ['nav', 'nav-tabs'],
        tabSelectedClasses: ['active']
      },
      wysiwyg: {
        classes: ['well'],
        toolbarClasses: ['btn-toolbar'],
        actionGroupClasses: ['btn-group'],
        actionClasses: ['btn btn-default'],
        actionActiveClasses: ['active']
      },
      accordion: {
        classes: ['panel-group'],
        itemClasses: ['panel', 'panel-default'],
        itemSelectedClasses: ['active'],
        panelHeaderClasses: ['panel-heading'],
        panelTitleClasses: ['panel-title'],
        panelTogglerClasses: ['accordion-toggle'],
        panelBodyContainerClasses: ['panel-collapse', 'collapse'],
        panelBodyClasses: ['panel-body']
      },
      modal: {
        classes: ['em-modal', 'modal', 'fade'],
        bodyClasses: ['modal-body'],
        titleClasses: ['modal-header'],
        footerClasses: ['modal-footer']
      }
    });
    Config.addConfig('foundation', {
      tabs: {
        tabListClasses: ['tabs'],
        tabSelectedClasses: ['active'],
        tabClasses: ['tab-title'],
        tabPanelClasses: ['content']
      }
    });
    Em.EmberComponents.Config = Em.Config = Config;
    c.register('component:em-tabs', TabsComponent);
    c.register('template:components/em-tabs-css', TabsStyle);
    c.register('component:em-tab-list', TabListComponent);
    c.register('component:em-tab', TabComponent);
    c.register('component:em-tab-panel', TabPanelComponent);
    c.register('component:em-wysiwyg', WysiwygComponent);
    c.register('component:em-wysiwyg-toolbar', WysiwygToolbarComponent);
    c.register('component:em-wysiwyg-action-group', WysiwygActionGroupComponent);
    c.register('component:em-wysiwyg-action', WysiwygActionComponent);
    c.register('template:em-wysiwyg-action', WysiwygActionTmpl);
    c.register('component:em-wysiwyg-editor', WysiwygEditorComponent);
    c.register('component:em-accordion', AccordionComponent);
    c.register('component:em-accordion-item', AccordionItemComponent);
    c.register('template:em-accordion-item-tmpl', AccordionItemTmpl);
    c.register('component:em-tree', TreeComponent);
    c.register('template:em-tree', TreeTmpl);
    c.register('component:em-tree-node', TreeNodeComponent);
    c.register('template:em-tree-node', TreeNodeTmpl);
    c.register('component:em-tree-node-icon-action', TreeNodeIconAction);
    c.register('component:em-tree-branch', TreeBranchComponent);
    c.register('template:em-tree-branch', TreeBranchTmpl);
    c.register('template:components/em-tree-css', TreeStyle);
    c.register('component:em-list', ListComponent);
    c.register('component:em-list-item', ListItemComponent);
    c.register('component:em-modal', ModalComponent);
    c.register('template:components/em-modal-css', ModalCss);
    c.register('component:em-modal-form', ModalFormComponent);
    c.register('component:em-modal-emform', ModalEmFormComponent);
    c.register('component:em-modal-title', ModalTitleComponent);
    c.register('component:em-modal-body', ModalBodyComponent);
    c.register('component:em-modal-footer', ModalFooterComponent);
    c.register('component:em-modal-toggler', ModalTogglerComponent);
    c.register('template:em-modal', ModalTmpl);
    c.register('component:em-modal-confirm', ModalConfirmComponent);
    c.register('template:em-modal-confirm', ModalConfirmTmpl);
    c.register('component:em-button', ButtonComponent);
    return c.register('template:em-button', ButtonTmplComponent);
  }
});

exports.TabsComponent = TabsComponent;
exports.TabListComponent = TabListComponent;
exports.TabComponent = TabComponent;
exports.TabPanelComponent = TabPanelComponent;
exports.WysiwygComponent = WysiwygComponent;
exports.WysiwygToolbarComponent = WysiwygToolbarComponent;
exports.WysiwygActionGroupComponent = WysiwygActionGroupComponent;
exports.WysiwygActionComponent = WysiwygActionComponent;
exports.WysiwygEditorComponent = WysiwygEditorComponent;
exports.AccordionComponent = AccordionComponent;
exports.AccordionItemComponent = AccordionItemComponent;
exports.TreeComponent = TreeComponent;
exports.TreeNodeComponent = TreeNodeComponent;
exports.TreeBranchComponent = TreeBranchComponent;
exports.TreeNode = TreeNode;
exports.TreeNodeIconAction = TreeNodeIconAction;
exports.ListComponent = ListComponent;
exports.ListItemComponent = ListItemComponent;
exports.ModalComponent = ModalComponent;
exports.ModalTitleComponent = ModalTitleComponent;
exports.ModalBodyComponent = ModalBodyComponent;
exports.ModalFooterComponent = ModalFooterComponent;
exports.ModalTogglerComponent = ModalTogglerComponent;
exports.ModalConfirmComponent = ModalConfirmComponent;
exports.ModalFormComponent = ModalFormComponent;
exports.ModalEmFormComponent = ModalEmFormComponent;
exports.ButtonComponent = ButtonComponent;
},{"./accordion/accordion":3,"./accordion/accordion-item":2,"./accordion/accordion-item-tmpl":1,"./button/button":5,"./button/button-tmpl":4,"./list/list":8,"./list/list-item":7,"./modal/modal":20,"./modal/modal-body":10,"./modal/modal-confirm":12,"./modal/modal-confirm-tmpl":11,"./modal/modal-css":13,"./modal/modal-emform":14,"./modal/modal-footer":15,"./modal/modal-form":16,"./modal/modal-title":17,"./modal/modal-tmpl":18,"./modal/modal-toggler":19,"./tabs/tab":23,"./tabs/tab-list":21,"./tabs/tab-panel":22,"./tabs/tabs":25,"./tabs/tabs-css":24,"./tree/node":26,"./tree/tree":34,"./tree/tree-branch":28,"./tree/tree-branch-tmpl":27,"./tree/tree-css":29,"./tree/tree-node":32,"./tree/tree-node-icon-action":30,"./tree/tree-node-tmpl":31,"./tree/tree-tmpl":33,"./wysiwyg/action":36,"./wysiwyg/action-group":35,"./wysiwyg/actiontmpl":37,"./wysiwyg/editor":38,"./wysiwyg/toolbar":39,"./wysiwyg/wysiwyg":40}],10:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var run = window.Ember.run;

var ModalBody, StyleBindingsMixin, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

StyleBindingsMixin = Em.Eu.StyleBindingsMixin;


/**
 * `{{em-modal-body}}` component.
 *
 * The body of the modal
 *
 * @class ModalBody
 * @public
 */

ModalBody = Component.extend(WithConfigMixin, StyleBindingsMixin, {
  classNameBindings: ['styleClasses'],

  /**
   * The CSS classes that will be attached to the DOM element of the modal
   * Classes should be configured externally by using the `config` object.
   *
   * @property styleClasses
   * @private
   * @type String
   */
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.modal.bodyClasses')) != null ? _ref.join(" ") : void 0;
  }).property()
});

exports["default"] = ModalBody;
},{}],11:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("{{#em-modal id=confirm-id configName=configName model-id=model-id open-if=open-if close-if=close-if}}\n    {{#em-modal-title}}\n        {{#em-modal-toggler class=\"close\"}}<span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>{{/em-modal-toggler}}\n        <h4 class=\"modal-title\">{{title}}</h4>\n    {{/em-modal-title}}\n    {{#em-modal-body}}\n        {{message}}\n    {{/em-modal-body}}\n    {{#em-modal-footer}}\n        <button type=\"button\" class=\"btn btn-primary\" {{action \"confirmPressed\"}}>Yes</button>\n        {{#em-modal-toggler class=\"btn btn-default\"}}No{{/em-modal-toggler}}\n    {{/em-modal-footer}}\n{{/em-modal}}");
},{}],12:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var run = window.Ember.run;


/**
 * A confirmation modal with 'Yes' & 'No' buttons
 * When 'no' is pressed the modal is just closed.
 * When 'yes' is pressed an action bound to the action on the controller set in the `confirm` property is invoked, 
 * giving the controller a chance to decide whether to close the modal or not.
 *
 * @class ModalConfirm
 */
var ModalConfirm;

ModalConfirm = Component.extend({
  layoutName: 'em-modal-confirm',

  /**
   * Bound to the action on the controller to be invoked when the 'yes' button is pressed.
   * @property confirm
   * @public
   */
  confirm: "confirm",

  /**
   * The default title of the modal if not set otherwise.
   *
   * @property title
   * @public
   */
  title: 'Please confirm',

  /**
   * The default message of the modal if not set otherwise.
   *
   * @property message
   * @public
   */
  message: 'Please press Yes to confirm the operation.',
  actions: {

    /**
     * Invoked when the user clicks the "Yes" button, triggers an action on the controller.
     * 
     * @method confirmPressed
     * @private
     */
    confirmPressed: function() {
      return this.sendAction('confirm');
    }
  }
});

exports["default"] = ModalConfirm;
},{}],13:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile(".em-modal {\n    background-color: hsla(0, 0%, 100%, .85);\n}");
},{}],14:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var run = window.Ember.run;

var FormModal = _dereq_("./modal-form")["default"] || _dereq_("./modal-form");
var EmModalForm;

EmModalForm = FormModal.extend({
  classNameBindings: ['form'],
  attributeBindings: ['role'],
  role: 'form',
  model: void 0,
  submit_button: false
});

exports["default"] = EmModalForm;
},{"./modal-form":16}],15:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var run = window.Ember.run;

var ModalFooter, StyleBindingsMixin, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

StyleBindingsMixin = Em.Eu.StyleBindingsMixin;


/**
 * `{{em-modal-footer}}` component.
 *
 * The footer of the modal
 *
 * @class ModalFooter
 * @public
 */

ModalFooter = Component.extend(WithConfigMixin, StyleBindingsMixin, {
  classNameBindings: ['styleClasses'],

  /**
   * The CSS classes that will be attached to the DOM element of the modal
   * Classes should be configured externally by using the `config` object.
   *
   * @property styleClasses
   * @private
   * @type String
   */
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.modal.footerClasses')) != null ? _ref.join(" ") : void 0;
  }).property()
});

exports["default"] = ModalFooter;
},{}],16:[function(_dereq_,module,exports){
"use strict";
var ArrayProxy = window.Ember.ArrayProxy;
var run = window.Ember.run;

var Modal = _dereq_("./modal")["default"] || _dereq_("./modal");

/**
 * A flavour of a {{#crossLink "Modal}}Modal{{/crossLink}} that handles form submission right.
 * @class ModalForm
 */
var ModalForm;

ModalForm = Modal.extend({
  tagName: 'form',
  attributeBindings: ['in-async'],
  'in-async': null,
  'close-if-error': false,
  submitted: false,
  error: null,

  /**
   * Handle form submit event.
   * Submit the form, if the event returns a promise, then wait for the promise to be fulfilled first before
   * closing the modal, if the promise returned an error, then the `error` property will be set with the given error object of the
   * promise, when error occurs, the modal will only get closed if the `close-if-error` property isn't set to false
   *
   * @method submitForm
   * @private
   */
  submitForm: (function(e) {
    e.preventDefault();
    this.sendAction('on-submit', this, e);
    this.set('submitted', true);
    if (e.promise && "function" === typeof e.promise.then) {
      this.set('in-async', 'true');
      return e.promise.then((function(_this) {
        return function(r) {
          _this.set('in-async', null);
          return _this.close();
        };
      })(this), (function(_this) {
        return function(err) {
          _this.set('in-async', null);
          _this.set('error', err);
          if (_this.get('close-if-error')) {
            return _this.close();
          }
        };
      })(this));
    } else {
      return this.close();
    }
  }).on('submit'),
  close: function() {
    this.set('error', null);
    if (!this.get('submitted')) {
      this.sendAction('on-cancel', this);
    }
    return this._super.apply(this, arguments);
  }
});

exports["default"] = ModalForm;
},{"./modal":20}],17:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var run = window.Ember.run;

var ModalTitle, StyleBindingsMixin, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

StyleBindingsMixin = Em.Eu.StyleBindingsMixin;


/**
 * `{{em-modal-title}}` component.
 *
 * The title of the modal
 *
 * @class ModalTitle
 * @public
 */

ModalTitle = Component.extend(WithConfigMixin, StyleBindingsMixin, {
  classNameBindings: ['styleClasses'],

  /**
   * The CSS classes that will be attached to the DOM element of the modal
   * Classes should be configured externally by using the `config` object.
   *
   * @property styleClasses
   * @private
   * @type String
   */
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.modal.titleClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),

  /**
   * Register the title within the modal
   * Note: Expects this title to be the direct descendant of the modal component
   *
   * @method registerInModal
   * @private
   */
  registerInModal: function() {
    return (this.get('parentView').setTitle(this)).on('init');
  }
});

exports["default"] = ModalTitle;
},{}],18:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("{{#if is-open}}\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            {{yield}}\n        </div>\n    </div>\n{{/if}}");
},{}],19:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var run = window.Ember.run;
var View = window.Ember.View;
var Modal = _dereq_("./modal")["default"] || _dereq_("./modal");
var ModalToggler, StyleBindingsMixin, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

StyleBindingsMixin = Em.Eu.StyleBindingsMixin;


/**
 * `{{em-modal-toggler}}` component.
 *
 * A component to toggle the visibility of a modal
 *
 * @class ModalToggler
 * @event on-toggle triggered when the toggler is clicked before changing the visibility of the modal
 *   @param toggler Toggler - This instance of the toggler
 * @public
 */

ModalToggler = Component.extend(WithConfigMixin, StyleBindingsMixin, {
  tagName: 'button',
  classNameBindings: ['styleClasses'],

  /**
   * The CSS classes that will be attached to the DOM element of the modal
   * Classes should be configured externally by using the `config` object.
   *
   * @property styleClasses
   * @private
   * @type String
   */
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.modal.togglerClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),

  /**
   * Toggle the visibility of the modal that this toggler controls.
   *
   * @method toggleVisibility
   * @private
   */
  toggleVisibility: (function() {
    this.sendAction('on-toggle', this);
    return this.get('modal').toggleVisibility();
  }).on('click'),

  /**
   * Find the modal view and set it as a `modal` property
   * A toggler can live as a descendant (not neccessarily a direct one) of a modal or outside of the modal chain
   * TODO: Assert modal existance
   * @method modalAsProperty
   */
  modalAsProperty: (function() {
    var modalAsAncestor;
    modalAsAncestor = this.nearestOfType(Modal);
    if (modalAsAncestor) {
      return this.set('modal', modalAsAncestor);
    } else {
      return run.schedule('afterRender', this, function() {
        return this.set('modal', View.views[this.get('modal-id')]);
      });
    }
  }).on('willInsertElement')
});

exports["default"] = ModalToggler;
},{"./modal":20}],20:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var run = window.Ember.run;

var ModalComponent, StyleBindingsMixin, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

StyleBindingsMixin = Em.Eu.StyleBindingsMixin;


/**
 * `{{em-modal}}` component.
 *
 * Define a modal component that can be opened and closed, the modal visibility is controlled by the 
 * {{#crossLink "ModalToggler"}}ModalToggler{{/crossLink}} component.
 *
 * ```handlebars
 * {{#em-modal id="modal1"}}
 *   {{#em-modal-title}}
 *     {{#em-modal-toggler}}<span>&times;</span>{{/em-modal-toggler}}
 *        <h4 class="modal-title">I'm a modal title</h4>
 *    {{/em-modal-title}}
 *    {{#em-modal-body}}
 *        One fine body…
 *    {{/em-modal-body}}
 *    {{#em-modal-footer}}
 *    {{#em-modal-toggler}}Close{{/em-modal-toggler}}
 *    {{/em-modal-footer}}
 * {{/em-modal}}
 * {{#em-modal-toggler modal-id="modal1"}}Click me!{{/em-modal-toggler}}
 * ```
 *
 * @class Modal
 * @event will-open
 * @event did-open
 * @event will-close
 * @public
 */

ModalComponent = Component.extend(WithConfigMixin, StyleBindingsMixin, {
  layoutName: 'em-modal',

  /**
   * Properties bound as attributes the DOM element.
   * see documentation per property.
   * @property panels
   * @private
   * @type Array
   */
  attributeBindings: ['is-open', 'did-open', 'tabindex'],
  classNameBindings: ['styleClasses', 'styleOpenningClasses'],
  styleBindings: ['display'],

  /**
   * Define the tabindex DOM property.
   * Required otherwise no keyDown events
   * @property tabindex
   */
  tabindex: 0,

  /**
   * The CSS classes that will be attached to the DOM element of the modal
   * Classes should be configured externally by using the `config` object.
   * @property styleClasses
   * @private
   * @type String
   */
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.modal.classes')) != null ? _ref.join(" ") : void 0;
  }).property('config.modal.classes'),

  /**
   * The class name that will be set when the modal gets opened
   * @property styleOpenningClasses
   * @public
   */
  styleOpenningClasses: (function() {
    if (this.get('did-open')) {
      return "in";
    } else {
      return "";
    }
  }).property('did-open'),

  /*
   * The CSS `display` property state.
   * @property display
   * @public
   */
  display: (function() {
    if (this.get('did-open')) {
      return 'block';
    } else {
      return 'none';
    }
  }).property('did-open'),

  /**
   * `show` property is bound to the DOM element as an attribute.
   * This property is set to true immediately when the `toggleVisibility` method is invoked.
   *
   * This property can be used to start a transitioning effect, for example:
   * ```css
   *   em-modal[show] {
   *     opacity: 0;
   *     transition: opacity 100ms ease;
   *   }
   * ```
   * 
   * The transition effect should be ended when the modal is gets visible, see the property `shown` for more info.
   * @property opened
   * @see 'did-open'
   * @private
   */
  'is-open': false,

  /**
   * A property bound to the DOM element that indicates that the modal has been made visible to the user. 
   * (after the DOM element was set with `display: block;`)
   *
   * This proeprty can be used by CSS to end a transitioning effect by setting the CSS `opacity` to a higher number, for example:
   *
   * ```css
   *   em-modal[shown] {
   *     opacity: 1;
   *   }
  }
   * ```
   * @property did-open
   * @private
   */
  'did-open': false,

  /**
   * Open modal and make it visible.
   * @method open
   * @public
   */
  open: function() {
    this.trigger('show');
    this.sendAction('show', this);
    this.set('is-open', 'true');
    return run.schedule('afterRender', this, function() {
      this.set('did-open', 'true');
      return this.trigger('shown');
    });
  },

  /**
   * Close the modal by making it invisible.
   * @method close
   * @public
   */
  close: function() {
    this.trigger('hide');
    this.sendAction('hide', this);
    this.set('is-open', void 0);
    return this.set('did-open', void 0);
  },

  /**
   * Toggle the visibility of the modal based on its current state.
   * @method toggleVisibility
   * @public
   */
  toggleVisibility: function() {
    if (this.get('is-open')) {
      return this.close();
    } else {
      return this.open();
    }
  },

  /**
   * Set the title of the modal.
   * @method setTitle
   * @private
   * @type ModalTitle
   */
  setTitle: function(title) {
    return this.set('title', title);
  },

  /**
   * Set the toggler of the modal
   * @method setToggler
   * @private
   * @type ModalToggler
   */
  setToggler: function(toggler) {
    return this.set('toggler', toggler);
  },

  /**
   * Close the modal if the user clicks outside of the modal space.
   * @method closeIfClickedOutside
   * @private
   */
  closeIfClickedOutside: (function(e) {
    if (e.target !== this.get('element')) {
      return;
    }
    return this.close();
  }).on('click'),

  /**
   * Handle keyboard events
   * @method handleKeyboard
   * @private
   */
  handleKeyboard: (function(e) {
    switch (e.keyCode) {
      case 27:
        return this.close();
    }
  }).on('keyDown'),

  /**
   * Consumer can bind this property for a more fine grained control over when the modal is opened,
   * This is good for situations where openning the modal via the `toggler` is not enough.
   *
   * @property open-if
   * @public
   */
  'open-if': false,

  /**
   * observers the `open-if` property, if set to true, then open the modal.
   * @method openIf
   * @private
   */
  openIf: (function() {
    if (!this.get('open-if')) {
      return;
    }
    this.open();
    return this.set('open-if', false);
  }).observes('open-if'),

  /**
   * Consumer can bind this property for a more fine grained control over when the modal is closed,
   * This is good for situations where closing the modal via the `toggler` is not enough.
   *
   * @property close-if
   * @public
   */
  'close-if': false,

  /**
   * observers the `close-if` property, if set to true, then close the modal.
   * @method closeIf
   * @private
   */
  closeIf: (function() {
    if (!this.get('close-if')) {
      return;
    }
    this.close();
    return this.set('close-if', false);
  }).observes('close-if')
});

exports["default"] = ModalComponent;
},{}],21:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var computed = window.Ember.computed;

var TabList, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * `{{em-tab-list}}` component.
 *
 * Holds a list of `{{em-tab}}` components.
 * *Must be a direct descendent of the `{{em-tabs}` component.*

 * @class TabList
 */

TabList = Component.extend(WithConfigMixin, {
  setTagName: (function() {
    return this.set('tagName', this.get('config.tabs.tabListTag') || 'div');
  }).on('init'),
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.tabs.tabListClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),

  /**
   * The ancestor `Tabs` component
   * @property tabs
   * @type Tabs
   */
  tabs: computed.alias('parentView'),

  /**
   * The tab instances of this list.
   *
   * @property tab_instances
   * @type ArrayProxy
   */
  tab_instances: void 0,

  /**
   * The current selected tab
   *
   * @property selected
   * @type Tab
   */
  selected: computed.alias('parentView.selectedTab'),

  /**
   * The selected tab index
   *
   * @property selectedIdx
   * @type Number
   */
  selectedIdx: (function() {
    return this.get('tab_instances').indexOf(this.get('selected'));
  }).property('selected'),

  /**
   * Auto register this `TabList` in the ancestor tabs component.
   *
   * @method register
   * @private
   */
  register: (function() {
    return this.get('tabs').setTabList(this);
  }).on('didInsertElement'),

  /**
   * Initialize an empty tabs array
   *
   * @method initTabs
   * @private
   */
  initTabs: (function() {
    return this.set('tab_instances', ArrayProxy.create({
      content: []
    }));
  }).on('init'),

  /**
   * Add a tab to the tab list
   *
   * @method addTab
   * @param tab {Tab} the tab to add.
   * @private
   */
  addTab: function(tab) {
    return this.get('tab_instances').addObject(tab);
  },

  /**
   * Remove a tab from the tab list
   *
   * @method removeTab
   * @param tab {Tab} the tab to remove.
   * @private
   */
  removeTab: function(tab) {
    var nextIdx, tabIdx, _ref;
    this.get('tab_instances').removeObject(tab);
    if (this.get('tabs.selected') === tab) {
      tabIdx = tab.get('index');
      nextIdx = (_ref = tabIdx === 0) != null ? _ref : {
        tabIdx: tabIdx - 1
      };
      return this.get('tabs').select(this.get('tab_instances').objectAt(nextIdx));
    }
  }
});

exports["default"] = TabList;;
},{}],22:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var computed = window.Ember.computed;

var StyleBindingsMixin, TabPanel, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

StyleBindingsMixin = Em.Eu.StyleBindingsMixin;

TabPanel = Component.extend(WithConfigMixin, StyleBindingsMixin, {
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.tabs.tabPanelClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  styleBindings: ['height'],
  attributeBindings: ['selected'],

  /**
   * The ancestor `Tabs` component
   * @property tabs
   * @type Tabs
   */
  tabs: computed.alias('parentView'),

  /**
   * A reference to the {{#crossLink "TabList}}TabList{{/crossLink}} instance.
   *
   * @property tabList
   * @type TabList
   */
  tabList: computed.alias('parentView.tabList'),

  /**
   * A reference to the {{#crossLink "Tabs}}{{/crossLink}}'s panels property.
   *
   * @property panels 
   * @type Array
   */
  panels: computed.alias('parentView.panels'),

  /**
   * The tab that refer to this tab pane
   *
   * @property tab
   * @type Tab
   */
  tab: (function() {
    var index, tabs;
    index = this.get('panels').indexOf(this);
    tabs = this.get('tabList.tab_instances');
    return tabs && tabs.objectAt(index);
  }).property('tabList.tab_instances.@each'),
  selected: (function() {
    return this.get('tab.selected');
  }).property('tab.selected'),
  changeVisibility: (function() {
    return this.$().css('display', this.get('selected') ? "" : 'none');
  }).observes('selected'),
  register: (function() {
    return this.get('tabs').addTabPanel(this);
  }).on('didInsertElement'),
  unregister: (function() {
    return this.get('tabs').removeTabPanel(this);
  }).on('willDestroyElement')
});

exports["default"] = TabPanel;;
},{}],23:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var computed = window.Ember.computed;
var Handlebars = window.Ember.Handlebars;

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
},{}],24:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile(".em-tabs, .em-tab-list, .em-tab-panel {\n  display: block;\n}\n\n.em-tab-list {\n  border-bottom: 1px solid #eee;\n}\n\n.em-tab {\n  display: inline-block;\n  padding: 6px 12px;\n  border: 1px solid transparent;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  cursor: pointer;\n  margin-bottom: -1px;\n  position: relative;\n}\n\n.em-tab[active=true] {\n  border-color: #eee;\n  border-bottom-color: #fff;\n}");
},{}],25:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;

var StyleBindingsMixin, Tabs, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

StyleBindingsMixin = Em.Eu.StyleBindingsMixin;


/**
 * `{{em-tabs}}` component.
 *
 * The top level component for rendering tabs and their panes.
 *
 * Simplest usage:
 *
 * ```handlebars
 * {{#em-tabs}}
 *    {{#em-tab-list}}
 *       {{#em-tab}}ral{{/em-tab}}
 *       {{#em-tab}}Security{{/em-tab}}
 *       {{#em-tab}}Advanced{{/em=tab}}
 *    {{em-tab-list}}
 * {{/em-tabs}}
 * ```
 *
 * @class Tabs
 * @public
 */

Tabs = Component.extend(WithConfigMixin, StyleBindingsMixin, {
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.tabs.tabsClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  styleBindings: ['height'],

  /**
   * A list of tab panels
   *
   * @property panels
   * @private
   * @type Array
   */
  panels: void 0,

  /**
   * A {{#crossLink "TabList"}}{{/crossLink}} component instance.
   *
   * @property tabList
   * @type TabList
   */
  tabList: void 0,

  /**
   * The selected tab instance.
   *
   * @property selectedTab
   * @type Tab
   * @private
   * @see Tab
   *
   */
  selected: void 0,

  /**
   * The index of the selected tab
   *
   * @property 'selected-idx'
   * @type Number
   */
  'selected-idx': 0,

  /**
   * Select the given tab.
   *
   * @method select
   * @param {Object} a tab instance to select.
   * @see selectedTab
   * @see selected-idx
   */
  select: function(tab) {
    if (!tab) {
      return;
    }
    Em.debug("Selecting tab: " + (tab.get('index')));
    this.set('selected', tab);
    return this.set('selected-idx', tab.get('index'));
  },

  /**
   * Initialize the tab panels array
   *
   * @method initTabPanels
   */
  initTabPanels: (function() {
    return this.set('panels', ArrayProxy.create({
      content: []
    }));
  }).on('init'),

  /**
   * Set the specified `TabList` instance.
   *
   * @method setTabList
   * @private
   */
  setTabList: function(tabList) {
    return this.set('tabList', tabList);
  },

  /**
   * Add the given `TabPanel` instance to the tabs panels.
   *
   * @method addTabPanel
   * @param panel {Object} The `TabPanel` instance to add.
   */
  addTabPanel: function(panel) {
    return this.get('panels').addObject(panel);
  },

  /**
   * Remove the given `TabPanel` instance from the tabs panels.
   *
   * @method removeTabPanel.
   * @param panel {Object} The `TabPanel` instance to remove.
   */
  removeTabPanel: function(panel) {
    return this.get('panels').removeObject('panel');
  }
});

exports["default"] = Tabs;;
},{}],26:[function(_dereq_,module,exports){
"use strict";
var Ember = window.Ember["default"] || window.Ember;
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

exports["default"] = Node;

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
},{}],27:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("{{#each children}}\n    {{em-tree-node model=this tree=view.tree async=controller.async targetObject=controller.targetObject}}\n{{/each}}");
},{}],28:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var computed = window.Ember.computed;

var TreeBranch, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * A branch of a tree.
 *
 * @class TreeBranch
 */

TreeBranch = Component.extend(WithConfigMixin, {

  /**
   * The model to render its children within this branch
   * this property is set during component markup creation
   */
  model: void 0,

  /**
   * A list of {{#crossLink "TreeNode"}}nodes{{/crossLink}} instances.
   */
  children: computed.alias('model.children'),

  /**
   * True if node's children should be loaded asynchronously
   * This gives the opportunity to the user to invoke an async call to the server to retrieve data for the current
   * branch being opened
   */
  async: false,
  tagName: 'ul',
  layoutName: 'em-tree-branch',
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.tree.branchClasses')) != null ? _ref.join(" ") : void 0;
  }).property()
});

exports["default"] = TreeBranch;;
},{}],29:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile(".em-tree-node {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.em-tree-node-active {\n    background: #e7e7e7;\n}\n\nli.em-tree-node > span {\n    cursor: pointer;\n}\n\nli.em-tree-node > span > span.actions {\n    visibility: hidden;\n}\n\nli.em-tree-node > span:hover > span.actions {\n    visibility: visible;\n}");
},{}],30:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var computed = window.Ember.computed;

var StyleBindingsMixin, TreeNodeIconAction, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

StyleBindingsMixin = Em.Eu.StyleBindingsMixin;


/**
 * An icon action of a tree node
 * @class TreeNodeIconAction
 */

TreeNodeIconAction = Component.extend(WithConfigMixin, StyleBindingsMixin, {
  attributeBindings: ['stickyMode:sticky'],

  /**
   * The tag name of the icon action,
   * default is `<i>` but can be replaced with any tag.
   * @property tagName
   * @public
   */
  tagName: 'i',

  /**
   * Bind the visibility css property,
   * this is required for the `sticky` property
   * @property styleBindings
   * @private
   */
  styleBindings: 'visibility',

  /**
   * Defines the css visibility according to the value of the `sticky` property
   * @property visibility
   * @private
   */
  visibility: (function() {
    if (this.get('sticky')) {
      return 'visible';
    } else {
      return void 0;
    }
  }).property('sticky'),

  /**
   * 'true' if the action icon should be sticky and not disappear when item is not hovered
   * @property sticky
   * @public
   */
  sticky: false,
  stickyMode: (function() {
    if (this.get('sticky')) {
      return 'true';
    } else {
      return void 0;
    }
  }).property('sticky'),

  /**
   * Binds the specified css classes
   * @property classNameBindings
   * @private
   */
  classNameBindings: ['iconClasses'],

  /**
   * Set the given array of classes
   * @property iconClasses
   * @private
   */
  iconClasses: (function() {
    var _ref;
    return (_ref = this.get('meta.classes')) != null ? _ref.join(" ") : void 0;
  }).property('meta.classes'),

  /**
   * An alias to the node model of this action
   * @property node
   * @public
   */
  node: computed.alias('parentView.node'),

  /**
   * Invoked when the action is clicked
   * @method invokde
   */
  invoked: (function() {
    return this.get('parentView.targetObject').send(this.get('meta.action'), this);
  }).on('click')
});

exports["default"] = TreeNodeIconAction;
},{}],31:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("<span\n{{#if hasIcon}}\n    <i {{action toggle}} {{bind-attr class=\"iconClass\"}}></i>\n{{else}}\n    <a {{action toggle}} class=\"text\">*</a>\n{{/if}}\n</span>\n\n{{#if tree.in-multi-selection}}\n    <span class=\"em-tree-node-multiselection\">\n    {{#if multi-selected}}\n        <i {{action toggleSelection}} {{bind-attr class=\"tree.selected-icon\"}}></i>\n    {{else}}\n        <i {{action toggleSelection}} {{bind-attr class=\"tree.unselected-icon\"}}></i>\n    {{/if}}\n    </span>\n{{/if}}\n\n<span {{action select}} {{bind-attr class=\"nodeSelectedClasses :title\"}}>\n{{model.title}}\n{{#if tree.hovered-actions}}\n    <span class=\"actions\">\n    {{#each tree.hovered-actions}}\n        {{em-tree-node-icon-action meta=this model=controller.model}}</i>\n    {{/each}}\n    </span>\n{{/if}}\n</span>\n\n{{#if expanded}}\n    {{em-tree-branch model=model tree=tree async=async targetObject=targetObject}}\n{{/if}}");
},{}],32:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var computed = window.Ember.computed;

var TreeNode, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * A node of a tree.
 *
 * @class TreeNode
 */

TreeNode = Component.extend(WithConfigMixin, {
  attributeBindings: ['multi-selected'],

  /**
   * The model the tree node view is bound to
   */
  model: void 0,

  /**
   * A reference to the tree view, this property is auto set during component instantiation
   */
  tree: void 0,

  /**
   * A reference to the root model
   */
  rootModel: computed.alias('tree.model'),

  /**
   * True if the node is currently expanded, meaning its children are visible.
   */
  expanded: computed.alias('model.expanded'),

  /**
   * True if this node view is currently checked
   * This is only relevant if the tree configured to support multi selection
   */
  'multi-selected': computed.alias('model.selected'),

  /**
   * True if should render an icon tag for this node view
   */
  hasIcon: true,

  /**
   * True if this node can be single selected
   */
  selectable: true,

  /**
   * True if this node is currently single selected
   */
  isSelected: (function() {
    return this.get('tree.selected') === this.get('model');
  }).property('tree.selected'),

  /**
   * True if this node is currently loading,
   * Usually that means the node is defined asynchronously and its children are currently being loaded
   */
  loading: false,
  branch: computed.alias('parentView'),

  /**
   * true if the loading mode of the node's children should be async
   */
  async: computed.alias('parentView.async'),

  /**
   * true if this is a leaf node, meaning it has no children
   */
  leaf: (function() {
    return !this.get('model.children') || this.get('model.children.length') === 0;
  }).property('model.children.length'),
  tagName: 'li',
  layoutName: 'em-tree-node',
  classNameBindings: ['styleClasses', 'expandedClasses', 'leafClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.tree.nodeClasses')) != null ? _ref.join(" ") : void 0;
  }).property(),
  expandedClasses: (function() {
    var _ref, _ref1;
    if (this.get('expanded')) {
      return (_ref = this.get('config.tree.nodeOpenClasses')) != null ? _ref.join(" ") : void 0;
    } else {
      return (_ref1 = this.get('config.tree.nodeCloseClasses')) != null ? _ref1.join(" ") : void 0;
    }
  }).property('expanded', 'leaf', 'loading'),
  nodeSelectedClasses: (function() {
    var _ref;
    if (this.get('isSelected')) {
      return (_ref = this.get('config.tree.nodeSelectedClasses')) != null ? _ref.join(" ") : void 0;
    } else {
      return null;
    }
  }).property('isSelected'),
  addMultiSelectionToTreeSelection: (function() {
    if (this.get('multi-selected')) {
      return this.get('tree.multi-selection').pushObject(this.get('model'));
    } else {
      return this.get('tree.multi-selection').removeObject(this.get('model'));
    }
  }).observes('multi-selected').on('init'),
  iconClass: (function() {
    var icons;
    icons = [];
    if (this.get('async')) {
      if (this.get('loading')) {
        icons = icons.concat(this.get('config.tree.nodeLoadingIconClasses'));
      } else if (!this.get('model.children')) {
        icons = icons.concat(this.get('config.tree.nodeCloseIconClasses'));
      } else {
        if (this.get('model.children.length') === 0) {
          icons = icons.concat(this.get('config.tree.nodeLeafIconClasses'));
        } else {
          icons = this.get('expanded') ? icons.concat(this.get('config.tree.nodeOpenIconClasses')) : icons.concat(this.get('config.tree.nodeCloseIconClasses'));
        }
      }
    } else {
      if (this.get('leaf')) {
        icons = icons.concat(this.get('config.tree.nodeLeafIconClasses'));
      } else {
        icons = this.get('expanded') ? icons.concat(this.get('config.tree.nodeOpenIconClasses')) : icons.concat(this.get('config.tree.nodeCloseIconClasses'));
      }
    }
    return icons.join(" ");
  }).property('expanded', 'leaf', 'loading'),
  leafClasses: (function() {
    var _ref;
    if (this.get('leaf')) {
      return (_ref = this.get('config.tree.nodeLeafClasses')) != null ? _ref.join(" ") : void 0;
    }
  }).property('leaf'),
  actions: {
    toggle: function() {
      if (this.get('async') && !this.get('expanded') && !this.get('model.children')) {
        this.set('loading', true);
        return this.sendAction('children', this.get('model'), this);
      } else {
        return this.toggleProperty('expanded');
      }
    },
    select: function() {
      if (!this.get('selectable')) {
        return;
      }
      return this.set('tree.selected', this.get('model'));
    },
    toggleSelection: function() {
      if (this.get('multi-selected')) {
        return this.set('multi-selected', '');
      } else {
        return this.set('multi-selected', 'true');
      }
    }
  },
  children: 'getChildren',
  loadingHasChanged: (function() {
    if (!this.get('loading')) {
      return this.toggleProperty('expanded');
    }
  }).observes('loading')
});

exports["default"] = TreeNode;;
},{}],33:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("{{em-tree-node model=model tree=view async=async targetObject=targetObject}}");
},{}],34:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;
var computed = window.Ember.computed;
var A = window.Ember.A;
var Tree, WithConfigMixin, expandTree;

WithConfigMixin = Em.Eu.WithConfigMixin;


/**
 * A tree component
 *
 * @class Tree
 */

Tree = Component.extend(WithConfigMixin, {
  tagName: 'ul',
  layoutName: 'em-tree',
  classNameBindings: ['styleClasses'],
  styleClasses: (function() {
    var _ref;
    return (_ref = this.get('config.tree.classes')) != null ? _ref.join(" ") : void 0;
  }).property(),

  /**
   * The model to render as the root node of the tree
   * this property is expected to be defined by the user
   */
  model: void 0,

  /**
   * True if node's children should be loaded asynchronously
   * This gives the opportunity to the user to invoke an async call to the server to retrieve data for the current
   * branch being opened
   */
  async: false,
  'in-multi-selection': false,
  'multi-selection': A(),
  'selected-icon': 'fa fa-check',
  'unselected-icon': 'fa fa-times',
  'expand-depth': null,
  'auto-expand': false,
  expandByDepth: (function() {
    var depth;
    if (this.get('expand-depth')) {
      depth = parseInt(this.get('expand-depth'));
      if (depth === 0) {
        return;
      }
      return expandTree(this.get('model'), depth);
    }
  }).observes('expand-depth')
});

exports["default"] = Tree;

expandTree = function(node, depth) {
  var c, children, _i, _len, _results;
  if (depth === 0) {
    return;
  }
  node.set('expanded', true);
  children = node.get('children');
  if (children && "function" === typeof children.then) {
    return children.then((function(_this) {
      return function(loadedChildren) {
        return loadedChildren.forEach(function(c) {
          return expandTree(c, depth - 1);
        });
      };
    })(this));
  } else {
    if (children.get('length') === 0 || depth === 0) {
      return;
    }
    _results = [];
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      c = children[_i];
      _results.push(expandTree(c, depth - 1));
    }
    return _results;
  }
};
},{}],35:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var computed = window.Ember.computed;
var Handlebars = window.Ember.Handlebars;

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
},{}],36:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var computed = window.Ember.computed;
var Handlebars = window.Ember.Handlebars;

var Action, WithConfigMixin;

WithConfigMixin = Em.Eu.WithConfigMixin;

Action = Component.extend(WithConfigMixin, {
  tagName: 'a',
  templateName: 'em-wysiwyg-action',
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
  click: function() {
    var args, command, commands;
    this.get('editor').restoreSelection();
    this.get('editor').$().focus();
    commands = this.get('command').split(' ');
    command = commands.shift();
    args = commands.join(' ');
    document.execCommand(command, 0, args);
    this.get('editor').saveSelection();
    return this.get('wysiwyg').trigger('update_actions');
  },
  wysiwyg: computed.alias('parentView.wysiwyg'),
  editor: computed.alias('wysiwyg.editor'),
  listenToUpdate: (function() {
    return this.get('wysiwyg').on('update_actions', (function(_this) {
      return function() {
        return _this.set('active', document.queryCommandState(_this.get('command')));
      };
    })(this));
  }).on('init')
});

exports["default"] = Action;;
},{}],37:[function(_dereq_,module,exports){
"use strict";
exports["default"] = Ember.Handlebars.compile("{{#if icon}}\n    <i {{bind-attr class=icon}}></i>\n{{/if}}\n");
},{}],38:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var computed = window.Ember.computed;

var Editor, StyleBindingsMixin;

StyleBindingsMixin = Em.Eu.StyleBindingsMixin;

Editor = Component.extend(StyleBindingsMixin, {
  styleBindings: ['marginTop:margin-top', 'background'],
  attributeBindings: ['contenteditable'],
  contenteditable: 'true',
  marginTop: 10,
  background: 'white',
  wysiwyg: computed.alias('parentView'),
  updateToolbar: function(e) {
    return this.get('wysiwyg').trigger('update_actions');
  },
  keyUp: function() {
    this.saveSelection();
    return this.updateToolbar(this);
  },
  mouseUp: function() {
    this.saveSelection();
    return this.updateToolbar(this);
  },
  mouseOut: function() {
    this.saveSelection();
    return this.updateToolbar(this);
  },
  getCurrentSelectionRange: function() {
    var sel;
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  },
  saveSelection: function() {
    return this.set('selectionRange', this.getCurrentSelectionRange());
  },
  restoreSelection: function() {
    var e, selection;
    selection = window.getSelection();
    if (this.get('selectionRange')) {
      try {
        selection.removeAllRanges();
      } catch (_error) {
        e = _error;
        document.body.createTextRange().select();
        document.selection.empty();
      }
      return selection.addRange(this.get('selectionRange'));
    }
  },
  markSelection: function(input, color) {
    this.restoreSelection();
    if (document.queryCommandSupported('hiliteColor')) {
      document.execCommand('hiliteColor', 0, color || 'transparent');
    }
    return this.saveSelection();
  },
  register: (function() {
    return this.get('wysiwyg').setEditor(this);
  }).on('didInsertElement'),
  unregister: (function() {
    return this.get('wysiwyg').setEditor(void 0);
  }).on('willDestroyElement')
});

exports["default"] = Editor;;
},{}],39:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var computed = window.Ember.computed;
var ArrayProxy = window.Ember.ArrayProxy;

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
},{}],40:[function(_dereq_,module,exports){
"use strict";
var Component = window.Ember.Component;
var ArrayProxy = window.Ember.ArrayProxy;

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
},{}]},{},[9])
(9)
});