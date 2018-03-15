'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blockStyleFn = blockStyleFn;
// The function will return block inline styles using block level meta-data
function blockStyleFn(editorState, block) {
  var blockAlignment = block.getData() && block.getData().get('text-align');
  if (blockAlignment) {
    return 'rdw-' + blockAlignment + '-aligned-block';
  }
  if (block.getType() === 'atomic') {
    var contentState = editorState.getCurrentContent();
    var entity = contentState.getEntity(block.getEntityAt(0));
    if (entity && entity.type === 'IMAGE') {
      var _entity$get = entity.get('data'),
          width = _entity$get.width,
          height = _entity$get.height,
          alignment = _entity$get.alignment;

      return 'imageAtom-' + alignment + '-w:' + width + '-h:' + height;
    }
    return 'superAtom';
  }
  return '';
}