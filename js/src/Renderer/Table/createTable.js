import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { ContentState, EditorState } from 'draft-js'
import { generateArray } from '../../Utils/common'
import styles from './styles.css'; // eslint-disable-line no-unused-vars
import ColorPicker from '../../components/Controls/ColorPicker/Component/index';
import FontSize from '../../components/Controls/FontSize/Component/index';
import ClickOutside from 'react-click-outside'
import ReactTooltip from 'react-tooltip'

const getSelectedRowsNCols = (startrow, startcol, endrow, endcol) => {
  const minRow = startrow < endrow ? startrow : endrow
  const maxRow = startrow < endrow ? endrow : startrow

  const minCol = startcol < endcol ? startcol : endcol
  const maxCol = startcol < endcol ? endcol : startcol

  const selectedRowsNCols = []
  for (let i = 0; i < maxRow + 1; i++) {
    if (i < minRow) continue
    for (let j = 0; j < maxCol + 1; j++) {
      if (j < minCol) continue
      selectedRowsNCols.push({
        column: j,
        row: i,
      })
    }
  }
  return selectedRowsNCols
}

const tableConfig = {
  colors: ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4caf50','#8bc34a','#cddc39','#ffeb3b','#ffc107','#ff9800','#ff5722','#795548','#9e9e9e','#607d8b','#ffffff','#000000',
  ]
}

const customizedStyle = {
  tdTool: {
    position: 'absolute',
    zIndex: '100',
    width: '350'
  },
  tdToolWrapper: {
    display: 'flex',
  }
}

