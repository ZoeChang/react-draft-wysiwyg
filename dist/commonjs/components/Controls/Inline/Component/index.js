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

var _toolbar = require('../../../../Utils/toolbar');

var _Option = require('../../../Option');

var _Option2 = _interopRequireDefault(_Option);

var _Dropdown = require('../../../Dropdown');

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line no-unused-vars

var Inline = function (_Component) {
  _inherits(Inline, _Component);

  function Inline() {
    _classCallCheck(this, Inline);

    return _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
  }

  _createClass(Inline, [{
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props = this.props,
          config = _props.config,
          currentState = _props.currentState,
          onChange = _props.onChange;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-inline-wrapper', config.className), 'aria-label': 'rdw-inline-control' },
        config.options.map(function (style, index) {
          return _react2.default.createElement(
            _Option2.default,
            {
              key: index,
              value: style,
              onClick: onChange,
              className: (0, _classnames2.default)(config[style].className),
              active: currentState[style] === true || style === 'MONOSPACE' && currentState['CODE']
            },
            _react2.default.createElement('i', {
              className: config[style].icon
            })
          );
        })
      );
    }
  }, {
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _props2 = this.props,
          config = _props2.config,
          expanded = _props2.expanded,
          doExpand = _props2.doExpand,
          onExpandEvent = _props2.onExpandEvent,
          doCollapse = _props2.doCollapse,
          currentState = _props2.currentState,
          onChange = _props2.onChange;
      var className = config.className,
          dropdownClassName = config.dropdownClassName;

      return _react2.default.createElement(
        _Dropdown.Dropdown,
        {
          className: (0, _classnames2.default)('rdw-inline-dropdown', className),
          optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
          onChange: onChange,
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-inline-control'
        },
        _react2.default.createElement('img', {
          src: (0, _toolbar.getFirstIcon)(config),
          alt: ''
        }),
        config.options.map(function (style, index) {
          return _react2.default.createElement(
            _Dropdown.DropdownOption,
            {
              key: index,
              value: style,
              className: (0, _classnames2.default)('rdw-inline-dropdownoption', config[style].className),
              active: currentState[style] === true || style === 'MONOSPACE' && currentState['CODE']
            },
            _react2.default.createElement('i', {
              className: config[style].icon,
              alt: ''
            })
          );
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var inDropdown = this.props.config.inDropdown;

      if (inDropdown) {
        return this.renderInDropDown();
      }
      return this.renderInFlatList();
    }
  }]);

  return Inline;
}(_react.Component);

// todo: make subscript less low


Inline.propTypes = {
  expanded: _propTypes2.default.bool,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onExpandEvent: _propTypes2.default.func,
  config: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  currentState: _propTypes2.default.object
};
exports.default = Inline;