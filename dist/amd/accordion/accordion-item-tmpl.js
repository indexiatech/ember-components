define(
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.compile("<!--panel-heading-->\n<!--panel-title-->\n<!--accordion-toggle-->\n\n<!--panel-collapse collapse-->\n<!--panel-body-->\n<div {{bind-attr class=panelHeaderClasses}}>\n    <h4 {{bind-attr class=panelTitleClasses}} style=\"cursor: pointer;\">\n        <a {{bind-attr class=panelTogglerClasses}}>\n            {{view.title}}\n        </a>\n    </h4>\n</div>\n<div {{bind-attr class=panelBodyContainerClasses}}>\n    <div {{bind-attr class=panelBodyClasses}}>{{yield}}</div>\n</div>");
  });