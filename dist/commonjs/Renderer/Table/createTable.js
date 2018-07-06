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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _draftJs = require('draft-js');

var _common = require('../../Utils/common');

var _styles = require('./styles.css');

var _styles2 = _interopRequireDefault(_styles);

var _index = require('../../components/Controls/ColorPicker/Component/index');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../components/Controls/FontSize/Component/index');

var _index4 = _interopRequireDefault(_index3);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


var getSelectedRowsNCols = function getSelectedRowsNCols(startrow, startcol, endrow, endcol) {
  var minRow = startrow < endrow ? startrow : endrow;
  var maxRow = startrow < endrow ? endrow : startrow;

  var minCol = startcol < endcol ? startcol : endcol;
  var maxCol = startcol < endcol ? endcol : startcol;

  var selectedRowsNCols = [];
  for (var i = 0; i < maxRow + 1; i++) {
    if (i < minRow) continue;
    for (var j = 0; j < maxCol + 1; j++) {
      if (j < minCol) continue;
      selectedRowsNCols.push({
        column: j,
        row: i
      });
    }
  }
  return selectedRowsNCols;
};

var tableConfig = {
  colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#ffffff', '#000000']
};

var customizedStyle = {
  tdTool: {
    position: 'absolute',
    zIndex: '100',
    width: '450px'
  },
  tdToolWrapper: {
    display: 'flex'
  }
};

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.onClickTd = function (focusRow, focusColumn) {
      var _this$props = _this.props,
          blockProps = _this$props.blockProps,
          block = _this$props.block;
      var onStartEdit = blockProps.onStartEdit,
          isReadOnly = blockProps.isReadOnly;

      if (isReadOnly()) return;
      var toFocused = focusRow + '-' + focusColumn;
      _this.setState({
        isEditing: true,
        focusRow: focusRow,
        focusColumn: focusColumn,
        toFocused: toFocused
      }, function () {
        onStartEdit(block.getKey());
      });
    };

    _this.onClickTdEventHandler = function (event, rowIndex, columnIndex) {
      event.preventDefault();
      event.stopPropagation();
      _this.onClickTd(rowIndex, columnIndex);
    };

    _this.updateEditedContent = function (texValue) {
      var _this$props2 = _this.props,
          block = _this$props2.block,
          blockProps = _this$props2.blockProps,
          contentState = _this$props2.contentState;
      var _this$state = _this.state,
          focusRow = _this$state.focusRow,
          focusColumn = _this$state.focusColumn;

      var _blockProps$entity$ge = blockProps.entity.getData(),
          grids = _blockProps$entity$ge.grids;

      var entityKey = block.getEntityAt(0);

      grids[focusRow][focusColumn] = texValue;

      var newContentState = contentState.mergeEntityData(entityKey, {
        grids: grids
      });
      return newContentState;
    };

    _this.onTdBlur = function (event) {
      var _this$state2 = _this.state,
          isEditing = _this$state2.isEditing,
          focusRow = _this$state2.focusRow,
          focusColumn = _this$state2.focusColumn;
      var _this$props3 = _this.props,
          blockProps = _this$props3.blockProps,
          block = _this$props3.block;

      var newText = event.target.value;
      // updateEditedContent will return contentState instance, for now we don't need it,
      // just keeping it for reference.
      var newContentState = _this.updateEditedContent(newText); // eslint-disable-line
      if (isEditing) {
        _this.setState({
          lastFocusRow: focusRow,
          lastFocusColumn: focusColumn,
          focusRow: -1,
          focusColumn: -1
        }, function () {
          var onFinishEdit = blockProps.onFinishEdit;

          onFinishEdit(block.getKey());
        });
      }
    };

    _this.onTdFocus = function (ref) {};

    _this.onAddRowAfter = function () {
      var selectedRowsNCols = _this.state.selectedRowsNCols;

      var row = selectedRowsNCols[0].row; // by default take first item as row
      var _this$props4 = _this.props,
          block = _this$props4.block,
          blockProps = _this$props4.blockProps,
          contentState = _this$props4.contentState;

      var _blockProps$entity$ge2 = blockProps.entity.getData(),
          grids = _blockProps$entity$ge2.grids,
          attributes = _blockProps$entity$ge2.attributes;

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
      var _this$props5 = _this.props,
          block = _this$props5.block,
          blockProps = _this$props5.blockProps,
          contentState = _this$props5.contentState;

      var _blockProps$entity$ge3 = blockProps.entity.getData(),
          grids = _blockProps$entity$ge3.grids,
          attributes = _blockProps$entity$ge3.attributes;

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
      var _this$props6 = _this.props,
          block = _this$props6.block,
          blockProps = _this$props6.blockProps,
          contentState = _this$props6.contentState;

      var _blockProps$entity$ge4 = blockProps.entity.getData(),
          grids = _blockProps$entity$ge4.grids,
          attributes = _blockProps$entity$ge4.attributes;

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
      var _this$props7 = _this.props,
          block = _this$props7.block,
          blockProps = _this$props7.blockProps,
          contentState = _this$props7.contentState;

      var _blockProps$entity$ge5 = blockProps.entity.getData(),
          grids = _blockProps$entity$ge5.grids,
          attributes = _blockProps$entity$ge5.attributes;

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
      var _this$props8 = _this.props,
          block = _this$props8.block,
          blockProps = _this$props8.blockProps,
          contentState = _this$props8.contentState;

      var _blockProps$entity$ge6 = blockProps.entity.getData(),
          attributes = _blockProps$entity$ge6.attributes;

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
      var _this$props9 = _this.props,
          block = _this$props9.block,
          blockProps = _this$props9.blockProps,
          contentState = _this$props9.contentState;

      var _blockProps$entity$ge7 = blockProps.entity.getData(),
          attributes = _blockProps$entity$ge7.attributes;

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
      var _this$props10 = _this.props,
          block = _this$props10.block,
          blockProps = _this$props10.blockProps,
          contentState = _this$props10.contentState;

      var _blockProps$entity$ge8 = blockProps.entity.getData(),
          attributes = _blockProps$entity$ge8.attributes;

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

    _this.onBoldChange = function () {
      var selectedRowsNCols = _this.state.selectedRowsNCols;
      var _this$props11 = _this.props,
          block = _this$props11.block,
          blockProps = _this$props11.blockProps,
          contentState = _this$props11.contentState;

      var _blockProps$entity$ge9 = blockProps.entity.getData(),
          attributes = _blockProps$entity$ge9.attributes;

      var entityKey = block.getEntityAt(0);

      if (selectedRowsNCols.length !== 0) {
        selectedRowsNCols.forEach(function (_ref4) {
          var column = _ref4.column,
              row = _ref4.row;

          if (attributes[row].td.style[column].fontWeight === 'bold') {
            attributes[row].td.style[column] = _extends({}, attributes[row].td.style[column], {
              fontWeight: 'normal'
            });
          } else {
            attributes[row].td.style[column] = _extends({}, attributes[row].td.style[column], {
              fontWeight: 'bold'
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

    _this.onItalicChange = function () {
      var selectedRowsNCols = _this.state.selectedRowsNCols;
      var _this$props12 = _this.props,
          block = _this$props12.block,
          blockProps = _this$props12.blockProps,
          contentState = _this$props12.contentState;

      var _blockProps$entity$ge10 = blockProps.entity.getData(),
          attributes = _blockProps$entity$ge10.attributes;

      var entityKey = block.getEntityAt(0);

      if (selectedRowsNCols.length !== 0) {
        selectedRowsNCols.forEach(function (_ref5) {
          var column = _ref5.column,
              row = _ref5.row;

          if (attributes[row].td.style[column].fontStyle === 'italic') {
            attributes[row].td.style[column] = _extends({}, attributes[row].td.style[column], {
              fontStyle: 'normal'
            });
          } else {
            attributes[row].td.style[column] = _extends({}, attributes[row].td.style[column], {
              fontStyle: 'italic'
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

    _this.onMouseDownHandler = function (event) {
      _this.setState({
        isMouseDown: true
      });
    };

    _this.onMouseUpHandler = function (event) {
      var _this$state3 = _this.state,
          mouseOverCol = _this$state3.mouseOverCol,
          mouseOverRow = _this$state3.mouseOverRow,
          mouseOverStartRow = _this$state3.mouseOverStartRow,
          mouseOverStartCol = _this$state3.mouseOverStartCol;
      var _this$props13 = _this.props,
          block = _this$props13.block,
          tableSelectionChange = _this$props13.blockProps.tableSelectionChange;

      var selectedRowsNCols = getSelectedRowsNCols(mouseOverRow, mouseOverCol, mouseOverStartRow, mouseOverStartCol);

      _this.setState({
        isMouseDown: false,
        selectedRowsNCols: selectedRowsNCols
      }, tableSelectionChange({
        blockKey: block.getKey(),
        selectedRowsNCols: selectedRowsNCols
      }));
    };

    _this.onMouseOverTdHandler = function (row, column) {
      if (_this.state.isMouseDown) {
        var mouseOverRow = row;
        var mouseOverCol = column;
        var mouseOverStartRow = _this.state.mouseOverStartRow;
        var mouseOverStartCol = _this.state.mouseOverStartCol;

        if (mouseOverStartRow > row || mouseOverStartRow === -1) {
          mouseOverStartRow = row;
        }
        if (mouseOverStartCol > column || mouseOverStartCol === -1) {
          mouseOverStartCol = column;
        }

        if (mouseOverRow < _this.state.mouseOverRow) {
          mouseOverRow = _this.state.mouseOverRow;
        }
        if (mouseOverCol < _this.state.mouseOverCol) {
          mouseOverCol = _this.state.mouseOverCol;
        }
        _this.setState({
          mouseOverStartRow: mouseOverStartRow,
          mouseOverStartCol: mouseOverStartCol,
          mouseOverRow: mouseOverRow,
          mouseOverCol: mouseOverCol
        });
      }
    };

    _this.onClickOutsideHandler = function () {
      var _this$props14 = _this.props,
          block = _this$props14.block,
          _this$props14$blockPr = _this$props14.blockProps,
          tableSelectionChange = _this$props14$blockPr.tableSelectionChange,
          getTableSelection = _this$props14$blockPr.getTableSelection;

      // each table will trigger its own internal state reset.

      _this.setState({
        selectedRowsNCols: [],
        isColorPalate: false,
        isFontExpanded: false,
        isWidthExpanded: false
      });

      // tableSelectionChnage reset will only be triggered by in progress table.
      if (getTableSelection().blockKey === block.getKey()) {
        tableSelectionChange({
          blockKey: '',
          selectedRowsNCols: []
        });
      }
    };

    _this.onKeyDownTdInput = function (event) {
      event.stopPropagation();
    };

    _this.onKeyPressTdInput = function (event) {
      event.stopPropagation();
    };

    _this.onKeyUpTdInput = function (event) {
      event.stopPropagation();
    };

    _this.state = {

      isMouseDown: false,
      isFontExpanded: false,
      isColorPalate: false,
      isControlMode: false,
      isWidthExpanded: false,
      isEditing: false,

      selectedRowsNCols: [],

      mouseOverRow: -1,
      mouseOverCol: -1,
      mouseOverStartRow: -1,
      mouseOverStartCol: -1,

      lastFocusRow: -1,
      lastFocusColumn: -1,
      focusRow: -1,
      focusColumn: -1,

      tdInputValue: '',
      toFocused: ''
    };
    return _this;
  }

  _createClass(Table, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(preProps, preState) {
      var _this2 = this;

      var toFocused = this.state.toFocused;

      if (preState.toFocused !== toFocused || document.activeElement !== this.refs[toFocused]) {
        setTimeout(function () {
          return _this2.refs[toFocused] && _this2.refs[toFocused].focus();
        }, 0);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          isEditing = _state.isEditing,
          focusRow = _state.focusRow,
          focusColumn = _state.focusColumn,
          isColorPalate = _state.isColorPalate,
          selectedRowsNCols = _state.selectedRowsNCols,
          isFontExpanded = _state.isFontExpanded,
          isWidthExpanded = _state.isWidthExpanded;
      var _props$blockProps = this.props.blockProps,
          readOnly = _props$blockProps.readOnly,
          translations = _props$blockProps.translations,
          entity = _props$blockProps.entity;

      var _entity$getData = entity.getData(),
          grids = _entity$getData.grids,
          attributes = _entity$getData.attributes;

      var optionWrapperClasses = {
        'rdw-option-wrapper': true,
        'rdw-option-disabled': selectedRowsNCols.length === 0
      };
      var removeOptionWrapperClasses = {
        'rdw-option-wrapper': true,
        'rdw-option-disabled': selectedRowsNCols.length === 0 || selectedRowsNCols.length > 1
      };

      return _react2.default.createElement(
        _reactClickOutside2.default,
        {
          onClickOutside: this.onClickOutsideHandler
        },
        _react2.default.createElement(
          'table',
          {
            ref: function ref(element) {
              _this3.table = element;
            },
            onMouseDown: this.onMouseDownHandler,
            onMouseUp: this.onMouseUpHandler,
            className: 'editor-table',
            contentEditable: false
          },
          _react2.default.createElement(
            'tbody',
            null,
            grids.map(function (rows, rowIndex) {
              return _react2.default.createElement(
                'tr',
                _extends({
                  key: rowIndex,
                  className: 'editor-table-tr'
                }, attributes[rowIndex].attributes, {
                  style: attributes[rowIndex].style
                }),
                rows.map(function (column, columnIndex) {
                  var tdClassName = {
                    'editor-table-td': true,
                    'editor-table-active-td': focusRow + '-' + focusColumn === rowIndex + '-' + columnIndex || selectedRowsNCols.filter(function (rowNCol) {
                      return rowNCol.row === rowIndex && rowNCol.column === columnIndex;
                    }).length !== 0
                  };
                  return _react2.default.createElement(
                    'td',
                    _extends({
                      key: columnIndex,
                      className: (0, _classnames2.default)(tdClassName),
                      onMouseOver: function onMouseOver() {
                        return _this3.onMouseOverTdHandler(rowIndex, columnIndex);
                      },
                      onMouseDown: function onMouseDown() {
                        _this3.setState({
                          mouseOverStartRow: rowIndex,
                          mouseOverStartCol: columnIndex,
                          mouseOverRow: rowIndex,
                          mouseOverCol: columnIndex
                        });
                      },
                      onClick: function onClick(event) {
                        return _this3.onClickTdEventHandler(event, rowIndex, columnIndex);
                      }
                    }, attributes[rowIndex].td.attributes[columnIndex], {
                      style: _extends({
                        color: '#000'
                      }, attributes[rowIndex].td.style[columnIndex])
                    }),
                    isEditing && focusRow + '-' + focusColumn === rowIndex + '-' + columnIndex ? _react2.default.createElement('input', {
                      type: 'text',
                      ref: rowIndex + '-' + columnIndex,
                      key: rowIndex + '-' + columnIndex,
                      className: 'editor-table-input',
                      defaultValue: column,
                      onKeyDown: _this3.onKeyDownTdInput,
                      onKeyPress: _this3.onKeyPressTdInput,
                      onKeyUp: _this3.onKeyUpTdInput,
                      onBlur: _this3.onTdBlur,
                      onFocus: function onFocus() {
                        return _this3.onTdFocus(rowIndex + '-' + columnIndex);
                      },
                      onCopy: function onCopy(event) {
                        return event.stopPropagation();
                      },
                      onCut: function onCut(event) {
                        return event.stopPropagation();
                      },
                      onPaste: function onPaste(event) {
                        return event.stopPropagation();
                      }
                    }) : column
                  );
                })
              );
            })
          )
        ),
        !readOnly && selectedRowsNCols.length !== 0 && _react2.default.createElement(
          'div',
          {
            className: 'rdw-dropdown-optionwrapper',
            style: customizedStyle.tdTool,
            onClick: function onClick() {}
          },
          _react2.default.createElement(
            'div',
            {
              className: 'editor-table-tool-wrapper',
              style: customizedStyle.tdToolWrapper
            },
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames2.default)(optionWrapperClasses),
                onClick: function onClick() {
                  if (selectedRowsNCols.length === 0) return;
                  _this3.onAddRowAfter();
                },
                'data-tip': translations['table.add.row'],
                'data-for': 'table-tooltip'
              },
              _react2.default.createElement('i', {
                className: 'icon-editor-insert-row'
              })
            ),
            _react2.default.createElement(
              'span',
              { className: (0, _classnames2.default)(removeOptionWrapperClasses),
                onClick: function onClick() {
                  if (selectedRowsNCols.length === 0 || selectedRowsNCols.length > 1) return;
                  _this3.onRemoveRow();
                },
                'data-tip': translations['table.remove.row'],
                'data-for': 'table-tooltip'
              },
              _react2.default.createElement('i', {
                className: 'icon-editor-remove-row'
              })
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames2.default)(optionWrapperClasses),
                onClick: function onClick() {
                  if (selectedRowsNCols.length === 0) return;
                  _this3.onAddColumnAfter();
                },
                'data-tip': translations['table.add.col'],
                'data-for': 'table-tooltip'
              },
              _react2.default.createElement('i', {
                className: 'icon-editor-insert-column'
              })
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames2.default)(removeOptionWrapperClasses),
                onClick: function onClick() {
                  if (selectedRowsNCols.length === 0 || selectedRowsNCols.length > 1) return;
                  _this3.onRemoveColumn();
                },
                'data-tip': translations['table.remove.col'],
                'data-for': 'table-tooltip'
              },
              _react2.default.createElement('i', {
                className: 'icon-editor-remove-column'
              })
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames2.default)(optionWrapperClasses),
                onClick: function onClick() {
                  if (selectedRowsNCols.length === 0) return;
                  _this3.setState({
                    isColorPalate: !isColorPalate,
                    isControlMode: !_this3.state.isControlMode,
                    isFontExpanded: false,
                    isWidthExpanded: false
                  });
                },
                'data-tip': translations['colors'],
                'data-for': 'table-tooltip'
              },
              _react2.default.createElement('i', {
                className: 'icon-editor-color'
              })
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames2.default)(optionWrapperClasses),
                onClick: function onClick() {
                  if (selectedRowsNCols.length === 0) return;
                  _this3.setState({
                    isFontExpanded: !isFontExpanded,
                    isControlMode: !_this3.state.isControlMode,
                    isColorPalate: false,
                    isWidthExpanded: false
                  });
                },
                'data-tip': translations['font-size'],
                'data-for': 'table-tooltip'
              },
              _react2.default.createElement('i', {
                className: 'icon-editor-font-size-a'
              })
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames2.default)(optionWrapperClasses),
                onClick: function onClick() {
                  if (selectedRowsNCols.length === 0) return;
                  _this3.setState({
                    isWidthExpanded: !isWidthExpanded,
                    isControlMode: !_this3.state.isControlMode,
                    isColorPalate: false,
                    isFontExpanded: false
                  });
                },
                'data-tip': translations['table.col.width'],
                'data-for': 'table-tooltip'
              },
              _react2.default.createElement('i', {
                className: 'icon-editor-fit-to-width'
              })
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames2.default)(optionWrapperClasses),
                onClick: this.onBoldChange
              },
              _react2.default.createElement('i', {
                className: 'icon-editor-bold'
              })
            ),
            _react2.default.createElement(
              'span',
              {
                className: (0, _classnames2.default)(optionWrapperClasses),
                onClick: this.onItalicChange
              },
              _react2.default.createElement('i', {
                className: 'icon-editor-italic'
              })
            )
          )
        ),
        isColorPalate && _react2.default.createElement(_index2.default, {
          isTablePicker: true,
          onTablePickerChange: this.onColorChange,
          expanded: isColorPalate,
          translations: translations,
          currentState: {},
          doCollapse: function doCollapse() {},
          config: {
            colors: tableConfig.colors
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
        _react2.default.createElement(_reactTooltip2.default, {
          id: 'table-tooltip'
          // we toggle key while table is selected or not selected
          , key: !selectedRowsNCols.length
        })
      );
    }
  }]);

  return Table;
}(_react.Component);

Table.propTypes = {
  blockProps: _propTypes2.default.object
};
;

exports.default = Table;