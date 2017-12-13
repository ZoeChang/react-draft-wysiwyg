'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _TableWrapper = require('./TableWrapper');

var _TableWrapper2 = _interopRequireDefault(_TableWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableBlockRenderMap = _immutable2.default.Map({
  'table-block': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'table',
    wrapper: _react2.default.createElement(_TableWrapper2.default, null)
  }
});

exports.default = tableBlockRenderMap;