define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#each children}}\n    {{em-tree-node model=this tree=view.tree async=controller.async targetObject=controller.targetObject}}\n{{/each}}");
  });