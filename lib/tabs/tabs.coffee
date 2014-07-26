#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy} from 'ember';`
#`import WithConfigMixin from 'ember-utils/with_config_mixin';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin
StyleBindingsMixin = Em.Eu.StyleBindingsMixin

###*
# `{{em-tabs}}` component.
#
# The top level component for rendering tabs and their panes.
#
# Simplest usage:
#
# ```handlebars
# {{#em-tabs}}
#    {{#em-tab-list}}
#       {{#em-tab}}ral{{/em-tab}}
#       {{#em-tab}}Security{{/em-tab}}
#       {{#em-tab}}Advanced{{/em=tab}}
#    {{em-tab-list}}
# {{/em-tabs}}
# ```
#
# @class Tabs
# @public
###
Tabs = Component.extend WithConfigMixin, StyleBindingsMixin,
    classNameBindings: ['styleClasses']
    styleClasses: (->
        @get('config.tabs.tabsClasses')?.join(" ")
    ).property()
    styleBindings: ['height']

    ###*
    # A list of tab panels
    #
    # @property panels
    # @private
    # @type Array
    ###
    panels: undefined

    ###*
    # A {{#crossLink "TabList"}}{{/crossLink}} component instance.
    #
    # @property tabList
    # @type TabList
    ###
    tabList: undefined

    ###*
    # The selected tab instance.
    #
    # @property selectedTab
    # @type Tab
    # @private
    # @see Tab
    #
    ###
    selected: undefined

    ###*
    # The index of the selected tab
    #
    # @property 'selected-idx'
    # @type Number
    ###
    'selected-idx': 0

    ###*
    # Select the given tab.
    #
    # @method select
    # @param {Object} a tab instance to select.
    # @see selectedTab
    # @see selected-idx
    ###
    select: (tab) ->
        #TODO: Why we initially having an undefined tab?
        return if not tab
        Em.debug "Selecting tab: #{tab.get('index')}"
        @set 'selected', tab
        @set 'selected-idx', tab.get 'index'

    ###*
    # Initialize the tab panels array
    #
    # @method initTabPanels
    ###
    initTabPanels: (->
        @set 'panels', ArrayProxy.create({content: []});
    ).on 'init'

    ###*
    # Set the specified `TabList` instance.
    #
    # @method setTabList
    # @private
    ###
    setTabList: (tabList) ->
        @set 'tabList', tabList

    ###*
    # Add the given `TabPanel` instance to the tabs panels.
    #
    # @method addTabPanel
    # @param panel {Object} The `TabPanel` instance to add.
    ###
    addTabPanel: (panel) ->
        @get('panels').addObject panel

    ###*
    # Remove the given `TabPanel` instance from the tabs panels.
    #
    # @method removeTabPanel.
    # @param panel {Object} The `TabPanel` instance to remove.
    ####
    removeTabPanel: (panel) ->
        @get('panels').removeObject 'panel'


`export default Tabs;`
