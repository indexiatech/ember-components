define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if is-open}}\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            {{yield}}\n        </div>\n    </div>\n{{/if}}");
  });