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

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_Component) {
  _inherits(List, _Component);

  function List() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, List);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = List.__proto__ || Object.getPrototypeOf(List)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false,
      currentBlockType: 'unstyled'
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
    }, _this.onChange = function (value) {
      if (value === 'unordered') {
        _this.toggleBlockType('unordered-list-item');
      } else if (value === 'ordered') {
        _this.toggleBlockType('ordered-list-item');
      } else if (value === 'indent') {
        _this.adjustDepth(1);
      } else {
        _this.adjustDepth(-1);
      }
    }, _this.toggleBlockType = function (blockType) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          editorState = _this$props.editorState;

      var newState = _draftJs.RichUtils.toggleBlockType(editorState, blockType);
      if (newState) {
        onChange(newState);
      }
    }, _this.adjustDepth = function (adjustment) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          editorState = _this$props2.editorState;

      var newState = (0, _draftjsUtils.changeDepth)(editorState, adjustment, 4);
      if (newState) {
        onChange(newState);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(List, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentBlockType: (0, _draftjsUtils.getSelectedBlocksType)(editorState)
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        this.setState({
          currentBlockType: (0, _draftjsUtils.getSelectedBlocksType)(properties.editorState)
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
          currentBlockType = _state.currentBlockType;

      var ListComponent = config.component || _Component3.default;
      var listType = void 0;
      if (currentBlockType === 'unordered-list-item') {
        listType = 'unordered';
      } else if (currentBlockType === 'ordered-list-item') {
        listType = 'ordered';
      }
      return _react2.default.createElement(ListComponent, {
        config: config,
        translations: translations,
        currentState: { listType: listType },
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        onChange: this.onChange
      });
    }
  }]);

  return List;
}(_react.Component);

List.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  editorState: _propTypes2.default.object.isRequired,
  modalHandler: _propTypes2.default.object,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
};
exports.default = List;