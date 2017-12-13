'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-line import/no-extraneous-dependencies
// eslint-disable-line import/no-extraneous-dependencies
// eslint-disable-line import/no-extraneous-dependencies


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _chai = require('chai');

var _sinon = require('sinon');

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _defaultToolbar = require('../../../../config/defaultToolbar');

var _defaultToolbar2 = _interopRequireDefault(_defaultToolbar);

var _modals = require('../../../../event-handler/modals');

var _modals2 = _interopRequireDefault(_modals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ListControl test suite', function () {
  var contentBlocks = (0, _draftJs.convertFromHTML)('<div>test</div>');
  var contentState = _draftJs.ContentState.createFromBlockArray(contentBlocks);
  var editorState = _draftJs.EditorState.createWithContent(contentState);

  it('should have a div when rendered', function () {
    (0, _chai.expect)((0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.list,
      modalHandler: new _modals2.default()
    })).html().startsWith('<div')).to.be.true;
  });

  it('should have 4 child elements by default', function () {
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _defaultToolbar2.default.list,
      modalHandler: new _modals2.default()
    }));
    (0, _chai.expect)(control.children().length).to.equal(4);
  });

  it('should have 1 child elements if inDropdown is true', function () {
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: function onChange() {},
      editorState: editorState,
      config: _extends({}, _defaultToolbar2.default.list, { inDropdown: true }),
      modalHandler: new _modals2.default()
    }));
    (0, _chai.expect)(control.children().length).to.equal(1);
    (0, _chai.expect)(control.childAt(0).children().length).to.equal(2);
  });

  it('should execute onChange when any of first any child elements is clicked', function () {
    var onChange = (0, _sinon.spy)();
    var control = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
      onChange: onChange,
      editorState: editorState,
      config: _defaultToolbar2.default.list,
      modalHandler: new _modals2.default()
    }));
    control.childAt(0).simulate('click');
    _chai.assert.isTrue(onChange.calledOnce);
    control.childAt(1).simulate('click');
    _chai.assert.equal(onChange.callCount, 2);
    control.childAt(2).simulate('click');
    _chai.assert.equal(onChange.callCount, 3);
    control.childAt(3).simulate('click');
    _chai.assert.equal(onChange.callCount, 4);
  });
});