'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Option = require('../../../Option');

var _Option2 = _interopRequireDefault(_Option);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars

var RemoveComponent = function RemoveComponent(_ref) {
  var config = _ref.config,
      onChange = _ref.onChange;
  var icon = config.icon,
      className = config.className;

  return _react2.default.createElement(
    'div',
    { className: 'rdw-remove-wrapper', 'aria-label': 'rdw-remove-control' },
    _react2.default.createElement(
      _Option2.default,
      {
        className: (0, _classnames2.default)(className),
        onClick: onChange
      },
      _react2.default.createElement('i', {
        className: icon
      })
    )
  );
};

exports.default = RemoveComponent;