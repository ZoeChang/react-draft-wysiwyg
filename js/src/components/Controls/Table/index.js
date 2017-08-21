import React, { Component } from 'react';
import classNames from 'classnames';
import { AtomicBlockUtils } from 'draft-js'
import { generate2dArray } from '../../../Utils/common'
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
      isMouseInArea: false
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
      const { screenX, screenY } = event

      const postion = {
        x: screenX - left,
        y: screenY - top - staticConfig.panelHeight - 4 * staticConfig.cellHeight,
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

  render() {
    const { config } = this.props
    const {
      isTableInsertOpen, pickCellArea: { x, y },
      mousePositionInCellArea: { x: mouseX, y: mouseY }
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

    const optionWrapperClasses = {
      'rdw-dropdown-selectedtext': true,
    }

    return (
      <div
        ref='table-control'
        className='rdw-table-insert-wrapper rdw-dropdown-wrapper'
        aria-haspopup="true"
        aria-label="rdw-table-insert-control"
        onClick={this.toggleTableInsertControl}
      >
        <div className={classNames(optionWrapperClasses)}>
          <i
            className={config.icon}
          />
        </div>
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
      </div>
    )
  }
}

export default Table
