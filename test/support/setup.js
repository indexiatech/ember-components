emq.globalize();

//TODO: workaround until we include config properly
Em.Config = Em.Eu.Config.create();
setResolver(Ember.DefaultResolver.extend({
    testSubjects: {
        'component:em-tabs': Em.EC.TabsComponent,
        'component:em-tab-list': Em.EC.TabListComponent,
        'component:em-tab': Em.EC.TabComponent
    },
    resolve: function(fullName) {
        return this.testSubjects[fullName] || this._super.apply(this, arguments);
    }
}).create());

Function.prototype.compile = function() {
    var template = this.toString().split('\n').slice(1,-1).join('\n') + '\n';
        return Ember.Handlebars.compile(template);
    }

function lookupComponent(id) {
    return Ember.View.views[id];
}

