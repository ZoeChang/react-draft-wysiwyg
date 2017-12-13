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

var DropDownOption = function (_Component) {
  _inherits(DropDownOption, _Component);

  function DropDownOption() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DropDownOption);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropDownOption.__proto__ || Object.getPrototypeOf(DropDownOption)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (event) {
      var _this$props = _this.props,
          onSelect = _this$props.onSelect,
          onClick = _this$props.onClick,
          value = _this$props.value,
          disabled = _this$props.disabled;

      if (!disabled) {
        if (onSelect) {
          onSelect(value);
        }
        if (onClick) {
          event.stopPropagation();
          onClick(value);
        }
      }
    }, _this.setHighlighted = function () {
      var _this$props2 = _this.props,
          setHighlighted = _this$props2.setHighlighted,
          index = _this$props2.index;

      setHighlighted(index);
    }, _this.resetHighlighted = function () {
      var setHighlighted = _this.props.setHighlighted;

      setHighlighted(-1);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DropDownOption, [{
    key: 'render',
    value: function render() {
      var _classNames;

      var _props = this.props,
          children = _props.children,
          active = _props.active,
          disabled = _props.disabled,
          highlighted = _props.highlighted,
          className = _props.className,
          activeClassName = _props.activeClassName,
          disabledClassName = _props.disabledClassName,
          highlightedClassName = _props.highlightedClassName;

      return _react2.default.createElement(
        'li',
        {
          className: (0, _classnames2.default)('rdw-dropdownoption-default', className, (_classNames = {}, _defineProperty(_classNames, 'rdw-dropdownoption-active ' + activeClassName, active), _defineProperty(_classNames, 'rdw-dropdownoption-highlighted ' + highlightedClassName, highlighted), _defineProperty(_classNames, 'rdw-dropdownoption-disabled ' + disabledClassName, disabled), _classNames)),
          onMouseEnter: this.setHighlighted,
          onMouseLeave: this.resetHighlighted,
          onClick: this.onClick,
          'aria-selected': active
        },
        children
      );
    }
  }]);

  return DropDownOption;
}(_react.Component);
// todo: review classname use above.


DropDownOption.propTypes = {
  children: _propTypes2.default.any,
  value: _propTypes2.default.any,
  onClick: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  setHighlighted: _propTypes2.default.func,
  index: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  active: _propTypes2.default.bool,
  highlighted: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  activeClassName: _propTypes2.default.string,
  disabledClassName: _propTypes2.default.string,
  highlightedClassName: _propTypes2.default.string
};
exports.default = DropDownOption;