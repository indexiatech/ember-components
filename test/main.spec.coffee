#(c) 2014 Indexia, Inc.

module "main"

test "Should register components on application init.", ->
  container =
    registry: {}
    register: (name, definition) ->
      @registry[name] = definition
      return

  initializer = Em.Application.initializers["em-components"]
  initializer.initialize container
  strictEqual container.registry["component:em-tabs"], Em.EC.TabsComponent
  strictEqual container.registry["component:em-tab-list"], Em.EC.TabListComponent
  return

