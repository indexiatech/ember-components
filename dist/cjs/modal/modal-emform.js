"use strict";
var Component = require("ember").Component;
var ArrayProxy = require("ember").ArrayProxy;
var run = require("ember").run;

var FormModal = require("./modal-form")["default"] || require("./modal-form");
var EmModalForm;

EmModalForm = FormModal.extend({
  classNameBindings: ['form'],
  attributeBindings: ['role'],
  role: 'form',
  model: void 0,
  submit_button: false
});

exports["default"] = EmModalForm;