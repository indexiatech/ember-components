#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy, computed} from 'ember'`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# A tree component
#
# @class Tree
###
Tree = Component.extend WithConfigMixin,
    tagName: 'ul'
    layoutName: 'em-tree'
    classNameBindings: ['styleClasses']
    styleClasses: (->
        @get('config.tree.classes')?.join(" ")
    ).property()

    ###*
    # The model to render as the root node of the tree
    # this property is expected to be defined by the user
    ###
    model: undefined

    ###*
    # True if node's children should be loaded asynchronously
    # This gives the opportunity to the user to invoke an async call to the server to retrieve data for the current
    # branch being opened
    ###
    async: false
`export default Tree`
