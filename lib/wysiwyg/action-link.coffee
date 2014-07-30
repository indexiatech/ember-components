#(c) 2014 Indexia, Inc.

`import {Component, computed, Handlebars} from 'ember';`
`import Modal from '../modal/modal';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

Link = Component.extend WithConfigMixin,
    tagName: 'a'
    layoutName: 'em-wysiwyg-action'
    classNameBindings: ['styleClasses', 'activeClasses']
    linkHref: ''
    
    initModal: (->
        container = @get 'container'

        container.register 'view:link-modal-view', Modal.extend({
            templateName: 'em-wysiwyg-action-link'
            _parentView: @
        })

        @set 'modal', container.lookup('view:link-modal-view')
        @get('modal').append()
    ).on('init')

    styleClasses: (->
        @get('config.wysiwyg.actionClasses')?.join(" ")
    ).property()

    activeClasses: (->
        if @get('active')
            @get('config.wysiwyg.actionActiveClasses')?.join(" ")
    ).property 'active'

    actions:
        addLink: ->
            @get('editor').restoreSelection()
            @get('editor').$().focus()

            if @get 'linkHref'
                document.execCommand 'CreateLink', 0, @get 'linkHref'
            else
                document.execCommand 'unlink', 0

            @get('editor').saveSelection()
            @get('wysiwyg').trigger 'update_actions'
            @get('modal').close()

    click: ->
        @get('modal').open()
        

    wysiwyg: computed.alias 'parentView.wysiwyg'
    editor: computed.alias 'wysiwyg.editor'
    
    listenToUpdate: (->
        @get('wysiwyg').on('update_actions', =>
            container = @get('editor.selectionRange').commonAncestorContainer
            container = container.parentNode if container.nodeType == 3
            if container.nodeName is "A" 
                @set('linkHref', Ember.$(container).attr('href'))
                @set 'active', true
            else 
                @set 'linkHref', ''
                @set 'active', false
        )
    ).on('init')

`export default Link;`
