'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Option = require('../../../Option');

var _Option2 = _interopRequireDefault(_Option);

var _Spinner = require('../../../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// eslint-disable-line no-unused-vars

var LayoutComponent = function (_Component) {
  _inherits(LayoutComponent, _Component);

  function LayoutComponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LayoutComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LayoutComponent.__proto__ || Object.getPrototypeOf(LayoutComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      imgSrc: '',
      dragEnter: false,
      uploadHighlighted: _this.props.config.uploadEnabled && !!_this.props.config.uploadCallback,
      showImageLoading: false,
      height: _this.props.config.defaultSize.height,
      width: _this.props.config.defaultSize.width
    }, _this.updateValue = function (event) {
      _this.setState(_defineProperty({}, '' + event.target.name, event.target.value));
    }, _this.toggleShowImageLoading = function () {
      var showImageLoading = !_this.state.showImageLoading;
      _this.setState({
        showImageLoading: showImageLoading
      });
    }, _this.showImageURLOption = function () {
      _this.setState({
        uploadHighlighted: false
      });
    }, _this.showImageUploadOption = function () {
      _this.setState({
        uploadHighlighted: true
      });
    }, _this.addImageFromState = function () {
      var _this$state = _this.state,
          imgSrc = _this$state.imgSrc,
          height = _this$state.height,
          width = _this$state.width;
      var onChange = _this.props.onChange;

      onChange(imgSrc, height, width);
    }, _this.addImageFromSrcLink = function (imgSrc) {
      var _this$state2 = _this.state,
          height = _this$state2.height,
          width = _this$state2.width;
      var onChange = _this.props.onChange;

      onChange(imgSrc, height, width);
    }, _this.onImageDrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
      _this.setState({
        dragEnter: false
      });
      _this.uploadImage(event.dataTransfer.files[0]);
    }, _this.onDragEnter = function (event) {
      _this.stopPropagation(event);
      _this.setState({
        dragEnter: true
      });
    }, _this.selectImage = function (event) {
      if (event.target.files && event.target.files.length > 0) {
        _this.uploadImage(event.target.files[0]);
      }
    }, _this.uploadImage = function (file) {
      _this.toggleShowImageLoading();
      var uploadCallback = _this.props.config.uploadCallback;

      uploadCallback(file).then(function (_ref2) {
        var data = _ref2.data;

        _this.setState({
          showImageLoading: false,
          dragEnter: false
        });
        _this.addImageFromSrcLink(data.link);
      }).catch(function () {
        _this.setState({
          showImageLoading: false,
          dragEnter: false
        });
      });
    }, _this.fileUploadClick = function (event) {
      _this.fileUpload = true;
      event.stopPropagation();
    }, _this.stopPropagation = function (event) {
      if (!_this.fileUpload) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        _this.fileUpload = false;
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LayoutComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.expanded && !props.expanded) {
        this.setState({
          imgSrc: '',
          dragEnter: false,
          uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
          showImageLoading: false,
          height: this.props.config.defaultSize.height,
          width: this.props.config.defaultSize.width
        });
      } else if (props.config.uploadCallback !== this.props.config.uploadCallback || props.config.uploadEnabled !== this.props.config.uploadEnabled) {
        this.setState({
          uploadHighlighted: props.config.uploadEnabled && !!props.config.uploadCallback
        });
      }
    }
  }, {
    key: 'renderAddImageModal',
    value: function renderAddImageModal() {
      var _state = this.state,
          imgSrc = _state.imgSrc,
          uploadHighlighted = _state.uploadHighlighted,
          showImageLoading = _state.showImageLoading,
          dragEnter = _state.dragEnter,
          height = _state.height,
          width = _state.width;
      var _props = this.props,
          _props$config = _props.config,
          popupClassName = _props$config.popupClassName,
          uploadCallback = _props$config.uploadCallback,
          uploadEnabled = _props$config.uploadEnabled,
          urlEnabled = _props$config.urlEnabled,
          doCollapse = _props.doCollapse,
          translations = _props.translations;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rdw-image-modal', popupClassName),
          onClick: this.stopPropagation
        },
        _react2.default.createElement(
          'div',
          { className: 'rdw-image-modal-header' },
          uploadEnabled && uploadCallback && _react2.default.createElement(
            'span',
            {
              onClick: this.showImageUploadOption,
              className: 'rdw-image-modal-header-option'
            },
            translations['components.controls.image.fileUpload'],
            _react2.default.createElement('span', {
              className: (0, _classnames2.default)('rdw-image-modal-header-label', { 'rdw-image-modal-header-label-highlighted': uploadHighlighted })
            })
          ),
          urlEnabled && _react2.default.createElement(
            'span',
            {
              onClick: this.showImageURLOption,
              className: 'rdw-image-modal-header-option'
            },
            translations['components.controls.image.byURL'],
            _react2.default.createElement('span', {
              className: (0, _classnames2.default)('rdw-image-modal-header-label', { 'rdw-image-modal-header-label-highlighted': !uploadHighlighted })
            })
          )
        ),
        uploadHighlighted ? _react2.default.createElement(
          'div',
          { onClick: this.fileUploadClick },
          _react2.default.createElement(
            'div',
            {
              onDragEnter: this.onDragEnter,
              onDragOver: this.stopPropagation,
              onDrop: this.onImageDrop,
              className: (0, _classnames2.default)('rdw-image-modal-upload-option', { 'rdw-image-modal-upload-option-highlighted': dragEnter })
            },
            _react2.default.createElement(
              'label',
              {
                htmlFor: 'file',
                className: 'rdw-image-modal-upload-option-label'
              },
              translations['components.controls.image.dropFileText']
            )
          ),
          _react2.default.createElement('input', {
            type: 'file',
            id: 'file',
            accept: 'image/*',
            onChange: this.selectImage,
            className: 'rdw-image-modal-upload-option-input'
          })
        ) : _react2.default.createElement(
          'div',
          { className: 'rdw-image-modal-url-section' },
          _react2.default.createElement('input', {
            className: 'rdw-image-modal-url-input',
            placeholder: 'Enter url',
            name: 'imgSrc',
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: imgSrc
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'rdw-embedded-modal-size' },
          '\u2195\xA0',
          _react2.default.createElement('input', {
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: height,
            name: 'height',
            className: 'rdw-embedded-modal-size-input',
            placeholder: 'Height'
          }),
          '\xA0\u2194\xA0',
          _react2.default.createElement('input', {
            onChange: this.updateValue,
            onBlur: this.updateValue,
            value: width,
            name: 'width',
            className: 'rdw-embedded-modal-size-input',
            placeholder: 'Width'
          })
        ),
        _react2.default.createElement(
          'span',
          { className: 'rdw-image-modal-btn-section' },
          _react2.default.createElement(
            'button',
            {
              className: 'rdw-image-modal-btn',
              onClick: this.addImageFromState,
              disabled: !imgSrc || !height || !width
            },
            translations['generic.add']
          ),
          _react2.default.createElement(
            'button',
            {
              className: 'rdw-image-modal-btn',
              onClick: doCollapse
            },
            translations['generic.cancel']
          )
        ),
        showImageLoading ? _react2.default.createElement(
          'div',
          { className: 'rdw-image-modal-spinner' },
          _react2.default.createElement(_Spinner2.default, null)
        ) : undefined
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          _props2$config = _props2.config,
          icon = _props2$config.icon,
          className = _props2$config.className,
          expanded = _props2.expanded,
          onExpandEvent = _props2.onExpandEvent;

      return _react2.default.createElement(
        'div',
        {
          className: 'rdw-image-wrapper',
          'aria-haspopup': 'true',
          'aria-expanded': expanded,
          'aria-label': 'rdw-image-control'
        },
        _react2.default.createElement(
          _Option2.default,
          {
            className: (0, _classnames2.default)(className),
            value: 'unordered-list-item',
            onClick: onExpandEvent
          },
          _react2.default.createElement('i', {
            className: icon
          })
        ),
        expanded ? this.renderAddImageModal() : undefined
      );
    }
  }]);

  return LayoutComponent;
}(_react.Component);

LayoutComponent.propTypes = {
  expanded: _propTypes2.default.bool,
  onExpandEvent: _propTypes2.default.func,
  doCollapse: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  translations: _propTypes2.default.object
};
exports.default = LayoutComponent;