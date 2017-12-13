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

var Mention = function Mention(className) {
  _classCallCheck(this, Mention);

  _initialiseProps.call(this);

  this.className = className;
};

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.getMentionComponent = function () {
    var _class, _temp;

    var className = _this.className;
    return _temp = _class = function (_Component) {
      _inherits(MentionComponent, _Component);

      function MentionComponent() {
        _classCallCheck(this, MentionComponent);

        return _possibleConstructorReturn(this, (MentionComponent.__proto__ || Object.getPrototypeOf(MentionComponent)).apply(this, arguments));
      }

      _createClass(MentionComponent, [{
        key: 'render',
        value: function render() {
          var _props = this.props,
              entityKey = _props.entityKey,
              children = _props.children,
              contentState = _props.contentState;

          var _contentState$getEnti = contentState.getEntity(entityKey).getData(),
              url = _contentState$getEnti.url,
              value = _contentState$getEnti.value;

          return _react2.default.createElement(
            'a',
            { href: url || value, className: (0, _classnames2.default)('rdw-mention-link', className) },
            children
          );
        }
      }]);

      return MentionComponent;
    }(_react.Component), _class.PropTypes = {
      entityKey: _propTypes2.default.number,
      children: _propTypes2.default.object,
      contentState: _propTypes2.default.object
    }, _temp;
  };

  this.getMentionDecorator = function () {
    return {
      strategy: _this.findMentionEntities,
      component: _this.getMentionComponent()
    };
  };
};

Mention.prototype.findMentionEntities = function (contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
  }, callback);
};

module.exports = Mention;