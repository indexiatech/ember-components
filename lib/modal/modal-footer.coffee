#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy, run} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin
StyleBindingsMixin = Em.Eu.StyleBindingsMixin

###*
# `{{em-modal-footer}}` component.
#
# The footer of the modal
#
# @class ModalFooter
# @public
###
ModalFooter = Component.extend WithConfigMixin, StyleBindingsMixin,
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
        @get('config.modal.footerClasses')?.join(" ")
    ).property()

`export default ModalFooter`