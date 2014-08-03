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

var TreeComponent = require("./tree/tree")["default"] || require("./tree/tree");
var TreeTmpl = require("./tree/tree-tmpl")["default"] || require("./tree/tree-tmpl");
var TreeStyle = require("./tree/tree-css")["default"] || require("./tree/tree-css");
var TreeNode = require("./tree/node")["default"] || require("./tree/node");
var TreeNodeComponent = require("./tree/tree-node")["default"] || require("./tree/tree-node");
var TreeNodeTmpl = require("./tree/tree-node-tmpl")["default"] || require("./tree/tree-node-tmpl");
var TreeNodeIconAction = require("./tree/tree-node-icon-action")["default"] || require("./tree/tree-node-icon-action");
var TreeBranchComponent = require("./tree/tree-branch")["default"] || require("./tree/tree-branch");
var TreeBranchTmpl = require("./tree/tree-branch-tmpl")["default"] || require("./tree/tree-branch-tmpl");
var ListComponent = require("./list/list")["default"] || require("./list/list");
var ListItemComponent = require("./list/list-item")["default"] || require("./list/list-item");
var ModalComponent = require("./modal/modal")["default"] || require("./modal/modal");
var ModalCss = require("./modal/modal-css")["default"] || require("./modal/modal-css");
var ModalFormComponent = require("./modal/modal-form")["default"] || require("./modal/modal-form");
var ModalEmFormComponent = require("./modal/modal-emform")["default"] || require("./modal/modal-emform");
var ModalTitleComponent = require("./modal/modal-title")["default"] || require("./modal/modal-title");
var ModalBodyComponent = require("./modal/modal-body")["default"] || require("./modal/modal-body");
var ModalFooterComponent = require("./modal/modal-footer")["default"] || require("./modal/modal-footer");
var ModalTogglerComponent = require("./modal/modal-toggler")["default"] || require("./modal/modal-toggler");
var ModalTmpl = require("./modal/modal-tmpl")["default"] || require("./modal/modal-tmpl");
var ModalConfirmComponent = require("./modal/modal-confirm")["default"] || require("./modal/modal-confirm");
var ModalConfirmTmpl = require("./modal/modal-confirm-tmpl")["default"] || require("./modal/modal-confirm-tmpl");
var ButtonComponent = require("./button/button")["default"] || require("./button/button");
var ButtonTmplComponent = require("./button/button-tmpl")["default"] || require("./button/button-tmpl");
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