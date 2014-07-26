#(c) 2014 Indexia, Inc.

`import {Component, computed} from 'ember';`
#TODO: Import
StyleBindingsMixin = Em.Eu.StyleBindingsMixin

Editor = Component.extend StyleBindingsMixin,
    styleBindings: ['marginTop:margin-top', 'background']
    attributeBindings: ['contenteditable']
    contenteditable: 'true'

    marginTop: 10
    background: 'white'

    wysiwyg: computed.alias 'parentView'

    updateToolbar: (e) ->
        @get('wysiwyg').trigger 'update_actions'
    
    keyUp: ->
        @saveSelection()
        @updateToolbar(@)

    mouseUp: ->
        @saveSelection()
        @updateToolbar(@)

    mouseOut: ->
        @saveSelection()
        @updateToolbar(@)

    getCurrentSelectionRange: ->
        sel = window.getSelection()
        if sel.getRangeAt && sel.rangeCount
            sel.getRangeAt(0)

    saveSelection: ->
        @set 'selectionRange', @getCurrentSelectionRange()

    restoreSelection: ->
        selection = window.getSelection()
        if (@get('selectionRange'))
            try
                selection.removeAllRanges()
            catch e
                document.body.createTextRange().select()
                document.selection.empty()

            selection.addRange @get('selectionRange')

    markSelection: (input, color) ->
        @restoreSelection()
        if document.queryCommandSupported 'hiliteColor'
            document.execCommand 'hiliteColor', 0, color || 'transparent'
        @saveSelection()

    register: (->
        @get('wysiwyg').setEditor @
    ).on 'didInsertElement'

    unregister: (->
        @get('wysiwyg').setEditor undefined
    ).on 'willDestroyElement'
`export default Editor;`
