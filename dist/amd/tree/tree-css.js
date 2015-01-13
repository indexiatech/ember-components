define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile(".em-tree-node {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n}\n\n.em-tree-node-active {\n    background: #e7e7e7;\n}\n\nli.em-tree-node > span {\n    cursor: pointer;\n}\n\nli.em-tree-node > span > span.actions {\n    visibility: hidden;\n}\n\nli.em-tree-node > span:hover > span.actions {\n    visibility: visible;\n}");
  });