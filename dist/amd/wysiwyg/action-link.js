define(
  ["ember","../modal/modal","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;
    var Handlebars = __dependency1__.Handlebars;

    var Modal = __dependency2__["default"] || __dependency2__;

    var Link, WithConfigMixin;

    WithConfigMixin = Em.Eu.WithConfigMixin;

    Link = Component.extend(WithConfigMixin, {
      tagName: 'a',
      layoutName: 'em-wysiwyg-action',
      classNameBindings: ['styleClasses', 'activeClasses'],
      linkHref: '',
      initModal: (function() {
        var container;
        container = this.get('container');
        container.register('view:link-modal-view', Modal.extend({
          templateName: 'em-wysiwyg-action-link',
          _parentView: this
        }));
        this.set('modal', container.lookup('view:link-modal-view'));
        return this.get('modal').append();
      }).on('init'),
      styleClasses: (function() {
        var _ref;
        return (_ref = this.get('config.wysiwyg.actionClasses')) != null ? _ref.join(" ") : void 0;
      }).property(),
      activeClasses: (function() {
        var _ref;
        if (this.get('active')) {
          return (_ref = this.get('config.wysiwyg.actionActiveClasses')) != null ? _ref.join(" ") : void 0;
        }
      }).property('active'),
      actions: {
        addLink: function() {
          this.get('editor').restoreSelection();
          this.get('editor').$().focus();
          if (this.get('linkHref')) {
            document.execCommand('CreateLink', 0, this.get('linkHref'));
          } else {
            document.execCommand('unlink', 0);
          }
          this.get('editor').saveSelection();
          this.get('wysiwyg').trigger('update_actions');
          return this.get('modal').close();
        }
      },
      click: function() {
        return this.get('modal').open();
      },
      wysiwyg: computed.alias('parentView.wysiwyg'),
      editor: computed.alias('wysiwyg.editor'),
      listenToUpdate: (function() {
        return this.get('wysiwyg').on('update_actions', (function(_this) {
          return function() {
            var container;
            container = _this.get('editor.selectionRange').commonAncestorContainer;
            if (container.nodeType === 3) {
              container = container.parentNode;
            }
            if (container.nodeName === "A") {
              _this.set('linkHref', Ember.$(container).attr('href'));
              return _this.set('active', true);
            } else {
              _this.set('linkHref', '');
              return _this.set('active', false);
            }
          };
        })(this));
      }).on('init')
    });

    __exports__["default"] = Link;;
  });