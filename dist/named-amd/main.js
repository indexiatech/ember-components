define("ember-components/accordion/accordion-item-tmpl",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<!--panel-heading-->\n<!--panel-title-->\n<!--accordion-toggle-->\n\n<!--panel-collapse collapse-->\n<!--panel-body-->\n<div {{bind-attr class=panelHeaderClasses}}>\n    <h4 {{bind-attr class=panelTitleClasses}} style=\"cursor: pointer;\">\n        <a {{bind-attr class=panelTogglerClasses}}>\n            {{view.title}}\n        </a>\n    </h4>\n</div>\n<div {{bind-attr class=panelBodyContainerClasses}}>\n    <div {{bind-attr class=panelBodyClasses}}>{{yield}}</div>\n</div>");
  });
define("ember-components/accordion/accordion-item",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;
    var ArrayProxy = __dependency1__.ArrayProxy;

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
        $accordionBody.removeClass('in');
        return $accordionBody.height($accordionBody.height())[0].offsetHeight;
      },
      show: function() {
        var $accordionBody;
        $accordionBody = this.$('.panel-collapse');
        $accordionBody.addClass('in');
        return $accordionBody.height($accordionBody[0]['scrollHeight']);
      }
    });

    __exports__["default"] = AccordionItem;;
  });
define("ember-components/accordion/accordion",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;

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

    __exports__["default"] = Accordion;;
  });
define("ember-components/list/as-item",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Mixin = __dependency1__.Mixin;

    var computed = __dependency1__.computed;


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

    __exports__["default"] = AsItem;
  });
define("ember-components/list/list-item",
  ["ember","./as-item","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;
    var Handlebars = __dependency1__.Handlebars;

    var AsListMixin = __dependency2__["default"] || __dependency2__;
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

    __exports__["default"] = ListItem;;
  });
define("ember-components/list/list",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var computed = __dependency1__.computed;
    var run = __dependency1__.run;

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

    __exports__["default"] = List;
  });
define("ember-components",
  ["./tabs/tabs","./tabs/tabs-css","./tabs/tab-list","./tabs/tab","./tabs/tab-panel","./wysiwyg/wysiwyg","./wysiwyg/toolbar","./wysiwyg/action-group","./wysiwyg/action","./wysiwyg/actiontmpl","./wysiwyg/editor","./accordion/accordion","./accordion/accordion-item","./accordion/accordion-item-tmpl","./tree/node","./tree/tree-node","./tree/tree-node-tmpl","./tree/tree-branch","./tree/tree-branch-tmpl","./tree/tree-branch-css","./list/list","./list/list-item","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __dependency6__, __dependency7__, __dependency8__, __dependency9__, __dependency10__, __dependency11__, __dependency12__, __dependency13__, __dependency14__, __dependency15__, __dependency16__, __dependency17__, __dependency18__, __dependency19__, __dependency20__, __dependency21__, __dependency22__, __dependency23__, __exports__) {
    "use strict";
    var TabsComponent = __dependency1__["default"] || __dependency1__;

    var TabsStyle = __dependency2__["default"] || __dependency2__;

    var TabListComponent = __dependency3__["default"] || __dependency3__;

    var TabComponent = __dependency4__["default"] || __dependency4__;

    var TabPanelComponent = __dependency5__["default"] || __dependency5__;

    var WysiwygComponent = __dependency6__["default"] || __dependency6__;

    var WysiwygToolbarComponent = __dependency7__["default"] || __dependency7__;

    var WysiwygActionGroupComponent = __dependency8__["default"] || __dependency8__;

    var WysiwygActionComponent = __dependency9__["default"] || __dependency9__;

    var WysiwygActionTmpl = __dependency10__["default"] || __dependency10__;

    var WysiwygEditorComponent = __dependency11__["default"] || __dependency11__;

    var AccordionComponent = __dependency12__["default"] || __dependency12__;

    var AccordionItemComponent = __dependency13__["default"] || __dependency13__;

    var AccordionItemTmpl = __dependency14__["default"] || __dependency14__;

    var TreeNode = __dependency15__["default"] || __dependency15__;
    var TreeNodeComponent = __dependency16__["default"] || __dependency16__;
    var TreeNodeTmpl = __dependency17__["default"] || __dependency17__;
    var TreeBranchComponent = __dependency18__["default"] || __dependency18__;
    var TreeBranchTmpl = __dependency19__["default"] || __dependency19__;
    var TreeBranchStyle = __dependency20__["default"] || __dependency20__;
    var ListComponent = __dependency21__["default"] || __dependency21__;
    var ListItemComponent = __dependency22__["default"] || __dependency22__;
    var Application = __dependency23__.Application;
    var Namespace = __dependency23__.Namespace;

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
        c.register('component:em-tree-node', TreeNodeComponent);
        c.register('template:em-tree-node', TreeNodeTmpl);
        c.register('component:em-tree-branch', TreeBranchComponent);
        c.register('template:em-tree-branch', TreeBranchTmpl);
        c.register('template:components/em-tree-branch-css', TreeBranchStyle);
        c.register('component:em-list', ListComponent);
        return c.register('component:em-list-item', ListItemComponent);
      }
    });

    __exports__.TabsComponent = TabsComponent;
    __exports__.TabListComponent = TabListComponent;
    __exports__.TabComponent = TabComponent;
    __exports__.TabPanelComponent = TabPanelComponent;
    __exports__.WysiwygComponent = WysiwygComponent;
    __exports__.WysiwygToolbarComponent = WysiwygToolbarComponent;
    __exports__.WysiwygActionGroupComponent = WysiwygActionGroupComponent;
    __exports__.WysiwygActionComponent = WysiwygActionComponent;
    __exports__.WysiwygEditorComponent = WysiwygEditorComponent;
    __exports__.AccordionComponent = AccordionComponent;
    __exports__.AccordionItemComponent = AccordionItemComponent;
    __exports__.TreeNodeComponent = TreeNodeComponent;
    __exports__.TreeBranchComponent = TreeBranchComponent;
    __exports__.TreeNode = TreeNode;
    __exports__.ListComponent = ListComponent;
    __exports__.ListItemComponent = ListItemComponent;
  });
