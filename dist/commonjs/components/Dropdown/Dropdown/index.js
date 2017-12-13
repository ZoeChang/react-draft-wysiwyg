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

var _common = require('../../../Utils/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Dropdown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      highlighted: -1
    }, _this.onChange = function (value) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value);
      }
      _this.toggleExpansion();
    }, _this.setHighlighted = function (highlighted) {
      _this.setState({
        highlighted: highlighted
      });
    }, _this.toggleExpansion = function () {
      var _this$props = _this.props,
          doExpand = _this$props.doExpand,
          doCollapse = _this$props.doCollapse,
          expanded = _this$props.expanded,
          isTablePicker = _this$props.isTablePicker;

      if (isTablePicker) return;
      if (expanded) {
        doCollapse();
      } else {
        doExpand();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Dropdown, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        this.setState({
          highlighted: -1
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          expanded = _props.expanded,
          children = _props.children,
          className = _props.className,
          optionWrapperClassName = _props.optionWrapperClassName,
          ariaLabel = _props.ariaLabel,
          onExpandEvent = _props.onExpandEvent;
      var highlighted = this.state.highlighted;

      var options = children.slice(1, children.length);
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-dropdown-wrapper', className),
          'aria-expanded': expanded,
          'aria-label': ariaLabel || 'rdw-dropdown'
        },
        _react2.default.createElement(
          'a',
          {
            className: 'rdw-dropdown-selectedtext',
            onClick: onExpandEvent
          },
          children[0],
          _react2.default.createElement('div', {
            className: (0, _classnames2.default)({
              'rdw-dropdown-carettoclose': expanded,
              'rdw-dropdown-carettoopen': !expanded
            })
          })
        ),
        expanded ? _react2.default.createElement(
          'ul',
          {
            className: (0, _classnames2.default)('rdw-dropdown-optionwrapper', optionWrapperClassName),
            onClick: _common.stopPropagation
          },
          _react2.default.Children.map(options, function (option, index) {
            var temp = option && _react2.default.cloneElement(option, {
              onSelect: _this2.onChange,
              highlighted: highlighted === index,
              setHighlighted: _this2.setHighlighted,
              index: index
            });
            return temp;
          })
        ) : undefined
      );
    }
  }]);

  return Dropdown;
}(_react.Component);

// onKeyDown: Function = (event: Object): void => {
//   const { expanded, children, doCollapse } = this.props;
//   const { highlighted } = this.state;
//   let actioned = false;
//   if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
//     if (!expanded) {
//       this.toggleExpansion();
//       actioned = true;
//     } else {
//       this.setHighlighted((highlighted === children[1].length - 1) ? 0 : highlighted + 1);
//       actioned = true;
//     }
//   } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
//     this.setHighlighted(highlighted <= 0 ? children[1].length - 1 : highlighted - 1);
//     actioned = true;
//   } else if (event.key === 'Enter') {
//     if (highlighted > -1) {
//       this.onChange(this.props.children[1][highlighted].props.value);
//       actioned = true;
//     } else {
//       this.toggleExpansion();
//       actioned = true;
//     }
//   } else if (event.key === 'Escape') {
//     doCollapse();
//     actioned = true;
//   }
//   if (actioned) {
//     event.preventDefault();
//   }
// };


Dropdown.propTypes = {
  children: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  expanded: _propTypes2.default.bool,
  doExpand: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onExpandEvent: _propTypes2.default.func,
  optionWrapperClassName: _propTypes2.default.string,
  ariaLabel: _propTypes2.default.string
};
exports.default = Dropdown;