'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Embedded = require('./Embedded');

var _Embedded2 = _interopRequireDefault(_Embedded);

var _Image = require('../Renderer/Image');

var _Image2 = _interopRequireDefault(_Image);

var _createTable = require('./Table/createTable');

var _createTable2 = _interopRequireDefault(_createTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getBlockRenderFunc = function getBlockRenderFunc(config, customBlockRenderer) {
  var tableEditsChange = config.tableEditsChange,
      tableEdits = config.tableEdits,
      onEditorChange = config.onChange,
      isReadOnly = config.isReadOnly,
      readOnly = config.readOnly,
      translations = config.translations,
      tableSelectionChange = config.tableSelectionChange,
      getTableSelection = config.getTableSelection;

  return function (block) {
    if (typeof customBlockRenderer === 'function') {
      var renderedComponent = customBlockRenderer(block, config, config.getEditorState);
      if (renderedComponent) return renderedComponent;
    }
    if (block.getType() === 'atomic') {
      var editorState = config.getEditorState();
      var contentState = editorState.getCurrentContent();
      var entity = contentState.getEntity(block.getEntityAt(0));
      if (entity && entity.type === 'IMAGE') {
        return {
          component: (0, _Image2.default)(config),
          editable: false,
          props: {
            readOnly: readOnly
          }
        };
      } else if (entity && entity.type === 'EMBEDDED_LINK') {
        return {
          component: _Embedded2.default,
          editable: false
        };
      } else if (entity && entity.type === 'TABLE') {
        return {
          component: _createTable2.default,
          editable: false,
          props: {
            getTableSelection: getTableSelection,
            tableSelectionChange: tableSelectionChange,
            translations: translations,
            onEditorChange: onEditorChange,
            editorState: editorState,
            isReadOnly: isReadOnly,
            readOnly: readOnly,
            entity: entity,
            onStartEdit: function onStartEdit(blockKey) {
              tableEditsChange(tableEdits.set(blockKey, true));
            },
            onFinishEdit: function onFinishEdit(blockKey, newContentState) {
              tableEditsChange(tableEdits.remove(blockKey));
            },
            onRemove: function onRemove() {}
          }
        };
      }
    }
    return undefined;
  };
};

exports.default = getBlockRenderFunc;