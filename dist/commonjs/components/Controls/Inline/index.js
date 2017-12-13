'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftjsUtils = require('draftjs-utils');

var _draftJs = require('draft-js');

var _common = require('../../../Utils/common');

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inline = function (_Component) {
  _inherits(Inline, _Component);

  function Inline() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Inline);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Inline.__proto__ || Object.getPrototypeOf(Inline)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentStyles: {}
    }, _this.changeKeys = function (style) {
      if (style) {
        var st = {};
        (0, _common.forEach)(style, function (key, value) {
          st[key === 'CODE' ? 'monospace' : key.toLowerCase()] = value;
        });
        return st;
      }
    }, _this.toggleInlineStyle = function (style) {
      var newStyle = style === 'monospace' ? 'CODE' : style.toUpperCase();
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var newState = _draftJs.RichUtils.toggleInlineStyle(editorState, newStyle);
      if (style === 'subscript' || style === 'superscript') {
        var removeStyle = style === 'subscript' ? 'SUPERSCRIPT' : 'SUBSCRIPT';
        var contentState = _draftJs.Modifier.removeInlineStyle(newState.getCurrentContent(), newState.getSelection(), removeStyle);
        newState = _draftJs.EditorState.push(newState, contentState, 'change-inline-style');
      }
      if (newState) {
        onChange(newState);
      }
    }, _this.expandCollapse = function () {
      _this.setState({
        expanded: _this.signalExpanded
      });
      _this.signalExpanded = false;
    }, _this.onExpandEvent = function () {
      _this.signalExpanded = !_this.state.expanded;
    }, _this.doExpand = function () {
      _this.setState({
        expanded: true
      });
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Inline, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentStyles: this.changeKeys((0, _draftjsUtils.getSelectionInlineStyle)(editorState))
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        this.setState({
          currentStyles: this.changeKeys((0, _draftjsUtils.getSelectionInlineStyle)(properties.editorState))
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.deregisterCallBack(this.expandCollapse);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          config = _props2.config,
          translations = _props2.translations;
      var _state = this.state,
          expanded = _state.expanded,
          currentStyles = _state.currentStyles;

      var InlineComponent = config.component || _Component3.default;
      return _react2.default.createElement(InlineComponent, {
        config: config,
        translations: translations,
        currentState: currentStyles,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onChange: this.toggleInlineStyle
      });
    }
  }]);

  return Inline;
}(_react.Component);

// todo: move all controls to separate folder controls
// make subscript less low


Inline.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.object.isRequired,
  modalHandler: _propTypes2.default.object,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
};
exports.default = Inline;