define("ember-components/tabs/tab-list",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var computed = __dependency1__.computed;

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

    __exports__["default"] = TabList;;
  });
define("ember-components/tabs/tab-panel",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;

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

    __exports__["default"] = TabPanel;;
  });
define("ember-components/tabs/tab",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;
    var Handlebars = __dependency1__.Handlebars;

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

    __exports__["default"] = Tab;;
  });
define("ember-components/tabs/tabs-css",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile(".em-tabs, .em-tab-list, .em-tab-panel {\n  display: block;\n}\n\n.em-tab-list {\n  border-bottom: 1px solid #eee;\n}\n\n.em-tab {\n  display: inline-block;\n  padding: 6px 12px;\n  border: 1px solid transparent;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  cursor: pointer;\n  margin-bottom: -1px;\n  position: relative;\n}\n\n.em-tab[active=true] {\n  border-color: #eee;\n  border-bottom-color: #fff;\n}");
  });
define("ember-components/tabs/tabs",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;

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

    __exports__["default"] = Tabs;;
  });
define("ember-components/tree/node",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    var Node;

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
      }).property('children.length')
    });

    __exports__["default"] = Node;
  });
define("ember-components/tree/tree-branch-css",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile(".em-tree-node {\n    cursor: pointer;\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.em-tree-node-active {\n    background: #e7e7e7;\n}");
  });
define("ember-components/tree/tree-branch-tmpl",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#each nodes}}\n    {{em-tree-node node=this async=controller.async targetObject=controller.targetObject}}\n{{/each}}");
  });
define("ember-components/tree/tree-branch",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var computed = __dependency1__.computed;

    var TreeBranch, WithConfigMixin;

    WithConfigMixin = Em.Eu.WithConfigMixin;


    /**
     * A branch of a tree.
     *
     * @class TreeBranch
     */

    TreeBranch = Component.extend(WithConfigMixin, {

      /**
       * The node to render its children within this branch
       * this property is expected to be defined by the user
       */
      node: void 0,

      /**
       * The root node of the tree
       */
      rootNode: computed.alias('node.root'),

      /**
       * A list of {{#crossLink "TreeNode"}}nodes{{/crossLink}} instances.
       */
      nodes: computed.alias('node.children'),

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

    __exports__["default"] = TreeBranch;;
  });
define("ember-components/tree/tree-node-tmpl",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if hasIcon}}\n    <i {{action toggle}} {{bind-attr class=\"iconClass\"}}></i>\n{{else}}\n    <a {{action toggle}} class=\"text\">*</a>\n{{/if}}\n\n<span {{action select}} {{bind-attr class=\"nodeSelectedClasses\"}}>{{node.title}}</span>\n\n{{#if expanded}}\n    {{em-tree-branch node=node async=async targetObject=targetObject}}\n{{/if}}");
  });
