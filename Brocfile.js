//(c) 2014 Indexia, Inc.

var findBowerTrees = require('broccoli-bower');
var filterCoffeeScript = require('broccoli-coffee');
var filterTemplates = require('broccoli-template');
var mergeTrees = require('broccoli-merge-trees');
var makeModule = require('broccoli-dist-es6-module');
var pickFiles = require('broccoli-static-compiler');
var templateCompiler = require('broccoli-ember-hbs-template-compiler')

var app = 'lib';

function preprocess (tree) {
  tree = filterTemplates(tree, {
    extensions: ['hbs', 'handlebars'],
    compileFunction: 'Ember.Handlebars.compile'
  })
  tree = filterCoffeeScript(tree, {
    bare: true
  })
  return tree
}

app = preprocess(app)

var appModule = makeModule(app, {
    global: 'Em.EC',
    packageName: 'ember-components',
    main: 'main',
    shim: {
      'ember': 'Ember'
    }
});

module.exports = appModule