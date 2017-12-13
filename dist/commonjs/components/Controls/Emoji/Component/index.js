'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _common = require('../../../../Utils/common');

var _Option = require('../../../Option');

var _Option2 = _interopRequireDefault(_Option);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line no-unused-vars

var LayoutComponent = function (_Component) {
  _inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (event) {
      var onChange = _this.props.onChange;

      onChange(event.target.innerHTML);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LayoutComponent, [{
    key: 'renderEmojiModal',
    value: function renderEmojiModal() {
      var _this2 = this;

      var _props$config = this.props.config,
          popupClassName = _props$config.popupClassName,
          emojis = _props$config.emojis;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-emoji-modal', popupClassName),
          onClick: _common.stopPropagation
        },
        emojis.map(function (emoji, index) {
          return _react2.default.createElement(
            'span',
            {
              key: index,
              className: 'rdw-emoji-icon',
              alt: '',
              onClick: _this2.onChange
            },
            emoji
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$config2 = _props.config,
          icon = _props$config2.icon,
          className = _props$config2.className,
          expanded = _props.expanded,
          onExpandEvent = _props.onExpandEvent;

      return _react2.default.createElement(
        'div',
        {
          className: 'rdw-emoji-wrapper',
          'aria-haspopup': 'true',
          'aria-label': 'rdw-emoji-control',
          'aria-expanded': expanded
        },
        _react2.default.createElement(
          _Option2.default,
          {
            className: (0, _classnames2.default)(className),
            value: 'unordered-list-item',
            onClick: onExpandEvent
          },
          _react2.default.createElement('i', {
            className: icon
          })
        ),
        expanded ? this.renderEmojiModal() : undefined
      );
    }
  }]);

  return LayoutComponent;
}(_react.Component);

LayoutComponent.propTypes = {
  expanded: _propTypes2.default.bool,
  onExpandEvent: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object
};
exports.default = LayoutComponent;

// todo: unit test cases