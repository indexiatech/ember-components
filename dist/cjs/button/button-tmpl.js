"use strict";
exports["default"] = Ember.Handlebars.compile("{{#if icon-classes}}\n    <i {{bind-attr class=\'icon-classes\'}}></i>\n{{/if}}\n{{label}}");