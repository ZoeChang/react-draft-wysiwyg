'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Option = require('../../components/Option');

var _Option2 = _interopRequireDefault(_Option);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line no-unused-vars

// function parseClassname(classname = 'imageAtom-undefined-w:-h:') {
//   const [name, alignment, widthsStr, heightStr] = classname.split('-')
//   const width = widthsStr.split(':')[1]
//   const height = heightStr.split(':')[1]
//   return { width, height, alignment }
// }

var alignmentStyle = {
  default: {
    cursor: 'default',
    position: 'relative'
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  },
  left: {
    float: 'left'
  },
  right: {
    float: 'right'
  }
};

var getImageComponent = function getImageComponent(config) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    _inherits(Image, _Component);

    function Image() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Image);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Image.__proto__ || Object.getPrototypeOf(Image)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        hovered: false
      }, _this.setEntityAlignmentLeft = function () {
        _this.setEntityAlignment('left');
      }, _this.setEntityAlignmentRight = function () {
        _this.setEntityAlignment('right');
      }, _this.setEntityAlignmentCenter = function () {
        _this.setEntityAlignment('center');
      }, _this.setEntityAlignment = function (alignment) {
        var _this$props = _this.props,
            block = _this$props.block,
            contentState = _this$props.contentState;

        var entityKey = block.getEntityAt(0);
        contentState.mergeEntityData(entityKey, { alignment: alignment });
        config.onChange(_draftJs.EditorState.push(config.getEditorState(), contentState, 'change-block-data'));
        _this.setState({
          dummy: true
        });
      }, _this.toggleHovered = function () {
        var hovered = !_this.state.hovered;
        _this.setState({
          hovered: hovered
        });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Image, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        // dom manipulation of inline width and height
        var imageList = document.querySelectorAll('figure[class^="imageAtom"]');
        var nextElementSiblingKey = '';
        var prevElementSiblingKey = '';
        imageList.forEach(function (node, index) {
          prevElementSiblingKey = node.previousElementSibling.dataset.offsetKey;
          if (prevElementSiblingKey === nextElementSiblingKey) {
            node.previousElementSibling.style.display = 'none';
          }
          nextElementSiblingKey = node.nextElementSibling.dataset.offsetKey;
          if (nextElementSiblingKey === prevElementSiblingKey) {
            node.nextElementSibling.style.display = 'none';
          }

          // const { width, height, alignment } = parseClassname(node.className)
          // node.style.width = width
          // node.style.height = height
          // if (alignment === 'left' | alignment === 'right') {
          //   node.style.float = alignment
          // } else {
          //   node.style.float = 'none'
          // }
        });
      }

      // componentDidUpdate() {
      //   const imageList = document.querySelectorAll('figure[class^="imageAtom"]')
      //   imageList.forEach(node => {
      //     const { width, height, alignment } = parseClassname(node.className)
      //     node.style.width = width
      //     node.style.height = height
      //     if (alignment === 'left' | alignment === 'right') {
      //       node.style.float = alignment
      //     } else {
      //       node.style.float = 'none'
      //     }
      //   })
      // }

    }, {
      key: 'renderAlignmentOptions',
      value: function renderAlignmentOptions(alignment) {
        var readOnly = this.props.blockProps.readOnly;

        return readOnly || _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('rdw-image-alignment-options-popup', {
              'rdw-image-alignment-options-popup-right': alignment === 'right'
            })
          },
          _react2.default.createElement(
            _Option2.default,
            {
              onClick: this.setEntityAlignmentLeft,
              className: 'rdw-image-alignment-option'
            },
            'L'
          ),
          _react2.default.createElement(
            _Option2.default,
            {
              onClick: this.setEntityAlignmentCenter,
              className: 'rdw-image-alignment-option'
            },
            'C'
          ),
          _react2.default.createElement(
            _Option2.default,
            {
              onClick: this.setEntityAlignmentRight,
              className: 'rdw-image-alignment-option'
            },
            'R'
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            block = _props.block,
            contentState = _props.contentState;
        var hovered = this.state.hovered;
        var isReadOnly = config.isReadOnly,
            isImageAlignmentEnabled = config.isImageAlignmentEnabled;

        var entity = contentState.getEntity(block.getEntityAt(0));

        var _entity$getData = entity.getData(),
            src = _entity$getData.src,
            _entity$getData$align = _entity$getData.alignment,
            alignment = _entity$getData$align === undefined ? 'center' : _entity$getData$align,
            height = _entity$getData.height,
            width = _entity$getData.width;

        return (
          // <span
          //   onClick={this.toggleHovered}
          //   className={classNames(
          //     'rdw-image-alignment',
          //     {
          //       'rdw-image-left': alignment === 'left',
          //       'rdw-image-right': alignment === 'right',
          //       'rdw-image-center': !alignment || alignment === 'none',
          //     }
          //   )}
          // >
          //   <span 
          //     className="rdw-image-imagewrapper"
          //   >
          _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('img', {
              onClick: this.toggleHovered,
              style: _extends({}, alignmentStyle.default, alignmentStyle[alignment], {
                height: height,
                width: width
              }),
              src: src,
              alt: ''
            }),
            !isReadOnly() && hovered && isImageAlignmentEnabled() ? this.renderAlignmentOptions(alignment) : undefined
          )
          // </span>

        );
      }
    }]);

    return Image;
  }(_react.Component), _class.propTypes = {
    block: _propTypes2.default.object,
    contentState: _propTypes2.default.object
  }, _temp2;
};

exports.default = getImageComponent;