define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if icon-classes}}\n    <i {{bind-attr class=\'icon-classes\'}}></i>\n{{/if}}\n{{label}}");
  });