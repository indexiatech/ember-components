#(c) 2014 Indexia, Inc.

`import {Mixin} from 'ember';`
`import {computed} from 'ember';`

###*
# Indicate that the component is an item with a list.
###
AsItem = Mixin.create
    attributeBindings: ['active', 'disabled']
    classNameBindings: ['selectedClass']

    ###*
    # A reference to the {{#crossLink "List"}}List{{/crossLink}} instance.
    # 
    # @property list
    # @type List
    ###
    list: computed.alias 'parentView'

    ###*
    # Get the index of this item within the list
    # 
    # @property index
    # @type int
    ###
    index: (->
        @get('list.items').indexOf @
    ).property 'list.items.@each'

    ###*
    # Register this item in the {{#crossLink "List"}}List{{/crossLink}} component instance.
    #
    # @method register
    # @private
    ###
    register: (->
        @get('list').addItem @
    ).on 'didInsertElement'

    ###*
    # Unregister this item from the {{#crossLink "List"}}List{{/crossLink}} component instance.
    #
    # @method unregister
    # @private
    ###
    unregister: (->
        @get('list').removeItem @
    ).on 'willDestroyElement'

    ###*
    # Select this item.
    #
    # Bound to `click` event.
    #
    # @method select
    ###
    select: (->
        @get('list').select @
    ).on 'click'

    selectedClass: (->
        if @get('selected')
            @get('config.list.itemSelectedClasses')?.join(" ") || @get('list.selectedClass')
        else null
    ).property 'selected'

    ###*
    # true if this item is currently selected.
    #
    # @property selected
    # @type Boolean
    ###
    selected: (->
        @get('list.selected') is @
    ).property('list.selected')

    active: (->
        if @get('selected') then "true" else null
    ).property('selected')

    ###*zTODOTODO
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

`export default AsItem`