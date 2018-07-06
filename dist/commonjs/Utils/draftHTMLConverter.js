'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.convertDraftToHTML = convertDraftToHTML;
exports.convertHTMLToDraft = convertHTMLToDraft;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _draftConvert = require('draft-convert');

var _htmlAttrToReactMap = require('./htmlAttrToReactMap');

var _deleteEmptyValue = require('./deleteEmptyValue');

var _deleteEmptyValue2 = _interopRequireDefault(_deleteEmptyValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var superscriptStyle = {
  fontSize: '11px',
  position: 'relative',
  top: '-8px',
  display: 'inline-flex'
};

var subscriptStyle = {
  fontSize: '11px',
  position: 'relative',
  bottom: '-8px',
  display: 'inline-flex'
};

var SUBSCRIPT = 'SUBSCRIPT';
var SUPERSCRIPT = 'SUPERSCRIPT';

function convertDraftToHTML(editorContent) {
  var styleToHTML = function styleToHTML(style) {
    var colorPattern = /^color/;
    var bgColorPattern = /^bgcolor/;
    var fontsizePattern = /^fontsize/;
    var strikeThroughPattern = /^STRIKETHROUGH/;

    if (colorPattern.test(style)) {
      var colorStyle = style.replace('color-', '');
      return _react2.default.createElement('span', { style: { color: colorStyle } });
    }

    if (bgColorPattern.test(style)) {
      var bgColorStyle = style.replace('bgcolor-', '');
      return _react2.default.createElement('span', { style: { backgroundColor: bgColorStyle } });
    }

    if (fontsizePattern.test(style)) {
      var fontSize = style.split('-')[1] || '16';
      return _react2.default.createElement('span', { style: { fontSize: fontSize } });
    }

    if (strikeThroughPattern.test(style)) {
      return _react2.default.createElement('span', { style: { textDecoration: 'line-through' } });
    }

    if (style === SUBSCRIPT) {
      return _react2.default.createElement('span', { style: subscriptStyle, 'data-type': SUBSCRIPT });
    }

    if (style === SUPERSCRIPT) {
      return _react2.default.createElement('span', { style: superscriptStyle, 'data-type': SUPERSCRIPT });
    }

    return;
  };

  var blockToHTML = function blockToHTML(next) {
    return function (block) {
      if (block.type === 'atomic') {
        return {
          start: '<figure>',
          end: '</figure>'
        };
      }
      return next(block);
    };
  };
  blockToHTML.__isMiddleware = true;

  var entityToHTML = function entityToHTML(entity, originalText) {
    switch (entity.type) {
      case 'TABLE':
        {
          var _entity$data = entity.data,
              grids = _entity$data.grids,
              attributes = _entity$data.attributes;

          return _react2.default.createElement(
            'table',
            null,
            _react2.default.createElement(
              'tbody',
              null,
              grids.map(function (rows, rowIndex) {
                return _react2.default.createElement(
                  'tr',
                  _extends({
                    key: rowIndex
                  }, attributes[rowIndex].attributes, {
                    style: attributes[rowIndex].style
                  }),
                  rows.map(function (column, columnIndex) {
                    return _react2.default.createElement(
                      'td',
                      _extends({
                        key: columnIndex
                      }, attributes[rowIndex].td.attributes[columnIndex], {
                        style: attributes[rowIndex].td.style[columnIndex]
                      }),
                      column
                    );
                  })
                );
              })
            )
          );
        }

      case 'IMAGE':
        {
          var _entity$data2 = entity.data,
              src = _entity$data2.src,
              width = _entity$data2.width,
              height = _entity$data2.height;

          return _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('img', { src: src, width: width, height: height, role: 'presentation' })
          );
        }

      case 'LINK':
        {
          var _entity$data3 = entity.data,
              url = _entity$data3.url,
              target = _entity$data3.target;

          return _react2.default.createElement('a', { href: url, target: target });
        }

      default:
        return originalText;
    }
  };

  return (0, _draftConvert.convertToHTML)({
    styleToHTML: styleToHTML,
    blockToHTML: blockToHTML,
    entityToHTML: entityToHTML
  })(editorContent);
}

