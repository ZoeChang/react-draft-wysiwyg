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

var _Dropdown = require('../../../Dropdown');

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.options = ['unordered', 'ordered', 'indent', 'outdent'], _this.toggleBlockType = function (blockType) {
      var onChange = _this.props.onChange;

      onChange(blockType);
    }, _this.indent = function () {
      var onChange = _this.props.onChange;

      onChange('indent');
    }, _this.outdent = function () {
      var onChange = _this.props.onChange;

      onChange('outdent');
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LayoutComponent, [{
    key: 'renderInFlatList',


    // todo: evaluate refactoring this code to put a loop there and in other places also in code
    // hint: it will require moving click handlers
    value: function renderInFlatList() {
      var _props = this.props,
          config = _props.config,
          listType = _props.currentState.listType;
      var options = config.options,
          unordered = config.unordered,
          ordered = config.ordered,
          indent = config.indent,
          outdent = config.outdent,
          className = config.className;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-list-wrapper', className), 'aria-label': 'rdw-list-control' },
        options.indexOf('unordered') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'unordered',
            onClick: this.toggleBlockType,
            className: (0, _classnames2.default)(unordered.className),
            active: listType === 'unordered'
          },
          _react2.default.createElement('i', {
            className: unordered.icon
          })
        ),
        options.indexOf('ordered') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'ordered',
            onClick: this.toggleBlockType,
            className: (0, _classnames2.default)(ordered.className),
            active: listType === 'ordered'
          },
          _react2.default.createElement('i', {
            className: ordered.icon
          })
        ),
        options.indexOf('indent') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            onClick: this.indent,
            className: (0, _classnames2.default)(indent.className)
          },
          _react2.default.createElement('i', {
            className: indent.icon
          })
        ),
        options.indexOf('outdent') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            onClick: this.outdent,
            className: (0, _classnames2.default)(outdent.className)
          },
          _react2.default.createElement('i', {
            className: outdent.icon
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
          doCollapse = _props2.doCollapse,
          doExpand = _props2.doExpand,
          onExpandEvent = _props2.onExpandEvent,
          onChange = _props2.onChange,
          listType = _props2.currentState.listType;
      var options = config.options,
          className = config.className,
          dropdownClassName = config.dropdownClassName;

      return _react2.default.createElement(
        _Dropdown.Dropdown,
        {
          className: (0, _classnames2.default)('rdw-list-dropdown', className),
          optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
          onChange: onChange,
          expanded: expanded,
          doExpand: doExpand,
          doCollapse: doCollapse,
          onExpandEvent: onExpandEvent,
          'aria-label': 'rdw-list-control'
        },
        _react2.default.createElement('i', {
          className: (0, _toolbar.getFirstIcon)(config)
        }),
        this.options.filter(function (option) {
          return options.indexOf(option) >= 0;
        }).map(function (option, index) {
          return _react2.default.createElement(
            _Dropdown.DropdownOption,
            {
              key: index,
              value: option,
              className: (0, _classnames2.default)('rdw-list-dropdownOption', config[option].className),
              active: listType === option
            },
            _react2.default.createElement('i', {
              className: config[option].icon
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

  return LayoutComponent;
}(_react.Component);

LayoutComponent.propTypes = {
  expanded: _propTypes2.default.bool,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onExpandEvent: _propTypes2.default.func,
  config: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  currentState: _propTypes2.default.object
};
exports.default = LayoutComponent;