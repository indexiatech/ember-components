#(c) 2014 Indexia, Inc.

`import { Component, ArrayProxy, computed, run } from 'ember';`

#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# `{{em-list}}` component.
#
# Holds a list of `{{em-list-item}}` components.
#
# @class List
###
List = Component.extend WithConfigMixin, 
    tagName: 'ul'

    attributeBindings: ['style']

    classNameBindings: ['styleClasses']
    styleClasses: (->
        @get('config.list.listClasses')?.join(" ")
    ).property()

    ###*
    # The current selected item
    #
    # @property selected
    # @type Item
    ###
    selected: undefined

    ###*
    # True if this list supports selection
    ###
    selection: true

    ###*
    # List can be bound to models, models can be a property or an object that the list is bound to.
    # When model changes, the list will give an opportunity to every item within the list to react upon the model change,
    # Items then can change their state according to the change.
    ###
    models: undefined

    ###*
    # The selected item index
    #
    # @property selectedIdx
    # @type Number
    ###
    selectedIdx: (->
        @get('items').indexOf @get('selected')
    ).property 'selected'

    ###*
    # Initialize an empty items array
    #
    # @method initItems
    # @private
    ###
    initItems: (->
        @set 'items', ArrayProxy.create({content: []})
    ).on 'init'


    ###*
    # Add an item to the item list
    #
    # @method addItem
    # @param item {Item} the item to add.
    # @private
    ###
    addItem: (item) ->
        @get('items').addObject item

    ###*
    # Remove an item from the item list
    #
    # @method removeItem
    # @param item {Item} the item to remove.
    # @private
    ###
    removeItem: (item) ->
        @get('items').removeObject item

    ###*
    # Select the given item.
    #
    # @method select
    # @param {Object} an item instance to select.
    # @see selected
    # @see selected-idx
    ###
    select: (item) ->
        #Handle no selection state
        if not @get('selection')
            item.sendAction 'on-click', item
        else
            #TODO: Why we initially having an undefined item?
            return if not item or @get('selected') is item
            Em.debug "Selecting tab: #{item.get('index')}"
            #the if condition is because the user may pass another object initially to bind the selected property
            @get('selected').sendAction 'on-deselect', @get('selected') if @get('selected')?.sendAction
            @set 'selected', item
            @get('selected').sendAction 'on-select', @get('selected')
            @set 'selected-idx', item.get 'index'
    
            @get('items').forEach((i) =>
                return if @get('selected') is i
                i.sendAction 'on-selection-change', i, @get('selected')
            )
    
    notifyModelsChange: (->
        run.next(@, ->
            #Why this causes the models observer to stop notifying for changes?
            #@notifyPropertyChange 'models'
            @modelsDidChange()
        )
    ).on('didInsertElement')

    ###*
    # Listen to models changes, if model has change notify all children that the model has changed
    ###
    modelsDidChange: (->
        @get('items').forEach((i) =>
            i.sendAction 'on-model-change', i, @get('models')
        )
    ).observes('models', 'models.@each')

`export default List`
