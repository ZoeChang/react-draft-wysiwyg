'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _common = require('../../../Utils/common');

var _index = require('../../Controls/ColorPicker/Component/index');

var _index2 = _interopRequireDefault(_index);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _index3 = require('../../Controls/FontSize/Component/index');

var _index4 = _interopRequireDefault(_index3);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var staticConfig = {
  extra: 20,
  panelWidth: 27,
  panelHeight: 32,
  cellWidth: 24,
  cellHeight: 16,
  maxXCells: 11,
  maxYCells: 11,
  minXCells: 4,
  minYCells: 4,
  table: {
    colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#ffffff', '#000000']
  }
};

var generateEmptyAttrs = function generateEmptyAttrs(x, y) {
  var attributes = [];
  for (var i = 0; i < y; i++) {
    attributes.push({
      attributes: {},
      style: {},
      td: {
        attributes: [],
        style: []
      }
    });
    for (var j = 0; j < x; j++) {
      attributes[i].td.attributes.push({});
      attributes[i].td.style.push({});
    }
  }
  return attributes;
};

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.toggleTableInsertControl = function () {
      var isTableInsertOpen = _this.state.isTableInsertOpen;

      _this.setState({ isTableInsertOpen: !isTableInsertOpen });
    };

    _this.onAddTable = function (xCells, yCells) {
      var _this$props = _this.props,
          editorState = _this$props.editorState,
          onChange = _this$props.onChange;

      var grids = (0, _common.generate2dArray)(xCells, yCells);
      var attributes = generateEmptyAttrs(xCells, yCells);
      var contentStateWithEntity = editorState.getCurrentContent().createEntity('TABLE', 'MUTABLE', {
        grids: grids,
        style: {},
        attributes: attributes
      });
      var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      var newEditorState = _draftJs.AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
      onChange(newEditorState);
      _this.toggleTableInsertControl();
    };

    _this.onMouseMoveHandler = function (event) {
      var _this$state$pickCellA = _this.state.pickCellArea,
          pickCellAreaX = _this$state$pickCellA.x,
          pickCellAreaY = _this$state$pickCellA.y;

      var pickCellAreaXCells = pickCellAreaX / staticConfig.cellWidth;
      var pickCellAreaYCells = pickCellAreaY / staticConfig.cellHeight;

      var pickCellWidth = pickCellAreaX + pickCellAreaXCells + 1;
      var pickCellHeight = pickCellAreaY + pickCellAreaYCells + 1;

      var pickCellWidthOneShort = pickCellAreaX - staticConfig.cellWidth + pickCellAreaXCells + 1;
      var pickCellHeightOneShort = pickCellAreaY - staticConfig.cellWidth + pickCellAreaYCells + 1;

      var maxWidth = staticConfig.maxXCells * staticConfig.cellWidth + staticConfig.maxXCells + 1;
      var maxHeight = staticConfig.maxYCells * staticConfig.cellHeight + staticConfig.maxYCells + 1;
      var minWidth = staticConfig.minXCells * staticConfig.cellWidth + staticConfig.minXCells + 1;
      var minHeight = staticConfig.minYCells * staticConfig.cellHeight + staticConfig.minYCells + 1;

      // NOT supporting ie8
      if (_this.state.isMouseInArea) {
        var _this$refs$tablePick = _this.refs['table-picker'].getBoundingClientRect(),
            top = _this$refs$tablePick.top,
            left = _this$refs$tablePick.left;

        var clientX = event.clientX,
            clientY = event.clientY;


        var postion = {
          x: clientX - left - 1,
          y: clientY - top - 1
        };
        _this.setState({
          mousePositionInCellArea: postion
        });

        if (postion.x + 1 > pickCellWidth && postion.x < maxWidth) {
          _this.setState({
            pickCellArea: {
              x: pickCellAreaX + staticConfig.cellWidth,
              y: pickCellAreaY
            }
          });
        }

        if (postion.y + 1 > pickCellHeight && postion.y < maxHeight) {
          _this.setState({
            pickCellArea: {
              x: pickCellAreaX,
              y: pickCellAreaY + staticConfig.cellHeight
            }
          });
        }

        if (postion.x - 1 < pickCellWidthOneShort && postion.x > minWidth) {
          _this.setState({
            pickCellArea: {
              x: pickCellAreaX - staticConfig.cellWidth,
              y: pickCellAreaY
            }
          });
        }

        if (postion.y - 1 < pickCellHeightOneShort && postion.y > minHeight) {
          _this.setState({
            pickCellArea: {
              x: pickCellAreaX,
              y: pickCellAreaY - staticConfig.cellHeight
            }
          });
        }
      }
    };

    _this.onMouseEnterHandler = function () {
      _this.setState({
        isMouseInArea: true
      });
    };

    _this.onMouseLeaveHandler = function () {
      _this.setState({
        isMouseInArea: false
      });
    };

    _this.onAddRowAfter = function () {
      var selectedRowsNCols = _this.state.selectedRowsNCols;

      var row = selectedRowsNCols[0].row; // by default take first item as row
      var _this$props2 = _this.props,
          block = _this$props2.block,
          blockProps = _this$props2.blockProps,
          contentState = _this$props2.contentState;

      var _blockProps$entity$ge = blockProps.entity.getData(),
          grids = _blockProps$entity$ge.grids,
          attributes = _blockProps$entity$ge.attributes;

      var columnLength = grids[0].length;
      var entityKey = block.getEntityAt(0);
      var insertedRows = (0, _common.generateArray)(columnLength);
      var insertedAttrs = {
        attributes: {},
        style: {},
        td: {
          attributes: (0, _common.generateArray)(columnLength, {}),
          style: (0, _common.generateArray)(columnLength, {})
        }
      };
      var newGrids = [].concat(_toConsumableArray(grids.slice(0, row + 1)), [insertedRows], _toConsumableArray(grids.slice(row + 1)));
      var newAttrs = [].concat(_toConsumableArray(attributes.slice(0, row + 1)), [insertedAttrs], _toConsumableArray(attributes.slice(row + 1)));

      var newContentState = contentState.mergeEntityData(entityKey, {
        grids: newGrids,
        attributes: newAttrs
      });

      var newEditorState = _draftJs.EditorState.createWithContent(newContentState);
      blockProps.onEditorChange(newEditorState);
    };

    _this.onRemoveRow = function () {
      var selectedRowsNCols = _this.state.selectedRowsNCols;

      var row = selectedRowsNCols[0].row; // by default take first item as row
      var _this$props3 = _this.props,
          block = _this$props3.block,
          blockProps = _this$props3.blockProps,
          contentState = _this$props3.contentState;

      var _blockProps$entity$ge2 = blockProps.entity.getData(),
          grids = _blockProps$entity$ge2.grids,
          attributes = _blockProps$entity$ge2.attributes;

      var entityKey = block.getEntityAt(0);
      var newGrids = [].concat(_toConsumableArray(grids.slice(0, row)), _toConsumableArray(grids.slice(row + 1)));
      var newAttrs = [].concat(_toConsumableArray(attributes.slice(0, row)), _toConsumableArray(attributes.slice(row + 1)));

      var newContentState = contentState.mergeEntityData(entityKey, {
        grids: newGrids,
        attributes: newAttrs
      });

      var newEditorState = _draftJs.EditorState.createWithContent(newContentState);
      blockProps.onEditorChange(newEditorState);
    };

    _this.onAddColumnAfter = function () {
      var selectedRowsNCols = _this.state.selectedRowsNCols;

      var columnIndex = selectedRowsNCols[0].column;
      var _this$props4 = _this.props,
          block = _this$props4.block,
          blockProps = _this$props4.blockProps,
          contentState = _this$props4.contentState;

      var _blockProps$entity$ge3 = blockProps.entity.getData(),
          grids = _blockProps$entity$ge3.grids,
          attributes = _blockProps$entity$ge3.attributes;

      var entityKey = block.getEntityAt(0);

      // mutate original entity data
      grids.forEach(function (row) {
        return row.splice(columnIndex + 1, 0, '');
      });
      attributes.forEach(function (row) {
        row.td.attributes.splice(columnIndex + 1, 0, {});
        row.td.style.splice(columnIndex + 1, 0, {});
      });

      var newContentState = contentState.mergeEntityData(entityKey, {
        grids: grids,
        attributes: attributes
      });

      var newEditorState = _draftJs.EditorState.createWithContent(newContentState);
      blockProps.onEditorChange(newEditorState);
    };

    _this.onRemoveColumn = function () {
      var selectedRowsNCols = _this.state.selectedRowsNCols;

      var columnIndex = selectedRowsNCols[0].column;
      var _this$props5 = _this.props,
          block = _this$props5.block,
          blockProps = _this$props5.blockProps,
          contentState = _this$props5.contentState;

      var _blockProps$entity$ge4 = blockProps.entity.getData(),
          grids = _blockProps$entity$ge4.grids,
          attributes = _blockProps$entity$ge4.attributes;

      var entityKey = block.getEntityAt(0);

      // mutate original entity data
      grids.forEach(function (row) {
        return row.splice(columnIndex, 1);
      });
      attributes.forEach(function (row) {
        row.td.attributes.splice(columnIndex, 1);
        row.td.style.splice(columnIndex, 1);
      });

      var newContentState = contentState.mergeEntityData(entityKey, {
        grids: grids,
        attributes: attributes
      });

      var newEditorState = _draftJs.EditorState.createWithContent(newContentState);
      blockProps.onEditorChange(newEditorState);
    };

    _this.onWidthChange = function (width) {
      var selectedRowsNCols = _this.state.selectedRowsNCols;
      var _this$props6 = _this.props,
          block = _this$props6.block,
          blockProps = _this$props6.blockProps,
          contentState = _this$props6.contentState;

      var _blockProps$entity$ge5 = blockProps.entity.getData(),
          attributes = _blockProps$entity$ge5.attributes;

      var entityKey = block.getEntityAt(0);

      if (selectedRowsNCols.length !== 0) {
        selectedRowsNCols.forEach(function (_ref) {
          var column = _ref.column,
              row = _ref.row;

          attributes[row].td.style[column] = _extends({}, attributes[row].td.style[column], {
            width: width + '%'
          });
        });
      }
      var newContentState = contentState.mergeEntityData(entityKey, {
        attributes: attributes
      });

      var newEditorState = _draftJs.EditorState.createWithContent(newContentState);
      blockProps.onEditorChange(newEditorState);
    };

    _this.onFontSizeChange = function (fontSize) {
      var selectedRowsNCols = _this.state.selectedRowsNCols;
      var _this$props7 = _this.props,
          block = _this$props7.block,
          blockProps = _this$props7.blockProps,
          contentState = _this$props7.contentState;

      var _blockProps$entity$ge6 = blockProps.entity.getData(),
          attributes = _blockProps$entity$ge6.attributes;

      var entityKey = block.getEntityAt(0);

      if (selectedRowsNCols.length !== 0) {
        selectedRowsNCols.forEach(function (_ref2) {
          var column = _ref2.column,
              row = _ref2.row;

          attributes[row].td.style[column] = _extends({}, attributes[row].td.style[column], {
            fontSize: fontSize
          });
        });
      }
      var newContentState = contentState.mergeEntityData(entityKey, {
        attributes: attributes
      });

      var newEditorState = _draftJs.EditorState.createWithContent(newContentState);
      blockProps.onEditorChange(newEditorState);
    };

    _this.onColorChange = function (currentStyle, color) {
      var selectedRowsNCols = _this.state.selectedRowsNCols;
      var _this$props8 = _this.props,
          block = _this$props8.block,
          blockProps = _this$props8.blockProps,
          contentState = _this$props8.contentState;

      var _blockProps$entity$ge7 = blockProps.entity.getData(),
          attributes = _blockProps$entity$ge7.attributes;

      var entityKey = block.getEntityAt(0);

      if (selectedRowsNCols.length !== 0) {
        selectedRowsNCols.forEach(function (_ref3) {
          var column = _ref3.column,
              row = _ref3.row;

          if (currentStyle === 'bgcolor') {
            attributes[row].td.style[column] = _extends({}, attributes[row].td.style[column], {
              backgroundColor: color
            });
          } else if (currentStyle === 'color') {
            attributes[row].td.style[column] = _extends({}, attributes[row].td.style[column], {
              color: color
            });
          }
        });
      }

      var newContentState = contentState.mergeEntityData(entityKey, {
        attributes: attributes
      });

      var newEditorState = _draftJs.EditorState.createWithContent(newContentState);
      blockProps.onEditorChange(newEditorState);
    };

    _this.onClickOutsideHandler = function () {
      _this.setState({
        isTableInsertOpen: false
      });
    };

    _this.state = {
      isTableInsertOpen: false,
      // pickerCellArea is recorded only on cell width and height, without border.
      pickCellArea: {
        x: 96,
        y: 64
      },
      // relatively tracking mouse position
      mousePositionInCellArea: {
        x: 0,
        y: 0
      },
      isMouseInArea: false,

      isFontExpanded: false,
      isColorPalate: false,
      isControlMode: false,
      isWidthExpanded: false
    };
    return _this;
  }

  _createClass(Table, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          config = _props.config,
          translations = _props.translations;
      var _state = this.state,
          isTableInsertOpen = _state.isTableInsertOpen,
          _state$pickCellArea = _state.pickCellArea,
          x = _state$pickCellArea.x,
          y = _state$pickCellArea.y,
          _state$mousePositionI = _state.mousePositionInCellArea,
          mouseX = _state$mousePositionI.x,
          mouseY = _state$mousePositionI.y,
          isColorPalate = _state.isColorPalate,
          isFontExpanded = _state.isFontExpanded,
          isWidthExpanded = _state.isWidthExpanded;


      var maxXCells = x / staticConfig.cellWidth;
      var maxYCells = y / staticConfig.cellHeight;

      var calcXCells = parseInt(mouseX / (staticConfig.cellWidth + 1), 10) + 1;
      var calcYCells = parseInt(mouseY / (staticConfig.cellHeight + 1), 10) + 1;

      var xCells = calcXCells > maxXCells ? maxXCells : calcXCells;
      var yCells = calcYCells > maxYCells ? maxYCells : calcYCells;

      var pickerCellStyle = {
        // cells + 1 to add up border width
        width: x + maxXCells + 1,
        height: y + maxYCells + 1
      };

      return _react2.default.createElement(
        _reactClickOutside2.default,
        {
          ref: 'table-control',
          onClickOutside: this.onClickOutsideHandler
        },
        _react2.default.createElement(
          'span',
          {
            className: 'rdw-option-wrapper',
            onClick: this.toggleTableInsertControl
          },
          _react2.default.createElement('i', {
            className: config.icon
          })
        ),
        isColorPalate && _react2.default.createElement(_index2.default, {
          isTablePicker: true,
          onTablePickerChange: this.onColorChange,
          expanded: isColorPalate,
          translations: translations,
          currentState: {},
          doCollapse: function doCollapse() {},
          config: {
            colors: staticConfig.table.colors
          }
        }),
        isFontExpanded && _react2.default.createElement(_index4.default, {
          isTablePicker: true,
          onChange: this.onFontSizeChange,
          expanded: isFontExpanded,
          config: {
            options: [8, 12, 16, 18, 20, 24, 28, 32, 36, 48]
          },
          currentState: {}
        }),
        isWidthExpanded && _react2.default.createElement(_index4.default, {
          isTablePicker: true,
          onChange: this.onWidthChange,
          expanded: isWidthExpanded,
          config: {
            options: [10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90]
          },
          currentState: { fontSize: '%' }
        }),
        isTableInsertOpen && _react2.default.createElement(
          'div',
          {
            ref: 'table-picker',
            className: 'rdw-dropdown-optionwrapper rdw-dropdown-table',
            style: {
              width: pickerCellStyle.width + staticConfig.extra
            }
          },
          _react2.default.createElement(
            'div',
            { className: 'rdw-table-picker-container',
              onClick: function onClick() {
                return _this2.onAddTable(xCells, yCells);
              },
              onMouseMove: this.onMouseMoveHandler,
              onMouseEnter: this.onMouseEnterHandler,
              onMouseLeave: this.onMouseLeaveHandler
            },
            _react2.default.createElement('div', {
              className: 'rdw-table-picker-cell',
              style: _extends({}, pickerCellStyle, {
                marginBottom: staticConfig.extra
              })
            })
          ),
          _react2.default.createElement(
            'p',
            null,
            ' ',
            xCells + ' X ' + yCells,
            ' '
          )
        )
      );
    }
  }]);

  return Table;
}(_react.Component);

exports.default = Table;