define(
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