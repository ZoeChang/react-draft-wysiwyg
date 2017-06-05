import Embedded from './Embedded';
import getImageComponent from '../Renderer/Image';
import createTable from './Table/createTable';
import { EditorState } from 'draft-js'

const getBlockRenderFunc = (config, customBlockRenderer) => {
  const { tableEditsChange, tableEdits, onChange: onEditorChange } = config;
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
          component: createTable(),
          editable: false,
          props: {
            entity,
            onStartEdit: (blockKey) => {
              tableEditsChange(tableEdits.set(blockKey, true));
            },
            onFinishEdit: (blockKey, newContentState) => {
              tableEditsChange(tableEdits.remove(blockKey))

              // provided with newContentState in second argument will cause Editor/index.js
              // to re-render. Therefore, blockRendererFn will be triggered and thus
              // new table instance will be rendered.
              if (newContentState) {
                const newEditorState = EditorState.createWithContent(newContentState)
                onEditorChange(
                  EditorState.forceSelection(
                    newEditorState, newEditorState.getSelection()
                  )
                )
              }
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
