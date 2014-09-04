"use strict";
var ArrayProxy = require("ember").ArrayProxy;
var run = require("ember").run;

var Modal = require("./modal")["default"] || require("./modal");

/**
 * A flavour of a {{#crossLink "Modal}}Modal{{/crossLink}} that handles form submission right.
 * @class ModalForm
 */
var ModalForm;

ModalForm = Modal.extend({
  tagName: 'form',
  attributeBindings: ['in-async'],
  'in-async': null,
  'close-if-error': false,
  submitted: false,
  error: null,

  /**
   * Handle form submit event.
   * Submit the form, if the event returns a promise, then wait for the promise to be fulfilled first before
   * closing the modal, if the promise returned an error, then the `error` property will be set with the given error object of the
   * promise, when error occurs, the modal will only get closed if the `close-if-error` property isn't set to false
   *
   * @method submitForm
   * @private
   */
  submitForm: (function(e) {
    e.preventDefault();
    this.sendAction('on-submit', this, e);
    this.set('submitted', true);
    if (e.promise && "function" === typeof e.promise.then) {
      this.set('in-async', 'true');
      return e.promise.then((function(_this) {
        return function(r) {
          _this.set('in-async', null);
          return _this.close();
        };
      })(this), (function(_this) {
        return function(err) {
          _this.set('in-async', null);
          _this.set('error', err);
          if (_this.get('close-if-error')) {
            return _this.close();
          }
        };
      })(this));
    } else {
      return this.close();
    }
  }).on('submit'),
  close: function() {
    this.set('error', null);
    if (!this.get('submitted')) {
      this.sendAction('on-cancel', this);
    }
    return this._super.apply(this, arguments);
  }
});

exports["default"] = ModalForm;