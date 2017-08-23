import React, { Component } from 'react';
import { AtomicBlockUtils } from 'draft-js'
import { generate2dArray, generateArray } from '../../../Utils/common'
import { EditorState } from 'draft-js'
import ColorPicker from '../../Controls/ColorPicker/Component/index';
import ClickOutside from 'react-click-outside'
import FontSize from '../../Controls/FontSize/Component/index';
import './styles.css'

const staticConfig = {
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
    colors: ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4','#009688','#4caf50','#8bc34a','#cddc39','#ffeb3b','#ffc107','#ff9800','#ff5722','#795548','#9e9e9e','#607d8b','#ffffff','#000000'],
  },
}

const generateEmptyAttrs = (x, y) => {
  const attributes = []
  for (let i = 0; i < y; i++) {
    attributes.push({
      attributes: {},
      style: {},
      td: {
        attributes: [],
        style: []
      },
    })
    for (let j = 0; j < x; j++) {
      attributes[i].td.attributes.push({})
      attributes[i].td.style.push({})
    }
  }
  return attributes
}

class Table extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isTableInsertOpen: false,
      // pickerCellArea is recorded only on cell width and height, without border.
      pickCellArea: {
        x: 96,
        y: 64,
      },
      // relatively tracking mouse position
      mousePositionInCellArea: {
        x: 0,
        y: 0,
      },
      isMouseInArea: false,

      isFontExpanded: false,
      isColorPalate: false,
      isControlMode: false,
      isWidthExpanded: false,
    }
  }

  toggleTableInsertControl = () => {
    const { isTableInsertOpen } = this.state
    this.setState({ isTableInsertOpen: !isTableInsertOpen })
  }

  onAddTable = (xCells, yCells) => {
    const { editorState, onChange } = this.props;
    const grids = generate2dArray(xCells, yCells)
    const attributes = generateEmptyAttrs(xCells, yCells)
    const contentStateWithEntity = editorState
      .getCurrentContent()
      .createEntity(
        'TABLE',
        'MUTABLE',
        {
          grids,
          style: {},
          attributes,
        }
      )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(
      editorState,
      entityKey,
      ' '
    );
    onChange(newEditorState);
    this.toggleTableInsertControl()
  }

  onMouseMoveHandler = (event) => {
    const { pickCellArea: { x: pickCellAreaX, y: pickCellAreaY } } = this.state
    const pickCellAreaXCells = pickCellAreaX / staticConfig.cellWidth
    const pickCellAreaYCells = pickCellAreaY / staticConfig.cellHeight

    const pickCellWidth = pickCellAreaX + pickCellAreaXCells + 1
    const pickCellHeight = pickCellAreaY + pickCellAreaYCells + 1

    const pickCellWidthOneShort = pickCellAreaX - staticConfig.cellWidth + pickCellAreaXCells + 1
    const pickCellHeightOneShort = pickCellAreaY - staticConfig.cellWidth + pickCellAreaYCells + 1

    const maxWidth = staticConfig.maxXCells * staticConfig.cellWidth + staticConfig.maxXCells + 1
    const maxHeight = staticConfig.maxYCells * staticConfig.cellHeight + staticConfig.maxYCells + 1
    const minWidth = staticConfig.minXCells * staticConfig.cellWidth + staticConfig.minXCells + 1
    const minHeight = staticConfig.minYCells * staticConfig.cellHeight + staticConfig.minYCells + 1

    // NOT supporting ie8
    if (this.state.isMouseInArea) {
      const { top, left } = this.refs['table-picker'].getBoundingClientRect()
      const { clientX, clientY } = event

      const postion = {
        x: clientX - left - 1,
        y: clientY - top - 1,
      }
      this.setState({
        mousePositionInCellArea: postion,
      })

      if (
        postion.x + 1 > pickCellWidth &&
        postion.x < maxWidth
      ) {
        this.setState({
          pickCellArea: {
            x: pickCellAreaX + staticConfig.cellWidth,
            y: pickCellAreaY
          }
        })
      }

      if (
        postion.y + 1 > pickCellHeight &&
        postion.y < maxHeight
      ) {
        this.setState({
          pickCellArea: {
            x: pickCellAreaX,
            y: pickCellAreaY + staticConfig.cellHeight,
          }
        })
      }

      if (
        postion.x - 1 < pickCellWidthOneShort &&
        postion.x > minWidth
      ) {
        this.setState({
          pickCellArea: {
            x: pickCellAreaX - staticConfig.cellWidth,
            y: pickCellAreaY
          }
        })
      }

      if (
        postion.y - 1 < pickCellHeightOneShort &&
        postion.y > minHeight
      ) {
        this.setState({
          pickCellArea: {
            x: pickCellAreaX,
            y: pickCellAreaY - staticConfig.cellHeight,
          }
        })
      }

    }
  }

  onMouseEnterHandler = () => {
    this.setState({
      isMouseInArea: true
    })
  }

  onMouseLeaveHandler = () => {
    this.setState({
      isMouseInArea: false
    })
  }

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

  onClickOutsideHandler = () => {
    this.setState({
      isTableInsertOpen: false,
    })
  }

  render() {
    const {
      config, translations
    } = this.props
    const {
      isTableInsertOpen, pickCellArea: { x, y },
      mousePositionInCellArea: { x: mouseX, y: mouseY },
      isColorPalate, isFontExpanded, isWidthExpanded,
    } = this.state

    const maxXCells = x / staticConfig.cellWidth
    const maxYCells = y / staticConfig.cellHeight

    const calcXCells = parseInt(mouseX / (staticConfig.cellWidth + 1), 10) + 1
    const calcYCells = parseInt(mouseY / (staticConfig.cellHeight + 1), 10) + 1

    const xCells = calcXCells > maxXCells ? maxXCells : calcXCells
    const yCells = calcYCells > maxYCells ? maxYCells : calcYCells

    const pickerCellStyle = {
      // cells + 1 to add up border width
      width: x + maxXCells + 1,
      height: y + maxYCells + 1,
    }

    return (
      <ClickOutside
        ref='table-control'
        onClickOutside={this.onClickOutsideHandler}
      >

          <span
            className='rdw-option-wrapper'
            onClick={this.toggleTableInsertControl}
          >
            <i
              className={config.icon}
            />
          </span>
        {/* for now we can not lift table tool from createTable to Control Panle. Keep it for future
        <span
          className={classNames(optionWrapperClasses)}
          onClick={
            () => {
              if (selectedRowsNCols.length === 0) return
              this.onAddRowAfter()
            }
          }
        >
          <i className='icon-editor-insert-row' />
        </span>
        <span className={classNames(optionWrapperClasses)}
          onClick={
            () => {
              if (selectedRowsNCols.length === 0) return
              this.onRemoveRow()
            }
          }
        >
          <i className='icon-editor-remove-row' />
        </span>
        <span
          className={classNames(optionWrapperClasses)}
          onClick={
            () => {
              if (selectedRowsNCols.length === 0) return
              this.onAddColumnAfter()
            }
          }
        >
          <i className='icon-editor-insert-column' />
        </span>
        <span
          className={classNames(optionWrapperClasses)}
          onClick={
            () => {
              if (selectedRowsNCols.length === 0) return
              this.onRemoveColumn()
            }
          }
        >
          <i className='icon-editor-remove-column' />
        </span>
        <span
          className={classNames(optionWrapperClasses)}
          onClick={() => {
            if (selectedRowsNCols.length === 0) return
            this.setState({
              isColorPalate: !isColorPalate,
              isControlMode: !this.state.isControlMode
            })
          }}
        >
          <i className='icon-editor-color' />
        </span>
        <span
          className={classNames(optionWrapperClasses)}
          onClick={() => {
            if (selectedRowsNCols.length === 0) return
            this.setState({
              isFontExpanded: !isFontExpanded,
              isControlMode: !this.state.isControlMode
            })
          }}
        >
          <i className='icon-editor-font-size-a' />
        </span>
        <span
          className={classNames(optionWrapperClasses)}
          onClick={() => {
            if (selectedRowsNCols.length === 0) return
            this.setState({
              isWidthExpanded: !isWidthExpanded,
              isControlMode: !this.state.isControlMode
            })
          }}
        >
          <i className='icon-editor-fit-to-width' />
        </span> */}
        { isColorPalate &&
        <ColorPicker
          isTablePicker={true}
          onTablePickerChange={this.onColorChange}
          expanded={isColorPalate}
          translations={translations}
          currentState={{}}
          doCollapse={() => {}}
          config={{
          colors: staticConfig.table.colors
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
        {isTableInsertOpen &&
          <div
            ref='table-picker'
            className="rdw-dropdown-optionwrapper rdw-dropdown-table"
            style={{
              width: pickerCellStyle.width + staticConfig.extra,
            }}
          >
            <div className='rdw-table-picker-container'
              onClick={() => this.onAddTable(xCells, yCells)}
              onMouseMove={this.onMouseMoveHandler}
              onMouseEnter={this.onMouseEnterHandler}
              onMouseLeave={this.onMouseLeaveHandler}
            >
              <div
                className='rdw-table-picker-cell'
                style={{
                  ...pickerCellStyle,
                  marginBottom: staticConfig.extra,
                }}
              />
            </div>
            <p> { `${xCells} X ${yCells}` } </p>
          </div>
        }
      </ClickOutside>
    )
  }
}

export default Table
