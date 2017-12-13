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

var _Option = require('../../../Option');

var _Option2 = _interopRequireDefault(_Option);

var _Dropdown = require('../../../Dropdown');

var _toolbar = require('../../../../Utils/toolbar');

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line no-unused-vars

var TextAlign = function (_Component) {
  _inherits(TextAlign, _Component);

  function TextAlign() {
    _classCallCheck(this, TextAlign);

    return _possibleConstructorReturn(this, (TextAlign.__proto__ || Object.getPrototypeOf(TextAlign)).apply(this, arguments));
  }

  _createClass(TextAlign, [{
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props = this.props,
          _props$config = _props.config,
          options = _props$config.options,
          left = _props$config.left,
          center = _props$config.center,
          right = _props$config.right,
          justify = _props$config.justify,
          className = _props$config.className,
          onChange = _props.onChange,
          textAlignment = _props.currentState.textAlignment;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-text-align-wrapper', className), 'aria-label': 'rdw-textalign-control' },
        options.indexOf('left') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'left',
            className: (0, _classnames2.default)(left.className),
            active: textAlignment === 'left',
            onClick: onChange
          },
          _react2.default.createElement('i', {
            className: left.icon
          })
        ),
        options.indexOf('center') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'center',
            className: (0, _classnames2.default)(center.className),
            active: textAlignment === 'center',
            onClick: onChange
          },
          _react2.default.createElement('i', {
            className: center.icon
          })
        ),
        options.indexOf('right') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'right',
            className: (0, _classnames2.default)(right.className),
            active: textAlignment === 'right',
            onClick: onChange
          },
          _react2.default.createElement('i', {
            className: right.icon
          })
        ),
        options.indexOf('justify') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'justify',
            className: (0, _classnames2.default)(justify.className),
            active: textAlignment === 'justify',
            onClick: onChange
          },
          _react2.default.createElement('i', {
            className: justify.icon
          })
        )
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
          textAlignment = _props2.currentState.textAlignment,
          onChange = _props2.onChange;
      var options = config.options,
          left = config.left,
          center = config.center,
          right = config.right,
          justify = config.justify,
          className = config.className,
          dropdownClassName = config.dropdownClassName;

      return _react2.default.createElement(
        _Dropdown.Dropdown,
        {
          className: (0, _classnames2.default)('rdw-text-align-dropdown', className),
          optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
          onChange: onChange,
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-textalign-control'
        },
        _react2.default.createElement('i', {
          className: textAlignment && config[textAlignment].icon || (0, _toolbar.getFirstIcon)(config)
        }),
        options.indexOf('left') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'left',
            active: textAlignment === 'left',
            className: (0, _classnames2.default)('rdw-text-align-dropdownOption', left.className)
          },
          _react2.default.createElement('i', {
            className: left.icon
          })
        ),
        options.indexOf('center') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'center',
            active: textAlignment === 'center',
            className: (0, _classnames2.default)('rdw-text-align-dropdownOption', center.className)
          },
          _react2.default.createElement('i', {
            className: center.icon
          })
        ),
        options.indexOf('right') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'right',
            active: textAlignment === 'right',
            className: (0, _classnames2.default)('rdw-text-align-dropdownOption', right.className)
          },
          _react2.default.createElement('i', {
            className: right.icon
          })
        ),
        options.indexOf('justify') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'justify',
            active: textAlignment === 'justify',
            className: (0, _classnames2.default)('rdw-text-align-dropdownOption', justify.className)
          },
          _react2.default.createElement('i', {
            className: justify.icon
          })
        )
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

  return TextAlign;
}(_react.Component);

TextAlign.propTypes = {
  expanded: _propTypes2.default.bool,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onExpandEvent: _propTypes2.default.func,
  config: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  currentState: _propTypes2.default.object
};
exports.default = TextAlign;