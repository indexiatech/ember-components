define(
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