define("ember-components/tree/tree-node",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var computed = __dependency1__.computed;

    var TreeNode, WithConfigMixin;

    WithConfigMixin = Em.Eu.WithConfigMixin;


    /**
     * A node of a tree.
     *
     * @class TreeNode
     */

    TreeNode = Component.extend(WithConfigMixin, {

      /**
       * The node model the tree node view is bound to
       */
      node: void 0,

      /**
       * true if the node of this view is a root node
       */
      isRootNode: computed.not('node.hasParent'),

      /**
       * The root node model
       */
      root: computed.alias('node.root'),

      /**
       * True if the node is currently expanded, meaning its children are visible.
       */
      expanded: false,

      /**
       * True if this node is currently checked
       * This is only relevant if the tree configured to support selection
       */
      checked: false,

      /**
       * True if should render an icon tag for this node
       */
      hasIcon: true,

      /**
       * True if nodes can be selected
       */
      selectable: true,

      /**
       * True if this node is currently selected
       */
      isSelected: (function() {
        return this.get('rootBranchView.selected') === this.get('node');
      }).property('rootBranchView.selected'),

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
       * Get the view of the root node
       */
      rootNodeView: (function() {
        var view;
        if (this.get('isRootNode')) {
          return this;
        }
        view = this.get('parentView');
        while (view) {
          if (view.get('isRootNode')) {
            return view;
          }
          view = view.get('parentView');
        }
      }).property('node'),

      /**
       * The root branch view
       */
      rootBranchView: (function() {
        return this.get('rootNodeView.parentView');
      }).property('rootNodeView'),
      leaf: (function() {
        return this.get('node.children.length') === 0;
      }).property('node.children.length'),
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
      iconClass: (function() {
        var icons;
        icons = [];
        if (this.get('async')) {
          if (this.get('loading')) {
            icons = icons.concat(this.get('config.tree.nodeLoadingIconClasses'));
          } else if (!this.get('node.children')) {
            icons = icons.concat(this.get('config.tree.nodeCloseIconClasses'));
          } else {
            if (this.get('node.children.length') === 0) {
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
          if (this.get('async') && !this.get('expanded') && !this.get('node.children')) {
            this.set('loading', true);
            return this.sendAction('children', this.get('node'), this);
          } else {
            return this.toggleProperty('expanded');
          }
        },
        select: function() {
          if (!this.get('selectable')) {
            return;
          }
          return this.set('rootBranchView.selected', this.get('node'));
        }
      },
      children: 'getChildren',
      loadingHasChanged: (function() {
        if (!this.get('loading')) {
          return this.toggleProperty('expanded');
        }
      }).observes('loading')
    });

    __exports__["default"] = TreeNode;;
  });
define("ember-components/wysiwyg/action-group",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;
    var Handlebars = __dependency1__.Handlebars;

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

    __exports__["default"] = ActionGroup;;
  });
define("ember-components/wysiwyg/action",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;
    var Handlebars = __dependency1__.Handlebars;

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

    __exports__["default"] = Action;;
  });
define("ember-components/wysiwyg/actiontmpl",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if icon}}\n    <i {{bind-attr class=icon}}></i>\n{{/if}}\n");
  });
define("ember-components/wysiwyg/editor",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;

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

    __exports__["default"] = Editor;;
  });
define("ember-components/wysiwyg/toolbar",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;
    var ArrayProxy = __dependency1__.ArrayProxy;

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

    __exports__["default"] = Toolbar;;
  });
define("ember-components/wysiwyg/wysiwyg",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;

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

    __exports__["default"] = Wysiwyg;;
  });