#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# WYSIWYG component
#
# @class Wysiwyg
###
Wysiwyg = Component.extend WithConfigMixin,
    classNameBindings: ['styleClasses']

    styleClasses: (->
        @get('config.wysiwyg.classes')?.join(" ")
    ).property()

    ###*
    # A list of {{#crossLink "Toolbar"}}toolbar{{/crossLink}} instances.
    ###
    toolbars: undefined

    ###*
    # The editor view
    ###
    editor: undefined

    initToolbars: (->
        @set 'toolbars', ArrayProxy.create({content: []})
    ).on 'init'

    ###*
    # Add the given `Toolbar` instance.
    ###
    addToolbar: (toolbar) ->
        @get('toolbars').addObject toolbar

    ###*
    # Remove the given `Toolbar` instance.
    ###
    removeToolbar: (toolbar) ->
        @get('toolbars').removeObject toolbar

    ###*
    # Set the editor instance
    ###
    setEditor: (editor) ->
        @set 'editor', editor

    asHtmlUpdater: (->
        @set 'as_html', @get('editor').$().html().replace(/(<br>|\s|<div><br><\/div>|&nbsp;)*$/, '');
    ).on 'update_actions'
`export default Wysiwyg;`
