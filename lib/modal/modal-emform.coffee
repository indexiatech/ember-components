#(c) 2014 Indexia, Inc.

`import {Component, ArrayProxy, run} from 'ember';`
`import FormModal from './modal-form'`

EmModalForm = FormModal.extend
    classNameBindings: ['form']
    attributeBindings: ['role']
    role: 'form'
    #Form model
    model: undefined
    submit_button: false

`export default EmModalForm`