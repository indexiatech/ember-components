#(c) 2014 Indexia, Inc.
`import {Component, ArrayProxy, computed} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# A node of a tree.
#
# @class TreeNode
###
TreeNode = Component.extend WithConfigMixin,
    attributeBindings: ['multi-selected']

    ###*
    # The model the tree node view is bound to
    ###
    model: undefined

    ###*
    # A reference to the tree view, this property is auto set during component instantiation
    ###
    tree: undefined

    ###*
    # A reference to the root model
    ###
    rootModel: computed.alias 'tree.model'

    ###*
    # True if the node is currently expanded, meaning its children are visible.
    ###
    expanded: computed.alias 'model.expanded'

    ###*
    # True if this node view is currently checked
    # This is only relevant if the tree configured to support multi selection
    ###
    'multi-selected': computed.alias 'model.selected'

    ###*
    # True if should render an icon tag for this node view
    ###
    hasIcon: true

    ###*
    # True if this node can be single selected
    ###
    selectable: true

    ###*
    # True if this node is currently single selected
    ###
    isSelected: (->
        @get('tree.selected') is @get('model')
    ).property('tree.selected')

    ###*
    # True if this node is currently loading,
    # Usually that means the node is defined asynchronously and its children are currently being loaded
    ###
    loading: false

    #The branch of this node
    branch: computed.alias 'parentView'

    ###*
    # true if the loading mode of the node's children should be async
    ###
    async: computed.alias 'parentView.async'

    ###*
    # true if this is a leaf node, meaning it has no children
    ###
    leaf: (->
        not @get('model.children') or @get('model.children.length') is 0
    ).property('model.children.length')

    tagName: 'li'
    layoutName: 'em-tree-node'
    classNameBindings: ['styleClasses', 'expandedClasses', 'leafClasses']

    styleClasses: (->
        @get('config.tree.nodeClasses')?.join(" ")
    ).property()

    expandedClasses: (->
        if @get('expanded')
            @get('config.tree.nodeOpenClasses')?.join(" ")
        else
            @get('config.tree.nodeCloseClasses')?.join(" ")
    ).property('expanded', 'leaf', 'loading')

    nodeSelectedClasses: (->
        if @get('isSelected') then @get('config.tree.nodeSelectedClasses')?.join(" ") else null
    ).property('isSelected')

    addMultiSelectionToTreeSelection: (->
        if @get('multi-selected')
            @get('tree.multi-selection').pushObject @get('model')
        else
            @get('tree.multi-selection').removeObject @get('model')
    ).observes('multi-selected').on('init')

    iconClass: (->
        icons = []

        if @get('async')
            #Show loading mode
            if @get('loading')
                icons = icons.concat @get('config.tree.nodeLoadingIconClasses')
            #We don't have a children yet, that means we need to load them async, we show 'closed' icon even though there may not be
            #any childs beneath this node, we may enhance this behavior by asking the user whether the item has children beneath it
            else if not @get('model.children')
                icons = icons.concat @get('config.tree.nodeCloseIconClasses')
            #We have children loaded already
            else
                #No children for this one, then this is a leaf
                if @get('model.children.length') is 0
                    icons = icons.concat @get('config.tree.nodeLeafIconClasses')
                else
                    #There are children
                    icons = if @get('expanded') then icons.concat @get('config.tree.nodeOpenIconClasses') else icons.concat @get('config.tree.nodeCloseIconClasses')
        else
            if @get('leaf')
                icons = icons.concat @get('config.tree.nodeLeafIconClasses')
            else 
                icons = if @get('expanded') then icons.concat @get('config.tree.nodeOpenIconClasses') else icons.concat @get('config.tree.nodeCloseIconClasses')
                    
        icons.join(" ")
    ).property('expanded', 'leaf', 'loading')

    leafClasses: (->
        if @get('leaf')
            @get('config.tree.nodeLeafClasses')?.join(" ")
    ).property('leaf')

    actions:
        toggle: ->
            #If already expanded then we only close
            if @get('async') and not @get('expanded') and not @get('model.children')
                @set 'loading', true
                @sendAction 'children', @get('model'), @
            else
                @toggleProperty 'expanded'

        select: ->
            return if not @get('selectable')
            @set 'tree.selected', @get('model')

        toggleSelection: ->
            if @get('multi-selected') then @set('multi-selected', '') else @set('multi-selected', 'true')

    children: 'getChildren'

    loadingHasChanged: (->
        if not @get('loading')
            @toggleProperty 'expanded'
    ).observes('loading')
`export default TreeNode;`
