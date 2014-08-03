#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy, run} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin
StyleBindingsMixin = Em.Eu.StyleBindingsMixin

###*
# `{{em-modal}}` component.
#
# Define a modal component that can be opened and closed, the modal visibility is controlled by the 
# {{#crossLink "ModalToggler"}}ModalToggler{{/crossLink}} component.
#
# ```handlebars
# {{#em-modal id="modal1"}}
#   {{#em-modal-title}}
#     {{#em-modal-toggler}}<span>&times;</span>{{/em-modal-toggler}}
#        <h4 class="modal-title">I'm a modal title</h4>
#    {{/em-modal-title}}
#    {{#em-modal-body}}
#        One fine body…
#    {{/em-modal-body}}
#    {{#em-modal-footer}}
#    {{#em-modal-toggler}}Close{{/em-modal-toggler}}
#    {{/em-modal-footer}}
# {{/em-modal}}
# {{#em-modal-toggler modal-id="modal1"}}Click me!{{/em-modal-toggler}}
# ```
#
# @class Modal
# @event will-open
# @event did-open
# @event will-close
# @public
###
ModalComponent = Component.extend WithConfigMixin, StyleBindingsMixin, 
    layoutName: 'em-modal'

    ###*
    # Properties bound as attributes the DOM element.
    # see documentation per property.
    # @property panels
    # @private
    # @type Array
    ###
    attributeBindings: ['is-open', 'did-open', 'tabindex']
    classNameBindings: ['styleClasses', 'styleOpenningClasses']
    styleBindings: ['display']

    ###*
    # Define the tabindex DOM property.
    # Required otherwise no keyDown events
    # @property tabindex
    ###
    tabindex: 0

    ###*
    # The CSS classes that will be attached to the DOM element of the modal
    # Classes should be configured externally by using the `config` object.
    # @property styleClasses
    # @private
    # @type String
    ###
    styleClasses: (->
        @get('config.modal.classes')?.join(" ")
    ).property('config.modal.classes')

    ###*
    # The class name that will be set when the modal gets opened
    # @property styleOpenningClasses
    # @public
    ###
    styleOpenningClasses: (->
        if @get('did-open') then "in" else ""
    ).property('did-open')

    ###
    # The CSS `display` property state.
    # @property display
    # @public
    ###
    display: (->
        if @get('did-open') then 'block' else 'none'
    ).property('did-open')

    ###*
    # `show` property is bound to the DOM element as an attribute.
    # This property is set to true immediately when the `toggleVisibility` method is invoked.
    #
    # This property can be used to start a transitioning effect, for example:
    # ```css
    #   em-modal[show] {
    #     opacity: 0;
    #     transition: opacity 100ms ease;
    #   }
    # ```
    # 
    # The transition effect should be ended when the modal is gets visible, see the property `shown` for more info.
    # @property opened
    # @see 'did-open'
    # @private
    ###
    'is-open': false

    ###*
    # A property bound to the DOM element that indicates that the modal has been made visible to the user. 
    # (after the DOM element was set with `display: block;`)
    #
    # This proeprty can be used by CSS to end a transitioning effect by setting the CSS `opacity` to a higher number, for example:
    #
    # ```css
    #   em-modal[shown] {
    #     opacity: 1;
    #   }
    }
    # ```
    # @property did-open
    # @private
    ###
    'did-open': false

    ###*
    # Open modal and make it visible.
    # @method open
    # @public
    ###
    open: ->
        #Notify consumers that the modal is going to be opened anytime soon.
        @trigger 'show'
        #Send action to the controller during modal open time
        @sendAction 'show', @
        @set 'is-open', 'true'
        #Wait for component to get rendered, required for CSS effects and to notify consumers that the modal is visible now
        run.schedule('afterRender', @, ->
            @set 'did-open', 'true'
            @trigger 'shown'
        )

    ###*
    # Close the modal by making it invisible.
    # @method close
    # @public
    ###
    close: ->
        #Notify consumers that the modal will close anytime soon.
        @trigger 'hide'
        #Send action to the controller during modal close time
        @sendAction 'hide', @
        @set 'is-open', undefined
        @set 'did-open', undefined
        #TODO: What about hidden event?

    ###*
    # Toggle the visibility of the modal based on its current state.
    # @method toggleVisibility
    # @public
    ###
    toggleVisibility: ->
        if @get('is-open') then @close() else @open()

    ###*
    # Set the title of the modal.
    # @method setTitle
    # @private
    # @type ModalTitle
    ###
    setTitle: (title) ->
        @set 'title', title

    ###*
    # Set the toggler of the modal
    # @method setToggler
    # @private
    # @type ModalToggler
    ###
    setToggler: (toggler) ->
        @set 'toggler', toggler

    ###*
    # Close the modal if the user clicks outside of the modal space.
    # @method closeIfClickedOutside
    # @private
    ###
    closeIfClickedOutside:  ((e)->
        return if e.target isnt @get('element')
        @close()
    ).on('click')

    ###*
    # Handle keyboard events
    # @method handleKeyboard
    # @private
    ###
    handleKeyboard: ((e) ->
        switch(e.keyCode)
            when 27 then @close()
    ).on('keyDown')

    ###*
    # Consumer can bind this property for a more fine grained control over when the modal is opened,
    # This is good for situations where openning the modal via the `toggler` is not enough.
    #
    # @property open-if
    # @public
    ###
    'open-if': false

    ###*
    # observers the `open-if` property, if set to true, then open the modal.
    # @method openIf
    # @private
    ###
    openIf: (->
        return if not @get('open-if')
        @open()
        @set 'open-if', false
    ).observes('open-if')    

    ###*
    # Consumer can bind this property for a more fine grained control over when the modal is closed,
    # This is good for situations where closing the modal via the `toggler` is not enough.
    #
    # @property close-if
    # @public
    ###
    'close-if': false

    ###*
    # observers the `close-if` property, if set to true, then close the modal.
    # @method closeIf
    # @private
    ###
    closeIf: (->
        return if not @get('close-if')
        @close()
        @set 'close-if', false
    ).observes('close-if')
`export default ModalComponent`
