'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-line import/no-extraneous-dependencies
// eslint-disable-line import/no-extraneous-dependencies


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _draftJs = require('draft-js');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _defaultToolbar = require('../../../../config/defaultToolbar');

var _defaultToolbar2 = _interopRequireDefault(_defaultToolbar);

var _modals = require('../../../../event-handler/modals');

var _modals2 = _interopRequireDefault(_modals);

var _i18n = require('../../../../i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Block test suite', function () {
  var contentBlocks = (0, _draftJs.convertFromHTML)('<div>test</div>');
  var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks);
  var editorState = _draftJs.EditorState.createWithContent(contentState);

  it('should have a div at root when rendered', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _extends({}, _defaultToolbar2.default.blockType, { inDropdown: false }),
      translations: _i18n2.default['en'],
      modalHandler: new _modals2.default()
    })).html().startsWith('<div')).to.be.true;
  });

  it('should have a dropdown child component defined', function () {
    var block = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.blockType,
      modalHandler: new _modals2.default(),
      translations: _i18n2.default['en']
    }));
    (0, _chai.expect)(block.find('Dropdown').length).to.equal(1);
  });

  it('should have 8 child elements when inDropdown is false', function () {
    var block = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _extends({}, _defaultToolbar2.default.blockType, { inDropdown: false }),
      translations: _i18n2.default['en'],
      modalHandler: new _modals2.default()
    }));
    (0, _chai.expect)(block.find('Option').length).to.equal(8);
  });
});