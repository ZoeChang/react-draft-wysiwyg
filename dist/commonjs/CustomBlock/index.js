'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extendedBlockRenderMap = _draftJs.DefaultDraftBlockRenderMap.merge(_Table2.default);

exports.default = extendedBlockRenderMap;