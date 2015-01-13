define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#if icon}}\n    <i {{bind-attr class=icon}}></i>\n{{/if}}\n{{#if is-open}}\n\n  <ul style=\"display: block;\" class=\"dropdown-menu\" role=\"menu\">\n    <li><a {{action \'heading\' \'p\'}} href=\"#\">Normal</a></li>\n    <li><a {{action \'heading\' \'blockquote\'}} href=\"#\">Quote</a></li>\n\n    <li class=\"divider\"></li>\n\n    <li><a {{action \'heading\' \'h1\'}} href=\"#\"><h1>Heading 1</h1></a></li>\n    <li><a {{action \'heading\' \'h2\'}} href=\"#\"><h2>Heading 2</h2></a></li>\n    <li><a {{action \'heading\' \'h3\'}} href=\"#\"><h3>Heading 3</h3></a></li>\n\n  </ul>\n{{/if}}");
  });