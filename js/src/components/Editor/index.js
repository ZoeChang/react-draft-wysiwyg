import React, { Component } from 'react';
import Immutable, { Map } from 'immutable';
import PropTypes from 'prop-types';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
} from 'draft-js';
import {
  changeDepth,
  handleNewLine,
  getCustomStyleMap,
  extractInlineStyle,
} from 'draftjs-utils';
import classNames from 'classnames';
import ModalHandler from '../../event-handler/modals';
import FocusHandler from '../../event-handler/focus';
import KeyDownHandler from '../../event-handler/keyDown';
import SuggestionHandler from '../../event-handler/suggestions';
import { blockStyleFn } from '../../Utils/BlockStyle';
import { convertDraftToHTML, convertHTMLToDraft } from '../../Utils/draftHTMLConverter';
import htmlBeautifier from '../../Utils/htmlBeauty';
import { mergeRecursive } from '../../Utils/toolbar';
import { hasProperty, filter } from '../../Utils/common';
import Controls from '../Controls';
import getLinkDecorator from '../../Decorators/Link';
import getMentionDecorators from '../../Decorators/Mention';
import getHashtagDecorator from '../../Decorators/HashTag';
import getBlockRenderFunc from '../../Renderer';
import extendedBlockRenderMap from '../../CustomBlock';
import defaultToolbar from '../../config/defaultToolbar';
import localeTranslations from '../../i18n';
import './styles.css';

