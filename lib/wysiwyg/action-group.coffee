#(c) 2014 Indexia, Inc.

`import {Component, computed, Handlebars} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# ActionGroup component
#
# @class ActionGroup
###
ActionGroup = Component.extend WithConfigMixin,
    classNameBindings: ['styleClasses']
    styleClasses: (->
        @get('config.wysiwyg.actionGroupClasses')?.join(" ")
    ).property()

    toolbar: computed.alias 'parentView'
    wysiwyg: computed.alias 'parentView.parentView'

    register: (->
        @get('toolbar').addGroup @
    ).on 'didInsertElement'

    unregister: (->
        @get('toolbar').removeGroup @
    ).on 'willDestroyElement'

`export default ActionGroup;`

