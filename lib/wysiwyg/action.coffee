#(c) 2014 Indexia, Inc.

`import {Component, computed, Handlebars} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

Action = Component.extend WithConfigMixin,
    tagName: 'a'
    templateName: 'em-wysiwyg-action'
    classNameBindings: ['styleClasses', 'activeClasses']
    styleClasses: (->
        @get('config.wysiwyg.actionClasses')?.join(" ")
    ).property()

    activeClasses: (->
        if @get('active')
            @get('config.wysiwyg.actionActiveClasses')?.join(" ")
    ).property 'active'

    click: ->
        @get('editor').restoreSelection()
        @get('editor').$().focus()
        commands = @get('command').split(' ')
        command = commands.shift()
        args = commands.join(' ')
        document.execCommand(command, 0, args)
        @get('editor').saveSelection()
        @get('wysiwyg').trigger 'update_actions'

    wysiwyg: computed.alias 'parentView.wysiwyg'
    editor: computed.alias 'wysiwyg.editor'
    
    listenToUpdate: (->
        @get('wysiwyg').on('update_actions', =>
            @set 'active', document.queryCommandState @get 'command'
        )
    ).on('init')

`export default Action;`
