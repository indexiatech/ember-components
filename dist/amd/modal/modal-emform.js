define(
  ["ember","./modal-form","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var ArrayProxy = __dependency1__.ArrayProxy;
    var run = __dependency1__.run;

    var FormModal = __dependency2__["default"] || __dependency2__;
    var EmModalForm;

    EmModalForm = FormModal.extend({
      classNameBindings: ['form'],
      attributeBindings: ['role'],
      role: 'form',
      model: void 0,
      submit_button: false
    });

    __exports__["default"] = EmModalForm;
  });