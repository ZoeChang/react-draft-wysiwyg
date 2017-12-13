'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FocusHandler = function FocusHandler() {
  var _this = this;

  _classCallCheck(this, FocusHandler);

  this.inputFocused = false;
  this.editorMouseDown = false;

  this.onEditorMouseDown = function () {
    _this.editorFocused = true;
  };

  this.onInputMouseDown = function () {
    _this.inputFocused = true;
  };

  this.isEditorBlur = function (event) {
    if (event.target.tagName === 'INPUT' && !_this.editorFocused) {
      _this.inputFocused = false;
      return true;
    } else if (event.target.tagName !== 'INPUT' && !_this.inputFocused) {
      _this.editorFocused = false;
      return true;
    }
    return false;
  };

  this.isEditorFocused = function () {
    if (!_this.inputFocused) {
      return true;
    }
    _this.inputFocused = false;
    return false;
  };

  this.isToolbarFocused = function () {
    if (!_this.editorFocused) {
      return true;
    }
    _this.editorFocused = false;
    return false;
  };

  this.isInputFocused = function () {
    return _this.inputFocused;
  };
};

exports.default = FocusHandler;