#(c) 2014 Indexia, Inc.

moduleForComponent 'em-tabs', 'Tabs Component',
    needs: [
        'component:em-tab-list'
        'component:em-tab'
    ]

test 'render empty', ->
    comp = @subject()
    
    @.append();
    ok comp.get 'panels', 'Ensure panels are instantiated'
    equal comp.get('panels.length'), 0, 'Ensure 0 panels exist by default'
    ok ! comp.get 'selected', 'Ensure tab selection is null by default'
    ok ! comp.get 'tabList', 'Ensure no tabList exist by default.'

test 'render with empty tab-list', ->
    comp = @subject
        template: Em.Handlebars.compile '''
                {{#em-tab-list}}
                   {{#em-tab}}foo{{/em-tab}}
                {{/em-tab-list}}
        '''
    @.append()
    ok comp.get 'tabList', 'Ensure tabList was registered'

test 'Render tabs with tab-list and some tabs', ->
    comp = @subject
        template: Em.Handlebars.compile '''
            {{#em-tab-list}}
                {{#em-tab}}Foo{{/em-tab}}
                {{#em-tab}}Bar{{/em-tab}}
            {{/em-tab-list}}
        '''

    @.append()
    equal comp.get('tabList.tab_instances.length'), 2, 'Ensure 2 tabs were registered.'
