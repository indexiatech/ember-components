#(c) 2014 Indexia, Inc.

`import {Component, computed, Handlebars} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# `{{tab}}` component
# Add a new tab
#
# @class Tab
###
Tab = Component.extend WithConfigMixin,
    setTagName: (->
        @set 'tagName', @get('config.tabs.tabTag') || 'div'
    ).on 'init'

    ###*
    # Bind the specified attributes to the DOM element
    #
    # @property attributeBindings
    # @type Array
    ###
    attributeBindings: ['active'],

    classNameBindings: ['styleClasses', 'selectedClass']
    styleClasses: (->
        @get('config.tabs.tabClasses')?.join(" ")
    ).property()

    selectedClass: (->
        if @get('selected')
            @get('config.tabs.tabSelectedClasses')?.join(" ")
        else null
    ).property 'selected'


    ###*
    # A reference to the {{#crossLink "Tabs"}}Tabs{{/crossLink}} instance.
    # 
    # @property tabs
    # @type Tabs
    ###
    tabs: computed.alias 'parentView.parentView'

    ###*
    # A reference to the {{#crossLink "TabList}}TabList{{/crossLink}} instance.
    #
    # @property tabList
    # @type TabList
    ###
    tabList: computed.alias 'parentView'

    ###*
    # true if this tab is currently selected.
    #
    # @property selected
    # @type Boolean
    ###
    selected: (->
        @get('tabs.selected') is @
    ).property('tabs.selected')

    active: (->
        if @get('selected') then "true" else null
    ).property('selected')


    index: (->
        @get('tabList.tab_instances').indexOf @
    ).property 'tabList.tab_instances.@each'

    ###*
    # Select this tab.
    #
    # Bound to `click` event.
    #
    # @method select
    ###
    select: (->
        @get('tabs').select @
    ).on 'click'

    ###*
    # Select this tab if it matches the {{#crossLink "Tabs/select:method"}}selected-idx{{/crossLink}} property set by the Tabs component.
    #
    # @method selectByTabsParam
    # @private
    ###
    selectByTabsParam: (->
        #do nothing if the selected tab is this tab
        return if @get('tabs.selected')? is @
        idx = parseInt @get 'tabs.selected-idx', 10
        @select() if idx is @get 'index'
    ).observes('tabs.selected-idx').on('didInsertElement')

    ###*
    # Register this tab in the {{#crossLink "TabList"}}{{/crossLink}} component instance.
    #
    # @method register
    # @private
    ###
    register: (->
        @get('tabList').addTab @
    ).on 'didInsertElement'

    ###*
    # Unregister this tab from the {{#crossLink "TabList"}}{{/crossLink}} component instance.
    #
    # @method unregister
    # @private
    ###
    unregister: (->
        @get('tabList').removeTab @
    ).on 'willDestroyElement'

`export default Tab;`