export default class WysiwygEditor extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    onEditorStateChange: PropTypes.func,
    onContentStateChange: PropTypes.func,
    // initialContentState is deprecated
    initialContentState: PropTypes.object,
    defaultContentState: PropTypes.object,
    contentState: PropTypes.object,
    editorState: PropTypes.object,
    defaultEditorState: PropTypes.object,
    toolbarOnFocus: PropTypes.bool,
    spellCheck: PropTypes.bool,
    stripPastedStyles: PropTypes.bool,
    toolbar: PropTypes.object,
    toolbarCustomButtons: PropTypes.array,
    toolbarClassName: PropTypes.string,
    toolbarHidden: PropTypes.bool,
    locale: PropTypes.string,
    localization: PropTypes.object,
    editorClassName: PropTypes.string,
    wrapperClassName: PropTypes.string,
    toolbarStyle: PropTypes.object,
    editorStyle: PropTypes.object,
    wrapperStyle: PropTypes.object,
    uploadCallback: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onTab: PropTypes.func,
    mention: PropTypes.object,
    hashtag: PropTypes.object,
    textAlignment: PropTypes.string,
    readOnly: PropTypes.bool,
    tabIndex: PropTypes.number,
    placeholder: PropTypes.string,
    ariaLabel: PropTypes.string,
    ariaOwneeID: PropTypes.string,
    ariaActiveDescendantID: PropTypes.string,
    ariaAutoComplete: PropTypes.string,
    ariaDescribedBy: PropTypes.string,
    ariaExpanded: PropTypes.string,
    ariaHasPopup: PropTypes.string,
    customBlockRenderFunc: PropTypes.func,
    customDecorators: PropTypes.array,
  };

  static defaultProps = {
    toolbarOnFocus: false,
    toolbarHidden: false,
    stripPastedStyles: false,
    localization: { locale: 'en', translations: {} },
    customDecorators: [],
    onEditorStateChange: () => {},
  }

  constructor(props) {
    super(props);
    const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
    this.state = {
      editorState: undefined,
      editorFocused: false,
      tableEdits: Map(),
      isHtmlMode: false,
      tableHTMLCacheString: '',
      toolbar,
      tableSelection: {
        blockKey: '',
        selectedRowsNCols: [],
      }
    };
    const {
      locale,
      localization: { locale: newLocale, translations },
    } = props

    this.wrapperId = `rdw-wrapper${Math.floor(Math.random() * 10000)}`;
    this.modalHandler = new ModalHandler();
    this.focusHandler = new FocusHandler();
    this.blockRendererFn = getBlockRenderFunc({
      translations: { ...localeTranslations[locale || newLocale], ...translations },
      readOnly: props.readOnly,
      isReadOnly: this.isReadOnly,
      isImageAlignmentEnabled: this.isImageAlignmentEnabled,
      getEditorState: this.getEditorState,
      onChange: this.onChange,
      tableEditsChange: this.tableEditsChange,
      tableEdits: this.state.tableEdits,
      tableSelectionChange: this.tableSelectionChange,
      getTableSelection: () => this.state.tableSelection,
    }, props.customBlockRenderFunc);
    this.editorProps = this.filterEditorProps(props);
    this.customStyleMap = getCustomStyleMap();
  }

  componentWillMount(): void {
    this.compositeDecorator = this.getCompositeDecorator();
    const editorState = this.createEditorState(this.compositeDecorator);
    extractInlineStyle(editorState);
    this.setState({
      editorState,
    });
  }

  componentDidMount(): void {
    this.modalHandler.init(this.wrapperId);
  }
  // todo: change decorators depending on properties recceived in componentWillReceiveProps.

  componentWillReceiveProps(props) {
    const newState = {};
    // prevent too much logic operation during react update cycle

    // if (this.props.toolbar !== props.toolbar) {
    //   const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
    //   newState.toolbar = toolbar;
    // }

    if (hasProperty(props, 'editorState') && !Immutable.is(this.props.editorState, props.editorState)) {
      if (props.editorState) {
        newState.editorState = EditorState.set(
          props.editorState,
          { decorator: this.compositeDecorator }
        );
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }

      extractInlineStyle(newState.editorState);
      this.setState(newState);
    }

    // prevent too much logic operation during react update cycle

    // this.editorProps = this.filterEditorProps(props);
    // this.customStyleMap = getCustomStyleMap();
  }

  onEditorBlur: Function = (): void => {
    this.setState({
      editorFocused: false,
    });
  };

  onEditorFocus: Function = (event): void => {
    const { onFocus } = this.props;
    this.setState({
      editorFocused: true,
    });
    if (onFocus && this.focusHandler.isEditorFocused()) {
      onFocus(event);
    }
  };

  onEditorMouseDown: Function = (): void => {
    this.focusHandler.onEditorMouseDown();
  }

  onTab: Function = (event): boolean => {
    const { onTab } = this.props;
    if (!onTab || !onTab(event)) {
      const editorState = changeDepth(this.state.editorState, event.shiftKey ? -1 : 1, 4);
      if (editorState && editorState !== this.state.editorState) {
        this.onChange(editorState);
        event.preventDefault();
      }
    }
  };

  onUpDownArrow: Function = (event): boolean => {
    if (SuggestionHandler.isOpen()) {
      event.preventDefault();
    }
  };

  onToolbarFocus: Function = (event): void => {
    const { onFocus } = this.props;
    if (onFocus && this.focusHandler.isToolbarFocused()) {
      onFocus(event);
    }
  };

  onWrapperBlur: Function = (event: Object) => {
    const { onBlur } = this.props;
    if (onBlur && this.focusHandler.isEditorBlur(event)) {
      onBlur(event);
    }
  };

  onChange: Function = (editorState: Object): void => {
    const { onEditorStateChange } = this.props;
    const editorStateWithDecorator = EditorState.set(editorState, { decorator: this.compositeDecorator })
    if (!this.isReadOnly()) {
      onEditorStateChange(editorStateWithDecorator);
    }
  };

  // afterChange is deprecated
  afterChange: Function = (editorState): void => {
    setTimeout(() => {
      const { onChange, onContentStateChange } = this.props;
      if (onChange) {
        onChange(convertToRaw(editorState.getCurrentContent()));
      }
      if (onContentStateChange) {
        onContentStateChange(convertToRaw(editorState.getCurrentContent()));
      }
    });
  };

  setWrapperReference: Function = (ref: Object): void => {
    this.wrapper = ref;
  };

  setEditorReference: Function = (ref: Object): void => {
    this.editor = ref;
  };

  getCompositeDecorator = (): void => {
    let decorators = [...this.props.customDecorators, getLinkDecorator({
      showOpenOptionOnHover: this.state.toolbar.link.showOpenOptionOnHover,
    })];
    if (this.props.mention) {
      decorators.push(...getMentionDecorators({
        ...this.props.mention,
        onChange: this.onChange,
        getEditorState: this.getEditorState,
        getSuggestions: this.getSuggestions,
        getWrapperRef: this.getWrapperRef,
        modalHandler: this.modalHandler,
      }));
    }
    if (this.props.hashtag) {
      decorators.push(getHashtagDecorator(this.props.hashtag));
    }
    return new CompositeDecorator(decorators);
  }

  getWrapperRef = () => this.wrapper;

  getEditorState = () => this.state.editorState;

  getSuggestions = () => this.props.mention && this.props.mention.suggestions;

  isReadOnly = () => {
    return (
      !!this.state.tableEdits.count() ||
      this.props.readOnly
    )
  };

  isImageAlignmentEnabled = () => this.state.toolbar.image.alignmentEnabled;

  tableEditsChange = (tableEdits) => {
    this.setState({ tableEditsCount: tableEdits.count() })
    this.setState({ tableEdits });
  }

  tableSelectionChange = ({ blockKey, selectedRowsNCols }) => {
    this.setState({
      tableSelection: {
        blockKey,
        selectedRowsNCols,
      }
    })
  }

  onHtmlChange = (event) => {
    const htmlString = event.target.value
    this.setState({ tableHTMLCacheString: htmlString })
  }

  onToggleHtmlMode = () => {
    if (this.state.isHtmlMode) {
      const trimmed = this.state.tableHTMLCacheString
      .replace(/\s+/g, function(spaces) {
          return spaces === '\t' ? '\t' : spaces.replace(/(^|\xA0+)[^\xA0]+/g, '$1 ');
        })
      .replace(/^\s+/g, '').replace(/\s+$/g, '')
      .replace(/^\t+/g, '').replace(/\t+$/g, '')
      .replace(/>\s/g, '>')
      const editorState = EditorState.createWithContent(
        convertHTMLToDraft(trimmed)
      )
      this.onChange(editorState)
    }

    if (!this.state.isHtmlMode) {
      this.setState({
        tableHTMLCacheString: convertDraftToHTML(
          this.state.editorState.getCurrentContent()
        )
        // to replace extra "line break" create from draftjsHTMLConverter
        .split('<br/>').join('')
      })
    }

    this.setState({
      isHtmlMode: !this.state.isHtmlMode
    })
  }

  createEditorState = (compositeDecorator) => {
    let editorState;
    if (hasProperty(this.props, 'editorState')) {
      if (this.props.editorState) {
        editorState = EditorState.set(this.props.editorState, { decorator: compositeDecorator });
      }
    } else if (hasProperty(this.props, 'defaultEditorState')) {
      if (this.props.defaultEditorState) {
        editorState = EditorState.set(
          this.props.defaultEditorState,
          { decorator: compositeDecorator }
        );
      }
    } else if (hasProperty(this.props, 'contentState')) {
      if (this.props.contentState) {
        const contentState = convertFromRaw(this.props.contentState);
        editorState = EditorState.createWithContent(contentState, compositeDecorator);
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    } else if (hasProperty(this.props, 'defaultContentState')
      || hasProperty(this.props, 'initialContentState')) {
      let contentState = this.props.defaultContentState || this.props.initialContentState;
      if (contentState) {
        contentState = convertFromRaw(contentState);
        editorState = EditorState.createWithContent(contentState, compositeDecorator);
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    }
    if (!editorState) {
      editorState = EditorState.createEmpty(compositeDecorator);
    }
    return editorState;
  }

  filterEditorProps = (props) => {
    return filter(props, [
      'onChange', 'onEditorStateChange', 'onContentStateChange', 'initialContentState',
      'defaultContentState', 'contentState', 'editorState', 'defaultEditorState', 'locale',
      'localization', 'toolbarOnFocus', 'toolbar', 'toolbarCustomButtons', 'toolbarClassName',
      'editorClassName', 'toolbarHidden', 'wrapperClassName', 'toolbarStyle', 'editorStyle',
      'wrapperStyle', 'uploadCallback', 'onFocus', 'onBlur', 'onTab', 'mention', 'hashtag',
      'ariaLabel', 'customBlockRenderFunc', 'customDecorators', 'readOnly'
    ]);
  }

  changeEditorState = (contentState) => {
    const newContentState = convertFromRaw(contentState);
    let { editorState } = this.state;
    editorState = EditorState.push(editorState, newContentState, 'insert-characters');
    editorState = EditorState.moveSelectionToEnd(editorState);
    return editorState;
  };

  focusEditor: Function = (): void => {
    setTimeout(() => {
      this.editor.focus();
    });
  };

  handleKeyCommand: Function = (command: Object): boolean => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  handleReturn: Function = (event: Object): boolean => {
    if (SuggestionHandler.isOpen()) {
      return true;
    }
    const editorState = handleNewLine(this.state.editorState, event);
    if (editorState) {
      this.onChange(editorState);
      return true;
    }
    return false;
  };

  preventDefault: Function = (event: Object) => {
    if (event.target.tagName === 'INPUT') {
      this.focusHandler.onInputMouseDown();
    } else {
      event.preventDefault();
    }
  };

  htmlRenderer: Function = () => {
    const { editorState } = this.state
    const editorContent = editorState.getCurrentContent()
    if (!editorContent) { return null }
    const uglyHtml = convertDraftToHTML(editorContent)
    const beautifulHtml = htmlBeautifier(uglyHtml);

    return (
      <textarea
        className="editor-html no-focus"
        defaultValue={beautifulHtml}
        onChange={this.onHtmlChange}
      />
    )
  }

  render() {
    const {
      editorState,
      editorFocused,
      toolbar,
      isHtmlMode,
      tableSelection,
     } = this.state;
    const {
      locale,
      localization: { locale: newLocale, translations },
      toolbarCustomButtons,
      toolbarOnFocus,
      toolbarClassName,
      toolbarHidden,
      editorClassName,
      wrapperClassName,
      toolbarStyle,
      editorStyle,
      wrapperStyle,
      uploadCallback,
      ariaLabel,
    } = this.props;

    const controlProps = {
      modalHandler: this.modalHandler,
      editorState,
      onChange: this.onChange,
      translations: { ...localeTranslations[locale || newLocale], ...translations },
      onToggleHtmlMode: this.onToggleHtmlMode,
      isHtmlMode,
      tableSelection,
    }

    return (
      <div
        id={this.wrapperId}
        className={classNames('rdw-editor-wrapper', wrapperClassName)}
        style={wrapperStyle}
        onClick={this.modalHandler.onEditorClick}
        onBlur={this.onWrapperBlur}
        aria-label="rdw-wrapper"
      >
        {
          !toolbarHidden &&
          (editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus) &&
          <div
            className={classNames('rdw-editor-toolbar', toolbarClassName)}
            style={toolbarStyle}
            onMouseDown={this.preventDefault}
            aria-label="rdw-toolbar"
            aria-hidden={(!editorFocused && toolbarOnFocus).toString()}
            onFocus={this.onToolbarFocus}
          >
            {toolbar.options.map((opt,index) => {
              const Control = Controls[opt];
              const config = toolbar[opt];
              if (opt === 'image' && uploadCallback) {
                config.uploadCallback = uploadCallback;
              }
              return <Control key={index} {...controlProps} config={config} />;
            })}
            {toolbarCustomButtons && toolbarCustomButtons.map((button, index) =>
              React.cloneElement(button, { key: index, ...controlProps }))}
          </div>
        }
        <div
          ref={this.setWrapperReference}
          className={classNames(
            'rdw-editor-main',
            editorClassName,
            isHtmlMode ? 'editor-invisible' : ''
          )}
          style={editorStyle}
          onClick={this.focusEditor}
          onFocus={this.onEditorFocus}
          onBlur={this.onEditorBlur}
          onKeyDown={KeyDownHandler.onKeyDown}
          onMouseDown={this.onEditorMouseDown}
        >
          <Editor
            ref={this.setEditorReference}
            onTab={this.onTab}
            onUpArrow={this.onUpDownArrow}
            onDownArrow={this.onUpDownArrow}
            editorState={editorState}
            onChange={this.onChange}
            blockStyleFn={blockStyleFn.bind(null, editorState)}
            customStyleMap={getCustomStyleMap()}
            handleReturn={this.handleReturn}
            blockRendererFn={this.blockRendererFn}
            blockRenderMap={extendedBlockRenderMap}
            handleKeyCommand={this.handleKeyCommand}
            ariaLabel={ariaLabel || 'rdw-editor'}
            readOnly={this.isReadOnly()}
            {...this.editorProps}
          />
        </div>
        {
          isHtmlMode && this.htmlRenderer()
        }
      </div>
    );
  }
}
// todo: evaluate draftjs-utils to move some methods here
// todo: move color near font-family
