(function () {
  var helloworld = (function () {
      'use strict';

      tinymce.PluginManager.add("helloworld", function (editor, url) {

          /*
          Add a custom icon to TinyMCE
           */
          editor.ui.registry.addIcon('bubbles', '<svg t="1570591335801" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="21659" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18"><defs><style type="text/css"></style></defs><path d="M857.6 956.8H166.4c-54.4 0-102.4-48-102.4-105.6v-182.4c0-19.2 12.8-32 32-32s32 12.8 32 32v182.4c0 22.4 16 41.6 38.4 41.6h694.4c19.2 0 38.4-19.2 38.4-41.6v-182.4c0-19.2 12.8-32 32-32s32 12.8 32 32v182.4c-3.2 57.6-48 105.6-105.6 105.6z" fill="#333333" p-id="21660"></path><path d="M512 764.8c-19.2 0-32-12.8-32-32v-640c0-19.2 12.8-32 32-32s32 12.8 32 32v640c0 19.2-12.8 32-32 32z" fill="#333333" p-id="21661"></path><path d="M720 326.4c-9.6 0-16-3.2-22.4-9.6L512 131.2l-185.6 185.6c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L489.6 64c12.8-12.8 32-12.8 44.8 0l208 208c12.8 12.8 12.8 32 0 44.8-6.4 6.4-12.8 9.6-22.4 9.6z" fill="#222f3e" p-id="21662"></path></svg>');

          /*
          Use to store the instance of the Dialog
           */
          var _dialog = false;

          /*
          An array of options to appear in the "Type" select box.
           */
          var _typeOptions = [];

          /**
           * Get the Dialog Configuration Object
           *
           * @returns {{buttons: *[], onSubmit: onSubmit, title: string, body: {}}}
           * @private
           */
          function _getDialogConfig()
          {
              return {
                  title: '上传附件',
                  body: {
                      type: 'panel',
                      items: [{
                          type: 'Upload',
                          name: 'Upload',
                          label: 'Dropdown',
                          items: _typeOptions,
                          flex: true
                      }]
                  },
                  onSubmit: function (api) {
                      // insert markup
                      editor.insertContent('<p>You selected Option ' + api.getData().type + '.</p>');

                      // close the dialog
                      api.close();
                  },
                  buttons: [
                      {
                          text: 'Close',
                          type: 'cancel',
                          onclick: 'close'
                      },
                      {
                          text: 'Insert',
                          type: 'submit',
                          primary: true,
                          enabled: false
                      }
                  ]
              };
          }

          /**
           * Plugin behaviour for when the Toolbar or Menu item is selected
           *
           * @private
           */
          function _onAction()
          {
              // Open a Dialog, and update the dialog instance var
              _dialog = editor.windowManager.open(_getDialogConfig());

              // block the Dialog, and commence the data update
              // Message is used for accessibility
              _dialog.block('Loading...');

              // Do a server call to get the items for the select box
              // We'll pretend using a setTimeout call
              setTimeout(function () {

                  // We're assuming this is what runs after the server call is performed
                  // We'd probably need to loop through a response from the server, and update
                  // the _typeOptions array with new values. We're just going to hard code
                  // those for now.
                  _typeOptions = [
                      {text: 'First Option', value: '1'},
                      {text: 'Second Option', value: '2'},
                      {text: 'Third Option', value: '3'}
                  ];

                  // re-build the dialog
                  _dialog.redial(_getDialogConfig());

                  // unblock the dialog
                  _dialog.unblock();

              }, 1000);
          }

          // Define the Toolbar button
          editor.ui.registry.addButton('helloworld', {
              text: "",
              icon: 'bubbles',
              onAction: _onAction
          });

          // Define the Menu Item
          editor.ui.registry.addMenuItem('helloworld', {
              text: 'Hello Menu Item',
              context: 'insert',
              icon: 'bubbles',
              onAction: _onAction
          });

          // Return details to be displayed in TinyMCE's "Help" plugin, if you use it
          // This is optional.
          return {
              getMetadata: function () {
                  return {
                      name: "Hello World example",
                      url: "https://www.martyfriedel.com/blog/tinymce-5-creating-a-plugin-with-a-dialog-and-custom-icons"
                  };
              }
          };
      });
  }());
})();