import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import Option from '../../components/Option';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

// function parseClassname(classname = 'imageAtom-undefined-w:-h:') {
//   const [name, alignment, widthsStr, heightStr] = classname.split('-')
//   const width = widthsStr.split(':')[1]
//   const height = heightStr.split(':')[1]
//   return { width, height, alignment }
// }

const alignmentStyle = {
  default: {
    cursor: 'default',
    position: 'relative',
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  left: {
    float: 'left',
  },
  right: {
    float: 'right',
  }
}

const getImageComponent = (config) => {

  return class Image extends Component {

    static propTypes: Object = {
      block: PropTypes.object,
      contentState: PropTypes.object,
    };

    state: Object = {
      hovered: false,
    };

    componentDidMount() {
      // dom manipulation of inline width and height
      const imageList = document.querySelectorAll('figure[class^="imageAtom"]')
      let nextElementSiblingKey = ''
      let prevElementSiblingKey = ''
      imageList.forEach((node, index) => {
        prevElementSiblingKey = node.previousElementSibling.dataset.offsetKey
        if (
          prevElementSiblingKey === nextElementSiblingKey
        ) {
          node.previousElementSibling.style.display = 'none'
        }
        nextElementSiblingKey = node.nextElementSibling.dataset.offsetKey
        if (nextElementSiblingKey === prevElementSiblingKey) {
          node.nextElementSibling.style.display = 'none'
        }

        // const { width, height, alignment } = parseClassname(node.className)
        // node.style.width = width
        // node.style.height = height
        // if (alignment === 'left' | alignment === 'right') {
        //   node.style.float = alignment
        // } else {
        //   node.style.float = 'none'
        // }
      })
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

    setEntityAlignmentLeft: Function = (): void => {
      this.setEntityAlignment('left');
    };

    setEntityAlignmentRight: Function = (): void => {
      this.setEntityAlignment('right');
    };

    setEntityAlignmentCenter: Function = (): void => {
      this.setEntityAlignment('center');
    };

    setEntityAlignment: Function = (alignment): void => {
      const { block, contentState } = this.props;
      const entityKey = block.getEntityAt(0);
      contentState.mergeEntityData(
        entityKey,
        { alignment }
      );
      config.onChange(EditorState.push(config.getEditorState(), contentState, 'change-block-data'))
      this.setState({
        dummy: true,
      });
    };

    toggleHovered: Function = (): void => {
      const hovered = !this.state.hovered;
      this.setState({
        hovered,
      });
    };

    renderAlignmentOptions(alignment): Object {
      const { blockProps: { readOnly } } = this.props;
      return (
        readOnly ||
        <div
          className={classNames(
            'rdw-image-alignment-options-popup',
            {
              'rdw-image-alignment-options-popup-right': alignment === 'right',
            }
          )}
        >
          <Option
            onClick={this.setEntityAlignmentLeft}
            className="rdw-image-alignment-option"
          >
            L
          </Option>
          <Option
            onClick={this.setEntityAlignmentCenter}
            className="rdw-image-alignment-option"
          >
            C
          </Option>
          <Option
            onClick={this.setEntityAlignmentRight}
            className="rdw-image-alignment-option"
          >
            R
          </Option>
        </div>
      );
    }

    render(): Object {
      const { block, contentState } = this.props;
      const { hovered } = this.state;
      const { isReadOnly, isImageAlignmentEnabled } = config;
      const entity = contentState.getEntity(block.getEntityAt(0));
      const { src, alignment = 'center', height, width } = entity.getData();

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
        <span>
            <img
              onClick={this.toggleHovered}
              style={{
                ...alignmentStyle.default,
                ...alignmentStyle[alignment],
                height,
                width,
              }}
              src={src}
              alt=""
            />
            {
              !isReadOnly() && hovered && isImageAlignmentEnabled() ?
                this.renderAlignmentOptions(alignment)
                :
                undefined
            }
        </span>
        // </span>
      );
    }
  }
}

export default getImageComponent;
