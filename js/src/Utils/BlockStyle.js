// The function will return block inline styles using block level meta-data
export function blockStyleFn(editorState, block: Object): string {
  const blockAlignment = block.getData() && block.getData().get('text-align');
  if (blockAlignment) {
    return `rdw-${blockAlignment}-aligned-block`;
  }
  if (block.getType() === 'atomic') {
    const contentState = editorState.getCurrentContent()
    const entity = contentState.getEntity(block.getEntityAt(0))
    if (entity && entity.type === 'IMAGE') {
      const { width, height, alignment } = entity.get('data')
      return `imageAtom-${alignment}-w:${width}-h:${height}`
    }
    return 'superAtom'
  }
  return '';
}
