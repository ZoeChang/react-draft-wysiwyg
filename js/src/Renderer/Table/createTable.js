import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable'
import { ContentState } from 'draft-js'
import styles from './styles.css'; // eslint-disable-line no-unused-vars

const createTable = () => class Table extends Component {
  static propTypes = {
    blockProps: PropTypes.object,
  }
  constructor(props) {
    super(props);
    const { entity } = props.blockProps
    const { grids, attributes } = entity.getData();
    this.state = {
      attributes,
      grids: grids || [[]],
      isEditing: false,
      focusRow: -1,
      focusColumn: -1,
      tdInputValue: '',
      toFocused: ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !Immutable.is(nextProps.contentState, this.props.contentState) ||
      nextState.isEditing !== this.state.isEditing ||
      nextState.focusRow !== this.state.focusRow ||
      nextState.focusColumn !== this.state.focusColumn
    )
  }

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

  getEditedContent: Function = (texValue): ContentState => {
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
    const { isEditing } = this.state
    const { blockProps, block } = this.props
    const newText = event.target.value
    // getEditedContent will return contentState instance, for now we don't need it,
    // just keeping it for reference.
    const newContentState = this.getEditedContent(newText) // eslint-disable-line
    if (isEditing) {
      this.setState(
        {
          isEditing: false,
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
      grids, isEditing, focusRow,
      focusColumn, attributes
    } = this.state
    return (
      <table
        ref={(element) => { this.table = element; }}
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
                  return (
                    <td
                      key={columnIndex}
                      className='editor-table-td'
                      onClick={(event) => this.onClickTdEventHandler(event, rowIndex, columnIndex)}
                      {...attributes[rowIndex].td.attributes[columnIndex]}
                      style={attributes[rowIndex].td.style[columnIndex]}
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
    );
  }
};

export default createTable;
