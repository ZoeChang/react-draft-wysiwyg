'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint-disable-line no-unused-vars

var Hashtag = function Hashtag(config) {
  var _this = this;

  _classCallCheck(this, Hashtag);

  this.getHashtagComponent = function () {
    var _class, _temp;

    var className = _this.className;
    return _temp = _class = function (_Component) {
      _inherits(HashtagComponent, _Component);

      function HashtagComponent() {
        _classCallCheck(this, HashtagComponent);

        return _possibleConstructorReturn(this, (HashtagComponent.__proto__ || Object.getPrototypeOf(HashtagComponent)).apply(this, arguments));
      }

      _createClass(HashtagComponent, [{
        key: 'render',
        value: function render() {
          var children = this.props.children;

          var text = children[0].props.text;
          return _react2.default.createElement(
            'a',
            { href: text, className: (0, _classnames2.default)('rdw-hashtag-link', className) },
            children
          );
        }
      }]);

      return HashtagComponent;
    }(_react.Component), _class.PropTypes = {
      children: _propTypes2.default.object
    }, _temp;
  };

  this.findHashtagEntities = function (contentBlock, callback) {
    var text = contentBlock.getText();
    var startIndex = 0;
    var counter = 0;

    for (; text.length > 0 && startIndex >= 0;) {
      if (text[0] === _this.hashCharacter) {
        startIndex = 0;
        counter = 0;
        text = text.substr(_this.hashCharacter.length);
      } else {
        startIndex = text.indexOf(_this.separator + _this.hashCharacter);
        if (startIndex >= 0) {
          text = text.substr(startIndex + (_this.separator + _this.hashCharacter).length);
          counter += startIndex + _this.separator.length;
        }
      }
      if (startIndex >= 0) {
        var endIndex = text.indexOf(_this.separator) >= 0 ? text.indexOf(_this.separator) : text.length;
        var hashtagText = text.substr(0, endIndex);
        if (hashtagText && hashtagText.length > 0) {
          callback(counter, counter + hashtagText.length + _this.hashCharacter.length);
          counter += _this.hashCharacter.length;
        }
      }
    }
  };

  this.getHashtagDecorator = function () {
    return {
      strategy: _this.findHashtagEntities,
      component: _this.getHashtagComponent()
    };
  };

  this.className = config.className;
  this.hashCharacter = config.hashCharacter || '#';
  this.separator = config.separator || ' ';
};

var getDecorator = function getDecorator(config) {
  return new Hashtag(config).getHashtagDecorator();
};

module.exports = getDecorator;