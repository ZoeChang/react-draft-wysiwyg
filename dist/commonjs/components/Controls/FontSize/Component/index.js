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

var _Dropdown = require('../../../Dropdown');

var _styles2 = require('./styles.css');

var _styles3 = _interopRequireDefault(_styles2);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      defaultFontSize: undefined
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LayoutComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var editorElm = document.getElementsByClassName('DraftEditor-root');
      if (editorElm && editorElm.length > 0) {
        var _styles = window.getComputedStyle(editorElm[0]);
        var defaultFontSize = _styles.getPropertyValue('font-size');
        defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
        this.setState({
          defaultFontSize: defaultFontSize
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
          dropdownClassName = _props$config.dropdownClassName,
          options = _props$config.options,
          translations = _props.translations,
          onChange = _props.onChange,
          expanded = _props.expanded,
          doCollapse = _props.doCollapse,
          onExpandEvent = _props.onExpandEvent,
          doExpand = _props.doExpand,
          isTablePicker = _props.isTablePicker;
      var currentFontSize = this.props.currentState.fontSize;
      var defaultFontSize = this.state.defaultFontSize;

      defaultFontSize = Number(defaultFontSize);
      currentFontSize = currentFontSize || options && options.indexOf(defaultFontSize) >= 0 && defaultFontSize;
      return _react2.default.createElement(
        'div',
        { className: 'rdw-fontsize-wrapper', 'aria-label': 'rdw-font-size-control' },
        _react2.default.createElement(
          _Dropdown.Dropdown,
          {
            isTablePicker: isTablePicker,
            className: (0, _classnames2.default)('rdw-fontsize-dropdown', className),
            optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
            onChange: onChange,
            expanded: expanded,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent
          },
          currentFontSize ? _react2.default.createElement(
            'span',
            null,
            currentFontSize
          ) : _react2.default.createElement('img', {
            src: icon,
            alt: ''
          }),
          options.map(function (size, index) {
            return _react2.default.createElement(
              _Dropdown.DropdownOption,
              {
                className: 'rdw-fontsize-option',
                active: currentFontSize === size,
                value: size,
                key: index
              },
              size
            );
          })
        )
      );
    }
  }]);

  return LayoutComponent;
}(_react.Component);

LayoutComponent.propTypes = {
  expanded: _propTypes2.default.bool,
  onExpandEvent: _propTypes2.default.func,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  currentState: _propTypes2.default.object
};
exports.default = LayoutComponent;