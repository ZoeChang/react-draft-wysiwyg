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

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FontSize = function (_Component) {
  _inherits(FontSize, _Component);

  function FontSize() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FontSize);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FontSize.__proto__ || Object.getPrototypeOf(FontSize)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: undefined,
      currentFontSize: undefined
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
    }, _this.toggleFontSize = function (fontSize) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var newState = (0, _draftjsUtils.toggleCustomInlineStyle)(editorState, 'fontSize', fontSize);
      if (newState) {
        onChange(newState);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FontSize, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentFontSize: (0, _draftjsUtils.getSelectionCustomInlineStyle)(editorState, ['FONTSIZE']).FONTSIZE
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var editorElm = document.getElementsByClassName('DraftEditor-root');
      if (editorElm && editorElm.length > 0) {
        var styles = window.getComputedStyle(editorElm[0]);
        var defaultFontSize = styles.getPropertyValue('font-size');
        defaultFontSize = defaultFontSize.substring(0, defaultFontSize.length - 2);
        this.setState({
          defaultFontSize: defaultFontSize
        });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        this.setState({
          currentFontSize: (0, _draftjsUtils.getSelectionCustomInlineStyle)(properties.editorState, ['FONTSIZE']).FONTSIZE
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
          undoDisabled = _state.undoDisabled,
          redoDisabled = _state.redoDisabled,
          expanded = _state.expanded,
          currentFontSize = _state.currentFontSize;

      var FontSizeComponent = config.component || _Component3.default;
      var fontSize = currentFontSize && Number(currentFontSize.substring(9));
      return _react2.default.createElement(FontSizeComponent, {
        config: config,
        translations: translations,
        currentState: { fontSize: fontSize },
        onChange: this.toggleFontSize,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse
      });
    }
  }]);

  return FontSize;
}(_react.Component);

FontSize.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.object,
  modalHandler: _propTypes2.default.object,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
};
exports.default = FontSize;