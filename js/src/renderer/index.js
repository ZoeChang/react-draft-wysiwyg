import Embedded from './Embedded';
import getImageComponent from '../Renderer/Image';
import Table from './Table/createTable';

const getBlockRenderFunc = (config, customBlockRenderer) => {
  const {
    tableEditsChange, tableEdits, onChange: onEditorChange,
    isReadOnly, readOnly, translations, tableSelectionChange,
    getTableSelection
  } = config;
  return (block) => {
    if (typeof customBlockRenderer === 'function') {
      const renderedComponent = customBlockRenderer(block, config, config.getEditorState);
      if (renderedComponent) return renderedComponent;
    }
    if (block.getType() === 'atomic') {
      const editorState = config.getEditorState()
      const contentState = editorState.getCurrentContent()
      const entity = contentState.getEntity(block.getEntityAt(0))
      if (entity && entity.type === 'IMAGE') {
        return {
          component: getImageComponent(config),
          editable: false,
        };
      } else if (entity && entity.type === 'EMBEDDED_LINK') {
        return {
          component: Embedded,
          editable: false,
        };
      } else if (entity && entity.type === 'TABLE') {
        return {
          component: Table,
          editable: false,
          props: {
            getTableSelection,
            tableSelectionChange,
            translations,
            onEditorChange,
            editorState,
            isReadOnly,
            readOnly,
            entity,
            onStartEdit: (blockKey) => {
              tableEditsChange(tableEdits.set(blockKey, true));
            },
            onFinishEdit: (blockKey, newContentState) => {
              tableEditsChange(tableEdits.remove(blockKey))
            },
            onRemove: () => {},
          },
        };
      }
    }
    return undefined;
  };
};

export default getBlockRenderFunc;
