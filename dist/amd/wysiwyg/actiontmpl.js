define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if icon}}\n    <i {{bind-attr class=icon}}></i>\n{{/if}}\n");
  });