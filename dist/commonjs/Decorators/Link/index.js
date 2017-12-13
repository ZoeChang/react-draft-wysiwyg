'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

var _openlink = require('../../../../images/openlink.svg');

var _openlink2 = _interopRequireDefault(_openlink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(function (character) {
    var entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

function getLinkComponent(config) {
  var _class, _temp2;

  var showOpenOptionOnHover = config.showOpenOptionOnHover;
  return _temp2 = _class = function (_Component) {
    _inherits(Link, _Component);

    function Link() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Link);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Link.__proto__ || Object.getPrototypeOf(Link)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        showPopOver: false
      }, _this.openLink = function () {
        var _this$props = _this.props,
            entityKey = _this$props.entityKey,
            contentState = _this$props.contentState;

        var _contentState$getEnti = contentState.getEntity(entityKey).getData(),
            url = _contentState$getEnti.url;

        var linkTab = window.open(url, 'blank'); // eslint-disable-line no-undef
        linkTab.focus();
      }, _this.toggleShowPopOver = function () {
        var showPopOver = !_this.state.showPopOver;
        _this.setState({
          showPopOver: showPopOver
        });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            children = _props.children,
            entityKey = _props.entityKey,
            contentState = _props.contentState;

        var _contentState$getEnti2 = contentState.getEntity(entityKey).getData(),
            url = _contentState$getEnti2.url,
            title = _contentState$getEnti2.title,
            targetOption = _contentState$getEnti2.targetOption;

        var showPopOver = this.state.showPopOver;

        return _react2.default.createElement(
          'span',
          {
            className: 'rdw-link-decorator-wrapper',
            onMouseEnter: this.toggleShowPopOver,
            onMouseLeave: this.toggleShowPopOver
          },
          _react2.default.createElement(
            'a',
            { href: url, target: targetOption },
            children
          ),
          showPopOver && showOpenOptionOnHover ? _react2.default.createElement('img', {
            src: _openlink2.default,
            alt: '',
            onClick: this.openLink,
            className: 'rdw-link-decorator-icon'
          }) : undefined
        );
      }
    }]);

    return Link;
  }(_react.Component), _class.propTypes = {
    entityKey: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.array,
    contentState: _propTypes2.default.object
  }, _temp2;
}

exports.default = function (config) {
  return {
    strategy: findLinkEntities,
    component: getLinkComponent(config)
  };
};