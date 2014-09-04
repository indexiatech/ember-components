define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("{{#em-modal-title}}\n    {{#em-modal-toggler class=\"close\"}}<span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>{{/em-modal-toggler}}\n    <h4 class=\"modal-title\">Enter link address</h4>\n{{/em-modal-title}}\n\n{{#em-modal-body}}\n      {{input placeholder=\"http://example.com\" action=\"addLink\" value=linkHref class=\"form-control\"}}\n{{/em-modal-body}}\n{{#em-modal-footer}}\n    {{#em-modal-toggler class=\"btn btn-default\"}}Close{{/em-modal-toggler}}\n    <button type=\"submit\" class=\"btn btn-primary\" {{ action \'addLink\' }}>Add link</button>\n{{/em-modal-footer}}\n");
  });