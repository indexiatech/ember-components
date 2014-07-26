#(c) 2014 Indexia, Inc.

`import { Component, ArrayProxy, computed } from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# `{{em-tab-list}}` component.
#
# Holds a list of `{{em-tab}}` components.
# *Must be a direct descendent of the `{{em-tabs}` component.*

# @class TabList
###
TabList = Component.extend WithConfigMixin,
    setTagName: (->
        @set 'tagName', @get('config.tabs.tabListTag') || 'div'
    ).on 'init'

    classNameBindings: ['styleClasses']
    styleClasses: (->
        @get('config.tabs.tabListClasses')?.join(" ")
    ).property()


    ###*
    # The ancestor `Tabs` component
    # @property tabs
    # @type Tabs
    ###
    tabs: computed.alias 'parentView'

    ###*
    # The tab instances of this list.
    #
    # @property tab_instances
    # @type ArrayProxy
    ###
    tab_instances: undefined
    
    ###*
    # The current selected tab
    #
    # @property selected
    # @type Tab
    ###
    selected: computed.alias 'parentView.selectedTab'

    ###*
    # The selected tab index
    #
    # @property selectedIdx
    # @type Number
    ###
    selectedIdx: (->
        @get('tab_instances').indexOf @get('selected')
    ).property 'selected'

    ###*
    # Auto register this `TabList` in the ancestor tabs component.
    #
    # @method register
    # @private
    ###
    register: (->
        @get('tabs').setTabList @
    ).on 'didInsertElement'

    ###*
    # Initialize an empty tabs array
    #
    # @method initTabs
    # @private
    ###
    initTabs: (->
        @set 'tab_instances', ArrayProxy.create({content: []})
    ).on 'init'


    ###*
    # Add a tab to the tab list
    #
    # @method addTab
    # @param tab {Tab} the tab to add.
    # @private
    ###
    addTab: (tab) ->
        @get('tab_instances').addObject tab

    ###*
    # Remove a tab from the tab list
    #
    # @method removeTab
    # @param tab {Tab} the tab to remove.
    # @private
    ###
    removeTab: (tab) ->
        @get('tab_instances').removeObject tab

        #if the removed tab is selected then set the previous tab as selected
        if @get('tabs.selected') is tab
            tabIdx = tab.get 'index'
            nextIdx = tabIdx is 0 ? tabIdx : tabIdx - 1
            @get('tabs').select @get('tab_instances').objectAt nextIdx 

`export default TabList;`
