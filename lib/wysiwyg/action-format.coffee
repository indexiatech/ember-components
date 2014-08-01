#(c) 2014 Indexia, Inc.

`import {Component, computed, Handlebars} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

Format = Component.extend WithConfigMixin,
    tagName: 'a'
    layoutName: 'em-wysiwyg-action-format'
    classNameBindings: ['styleClasses', 'activeClasses']
    styleClasses: (->
        @get('config.wysiwyg.actionClasses')?.join(" ")
    ).property()

    activeClasses: (->
        if @get('active')
            @get('config.wysiwyg.actionActiveClasses')?.join(" ")
    ).property 'active'

    'is-open': false

    closeDropdown: ->
        @set 'clickHanlder', !@get 'clickHanlder'
        if @get 'clickHanlder'
            @set 'is-open', false
            @set 'clickHanlder', false

    click: ->
        @set 'clickHanlder', true
        @set 'is-open', !@get('is-open')

    wysiwyg: computed.alias 'parentView.wysiwyg'
    editor: computed.alias 'wysiwyg.editor'
    
    eventInit: (->
        self = @
        callFn = ->
            self.get('closeDropdown').apply(self)

        document.addEventListener 'click', callFn, false
    ).on('init')

    actions: {
        heading: (type) ->
            @get('editor').restoreSelection()
            @get('editor').$().focus()
            document.execCommand('formatBlock', 0, type)
            @get('editor').saveSelection()
            @get('wysiwyg').trigger 'update_actions'
    }
`export default Format;`
