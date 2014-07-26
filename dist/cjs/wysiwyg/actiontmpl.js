"use strict";
exports["default"] = Ember.Handlebars.compile("{{#if icon}}\n    <i {{bind-attr class=icon}}></i>\n{{/if}}\n");