#(c) 2014 Indexia, Inc.

`import {Component, computed, ArrayProxy} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# AccordionItem component
#
# @class AccordionItem
###
AccordionItem = Component.extend WithConfigMixin,
    layoutName: 'em-accordion-item-tmpl'
    classNameBindings: ['styleClasses', 'selectedClass']
    accordion: computed.alias 'parentView'
    content: Ember.computed.alias 'accordion.content'

    ###*
    # Bind the specified attributes to the DOM element
    #
    # @property attributeBindings
    # @type Array
    ###
    attributeBindings: ['active'],

    selectedClass: (->
        if @get('selected')
            @get('config.accordion.itemSelectedClasses')?.join(" ")
        else null
    ).property 'selected'

    styleClasses: (->
        @get('config.accordion.itemClasses')?.join(" ")
    ).property()

    panelHeaderClasses: (->
        @get('config.accordion.panelHeaderClasses')?.join(" ")
    ).property()

    panelTitleClasses: (->
        @get('config.accordion.panelTitleClasses')?.join(" ")
    ).property()

    panelTogglerClasses: (->
        @get('config.accordion.panelTogglerClasses')?.join(" ")
    ).property()

    panelBodyContainerClasses: (->
        @get('config.accordion.panelBodyContainerClasses')?.join(" ")
    ).property()

    panelBodyClasses: (->
        @get('config.accordion.panelBodyClasses')?.join(" ")
    ).property()

    #The index of this item in the accordion
    index: (->
        @get('accordion.items').indexOf @
    ).property 'accordion.items.@each'

    register: (->
        @get('accordion').addItem @
    ).on 'init'

    unregister: (->
        @get('accordion').removeItem @
    ).on 'willDestroyElement'

    ###*
    # true if this item is currently selected.
    #
    # @property selected
    # @type Boolean
    ###
    selected: (->
        @get('accordion.selected') is @
    ).property('accordion.selected')

    active: (->
        if @get('selected') then "true" else null
    ).property('selected')

    ###*
    # Select this item.
    #
    # Bound to `click` event.
    #
    # @method select
    ###
    select: (->
        @get('accordion').select @
    ).on 'click'

    ###*
    # Select this item if it matches the {{#crossLink "Accordiong/select:method"}}selected-idx{{/crossLink}} property set by the Accordion component.
    #
    # @method selectByAccordionParam
    # @private
    ###
    selectByParam: (->
        #do nothing if the selected item is this item
        return if @get('accordion.selected')? is @
        idx = parseInt @get 'accordion.selected-idx', 10
        @select() if idx is @get 'index'
    ).observes('accordion.selected-idx').on('didInsertElement')

    ###*
    # Listen to `active` property changes and show / hide the item's content according to its state
    #
    # We use observes instead of properties as we need to invoke a method instead of calculating classes only
    # so in the future we can support a transition animation.
    ###
    activeDidChange: (->
        if @get('active')
            @show()
        else
            @hide()
    ).observes('active')

    hide: ->
        $accordionBody = @$('.panel-collapse')
        $accordionBody.removeClass('in')

    show: ->
        $accordionBody = @$('.panel-collapse')
        $accordionBody.addClass('in')

`export default AccordionItem;`
