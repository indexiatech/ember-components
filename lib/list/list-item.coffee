#(c) 2014 Indexia, Inc.

`import {Component, computed, Handlebars} from 'ember';`
`import AsListMixin from './as-item'`
#TODO: Import
WithConfigMixin = Em.Eu.WithConfigMixin

###*
# `{{em-list-item}}` component
# Add a new item to a list
#
# @class ListItem
###
ListItem = Component.extend WithConfigMixin, AsListMixin,
    tagName: 'li'

    ###*
    # Bind the specified attributes to the DOM element
    #
    # @property attributeBindings
    # @type Array
    ###
    attributeBindings: ['css'],

    classNameBindings: ['styleClasses']
    styleClasses: (->
        @get('config.list.itemClasses')?.join(" ")
    ).property()

`export default ListItem;`
