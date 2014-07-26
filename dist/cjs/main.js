"use strict";
var TabsComponent = require("./tabs/tabs")["default"] || require("./tabs/tabs");

var TabsStyle = require("./tabs/tabs-css")["default"] || require("./tabs/tabs-css");

var TabListComponent = require("./tabs/tab-list")["default"] || require("./tabs/tab-list");

var TabComponent = require("./tabs/tab")["default"] || require("./tabs/tab");

var TabPanelComponent = require("./tabs/tab-panel")["default"] || require("./tabs/tab-panel");

var WysiwygComponent = require("./wysiwyg/wysiwyg")["default"] || require("./wysiwyg/wysiwyg");

var WysiwygToolbarComponent = require("./wysiwyg/toolbar")["default"] || require("./wysiwyg/toolbar");

var WysiwygActionGroupComponent = require("./wysiwyg/action-group")["default"] || require("./wysiwyg/action-group");

var WysiwygActionComponent = require("./wysiwyg/action")["default"] || require("./wysiwyg/action");

var WysiwygActionTmpl = require("./wysiwyg/actiontmpl")["default"] || require("./wysiwyg/actiontmpl");

var WysiwygEditorComponent = require("./wysiwyg/editor")["default"] || require("./wysiwyg/editor");

var AccordionComponent = require("./accordion/accordion")["default"] || require("./accordion/accordion");

var AccordionItemComponent = require("./accordion/accordion-item")["default"] || require("./accordion/accordion-item");

var AccordionItemTmpl = require("./accordion/accordion-item-tmpl")["default"] || require("./accordion/accordion-item-tmpl");

var TreeNode = require("./tree/node")["default"] || require("./tree/node");
var TreeNodeComponent = require("./tree/tree-node")["default"] || require("./tree/tree-node");
var TreeNodeTmpl = require("./tree/tree-node-tmpl")["default"] || require("./tree/tree-node-tmpl");
var TreeBranchComponent = require("./tree/tree-branch")["default"] || require("./tree/tree-branch");
var TreeBranchTmpl = require("./tree/tree-branch-tmpl")["default"] || require("./tree/tree-branch-tmpl");
var TreeBranchStyle = require("./tree/tree-branch-css")["default"] || require("./tree/tree-branch-css");
var ListComponent = require("./list/list")["default"] || require("./list/list");
var ListItemComponent = require("./list/list-item")["default"] || require("./list/list-item");
var Application = require("ember").Application;
var Namespace = require("ember").Namespace;

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
exports.TreeNodeComponent = TreeNodeComponent;
exports.TreeBranchComponent = TreeBranchComponent;
exports.TreeNode = TreeNode;
exports.ListComponent = ListComponent;
exports.ListItemComponent = ListItemComponent;