define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if hasIcon}}\n    <i {{action toggle}} {{bind-attr class=\"iconClass\"}}></i>\n{{else}}\n    <a {{action toggle}} class=\"text\">*</a>\n{{/if}}\n\n<span {{action select}} {{bind-attr class=\"nodeSelectedClasses\"}}>{{node.title}}</span>\n\n{{#if expanded}}\n    {{em-tree-branch node=node async=async targetObject=targetObject}}\n{{/if}}");
  });