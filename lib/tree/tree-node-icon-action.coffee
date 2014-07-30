#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy, computed} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin
StyleBindingsMixin = Em.Eu.StyleBindingsMixin

###*
# An icon action of a tree node
# @class TreeNodeIconAction
###
TreeNodeIconAction = Component.extend WithConfigMixin, StyleBindingsMixin,
    attributeBindings: ['stickyMode:sticky']

    ###*
    # The tag name of the icon action,
    # default is `<i>` but can be replaced with any tag.
    # @property tagName
    # @public
    ###
    tagName: 'i'

    ###*
    # Bind the visibility css property,
    # this is required for the `sticky` property
    # @property styleBindings
    # @private
    ###
    styleBindings: 'visibility'

    ###*
    # Defines the css visibility according to the value of the `sticky` property
    # @property visibility
    # @private
    ###
    visibility: (->
        if @get('sticky') then 'visible' else undefined
    ).property('sticky')

    ###*
    # 'true' if the action icon should be sticky and not disappear when item is not hovered
    # @property sticky
    # @public
    ###
    sticky: false

    #This is because true is not enough for attributeBindings to work properly
    stickyMode: (->
        if @get('sticky') then 'true' else undefined
    ).property('sticky')

    ###*
    # Binds the specified css classes
    # @property classNameBindings
    # @private
    ###
    classNameBindings: ['iconClasses']

    ###*
    # Set the given array of classes
    # @property iconClasses
    # @private
    ###
    iconClasses: (->
        @get('meta.classes')?.join(" ")
    ).property('meta.classes')

    ###*
    # An alias to the node model of this action
    # @property node
    # @public
    ###
    node: computed.alias 'parentView.node'

    ###*
    # Invoked when the action is clicked
    # @method invokde
    ###
    invoked: (->
        @get('parentView.targetObject').send @get('meta.action'), @
    ).on('click')

`export default TreeNodeIconAction`
