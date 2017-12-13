'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _draftjsUtils = require('draftjs-utils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _modals = require('../../event-handler/modals');

var _modals2 = _interopRequireDefault(_modals);

var _focus = require('../../event-handler/focus');

var _focus2 = _interopRequireDefault(_focus);

var _keyDown = require('../../event-handler/keyDown');

var _keyDown2 = _interopRequireDefault(_keyDown);

var _suggestions = require('../../event-handler/suggestions');

var _suggestions2 = _interopRequireDefault(_suggestions);

var _BlockStyle = require('../../Utils/BlockStyle');

var _draftHTMLConverter = require('../../Utils/draftHTMLConverter');

var _htmlBeauty = require('../../Utils/htmlBeauty');

var _htmlBeauty2 = _interopRequireDefault(_htmlBeauty);

var _toolbar = require('../../Utils/toolbar');

var _common = require('../../Utils/common');

var _Controls = require('../Controls');

var _Controls2 = _interopRequireDefault(_Controls);

var _Link = require('../../Decorators/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Mention = require('../../Decorators/Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _HashTag = require('../../Decorators/HashTag');

var _HashTag2 = _interopRequireDefault(_HashTag);

var _Renderer = require('../../Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _CustomBlock = require('../../CustomBlock');

var _CustomBlock2 = _interopRequireDefault(_CustomBlock);

var _defaultToolbar = require('../../config/defaultToolbar');

var _defaultToolbar2 = _interopRequireDefault(_defaultToolbar);

var _i18n = require('../../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WysiwygEditor = function (_Component) {
  _inherits(WysiwygEditor, _Component);

  function WysiwygEditor(props) {
    _classCallCheck(this, WysiwygEditor);

    var _this = _possibleConstructorReturn(this, (WysiwygEditor.__proto__ || Object.getPrototypeOf(WysiwygEditor)).call(this, props));

    _initialiseProps.call(_this);

    var toolbar = (0, _toolbar.mergeRecursive)(_defaultToolbar2.default, props.toolbar);
    _this.state = {
      editorState: undefined,
      editorFocused: false,
      tableEdits: (0, _immutable.Map)(),
      isHtmlMode: false,
      tableHTMLCacheString: '',
      toolbar: toolbar,
      tableSelection: {
        blockKey: '',
        selectedRowsNCols: []
      }
    };
    var locale = props.locale,
        _props$localization = props.localization,
        newLocale = _props$localization.locale,
        translations = _props$localization.translations;


    _this.wrapperId = 'rdw-wrapper' + Math.floor(Math.random() * 10000);
    _this.modalHandler = new _modals2.default();
    _this.focusHandler = new _focus2.default();
    _this.blockRendererFn = (0, _Renderer2.default)({
      translations: _extends({}, _i18n2.default[locale || newLocale], translations),
      readOnly: props.readOnly,
      isReadOnly: _this.isReadOnly,
      isImageAlignmentEnabled: _this.isImageAlignmentEnabled,
      getEditorState: _this.getEditorState,
      onChange: _this.onChange,
      tableEditsChange: _this.tableEditsChange,
      tableEdits: _this.state.tableEdits,
      tableSelectionChange: _this.tableSelectionChange,
      getTableSelection: function getTableSelection() {
        return _this.state.tableSelection;
      }
    }, props.customBlockRenderFunc);
    _this.editorProps = _this.filterEditorProps(props);
    _this.customStyleMap = (0, _draftjsUtils.getCustomStyleMap)();
    return _this;
  }

  _createClass(WysiwygEditor, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.compositeDecorator = this.getCompositeDecorator();
      var editorState = this.createEditorState(this.compositeDecorator);
      (0, _draftjsUtils.extractInlineStyle)(editorState);
      this.setState({
        editorState: editorState
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.modalHandler.init(this.wrapperId);
    }
    // todo: change decorators depending on properties recceived in componentWillReceiveProps.

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var newState = {};
      // prevent too much logic operation during react update cycle

      // if (this.props.toolbar !== props.toolbar) {
      //   const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
      //   newState.toolbar = toolbar;
      // }

      if ((0, _common.hasProperty)(props, 'editorState') && !_immutable2.default.is(this.props.editorState, props.editorState)) {
        if (props.editorState) {
          newState.editorState = _draftJs.EditorState.set(props.editorState, { decorator: this.compositeDecorator });
        } else {
          newState.editorState = _draftJs.EditorState.createEmpty(this.compositeDecorator);
        }

        (0, _draftjsUtils.extractInlineStyle)(newState.editorState);
        this.setState(newState);
      }

      // prevent too much logic operation during react update cycle

      // this.editorProps = this.filterEditorProps(props);
      // this.customStyleMap = getCustomStyleMap();
    }

    // afterChange is deprecated

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          editorState = _state.editorState,
          editorFocused = _state.editorFocused,
          toolbar = _state.toolbar,
          isHtmlMode = _state.isHtmlMode,
          tableSelection = _state.tableSelection;
      var _props = this.props,
          locale = _props.locale,
          _props$localization2 = _props.localization,
          newLocale = _props$localization2.locale,
          translations = _props$localization2.translations,
          toolbarCustomButtons = _props.toolbarCustomButtons,
          toolbarOnFocus = _props.toolbarOnFocus,
          toolbarClassName = _props.toolbarClassName,
          toolbarHidden = _props.toolbarHidden,
          editorClassName = _props.editorClassName,
          wrapperClassName = _props.wrapperClassName,
          toolbarStyle = _props.toolbarStyle,
          editorStyle = _props.editorStyle,
          wrapperStyle = _props.wrapperStyle,
          uploadCallback = _props.uploadCallback,
          ariaLabel = _props.ariaLabel;


      var controlProps = {
        modalHandler: this.modalHandler,
        editorState: editorState,
        onChange: this.onChange,
        translations: _extends({}, _i18n2.default[locale || newLocale], translations),
        onToggleHtmlMode: this.onToggleHtmlMode,
        isHtmlMode: isHtmlMode,
        tableSelection: tableSelection
      };

      return _react2.default.createElement(
        'div',
        {
          id: this.wrapperId,
          className: (0, _classnames2.default)('rdw-editor-wrapper', wrapperClassName),
          style: wrapperStyle,
          onClick: this.modalHandler.onEditorClick,
          onBlur: this.onWrapperBlur,
          'aria-label': 'rdw-wrapper'
        },
        !toolbarHidden && (editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus) && _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('rdw-editor-toolbar', toolbarClassName),
            style: toolbarStyle,
            onMouseDown: this.preventDefault,
            'aria-label': 'rdw-toolbar',
            'aria-hidden': (!editorFocused && toolbarOnFocus).toString(),
            onFocus: this.onToolbarFocus
          },
          toolbar.options.map(function (opt, index) {
            var Control = _Controls2.default[opt];
            var config = toolbar[opt];
            if (opt === 'image' && uploadCallback) {
              config.uploadCallback = uploadCallback;
            }
            return _react2.default.createElement(Control, _extends({ key: index }, controlProps, { config: config }));
          }),
          toolbarCustomButtons && toolbarCustomButtons.map(function (button, index) {
            return _react2.default.cloneElement(button, _extends({ key: index }, controlProps));
          })
        ),
        _react2.default.createElement(
          'div',
          {
            ref: this.setWrapperReference,
            className: (0, _classnames2.default)('rdw-editor-main', editorClassName, isHtmlMode ? 'editor-invisible' : ''),
            style: editorStyle,
            onClick: this.focusEditor,
            onFocus: this.onEditorFocus,
            onBlur: this.onEditorBlur,
            onKeyDown: _keyDown2.default.onKeyDown,
            onMouseDown: this.onEditorMouseDown
          },
          _react2.default.createElement(_draftJs.Editor, _extends({
            ref: this.setEditorReference,
            onTab: this.onTab,
            onUpArrow: this.onUpDownArrow,
            onDownArrow: this.onUpDownArrow,
            editorState: editorState,
            onChange: this.onChange,
            blockStyleFn: _BlockStyle.blockStyleFn,
            customStyleMap: (0, _draftjsUtils.getCustomStyleMap)(),
            handleReturn: this.handleReturn,
            blockRendererFn: this.blockRendererFn,
            blockRenderMap: _CustomBlock2.default,
            handleKeyCommand: this.handleKeyCommand,
            ariaLabel: ariaLabel || 'rdw-editor',
            readOnly: this.isReadOnly()
          }, this.editorProps))
        ),
        isHtmlMode && this.htmlRenderer()
      );
    }
  }]);

  return WysiwygEditor;
}(_react.Component);
// todo: evaluate draftjs-utils to move some methods here
// todo: move color near font-family


