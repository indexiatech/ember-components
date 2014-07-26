define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#each nodes}}\n    {{em-tree-node node=this async=controller.async targetObject=controller.targetObject}}\n{{/each}}");
  });