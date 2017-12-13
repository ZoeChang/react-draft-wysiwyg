'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _draftjsUtils = require('draftjs-utils');

var _common = require('../../../Utils/common');

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Remove = function (_Component) {
  _inherits(Remove, _Component);

  function Remove() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Remove);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Remove.__proto__ || Object.getPrototypeOf(Remove)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false
    }, _this.removeAllInlineStyles = function (editorState) {
      var contentState = editorState.getCurrentContent();
      ['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'MONOSPACE', 'SUPERSCRIPT', 'SUBSCRIPT'].forEach(function (style) {
        contentState = _draftJs.Modifier.removeInlineStyle(contentState, editorState.getSelection(), style);
      });
      var customStyles = (0, _draftjsUtils.getSelectionCustomInlineStyle)(editorState, ['FONTSIZE', 'FONTFAMILY', 'COLOR', 'BGCOLOR']);
      (0, _common.forEach)(customStyles, function (key, value) {
        if (value) {
          contentState = _draftJs.Modifier.removeInlineStyle(contentState, editorState.getSelection(), value);
        }
      });

      return _draftJs.EditorState.push(editorState, contentState, 'change-inline-style');
    }, _this.removeInlineStyles = function () {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      onChange(_this.removeAllInlineStyles(editorState));
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

  _createClass(Remove, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var modalHandler = this.props.modalHandler;

      modalHandler.registerCallBack(this.expandCollapse);
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
      var _props = this.props,
          config = _props.config,
          translations = _props.translations;
      var expanded = this.state.expanded;

      var RemoveComponent = config.component || _Component3.default;
      return _react2.default.createElement(RemoveComponent, {
        config: config,
        translations: translations,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onChange: this.removeInlineStyles
      });
    }
  }]);

  return Remove;
}(_react.Component);

// todo: unit test coverage


Remove.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.object.isRequired,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
};
exports.default = Remove;