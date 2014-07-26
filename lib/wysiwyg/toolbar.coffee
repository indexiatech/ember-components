#(c) 2014 Indexia, Inc.

`import {Component, computed, ArrayProxy} from 'ember';`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# Toolbar component
#
# @class Toolbar
###
Toolbar = Component.extend WithConfigMixin,
    classNameBindings: ['styleClasses']
    styleClasses: (->
        @get('config.wysiwyg.toolbarClasses')?.join(" ")
    ).property()

    groups: undefined

    initGroups: (->
        @set 'groups', ArrayProxy.create({content: []})
    ).on 'init'

    wysiwyg: computed.alias 'parentView'

    register: (->
        @get('wysiwyg').addToolbar @
    ).on 'didInsertElement'

    unregister: (->
        @get('wysiwyg').removeToolbar @
    ).on 'willDestroyElement'

    addGroup: (g) ->
        @get('groups').addObject g

    removeGroup: (g) ->
        @get('groups').removeObject g

`export default Toolbar;`
