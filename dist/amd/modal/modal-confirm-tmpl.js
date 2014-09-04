define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#em-modal id=confirm-id configName=configName model-id=model-id open-if=open-if close-if=close-if}}\n    {{#em-modal-title}}\n        {{#em-modal-toggler class=\"close\"}}<span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>{{/em-modal-toggler}}\n        <h4 class=\"modal-title\">{{title}}</h4>\n    {{/em-modal-title}}\n    {{#em-modal-body}}\n        {{message}}\n    {{/em-modal-body}}\n    {{#em-modal-footer}}\n        <button type=\"button\" class=\"btn btn-primary\" {{action \"confirmPressed\"}}>Yes</button>\n        {{#em-modal-toggler class=\"btn btn-default\"}}No{{/em-modal-toggler}}\n    {{/em-modal-footer}}\n{{/em-modal}}");
  });