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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      embeddedLink: '',
      height: _this.props.config.defaultSize.height,
      width: _this.props.config.defaultSize.width
    }, _this.updateValue = function (event) {
      _this.setState(_defineProperty({}, '' + event.target.name, event.target.value));
    }, _this.onChange = function (event) {
      var onChange = _this.props.onChange;
      var _this$state = _this.state,
          embeddedLink = _this$state.embeddedLink,
          height = _this$state.height,
          width = _this$state.width;

      onChange(embeddedLink, height, width);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        var _props$config$default = this.props.config.defaultSize,
            height = _props$config$default.height,
            width = _props$config$default.width;

        this.setState({
          embeddedLink: '',
          height: height,
          width: width
        });
      }
    }
  }, {
    key: 'rendeEmbeddedLinkModal',
    value: function rendeEmbeddedLinkModal() {
      var _state = this.state,
          embeddedLink = _state.embeddedLink,
          height = _state.height,
          width = _state.width;
      var _props = this.props,
          popupClassName = _props.config.popupClassName,
          doCollapse = _props.doCollapse,
          translations = _props.translations;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-embedded-modal', popupClassName),
          onClick: _common.stopPropagation
        },
        _react2.default.createElement(
          'div',
          { className: 'rdw-embedded-modal-header' },
          _react2.default.createElement(
            'span',
            { className: 'rdw-embedded-modal-header-option' },
            translations['components.controls.embedded.embeddedlink'],
            _react2.default.createElement('span', { className: 'rdw-embedded-modal-header-label' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'rdw-embedded-modal-link-section' },
          _react2.default.createElement('input', {
            className: 'rdw-embedded-modal-link-input',
            placeholder: translations['components.controls.embedded.enterlink'],
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: embeddedLink,
            name: 'embeddedLink'
          }),
          _react2.default.createElement(
            'div',
            { className: 'rdw-embedded-modal-size' },
            _react2.default.createElement('input', {
              onChange: this.updateValue,
              onBlur: this.updateValue,
              value: height,
              name: 'height',
              className: 'rdw-embedded-modal-size-input',
              placeholder: 'Height'
            }),
            _react2.default.createElement('input', {
              onChange: this.updateValue,
              onBlur: this.updateValue,
              value: width,
              name: 'width',
              className: 'rdw-embedded-modal-size-input',
              placeholder: 'Width'
            })
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'rdw-embedded-modal-btn-section' },
          _react2.default.createElement(
            'button',
            {
              className: 'rdw-embedded-modal-btn',
              onClick: this.onChange,
              disabled: !embeddedLink || !height || !width
            },
            translations['generic.add']
          ),
          _react2.default.createElement(
            'button',
            {
              className: 'rdw-embedded-modal-btn',
              onClick: doCollapse
            },
            translations['generic.cancel']
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          icon = _props2$config.icon,
          className = _props2$config.className,
          expanded = _props2.expanded,
          onExpandEvent = _props2.onExpandEvent;

      return _react2.default.createElement(
        'div',
        {
          className: 'rdw-embedded-wrapper',
          'aria-haspopup': 'true',
          'aria-expanded': expanded,
          'aria-label': 'rdw-embedded-control'
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
        expanded ? this.rendeEmbeddedLinkModal() : undefined
      );
    }
  }]);

  return LayoutComponent;
}(_react.Component);

LayoutComponent.propTypes = {
  expanded: _propTypes2.default.bool,
  onExpandEvent: _propTypes2.default.func,
  doCollpase: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
};
exports.default = LayoutComponent;