import { DefaultDraftBlockRenderMap } from 'draft-js';
import TableBlockMap from './Table';

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(TableBlockMap);

export default extendedBlockRenderMap;
