#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy, run, View} from 'ember'`
`import Modal from './modal'`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin
StyleBindingsMixin = Em.Eu.StyleBindingsMixin

###*
# `{{em-modal-toggler}}` component.
#
# A component to toggle the visibility of a modal
#
# @class ModalToggler
# @event on-toggle triggered when the toggler is clicked before changing the visibility of the modal
#   @param toggler Toggler - This instance of the toggler
# @public
###
ModalToggler = Component.extend WithConfigMixin, StyleBindingsMixin,
    tagName: 'button'
    classNameBindings: ['styleClasses']

    ###*
    # The CSS classes that will be attached to the DOM element of the modal
    # Classes should be configured externally by using the `config` object.
    #
    # @property styleClasses
    # @private
    # @type String
    ###
    styleClasses: (->
        @get('config.modal.togglerClasses')?.join(" ")
    ).property()


    ###*
    # Toggle the visibility of the modal that this toggler controls.
    #
    # @method toggleVisibility
    # @private
    ###
    toggleVisibility: (->
        @sendAction 'on-toggle', @
        @get('modal').toggleVisibility()
    ).on('click')

    ###*
    # Find the modal view and set it as a `modal` property
    # A toggler can live as a descendant (not neccessarily a direct one) of a modal or outside of the modal chain
    # TODO: Assert modal existance
    # @method modalAsProperty
    ###
    modalAsProperty: (->
        modalAsAncestor = @nearestOfType(Modal)
        #Modal is our ancestor
        if modalAsAncestor
            @set 'modal', modalAsAncestor
        else
            #Wait until we surely have the modal view in views
            run.schedule('afterRender', @, ->
                @set 'modal', View.views[@get('modal-id')]
            )
    ).on('willInsertElement')

`export default ModalToggler`