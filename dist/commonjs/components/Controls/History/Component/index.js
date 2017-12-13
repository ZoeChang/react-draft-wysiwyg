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

var History = function (_Component) {
  _inherits(History, _Component);

  function History() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, History);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = History.__proto__ || Object.getPrototypeOf(History)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (obj) {
      var onChange = _this.props.onChange;

      onChange(obj);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(History, [{
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _props = this.props,
          config = _props.config,
          expanded = _props.expanded,
          doExpand = _props.doExpand,
          onExpandEvent = _props.onExpandEvent,
          doCollapse = _props.doCollapse,
          _props$currentState = _props.currentState,
          undoDisabled = _props$currentState.undoDisabled,
          redoDisabled = _props$currentState.redoDisabled;
      var options = config.options,
          undo = config.undo,
          redo = config.redo,
          className = config.className,
          dropdownClassName = config.dropdownClassName;

      return _react2.default.createElement(
        _Dropdown.Dropdown,
        {
          className: (0, _classnames2.default)('rdw-history-dropdown', className),
          optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-history-control'
        },
        _react2.default.createElement('i', {
          className: (0, _toolbar.getFirstIcon)(config)
        }),
        options.indexOf('undo') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'undo',
            onClick: this.onChange,
            disabled: undoDisabled,
            className: (0, _classnames2.default)('rdw-history-dropdownoption', undo.className)
          },
          _react2.default.createElement('i', {
            className: undo.icon
          })
        ),
        options.indexOf('redo') >= 0 && _react2.default.createElement(
          _Dropdown.DropdownOption,
          {
            value: 'redo',
            onClick: this.onChange,
            disabled: redoDisabled,
            className: (0, _classnames2.default)('rdw-history-dropdownoption', redo.className)
          },
          _react2.default.createElement('i', {
            className: redo.icon
          })
        )
      );
    }
  }, {
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          options = _props2$config.options,
          undo = _props2$config.undo,
          redo = _props2$config.redo,
          className = _props2$config.className,
          _props2$currentState = _props2.currentState,
          undoDisabled = _props2$currentState.undoDisabled,
          redoDisabled = _props2$currentState.redoDisabled;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-history-wrapper', className), 'aria-label': 'rdw-history-control' },
        options.indexOf('undo') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'undo',
            onClick: this.onChange,
            className: (0, _classnames2.default)(undo.className),
            disabled: undoDisabled
          },
          _react2.default.createElement('i', {
            className: undo.icon
          })
        ),
        options.indexOf('redo') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'redo',
            onClick: this.onChange,
            className: (0, _classnames2.default)(redo.className),
            disabled: redoDisabled
          },
          _react2.default.createElement('i', {
            className: redo.icon
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var config = this.props.config;

      if (config.inDropdown) {
        return this.renderInDropDown();
      }
      return this.renderInFlatList();
    }
  }]);

  return History;
}(_react.Component);

History.propTypes = {
  expanded: _propTypes2.default.bool,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onExpandEvent: _propTypes2.default.func,
  config: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  currentState: _propTypes2.default.object
};
exports.default = History;