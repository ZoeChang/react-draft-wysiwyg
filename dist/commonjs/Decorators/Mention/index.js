'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Mention = require('./Mention');

var _Mention2 = _interopRequireDefault(_Mention);

var _Suggestion = require('./Suggestion');

var _Suggestion2 = _interopRequireDefault(_Suggestion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDecorators = function getDecorators(config) {
  return [new _Mention2.default(config.mentionClassName).getMentionDecorator(), new _Suggestion2.default(config).getSuggestionDecorator()];
};

module.exports = getDecorators;