class Table extends Component {
  static propTypes = {
    blockProps: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {

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
  }

  // componentWillReceiveProps(nextProps) {
  //   const { block, blockProps: { tableSelectionChange, getTableSelection, editorState } } = nextProps
  //   var selectionState = editorState.getSelection();
  //   var anchorKey = selectionState.getAnchorKey();
  //   var currentContent = editorState.getCurrentContent();
  //   var currentContentBlock = currentContent.getBlockForKey(anchorKey);
  //   // tableSelectionChnage reset will only be triggered by in progress table.
  //   if (
  //     getTableSelection().blockKey === block.getKey() &&
  //     currentContentBlock.getKey() !== block.getKey()
  //   ) {
  //     this.setState({
  //       selectedRowsNCols: [],
  //     })
  //     tableSelectionChange({
  //       blockKey: '',
  //       selectedRowsNCols: [],
  //     })
  //   }
  // }

  componentDidUpdate(preProps, preState) {
    const { toFocused } = this.state
    if (
      preState.toFocused !== toFocused ||
      document.activeElement !== this.refs[toFocused]
    ) {
      setTimeout(
        () => this.refs[toFocused] && this.refs[toFocused].focus(),
        0
      )
    }
  }

  onClickTd = (focusRow, focusColumn) => {
    const { blockProps, block } = this.props
    const { onStartEdit, isReadOnly } = blockProps;
    if (isReadOnly()) return
    const toFocused = `${focusRow}-${focusColumn}`
    this.setState(
      {
        isEditing: true,
        focusRow,
        focusColumn,
        toFocused
      },
      () => {
        onStartEdit(block.getKey())
      }
    )
  }

  onClickTdEventHandler = (event, rowIndex, columnIndex) => {
    event.preventDefault();
    event.stopPropagation();
    this.onClickTd(rowIndex, columnIndex)
  }

  updateEditedContent: Function = (texValue): ContentState => {
    const { block, blockProps, contentState } = this.props
    const { focusRow, focusColumn } = this.state;
    const { grids } = blockProps.entity.getData();
    const entityKey = block.getEntityAt(0);

    grids[focusRow][focusColumn] = texValue

    const newContentState = contentState.mergeEntityData(
      entityKey,
      {
        grids
      },
    );
    return newContentState
  }

  onTdBlur = (event) => {
    const { isEditing, focusRow, focusColumn } = this.state
    const { blockProps, block } = this.props
    const newText = event.target.value
    // updateEditedContent will return contentState instance, for now we don't need it,
    // just keeping it for reference.
    const newContentState = this.updateEditedContent(newText) // eslint-disable-line
    if (isEditing) {
      this.setState(
        {
          lastFocusRow: focusRow,
          lastFocusColumn: focusColumn,
          focusRow: -1,
          focusColumn: -1
        },
        () => {
          const { onFinishEdit } = blockProps;
          onFinishEdit(block.getKey())
        }
      )
    }
  }

  onTdFocus = (ref) => {}

  onAddRowAfter = () => {
    const { selectedRowsNCols } = this.state
    const row = selectedRowsNCols[0].row // by default take first item as row
    const { block, blockProps, contentState } = this.props
    const { grids, attributes } = blockProps.entity.getData();
    const columnLength = grids[0].length
    const entityKey = block.getEntityAt(0);
    const insertedRows = generateArray(columnLength)
    const insertedAttrs = {
      attributes: {},
      style: {},
      td: {
        attributes: generateArray(columnLength, {}),
        style: generateArray(columnLength, {}),
      }
    }
    const newGrids = [
      ...grids.slice(0, row + 1),
      insertedRows,
      ...grids.slice(row + 1)
    ]
    const newAttrs = [
      ...attributes.slice(0, row + 1),
      insertedAttrs,
      ...attributes.slice(row + 1)
    ]

    const newContentState = contentState.mergeEntityData(
      entityKey,
      {
        grids: newGrids,
        attributes: newAttrs,
      },
    );

    const newEditorState = EditorState.createWithContent(newContentState)
    blockProps.onEditorChange(newEditorState)
  }

  onRemoveRow = () => {
    const { selectedRowsNCols } = this.state
    const row = selectedRowsNCols[0].row // by default take first item as row
    const { block, blockProps, contentState } = this.props
    const { grids, attributes } = blockProps.entity.getData();
    const entityKey = block.getEntityAt(0);
    const newGrids = [
      ...grids.slice(0, row),
      ...grids.slice(row + 1)
    ]
    const newAttrs = [
      ...attributes.slice(0, row),
      ...attributes.slice(row + 1)
    ]

    const newContentState = contentState.mergeEntityData(
      entityKey,
      {
        grids: newGrids,
        attributes: newAttrs,
      },
    );

    const newEditorState = EditorState.createWithContent(newContentState)
    blockProps.onEditorChange(newEditorState)
  }

  onAddColumnAfter = () => {
    const { selectedRowsNCols } = this.state
    const columnIndex = selectedRowsNCols[0].column
    const { block, blockProps, contentState } = this.props
    const { grids, attributes } = blockProps.entity.getData();
    const entityKey = block.getEntityAt(0);

    // mutate original entity data
    grids.forEach(row => row.splice(columnIndex + 1, 0, ''))
    attributes.forEach(row => {
      row.td.attributes.splice(columnIndex + 1, 0, {})
      row.td.style.splice(columnIndex + 1, 0, {})
    })

    const newContentState = contentState.mergeEntityData(
      entityKey,
      {
        grids,
        attributes,
      },
    );

    const newEditorState = EditorState.createWithContent(newContentState)
    blockProps.onEditorChange(newEditorState)
  }

  onRemoveColumn = () => {
    const { selectedRowsNCols } = this.state
    const columnIndex = selectedRowsNCols[0].column
    const { block, blockProps, contentState } = this.props
    const { grids, attributes } = blockProps.entity.getData();
    const entityKey = block.getEntityAt(0);

    // mutate original entity data
    grids.forEach(row => row.splice(columnIndex, 1))
    attributes.forEach(row => {
      row.td.attributes.splice(columnIndex, 1)
      row.td.style.splice(columnIndex, 1)
    })

    const newContentState = contentState.mergeEntityData(
      entityKey,
      {
        grids,
        attributes,
      },
    );

    const newEditorState = EditorState.createWithContent(newContentState)
    blockProps.onEditorChange(newEditorState)
  }

  onWidthChange = (width: number) => {
    const { selectedRowsNCols } = this.state
    const { block, blockProps, contentState } = this.props
    const { attributes } = blockProps.entity.getData();
    const entityKey = block.getEntityAt(0);

    if (selectedRowsNCols.length !== 0) {
      selectedRowsNCols.forEach(({column, row}) => {
        attributes[row].td.style[column] = {
          ...attributes[row].td.style[column],
          width: `${width}%`,
        }
      })
    }
    const newContentState = contentState.mergeEntityData(
      entityKey,
      {
        attributes,
      },
    );

    const newEditorState = EditorState.createWithContent(newContentState)
    blockProps.onEditorChange(newEditorState)
  }

  onFontSizeChange = (fontSize: number) => {
    const { selectedRowsNCols } = this.state
    const { block, blockProps, contentState } = this.props
    const { attributes } = blockProps.entity.getData();
    const entityKey = block.getEntityAt(0);

    if (selectedRowsNCols.length !== 0) {
      selectedRowsNCols.forEach(({column, row}) => {
        attributes[row].td.style[column] = {
          ...attributes[row].td.style[column],
          fontSize,
        }
      })
    }
    const newContentState = contentState.mergeEntityData(
      entityKey,
      {
        attributes,
      },
    );

    const newEditorState = EditorState.createWithContent(newContentState)
    blockProps.onEditorChange(newEditorState)
  }

  onColorChange = (currentStyle, color) => {
    const { selectedRowsNCols } = this.state
    const { block, blockProps, contentState } = this.props
    const { attributes } = blockProps.entity.getData();
    const entityKey = block.getEntityAt(0);

    if (selectedRowsNCols.length !== 0) {
      selectedRowsNCols.forEach(({column, row}) => {
        if (currentStyle === 'bgcolor') {
          attributes[row].td.style[column] = {
            ...attributes[row].td.style[column],
            backgroundColor: color,
          }
        } else if (currentStyle === 'color') {
          attributes[row].td.style[column] = {
            ...attributes[row].td.style[column],
            color,
          }
        }
      })
    }

    const newContentState = contentState.mergeEntityData(
      entityKey,
      {
        attributes,
      },
    );

    const newEditorState = EditorState.createWithContent(newContentState)
    blockProps.onEditorChange(newEditorState)
  }

  onMouseDownHandler = (event) => {
    this.setState({
      isMouseDown: true,
    })
  }

  onMouseUpHandler = (event) => {
    const { mouseOverCol, mouseOverRow, mouseOverStartRow, mouseOverStartCol } = this.state
    const { block, blockProps: { tableSelectionChange } } = this.props
    const selectedRowsNCols = getSelectedRowsNCols(mouseOverRow, mouseOverCol, mouseOverStartRow, mouseOverStartCol)

    this.setState({
      isMouseDown: false,
      selectedRowsNCols,
    }, 
    tableSelectionChange({
      blockKey: block.getKey(),
      selectedRowsNCols,
    }))
  }

  onMouseOverTdHandler = (row, column) => {
    if (this.state.isMouseDown) {
      let mouseOverRow = row
      let mouseOverCol = column
      let mouseOverStartRow = this.state.mouseOverStartRow
      let mouseOverStartCol = this.state.mouseOverStartCol

      if (mouseOverStartRow > row || mouseOverStartRow === -1)  {
        mouseOverStartRow = row
      }
      if (mouseOverStartCol > column || mouseOverStartCol === -1) {
        mouseOverStartCol = column
      }

      if (mouseOverRow < this.state.mouseOverRow) {
        mouseOverRow = this.state.mouseOverRow
      }
      if (mouseOverCol < this.state.mouseOverCol) {
        mouseOverCol = this.state.mouseOverCol
      }
      this.setState({
        mouseOverStartRow,
        mouseOverStartCol,
        mouseOverRow,
        mouseOverCol,
      })
    }
  }

  onClickOutsideHandler = () => {
    const { block, blockProps: { tableSelectionChange, getTableSelection } } = this.props

    // each table will trigger its own internal state reset.
    this.setState({
      selectedRowsNCols: [],
      isColorPalate: false,
      isFontExpanded: false,
      isWidthExpanded: false,
    })

    // tableSelectionChnage reset will only be triggered by in progress table.
    if (getTableSelection().blockKey === block.getKey()) {
      tableSelectionChange({
        blockKey: '',
        selectedRowsNCols: [],
      })
    }
  }

  onKeyDownTdInput = (event) => {
    event.stopPropagation()
  }

  onKeyPressTdInput = (event) => {
    event.stopPropagation()
  }

  onKeyUpTdInput = (event) => {
    event.stopPropagation()
  }

  render() {
    const {
      isEditing, focusRow,
      focusColumn, isColorPalate,
      selectedRowsNCols, isFontExpanded, isWidthExpanded
    } = this.state
    const { readOnly, translations, entity } = this.props.blockProps
    const { grids, attributes } = entity.getData();
    const optionWrapperClasses = {
      'rdw-option-wrapper': true,
      'rdw-option-disabled': selectedRowsNCols.length === 0,
    }
    const removeOptionWrapperClasses = {
      'rdw-option-wrapper': true,
      'rdw-option-disabled': selectedRowsNCols.length === 0 || selectedRowsNCols.length > 1,
    }

    return (
      <ClickOutside
        onClickOutside={this.onClickOutsideHandler}
      >
        <table
          ref={(element) => { this.table = element; }}
          onMouseDown={this.onMouseDownHandler}
          onMouseUp={this.onMouseUpHandler}
          className='editor-table'
          contentEditable={false}
        >
          <tbody>
            {grids.map((rows, rowIndex) => {
              return (
                <tr
                  key={rowIndex}
                  className='editor-table-tr'
                  {...attributes[rowIndex].attributes}
                  style={attributes[rowIndex].style}
                >
                  {rows.map((column, columnIndex) => {
                    const tdClassName = {
                      'editor-table-td': true,
                      'editor-table-active-td': (
                        `${focusRow}-${focusColumn}` === `${rowIndex}-${columnIndex}` ||
                        (
                          selectedRowsNCols
                            .filter(rowNCol => rowNCol.row === rowIndex && rowNCol.column === columnIndex).length
                          !== 0
                        )
                      ),
                    }
                    return (
                      <td
                        key={columnIndex}
                        className={classNames(tdClassName)}
                        onMouseOver={
                          () => this.onMouseOverTdHandler(rowIndex, columnIndex)
                        }
                        onMouseDown={() => {
                          this.setState({
                            mouseOverStartRow: rowIndex,
                            mouseOverStartCol: columnIndex,
                            mouseOverRow: rowIndex,
                            mouseOverCol: columnIndex,
                          })
                        }}
                        onClick={(event) => this.onClickTdEventHandler(event, rowIndex, columnIndex)}
                        {...attributes[rowIndex].td.attributes[columnIndex]}
                        style={{
                          color: '#000',
                          ...attributes[rowIndex].td.style[columnIndex]
                        }}
                      >
                        {
                          isEditing && `${focusRow}-${focusColumn}` === `${rowIndex}-${columnIndex}`
                            ? (
                                <input
                                  type="text"
                                  ref={`${rowIndex}-${columnIndex}`}
                                  key={`${rowIndex}-${columnIndex}`}
                                  className='editor-table-input'
                                  defaultValue={column}
                                  onKeyDown={this.onKeyDownTdInput}
                                  onKeyPress={this.onKeyPressTdInput}
                                  onKeyUp={this.onKeyUpTdInput}
                                  onBlur={this.onTdBlur}
                                  onFocus={() => this.onTdFocus(`${rowIndex}-${columnIndex}`)}
                                  onCopy={(event) => event.stopPropagation()}
                                  onCut={(event) => event.stopPropagation()}
                                  onPaste={(event) => event.stopPropagation()}
                                />            
                              )
                            : column
                        }
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        {
          (
            !readOnly &&
            selectedRowsNCols.length !== 0
          ) &&
          <div
            className='rdw-dropdown-optionwrapper'
            style={customizedStyle.tdTool}
            onClick={() => {}}
          >
            <div
              className='editor-table-tool-wrapper'
              style={customizedStyle.tdToolWrapper}
            >
              <span
                className={classNames(optionWrapperClasses)}
                onClick={
                  () => {
                    if (selectedRowsNCols.length === 0) return
                    this.onAddRowAfter()
                  }
                }
                data-tip={translations['table.add.row']}
              >
                <i
                  className='icon-editor-insert-row'
                />
              </span>
              <span className={classNames(removeOptionWrapperClasses)}
                onClick={
                  () => {
                    if (selectedRowsNCols.length === 0 || selectedRowsNCols.length > 1) return
                    this.onRemoveRow()
                  }
                }
                data-tip={translations['table.remove.row']}
              >
                <i
                  className='icon-editor-remove-row'
                />
              </span>
              <span
                className={classNames(optionWrapperClasses)}
                onClick={
                  () => {
                    if (selectedRowsNCols.length === 0) return
                    this.onAddColumnAfter()
                  }
                }
                data-tip={translations['table.add.col']}
              >
                <i
                  className='icon-editor-insert-column'
                />
              </span>
              <span
                className={classNames(removeOptionWrapperClasses)}
                onClick={
                  () => {
                    if (selectedRowsNCols.length === 0 || selectedRowsNCols.length > 1) return
                    this.onRemoveColumn()
                  }
                }
                data-tip={translations['table.remove.col']}
              >
                <i
                  className='icon-editor-remove-column'
                />
              </span>
              <span
                className={classNames(optionWrapperClasses)}
                onClick={() => {
                  if (selectedRowsNCols.length === 0) return
                  this.setState({
                    isColorPalate: !isColorPalate,
                    isControlMode: !this.state.isControlMode,
                    isFontExpanded: false,
                    isWidthExpanded: false,
                  })
                }}
                data-tip={translations['colors']}
              >
                <i
                  className='icon-editor-color'
                />
              </span>
              <span
                className={classNames(optionWrapperClasses)}
                onClick={() => {
                  if (selectedRowsNCols.length === 0) return
                  this.setState({
                    isFontExpanded: !isFontExpanded,
                    isControlMode: !this.state.isControlMode,
                    isColorPalate: false,
                    isWidthExpanded: false,
                  })
                }}
                data-tip={translations['font-size']}
              >
                <i
                  className='icon-editor-font-size-a'
                />
              </span>
              <span
                className={classNames(optionWrapperClasses)}
                onClick={() => {
                  if (selectedRowsNCols.length === 0) return
                  this.setState({
                    isWidthExpanded: !isWidthExpanded,
                    isControlMode: !this.state.isControlMode,
                    isColorPalate: false,
                    isFontExpanded: false,
                  })
                }}
                data-tip={translations['table.col.width']}
              >
                <i
                  className='icon-editor-fit-to-width'
                />
              </span>
            </div>
            <ReactTooltip />
          </div>
        }
        { isColorPalate &&
        <ColorPicker
          isTablePicker={true}
          onTablePickerChange={this.onColorChange}
          expanded={isColorPalate}
          translations={translations}
          currentState={{}}
          doCollapse={() => {}}
          config={{
           colors: tableConfig.colors
          }}
        />
        }
        { isFontExpanded &&
        <FontSize
          isTablePicker={true}
          onChange={this.onFontSizeChange}
          expanded={isFontExpanded}
          config={{
            options: [8,12,16,18,20,24,28,32,36,48]
          }}
          currentState={{}}
        />
        }
        { isWidthExpanded &&
        <FontSize
          isTablePicker={true}
          onChange={this.onWidthChange}
          expanded={isWidthExpanded}
          config={{
            options: [10,20,25,30,40,50,60,70,75,80,90]
          }}
          currentState={{fontSize: '%'}}
        />
        }
      </ClickOutside>
    );
  }
};

export default Table;
