define(
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var computed = __dependency1__.computed;

    var Editor, StyleBindingsMixin;

    StyleBindingsMixin = Em.Eu.StyleBindingsMixin;

    Editor = Component.extend(StyleBindingsMixin, {
      styleBindings: ['marginTop:margin-top', 'background'],
      attributeBindings: ['contenteditable'],
      contenteditable: 'true',
      marginTop: 10,
      background: 'white',
      wysiwyg: computed.alias('parentView'),
      updateToolbar: function(e) {
        return this.get('wysiwyg').trigger('update_actions');
      },
      keyUp: function() {
        this.saveSelection();
        return this.updateToolbar(this);
      },
      mouseUp: function() {
        this.saveSelection();
        return this.updateToolbar(this);
      },
      mouseOut: function() {
        this.saveSelection();
        return this.updateToolbar(this);
      },
      getCurrentSelectionRange: function() {
        var sel;
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          return sel.getRangeAt(0);
        }
      },
      saveSelection: function() {
        return this.set('selectionRange', this.getCurrentSelectionRange());
      },
      restoreSelection: function() {
        var e, selection;
        selection = window.getSelection();
        if (this.get('selectionRange')) {
          try {
            selection.removeAllRanges();
          } catch (_error) {
            e = _error;
            document.body.createTextRange().select();
            document.selection.empty();
          }
          return selection.addRange(this.get('selectionRange'));
        }
      },
      markSelection: function(input, color) {
        this.restoreSelection();
        if (document.queryCommandSupported('hiliteColor')) {
          document.execCommand('hiliteColor', 0, color || 'transparent');
        }
        return this.saveSelection();
      },
      register: (function() {
        return this.get('wysiwyg').setEditor(this);
      }).on('didInsertElement'),
      unregister: (function() {
        return this.get('wysiwyg').setEditor(void 0);
      }).on('willDestroyElement')
    });

    __exports__["default"] = Editor;;
  });