function convertHTMLToDraft(html) {
  var htmlToStyle = function htmlToStyle(next) {
    return function (nodeName, node, currentStyle) {

      if (nodeName === 'span') {

        if (node.style.color) {
          currentStyle = currentStyle.add('color-' + node.style.color);
        }
        if (node.style.fontSize) {
          currentStyle = currentStyle.add('fontsize-' + node.style.fontSize.replace('px', ''));
        }
        if (node.style.backgroundColor) {
          currentStyle = currentStyle.add('bgcolor-' + node.style.backgroundColor);
        }
        if (node.dataset && node.dataset.type === SUPERSCRIPT) {
          currentStyle = currentStyle.add(SUPERSCRIPT);
        }

        if (node.dataset && node.dataset.type === SUBSCRIPT) {
          currentStyle = currentStyle.add(SUBSCRIPT);
        }

        return currentStyle;
      }

      if (nodeName === 'td') {
        return next(currentStyle);
      }

      return currentStyle;
    };
  };
  htmlToStyle.__isMiddleware = true;

  var htmlToEntity = function htmlToEntity(nodeName, node) {
    switch (nodeName) {
      case 'img':
        {
          var width = node.attributes.width ? node.attributes.width.value : '';
          var height = node.attributes.height ? node.attributes.height.value : '';
          return _draftJs.Entity.create('IMAGE', 'MUTABLE', {
            src: node.src,
            width: width,
            height: height
          });
        }

      case 'table':
        {
          // convert HTMLCollection to Arrays
          // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
          var grids = Array.prototype.slice.call(node.firstElementChild.children).map(function (tr) {
            return Array.prototype.slice.call(tr.children).map(function (td) {
              return td.textContent;
            });
          });

          var attrs = Array.prototype.slice.call(node.firstElementChild.children).map(function (tr) {

            var parsedStyle = (0, _deleteEmptyValue2.default)(tr.style);
            var trStyle = Object.keys(parsedStyle).reduce(function (accu, cssKey) {
              accu[cssKey] = parsedStyle[cssKey];
              return accu;
            }, {});

            var trAttr = Object.keys(tr.attributes).reduce(function (accu, attributeKey) {
              var mappedName = _htmlAttrToReactMap.trtdAttrToReactMap[tr.attributes[attributeKey].name];
              if (mappedName) {
                accu[mappedName] = tr.attributes[attributeKey].value;
              }
              return accu;
            }, {});

            var tdStyle = Array.prototype.slice.call(tr.children).map(function (td) {
              var parsedStyle = (0, _deleteEmptyValue2.default)(td.style);
              return Object.keys(parsedStyle).reduce(function (accu, cssKey) {
                accu[cssKey] = parsedStyle[cssKey];
                return accu;
              }, {});
            });

            var tdAttr = Array.prototype.slice.call(tr.children).map(function (td) {
              return Object.keys(td.attributes).reduce(function (accu, attributeKey) {
                var mappedName = _htmlAttrToReactMap.trtdAttrToReactMap[td.attributes[attributeKey].name];
                if (mappedName) {
                  accu[mappedName] = td.attributes[attributeKey].value;
                }
                return accu;
              }, {});
            });

            return {
              attributes: trAttr,
              style: trStyle,
              td: {
                attributes: tdAttr,
                style: tdStyle
              }
            };
          });

          return _draftJs.Entity.create('TABLE', 'IMMUTABLE', {
            grids: grids,
            attributes: attrs
          });
        }

      case 'a':
        {
          return _draftJs.Entity.create('LINK', 'MUTABLE', {
            url: node.getAttribute('href'),
            target: node.target
          });
        }

      default:
        return undefined;
    }
  };

  var htmlToBlock = function htmlToBlock(nodeName, node) {
    switch (nodeName) {
      case 'img':
        return {
          type: 'atomic'
        };
      case 'table':
        return {
          type: 'atomic'
        };
      case 'p':
        return null;

      default:
        return null;
    }
  };

  return (0, _draftConvert.convertFromHTML)({
    htmlToStyle: htmlToStyle,
    htmlToEntity: htmlToEntity,
    htmlToBlock: htmlToBlock
  })(html, { flat: true });
}