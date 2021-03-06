'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../../../css/icons.css');

/**
* This is default toolbar configuration,
* whatever user passes in toolbar property is deeply merged with this to over-ride defaults.
*/
exports.default = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history', 'table', 'html'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
    bold: { icon: 'icon-editor-bold', className: undefined },
    italic: { icon: 'icon-editor-italic', className: undefined },
    underline: { icon: 'icon-editor-underline', className: undefined },
    strikethrough: { icon: 'icon-editor-strikethrough', className: undefined },
    monospace: { icon: 'icon-editor-monospace', className: undefined },
    superscript: { icon: 'icon-editor-superscript', className: undefined },
    subscript: { icon: 'icon-editor-subscript', className: undefined }
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  fontSize: {
    icon: 'icon-editor-font-size',
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
    unordered: { icon: 'icon-editor-unordered', className: undefined },
    ordered: { icon: 'icon-editor-list-ordered', className: undefined },
    indent: { icon: 'icon-editor-indent', className: undefined },
    outdent: { icon: 'icon-editor-outdent', className: undefined }
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right', 'justify'],
    left: { icon: 'icon-editor-align-left', className: undefined },
    center: { icon: 'icon-editor-align-center', className: undefined },
    right: { icon: 'icon-editor-align-right', className: undefined },
    justify: { icon: 'icon-editor-align-justify', className: undefined }
  },
  colorPicker: {
    icon: 'icon-editor-color',
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)', 'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)', 'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)', 'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)', 'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)', 'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)']
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    link: { icon: 'icon-editor-link', className: undefined },
    unlink: { icon: 'icon-editor-unlink', className: undefined }
  },
  emoji: {
    icon: 'icon-editor-emoji',
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: ['😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓', '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈', '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃', '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕', '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥', '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸', '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈', '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅', '✅', '❎', '💯']
  },
  embedded: {
    icon: 'icon-editor-embedded',
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    defaultSize: {
      height: 'auto',
      width: 'auto'
    }
  },
  image: {
    icon: 'icon-editor-image',
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    defaultSize: {
      height: 'auto',
      width: '100%'
    }
  },
  remove: { icon: 'icon-editor-eraser', className: undefined, component: undefined },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
    undo: { icon: 'icon-editor-undo', className: undefined },
    redo: { icon: 'icon-editor-redo', className: undefined }
  },
  html: {
    icon: 'icon-editor-html',
    className: undefined
  },
  table: {
    icon: 'icon-editor-table-insert',
    className: undefined
  }
};