'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars

exports.default = function () {
  return _react2.default.createElement(
    'div',
    { className: 'rdw-spinner' },
    _react2.default.createElement('div', { className: 'rdw-bounce1' }),
    _react2.default.createElement('div', { className: 'rdw-bounce2' }),
    _react2.default.createElement('div', { className: 'rdw-bounce3' })
  );
};