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
    ###*
    # The node model the tree node view is bound to
    ###
    node: undefined

    ###*
    # true if the node of this view is a root node
    ###
    isRootNode: computed.not 'node.hasParent'

    ###*
    # The root node model
    ###
    root: computed.alias 'node.root'

    ###*
    # True if the node is currently expanded, meaning its children are visible.
    ###
    expanded: false

    ###*
    # True if this node is currently checked
    # This is only relevant if the tree configured to support selection
    ###
    checked: false

    ###*
    # True if should render an icon tag for this node
    ###
    hasIcon: true

    ###*
    # True if nodes can be selected
    ###
    selectable: true

    ###*
    # True if this node is currently selected
    ###
    isSelected: (->
        @get('rootBranchView.selected') is @get('node')
    ).property('rootBranchView.selected')

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
    # Get the view of the root node
    ###
    rootNodeView: (->
        return @ if @get('isRootNode')
        view = @get('parentView')
        while (view)
            return view if view.get('isRootNode')
            view = view.get('parentView')
    ).property('node')

    ###*
    # The root branch view
    ###
    rootBranchView: (->
        @get('rootNodeView.parentView')
    ).property('rootNodeView')

    leaf: (->
        @get('node.children.length') is 0
    ).property('node.children.length')

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

    iconClass: (->
        icons = []

        if @get('async')
            #Show loading mode
            if @get('loading')
                icons = icons.concat @get('config.tree.nodeLoadingIconClasses')
            #We don't have a children yet, that means we need to load them async, we show 'closed' icon even though there may not be
            #any childs beneath this node, we may enhance this behavior by asking the user whether the item has children beneath it
            else if not @get('node.children')
                icons = icons.concat @get('config.tree.nodeCloseIconClasses')
            #We have children loaded already
            else
                #No children for this one, then this is a leaf
                if @get('node.children.length') is 0
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
            if @get('async') and not @get('expanded') and not @get('node.children')
                @set 'loading', true
                @sendAction 'children', @get('node'), @
            else
                @toggleProperty 'expanded'

        select: ->
            return if not @get('selectable')
            @set 'rootBranchView.selected', @get('node')

    children: 'getChildren'

    loadingHasChanged: (->
        if not @get('loading')
            @toggleProperty 'expanded'
    ).observes('loading')
`export default TreeNode;`