WysiwygEditor.propTypes = {
  onChange: _propTypes2.default.func,
  onEditorStateChange: _propTypes2.default.func,
  onContentStateChange: _propTypes2.default.func,
  // initialContentState is deprecated
  initialContentState: _propTypes2.default.object,
  defaultContentState: _propTypes2.default.object,
  contentState: _propTypes2.default.object,
  editorState: _propTypes2.default.object,
  defaultEditorState: _propTypes2.default.object,
  toolbarOnFocus: _propTypes2.default.bool,
  spellCheck: _propTypes2.default.bool,
  stripPastedStyles: _propTypes2.default.bool,
  toolbar: _propTypes2.default.object,
  toolbarCustomButtons: _propTypes2.default.array,
  toolbarClassName: _propTypes2.default.string,
  toolbarHidden: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  localization: _propTypes2.default.object,
  editorClassName: _propTypes2.default.string,
  wrapperClassName: _propTypes2.default.string,
  toolbarStyle: _propTypes2.default.object,
  editorStyle: _propTypes2.default.object,
  wrapperStyle: _propTypes2.default.object,
  uploadCallback: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onTab: _propTypes2.default.func,
  mention: _propTypes2.default.object,
  hashtag: _propTypes2.default.object,
  textAlignment: _propTypes2.default.string,
  readOnly: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.number,
  placeholder: _propTypes2.default.string,
  ariaLabel: _propTypes2.default.string,
  ariaOwneeID: _propTypes2.default.string,
  ariaActiveDescendantID: _propTypes2.default.string,
  ariaAutoComplete: _propTypes2.default.string,
  ariaDescribedBy: _propTypes2.default.string,
  ariaExpanded: _propTypes2.default.string,
  ariaHasPopup: _propTypes2.default.string,
  customBlockRenderFunc: _propTypes2.default.func,
  customDecorators: _propTypes2.default.array
};
WysiwygEditor.defaultProps = {
  toolbarOnFocus: false,
  toolbarHidden: false,
  stripPastedStyles: false,
  localization: { locale: 'en', translations: {} },
  customDecorators: [],
  onEditorStateChange: function onEditorStateChange() {}
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.onEditorBlur = function () {
    _this2.setState({
      editorFocused: false
    });
  };

  this.onEditorFocus = function (event) {
    var onFocus = _this2.props.onFocus;

    _this2.setState({
      editorFocused: true
    });
    if (onFocus && _this2.focusHandler.isEditorFocused()) {
      onFocus(event);
    }
  };

  this.onEditorMouseDown = function () {
    _this2.focusHandler.onEditorMouseDown();
  };

  this.onTab = function (event) {
    var onTab = _this2.props.onTab;

    if (!onTab || !onTab(event)) {
      var editorState = (0, _draftjsUtils.changeDepth)(_this2.state.editorState, event.shiftKey ? -1 : 1, 4);
      if (editorState && editorState !== _this2.state.editorState) {
        _this2.onChange(editorState);
        event.preventDefault();
      }
    }
  };

  this.onUpDownArrow = function (event) {
    if (_suggestions2.default.isOpen()) {
      event.preventDefault();
    }
  };

  this.onToolbarFocus = function (event) {
    var onFocus = _this2.props.onFocus;

    if (onFocus && _this2.focusHandler.isToolbarFocused()) {
      onFocus(event);
    }
  };

  this.onWrapperBlur = function (event) {
    var onBlur = _this2.props.onBlur;

    if (onBlur && _this2.focusHandler.isEditorBlur(event)) {
      onBlur(event);
    }
  };

  this.onChange = function (editorState) {
    var onEditorStateChange = _this2.props.onEditorStateChange;

    var editorStateWithDecorator = _draftJs.EditorState.set(editorState, { decorator: _this2.compositeDecorator });
    if (!_this2.isReadOnly()) {
      onEditorStateChange(editorStateWithDecorator);
    }
  };

  this.afterChange = function (editorState) {
    setTimeout(function () {
      var _props2 = _this2.props,
          onChange = _props2.onChange,
          onContentStateChange = _props2.onContentStateChange;

      if (onChange) {
        onChange((0, _draftJs.convertToRaw)(editorState.getCurrentContent()));
      }
      if (onContentStateChange) {
        onContentStateChange((0, _draftJs.convertToRaw)(editorState.getCurrentContent()));
      }
    });
  };

  this.setWrapperReference = function (ref) {
    _this2.wrapper = ref;
  };

  this.setEditorReference = function (ref) {
    _this2.editor = ref;
  };

  this.getCompositeDecorator = function () {
    var decorators = [].concat(_toConsumableArray(_this2.props.customDecorators), [(0, _Link2.default)({
      showOpenOptionOnHover: _this2.state.toolbar.link.showOpenOptionOnHover
    })]);
    if (_this2.props.mention) {
      decorators.push.apply(decorators, _toConsumableArray((0, _Mention2.default)(_extends({}, _this2.props.mention, {
        onChange: _this2.onChange,
        getEditorState: _this2.getEditorState,
        getSuggestions: _this2.getSuggestions,
        getWrapperRef: _this2.getWrapperRef,
        modalHandler: _this2.modalHandler
      }))));
    }
    if (_this2.props.hashtag) {
      decorators.push((0, _HashTag2.default)(_this2.props.hashtag));
    }
    return new _draftJs.CompositeDecorator(decorators);
  };

  this.getWrapperRef = function () {
    return _this2.wrapper;
  };

  this.getEditorState = function () {
    return _this2.state.editorState;
  };

  this.getSuggestions = function () {
    return _this2.props.mention && _this2.props.mention.suggestions;
  };

  this.isReadOnly = function () {
    return !!_this2.state.tableEdits.count() || _this2.props.readOnly;
  };

  this.isImageAlignmentEnabled = function () {
    return _this2.state.toolbar.image.alignmentEnabled;
  };

  this.tableEditsChange = function (tableEdits) {
    _this2.setState({ tableEditsCount: tableEdits.count() });
    _this2.setState({ tableEdits: tableEdits });
  };

  this.tableSelectionChange = function (_ref) {
    var blockKey = _ref.blockKey,
        selectedRowsNCols = _ref.selectedRowsNCols;

    _this2.setState({
      tableSelection: {
        blockKey: blockKey,
        selectedRowsNCols: selectedRowsNCols
      }
    });
  };

  this.onHtmlChange = function (event) {
    var htmlString = event.target.value;
    _this2.setState({ tableHTMLCacheString: htmlString });
  };

  this.onToggleHtmlMode = function () {
    if (_this2.state.isHtmlMode) {
      var trimmed = _this2.state.tableHTMLCacheString.replace(/\s+/g, function (spaces) {
        return spaces === '\t' ? '\t' : spaces.replace(/(^|\xA0+)[^\xA0]+/g, '$1 ');
      }).replace(/^\s+/g, '').replace(/\s+$/g, '').replace(/^\t+/g, '').replace(/\t+$/g, '').replace(/>\s/g, '>');
      var editorState = _draftJs.EditorState.createWithContent((0, _draftHTMLConverter.convertHTMLToDraft)(trimmed));
      _this2.onChange(editorState);
    }

    if (!_this2.state.isHtmlMode) {
      _this2.setState({
        tableHTMLCacheString: (0, _draftHTMLConverter.convertDraftToHTML)(_this2.state.editorState.getCurrentContent())
        // to replace extra "line break" create from draftjsHTMLConverter
        .split('<br/>').join('')
      });
    }

    _this2.setState({
      isHtmlMode: !_this2.state.isHtmlMode
    });
  };

  this.createEditorState = function (compositeDecorator) {
    var editorState = void 0;
    if ((0, _common.hasProperty)(_this2.props, 'editorState')) {
      if (_this2.props.editorState) {
        editorState = _draftJs.EditorState.set(_this2.props.editorState, { decorator: compositeDecorator });
      }
    } else if ((0, _common.hasProperty)(_this2.props, 'defaultEditorState')) {
      if (_this2.props.defaultEditorState) {
        editorState = _draftJs.EditorState.set(_this2.props.defaultEditorState, { decorator: compositeDecorator });
      }
    } else if ((0, _common.hasProperty)(_this2.props, 'contentState')) {
      if (_this2.props.contentState) {
        var contentState = (0, _draftJs.convertFromRaw)(_this2.props.contentState);
        editorState = _draftJs.EditorState.createWithContent(contentState, compositeDecorator);
        editorState = _draftJs.EditorState.moveSelectionToEnd(editorState);
      }
    } else if ((0, _common.hasProperty)(_this2.props, 'defaultContentState') || (0, _common.hasProperty)(_this2.props, 'initialContentState')) {
      var _contentState = _this2.props.defaultContentState || _this2.props.initialContentState;
      if (_contentState) {
        _contentState = (0, _draftJs.convertFromRaw)(_contentState);
        editorState = _draftJs.EditorState.createWithContent(_contentState, compositeDecorator);
        editorState = _draftJs.EditorState.moveSelectionToEnd(editorState);
      }
    }
    if (!editorState) {
      editorState = _draftJs.EditorState.createEmpty(compositeDecorator);
    }
    return editorState;
  };

  this.filterEditorProps = function (props) {
    return (0, _common.filter)(props, ['onChange', 'onEditorStateChange', 'onContentStateChange', 'initialContentState', 'defaultContentState', 'contentState', 'editorState', 'defaultEditorState', 'locale', 'localization', 'toolbarOnFocus', 'toolbar', 'toolbarCustomButtons', 'toolbarClassName', 'editorClassName', 'toolbarHidden', 'wrapperClassName', 'toolbarStyle', 'editorStyle', 'wrapperStyle', 'uploadCallback', 'onFocus', 'onBlur', 'onTab', 'mention', 'hashtag', 'ariaLabel', 'customBlockRenderFunc', 'customDecorators', 'readOnly']);
  };

  this.changeEditorState = function (contentState) {
    var newContentState = (0, _draftJs.convertFromRaw)(contentState);
    var editorState = _this2.state.editorState;

    editorState = _draftJs.EditorState.push(editorState, newContentState, 'insert-characters');
    editorState = _draftJs.EditorState.moveSelectionToEnd(editorState);
    return editorState;
  };

  this.focusEditor = function () {
    setTimeout(function () {
      _this2.editor.focus();
    });
  };

  this.handleKeyCommand = function (command) {
    var editorState = _this2.state.editorState;

    var newState = _draftJs.RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      _this2.onChange(newState);
      return true;
    }
    return false;
  };

  this.handleReturn = function (event) {
    if (_suggestions2.default.isOpen()) {
      return true;
    }
    var editorState = (0, _draftjsUtils.handleNewLine)(_this2.state.editorState, event);
    if (editorState) {
      _this2.onChange(editorState);
      return true;
    }
    return false;
  };

  this.preventDefault = function (event) {
    if (event.target.tagName === 'INPUT') {
      _this2.focusHandler.onInputMouseDown();
    } else {
      event.preventDefault();
    }
  };

  this.htmlRenderer = function () {
    var editorState = _this2.state.editorState;

    var editorContent = editorState.getCurrentContent();
    if (!editorContent) {
      return null;
    }
    var uglyHtml = (0, _draftHTMLConverter.convertDraftToHTML)(editorContent);
    var beautifulHtml = (0, _htmlBeauty2.default)(uglyHtml);

    return _react2.default.createElement('textarea', {
      className: 'editor-html no-focus',
      defaultValue: beautifulHtml,
      onChange: _this2.onHtmlChange
    });
  };
};

exports.default = WysiwygEditor;