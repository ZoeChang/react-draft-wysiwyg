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

var _toolbar = require('../../../../Utils/toolbar');

var _Option = require('../../../Option');

var _Option2 = _interopRequireDefault(_Option);

var _Dropdown = require('../../../Dropdown');

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
      showModal: false,
      linkTarget: '',
      linkTitle: '',
      linkTargetOption: _this.props.config.defaultTargetOption
    }, _this.removeLink = function () {
      var onChange = _this.props.onChange;

      onChange('unlink');
    }, _this.addLink = function () {
      var onChange = _this.props.onChange;
      var _this$state = _this.state,
          linkTitle = _this$state.linkTitle,
          linkTarget = _this$state.linkTarget,
          linkTargetOption = _this$state.linkTargetOption;

      onChange('link', linkTitle, linkTarget, linkTargetOption);
    }, _this.updateValue = function (event) {
      _this.setState(_defineProperty({}, '' + event.target.name, event.target.value));
    }, _this.updateTarget = function (event) {
      _this.setState({
        linkTargetOption: event.target.checked ? '_blank' : '_self'
      });
    }, _this.hideModal = function () {
      _this.setState({
        showModal: false
      });
    }, _this.signalExpandShowModal = function () {
      var _this$props = _this.props,
          onExpandEvent = _this$props.onExpandEvent,
          _this$props$currentSt = _this$props.currentState,
          link = _this$props$currentSt.link,
          selectionText = _this$props$currentSt.selectionText;
      var linkTargetOption = _this.state.linkTargetOption;

      onExpandEvent();
      _this.setState({
        showModal: true,
        linkTarget: link && link.target,
        linkTargetOption: link && link.targetOption || linkTargetOption,
        linkTitle: link && link.title || selectionText
      });
    }, _this.forceExpandAndShowModal = function () {
      var _this$props2 = _this.props,
          doExpand = _this$props2.doExpand,
          _this$props2$currentS = _this$props2.currentState,
          link = _this$props2$currentS.link,
          selectionText = _this$props2$currentS.selectionText;
      var linkTargetOption = _this.state.linkTargetOption;

      doExpand();
      _this.setState({
        showModal: true,
        linkTarget: link && link.target,
        linkTargetOption: link && link.targetOption || linkTargetOption,
        linkTitle: link && link.title || selectionText
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        this.setState({
          showModal: false,
          linkTarget: '',
          linkTitle: '',
          linkTargetOption: this.props.config.defaultTargetOption
        });
      }
    }
  }, {
    key: 'renderAddLinkModal',
    value: function renderAddLinkModal() {
      var _props = this.props,
          popupClassName = _props.config.popupClassName,
          doCollapse = _props.doCollapse,
          translations = _props.translations;
      var _state = this.state,
          linkTitle = _state.linkTitle,
          linkTarget = _state.linkTarget,
          linkTargetOption = _state.linkTargetOption;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-link-modal', popupClassName),
          onClick: _common.stopPropagation
        },
        _react2.default.createElement(
          'span',
          { className: 'rdw-link-modal-label' },
          translations['components.controls.link.linkTitle']
        ),
        _react2.default.createElement('input', {
          className: 'rdw-link-modal-input',
          onChange: this.updateValue,
          onBlur: this.updateValue,
          name: 'linkTitle',
          value: linkTitle
        }),
        _react2.default.createElement(
          'span',
          { className: 'rdw-link-modal-label' },
          translations['components.controls.link.linkTarget']
        ),
        _react2.default.createElement('input', {
          className: 'rdw-link-modal-input',
          onChange: this.updateValue,
          onBlur: this.updateValue,
          name: 'linkTarget',
          value: linkTarget
        }),
        _react2.default.createElement(
          'span',
          { className: 'rdw-link-modal-target-option' },
          _react2.default.createElement('input', {
            type: 'checkbox',
            defaultChecked: linkTargetOption === '_blank',
            value: '_blank',
            onChange: this.updateTarget
          }),
          _react2.default.createElement(
            'span',
            null,
            translations['components.controls.link.linkTargetOption']
          )
        ),
        _react2.default.createElement(
          'span',
          { className: 'rdw-link-modal-buttonsection' },
          _react2.default.createElement(
            'button',
            {
              className: 'rdw-link-modal-btn',
              onClick: this.addLink,
              disabled: !linkTarget || !linkTitle
            },
            translations['generic.add']
          ),
          _react2.default.createElement(
            'button',
            {
              className: 'rdw-link-modal-btn',
              onClick: doCollapse
            },
            translations['generic.cancel']
          )
        )
      );
    }
  }, {
    key: 'renderInFlatList',
    value: function renderInFlatList() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          options = _props2$config.options,
          link = _props2$config.link,
          unlink = _props2$config.unlink,
          className = _props2$config.className,
          currentState = _props2.currentState,
          expanded = _props2.expanded;
      var showModal = this.state.showModal;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('rdw-link-wrapper', className), 'aria-label': 'rdw-link-control' },
        options.indexOf('link') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            value: 'unordered-list-item',
            className: (0, _classnames2.default)(link.className),
            onClick: this.signalExpandShowModal,
            'aria-haspopup': 'true',
            'aria-expanded': showModal
          },
          _react2.default.createElement('i', {
            className: link.icon
          })
        ),
        options.indexOf('unlink') >= 0 && _react2.default.createElement(
          _Option2.default,
          {
            disabled: !currentState.link,
            value: 'ordered-list-item',
            className: (0, _classnames2.default)(unlink.className),
            onClick: this.removeLink
          },
          _react2.default.createElement('i', {
            className: unlink.icon
          })
        ),
        expanded && showModal ? this.renderAddLinkModal() : undefined
      );
    }
  }, {
    key: 'renderInDropDown',
    value: function renderInDropDown() {
      var _props3 = this.props,
          expanded = _props3.expanded,
          onExpandEvent = _props3.onExpandEvent,
          doCollapse = _props3.doCollapse,
          doExpand = _props3.doExpand,
          onChange = _props3.onChange,
          config = _props3.config,
          currentState = _props3.currentState;
      var options = config.options,
          link = config.link,
          unlink = config.unlink,
          className = config.className,
          dropdownClassName = config.dropdownClassName;
      var showModal = this.state.showModal;

      return _react2.default.createElement(
        'div',
        {
          className: 'rdw-link-wrapper',
          'aria-haspopup': 'true',
          'aria-label': 'rdw-link-control',
          'aria-expanded': expanded
        },
        _react2.default.createElement(
          _Dropdown.Dropdown,
          {
            className: (0, _classnames2.default)('rdw-link-dropdown', className),
            optionWrapperClassName: (0, _classnames2.default)(dropdownClassName),
            onChange: onChange,
            expanded: expanded && !showModal,
            doExpand: doExpand,
            doCollapse: doCollapse,
            onExpandEvent: onExpandEvent
          },
          _react2.default.createElement('i', {
            className: (0, _toolbar.getFirstIcon)(config)
          }),
          options.indexOf('link') >= 0 && _react2.default.createElement(
            _Dropdown.DropdownOption,
            {
              onClick: this.forceExpandAndShowModal,
              className: (0, _classnames2.default)('rdw-link-dropdownoption', link.className)
            },
            _react2.default.createElement('i', {
              className: link.icon
            })
          ),
          options.indexOf('unlink') >= 0 && _react2.default.createElement(
            _Dropdown.DropdownOption,
            {
              onClick: this.removeLink,
              disabled: !currentState.link,
              className: (0, _classnames2.default)('rdw-link-dropdownoption', unlink.className)
            },
            _react2.default.createElement('i', {
              className: unlink.icon
            })
          )
        ),
        expanded && showModal ? this.renderAddLinkModal() : undefined
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
  currentState: _propTypes2.default.object,
  translations: _propTypes2.default.object
};
exports.default = LayoutComponent;