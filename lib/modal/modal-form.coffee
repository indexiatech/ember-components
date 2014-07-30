`import {ArrayProxy, run} from 'ember';`
`import Modal from './modal'`

###*
# A flavour of a {{#crossLink "Modal}}Modal{{/crossLink}} that handles form submission right.
# @class ModalForm
###
ModalForm = Modal.extend
    tagName: 'form'
    attributeBindings: ['in-async']

    'in-async': null

    'close-if-error': false

    error: null

    ###*
    # Handle form submit event.
    # Submit the form, if the event returns a promise, then wait for the promise to be fulfilled first before
    # closing the modal, if the promise returned an error, then the `error` property will be set with the given error object of the
    # promise, when error occurs, the modal will only get closed if the `close-if-error` property isn't set to false
    #
    # @method submitForm
    # @private
    ###
    submitForm: ((e) ->
        e.preventDefault()
        @sendAction 'on-submit', @, e
        if e.promise and "function" is typeof e.promise.then
            @set 'in-async', 'true'
            e.promise.then((r) =>
                @set 'in-async', null
                @close()
            , (err) =>
                @set 'in-async', null
                @set 'error', err
                @close() if @get('close-if-error')
            )
        else
            @close()
    ).on('submit')

    close: ->
        @set 'error', null
        @_super.apply @, arguments

`export default ModalForm`