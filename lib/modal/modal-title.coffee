#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy, run} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin
StyleBindingsMixin = Em.Eu.StyleBindingsMixin

###*
# `{{em-modal-title}}` component.
#
# The title of the modal
#
# @class ModalTitle
# @public
###
ModalTitle = Component.extend WithConfigMixin, StyleBindingsMixin,
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
        @get('config.modal.titleClasses')?.join(" ")
    ).property()

    ###*
    # Register the title within the modal
    # Note: Expects this title to be the direct descendant of the modal component
    #
    # @method registerInModal
    # @private
    ###
    registerInModal: -> (
        this.get('parentView').setTitle @
    ).on('init')

`export default ModalTitle`