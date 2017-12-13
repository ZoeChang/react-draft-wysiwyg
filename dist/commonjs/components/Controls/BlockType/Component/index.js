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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.blocksTypes = [{ label: 'Normal', displayName: _this.props.translations['components.controls.blocktype.normal'] }, { label: 'H1', displayName: _this.props.translations['components.controls.blocktype.h1'] }, { label: 'H2', displayName: _this.props.translations['components.controls.blocktype.h2'] }, { label: 'H3', displayName: _this.props.translations['components.controls.blocktype.h3'] }, { label: 'H4', displayName: _this.props.translations['components.controls.blocktype.h4'] }, { label: 'H5', displayName: _this.props.translations['components.controls.blocktype.h5'] }, { label: 'H6', displayName: _this.props.translations['components.controls.blocktype.h6'] }, { label: 'Blockquote', displayName: _this.props.translations['components.controls.blocktype.blockquote'] }], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LayoutComponent, [{
    key: 'renderFlat',
    value: function renderFlat() {
      var _props = this.props,
          className = _props.config.className,
          onChange = _props.onChange,
          blockType = _props.currentState.blockType;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-inline-wrapper', className) },
        this.blocksTypes.map(function (block, index) {
          return _react2.default.createElement(
            _Option2.default,
            {
              key: index,
              value: block.label,
              active: blockType === block.label,
              onClick: onChange
            },
            block.displayName
          );
        })
      );
    }
  }, {
    key: 'renderInDropdown',
    value: function renderInDropdown() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          className = _props2$config.className,
          dropdownClassName = _props2$config.dropdownClassName,
          blockType = _props2.currentState.blockType,
          expanded = _props2.expanded,
          doExpand = _props2.doExpand,
          onExpandEvent = _props2.onExpandEvent,
          doCollapse = _props2.doCollapse,
          onChange = _props2.onChange,
          translations = _props2.translations;

      var currentBlockData = this.blocksTypes.filter(function (blk) {
        return blk.label === blockType;
      });
      var currentLabel = currentBlockData && currentBlockData[0] && currentBlockData[0].displayName;
      return _react2.default.createElement(
        'div',
        { className: 'rdw-block-wrapper', 'aria-label': 'rdw-block-control' },
        _react2.default.createElement(
          _Dropdown.Dropdown,
          {
            className: (0, _classnames2.default)('rdw-block-dropdown', className),
            optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
            onChange: onChange,
            expanded: expanded,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent
          },
          _react2.default.createElement(
            'span',
            null,
            currentLabel || translations['components.controls.blocktype.blocktype']
          ),
          this.blocksTypes.map(function (block, index) {
            return _react2.default.createElement(
              _Dropdown.DropdownOption,
              {
                active: blockType === block.label,
                value: block.label,
                key: index
              },
              block.displayName
            );
          })
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var config = this.props.config;
      var inDropdown = config.inDropdown;

      var blocks = this.blocksTypes.filter(function (_ref2) {
        var label = _ref2.label;
        return config.options.includes(label);
      });
      return inDropdown ? this.renderInDropdown(blocks) : this.renderFlat(blocks);
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
  currentState: _propTypes2.default.object,
  translations: _propTypes2.default.object
};
exports.default = LayoutComponent;