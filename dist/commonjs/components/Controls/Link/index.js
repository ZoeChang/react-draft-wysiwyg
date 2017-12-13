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

var Link = function (_Component) {
  _inherits(Link, _Component);

  function Link() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Link);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expanded: false,
      link: undefined,
      selectionText: undefined
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
    }, _this.getCurrentValues = function () {
      var editorState = _this.props.editorState;
      var currentEntity = _this.state.currentEntity;

      var contentState = editorState.getCurrentContent();
      var currentValues = {};
      if (currentEntity && contentState.getEntity(currentEntity).get('type') === 'LINK') {
        currentValues.link = {};
        var entityRange = currentEntity && (0, _draftjsUtils.getEntityRange)(editorState, currentEntity);
        currentValues.link.target = currentEntity && contentState.getEntity(currentEntity).get('data').url;
        currentValues.link.targetOption = currentEntity && contentState.getEntity(currentEntity).get('data').target;
        currentValues.link.title = entityRange && entityRange.text;
      }
      currentValues.selectionText = (0, _draftjsUtils.getSelectionText)(editorState);
      return currentValues;
    }, _this.doCollapse = function () {
      _this.setState({
        expanded: false
      });
    }, _this.onChange = function (action, title, target, targetOption) {
      if (action === 'link') {
        _this.addLink(title, target, targetOption);
      } else {
        _this.removeLink();
      }
    }, _this.removeLink = function () {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;
      var currentEntity = _this.state.currentEntity;

      var selection = editorState.getSelection();
      if (currentEntity) {
        var entityRange = (0, _draftjsUtils.getEntityRange)(editorState, currentEntity);
        selection = selection.merge({
          anchorOffset: entityRange.start,
          focusOffset: entityRange.end
        });
        onChange(_draftJs.RichUtils.toggleLink(editorState, selection, null));
      }
    }, _this.addLink = function (linkTitle, linkTarget, linkTargetOption) {
      var _this$props2 = _this.props,
          editorState = _this$props2.editorState,
          onChange = _this$props2.onChange;
      var currentEntity = _this.state.currentEntity;

      var selection = editorState.getSelection();

      if (currentEntity) {
        var entityRange = (0, _draftjsUtils.getEntityRange)(editorState, currentEntity);
        selection = selection.merge({
          anchorOffset: entityRange.start,
          focusOffset: entityRange.end
        });
      }
      var entityKey = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', { url: linkTarget, target: linkTargetOption }).getLastCreatedEntityKey();

      var contentState = _draftJs.Modifier.replaceText(editorState.getCurrentContent(), selection, '' + linkTitle, editorState.getCurrentInlineStyle(), entityKey);
      var newEditorState = _draftJs.EditorState.push(editorState, contentState, 'insert-characters');

      // insert a blank space after link
      selection = newEditorState.getSelection().merge({
        anchorOffset: selection.get('anchorOffset') + linkTitle.length,
        focusOffset: selection.get('anchorOffset') + linkTitle.length
      });
      newEditorState = _draftJs.EditorState.acceptSelection(newEditorState, selection);
      contentState = _draftJs.Modifier.insertText(newEditorState.getCurrentContent(), selection, ' ', newEditorState.getCurrentInlineStyle(), undefined);
      onChange(_draftJs.EditorState.push(newEditorState, contentState, 'insert-characters'));
      _this.doCollapse();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Link, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          editorState = _props.editorState,
          modalHandler = _props.modalHandler;

      if (editorState) {
        this.setState({
          currentEntity: (0, _draftjsUtils.getSelectionEntity)(editorState)
        });
      }
      modalHandler.registerCallBack(this.expandCollapse);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(properties) {
      var newState = {};
      if (properties.editorState && this.props.editorState !== properties.editorState) {
        newState.currentEntity = (0, _draftjsUtils.getSelectionEntity)(properties.editorState);
      }
      this.setState(newState);
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
      var expanded = this.state.expanded;

      var _getCurrentValues = this.getCurrentValues(),
          link = _getCurrentValues.link,
          selectionText = _getCurrentValues.selectionText;

      var LinkComponent = config.component || _Component3.default;
      return _react2.default.createElement(LinkComponent, {
        config: config,
        translations: translations,
        expanded: expanded,
        onExpandEvent: this.onExpandEvent,
        doExpand: this.doExpand,
        doCollapse: this.doCollapse,
        currentState: {
          link: link,
          selectionText: selectionText
        },
        onChange: this.onChange
      });
    }
  }]);

  return Link;
}(_react.Component);

Link.propTypes = {
  editorState: _propTypes2.default.object.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  modalHandler: _propTypes2.default.object,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
};
exports.default = Link;

// todo refct
// 1. better action names here
// 2. align update signatue
// 3. align current value signature