#(c) 2014 Indexia, Inc.

`import {Component, computed} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin
StyleBindingsMixin = Em.Eu.StyleBindingsMixin

TabPanel = Component.extend WithConfigMixin, StyleBindingsMixin,
    classNameBindings: ['styleClasses']
    styleClasses: (->
        @get('config.tabs.tabPanelClasses')?.join(" ")
    ).property()
    styleBindings: ['height']
    attributeBindings: ['selected']

    ###*
    # The ancestor `Tabs` component
    # @property tabs
    # @type Tabs
    ###
    tabs: computed.alias 'parentView'

    ###*
    # A reference to the {{#crossLink "TabList}}TabList{{/crossLink}} instance.
    #
    # @property tabList
    # @type TabList
    ###
    tabList: computed.alias 'parentView.tabList'

    ###*
    # A reference to the {{#crossLink "Tabs}}{{/crossLink}}'s panels property.
    #
    # @property panels 
    # @type Array
    ###
    panels: computed.alias 'parentView.panels'

    ###*
    # The tab that refer to this tab pane
    #
    # @property tab
    # @type Tab
    ###
    tab: (->
        index = @get('panels').indexOf @
        tabs = @get 'tabList.tab_instances'
        tabs && tabs.objectAt index
    ).property('tabList.tab_instances.@each')

    selected: (->
        @get 'tab.selected'
    ).property('tab.selected')


    changeVisibility: (->
        @$().css('display', if @get('selected') then "" else 'none')
    ).observes('selected')


    register: (->
        @get('tabs').addTabPanel @
    ).on('didInsertElement')

    unregister: (->
        @get('tabs').removeTabPanel @
    ).on('willDestroyElement')

`export default TabPanel;`
