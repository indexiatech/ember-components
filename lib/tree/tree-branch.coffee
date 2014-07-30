#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy, computed} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# A branch of a tree.
#
# @class TreeBranch
###
TreeBranch = Component.extend WithConfigMixin,
    ###*
    # The model to render its children within this branch
    # this property is set during component markup creation
    ###
    model: undefined

    ###*
    # A list of {{#crossLink "TreeNode"}}nodes{{/crossLink}} instances.
    ###
    children: computed.alias 'model.children'

    ###*
    # True if node's children should be loaded asynchronously
    # This gives the opportunity to the user to invoke an async call to the server to retrieve data for the current
    # branch being opened
    ###
    async: false

    tagName: 'ul'
    layoutName: 'em-tree-branch'
    classNameBindings: ['styleClasses']

    styleClasses: (->
        @get('config.tree.branchClasses')?.join(" ")
    ).property()

`export default TreeBranch;`
