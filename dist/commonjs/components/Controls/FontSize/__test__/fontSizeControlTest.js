'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _draftJs = require('draft-js');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _Dropdown = require('../../../Dropdown');

var _defaultToolbar = require('../../../../config/defaultToolbar');

var _defaultToolbar2 = _interopRequireDefault(_defaultToolbar);

var _modals = require('../../../../event-handler/modals');

var _modals2 = _interopRequireDefault(_modals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line import/no-extraneous-dependencies
describe('FontSizeControl test suite', function () {
  var contentBlocks = (0, _draftJs.convertFromHTML)('<div>test</div>');
  var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks);
  var editorState = _draftJs.EditorState.createWithContent(contentState);

  it('should have a div when rendered', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.fontSize,
      modalHandler: new _modals2.default()
    })).html().startsWith('<div')).to.be.true;
  });

  it('should have a dropdown child component well defined', function () {
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.fontSize,
      modalHandler: new _modals2.default()
    }));
    _chai.assert.equal(control.childAt(0).props().children.length, 2);
    _chai.assert.isDefined(control.childAt(0).props().onChange);
    _chai.assert.equal(control.childAt(0).type(), _Dropdown.Dropdown);
  });
}); // eslint-disable-line import/no-extraneous-dependencies