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

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line no-unused-vars

var Option = function (_Component) {
  _inherits(Option, _Component);

  function Option() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Option);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Option.__proto__ || Object.getPrototypeOf(Option)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function () {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onClick = _this$props.onClick,
          value = _this$props.value;

      if (!disabled) {
        onClick(value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Option, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          activeClassName = _props.activeClassName,
          active = _props.active,
          disabled = _props.disabled;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-option-wrapper', className, (_classNames = {}, _defineProperty(_classNames, 'rdw-option-active ' + activeClassName, active), _defineProperty(_classNames, 'rdw-option-disabled', disabled), _classNames)),
          onClick: this.onClick,
          'aria-selected': active
        },
        children
      );
    }
  }]);

  return Option;
}(_react.Component);

Option.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.any,
  value: _propTypes2.default.string,
  className: _propTypes2.default.string,
  activeClassName: _propTypes2.default.string,
  active: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool
};
exports.default = Option;