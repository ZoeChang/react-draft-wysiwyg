'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chai = require('chai');

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Option test suite', function () {
  it('should have a div when rendered', function () {
    (0, _chai.expect)((0, _enzyme.shallow)(_react2.default.createElement(_2.default, null)).node.type).to.equal('div');
  });
});