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

var _reactColor = require('react-color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


var LayoutComponent = function (_Component) {
  _inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentStyle: 'color',
      pickColor: '#36c'
    }, _this.setCurrentStyleBgcolor = function () {
      _this.setState({
        currentStyle: 'bgcolor'
      });
    }, _this.setCurrentStyleColor = function () {
      _this.setState({
        currentStyle: 'color'
      });
    }, _this.onChange = function (color) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          isTablePicker = _this$props.isTablePicker;
      var currentStyle = _this.state.currentStyle;

      if (isTablePicker) {
        _this.props.onTablePickerChange(currentStyle, color);
      } else {
        onChange(currentStyle, color);
      }
    }, _this.pickerChangeHandler = function (color) {
      _this.setState({ pickColor: color.hex });
      _this.onChange(color.hex);
    }, _this.renderModal = function () {
      var _this$props2 = _this.props,
          _this$props2$config = _this$props2.config,
          popupClassName = _this$props2$config.popupClassName,
          colors = _this$props2$config.colors,
          _this$props2$currentS = _this$props2.currentState,
          color = _this$props2$currentS.color,
          bgColor = _this$props2$currentS.bgColor,
          translations = _this$props2.translations;
      var currentStyle = _this.state.currentStyle;

      var currentSelectedColor = currentStyle === 'color' ? color : bgColor;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-colorpicker-modal', popupClassName),
          onClick: _common.stopPropagation
        },
        _react2.default.createElement(
          'span',
          { className: 'rdw-colorpicker-modal-header' },
          _react2.default.createElement(
            'span',
            {
              className: (0, _classnames2.default)('rdw-colorpicker-modal-style-label', { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'color' }),
              onClick: _this.setCurrentStyleColor
            },
            translations['components.controls.colorpicker.text']
          ),
          _react2.default.createElement(
            'span',
            {
              className: (0, _classnames2.default)('rdw-colorpicker-modal-style-label', { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'bgcolor' }),
              onClick: _this.setCurrentStyleBgcolor
            },
            translations['components.controls.colorpicker.background']
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'rdw-colorpicker-modal-options' },
          colors.map(function (color, index) {
            return _react2.default.createElement(
              _Option2.default,
              {
                value: color,
                key: index,
                className: 'rdw-colorpicker-option',
                activeClassName: 'rdw-colorpicker-option-active',
                active: currentSelectedColor === color,
                onClick: _this.onChange
              },
              _react2.default.createElement('span', {
                style: { backgroundColor: color },
                className: 'rdw-colorpicker-cube'
              })
            );
          })
        ),
        _react2.default.createElement('div', {
          style: {
            backgroundColor: _this.state.pickColor,
            height: '35px'
          }
        }),
        _react2.default.createElement(_reactColor.HuePicker, {
          color: _this.state.pickColor,
          onChangeComplete: _this.pickerChangeHandler,
          style: { wrap: { width: '100%' } }
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (!this.props.expanded && props.expanded) {
        this.setState({
          currentStyle: 'color'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$config = _props.config,
          icon = _props$config.icon,
          className = _props$config.className,
          expanded = _props.expanded,
          onExpandEvent = _props.onExpandEvent;

      return _react2.default.createElement(
        'div',
        {
          className: 'rdw-colorpicker-wrapper',
          'aria-haspopup': 'true',
          'aria-expanded': expanded,
          'aria-label': 'rdw-color-picker'
        },
        _react2.default.createElement(
          _Option2.default,
          {
            onClick: onExpandEvent,
            className: (0, _classnames2.default)(className)
          },
          _react2.default.createElement('i', {
            className: icon
          })
        ),
        expanded ? this.renderModal() : undefined
      );
    }
  }]);

  return LayoutComponent;
}(_react.Component);

LayoutComponent.propTypes = {
  expanded: _propTypes2.default.bool,
  onExpandEvent: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  currentState: _propTypes2.default.object,
  translations: _propTypes2.default.object
};
exports.default = LayoutComponent;