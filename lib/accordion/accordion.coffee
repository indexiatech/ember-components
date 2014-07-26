#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# Accordion component
#
# @class Accordion
###
Accordion = Component.extend WithConfigMixin,
    classNameBindings: ['styleClasses']

    styleClasses: (->
        @get('config.accordion.classes')?.join(" ")
    ).property()

    #The item index that is currently active
    'selected-idx': 0

    ###*
    # A list of {{#crossLink "AccordionItem"}}accordion-item{{/crossLink}} instances.
    ###
    items: undefined

    #The selected item
    selected: undefined

    initItems: (->
        @set 'items', ArrayProxy.create({content: []})
    ).on 'init'

    ###*
    # Add the given `AccordionItem` instance.
    ###
    addItem: (item) ->
        @get('items').addObject item

    ###*
    # Remove the given `AccordionItem` instance.
    ###
    removeItem: (item) ->
        @get('items').removeObject item

    ###*
    # Select the given item.
    #
    # @method select
    # @param {Object} an item instance to select.
    ###
    select: (item) ->
        #TODO: Why we initially having an undefined item?
        return if not item
        Em.debug "Selecting item: #{item.get('index')}"
        @set 'selected', item
        @set 'selected-idx', item.get 'index'


`export default Accordion;`