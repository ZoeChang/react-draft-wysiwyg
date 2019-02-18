import React from 'react'
import { Entity } from 'draft-js'
import { convertToHTML, convertFromHTML } from 'draft-convert'
import { trtdAttrToReactMap } from './htmlAttrToReactMap'
import deleteEmptyValue from './deleteEmptyValue'

const superscriptStyle = {
  fontSize: '11px',
  position: 'relative',
  top: '-8px',
  display: 'inline-flex',
}

const subscriptStyle = {
  fontSize: '11px',
  position: 'relative',
  bottom: '-8px',
  display: 'inline-flex',
}

const imgStyle = {
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  left: {
    marginLeft: '0',
    marginRight: 'auto',
    display: 'block',
  },
  right: {
    marginLeft: 'auto',
    marginRight: '0',
    display: 'block',
  }
}

const SUBSCRIPT = 'SUBSCRIPT';
const SUPERSCRIPT = 'SUPERSCRIPT';

export function convertDraftToHTML(editorContent) {
  const styleToHTML = (style) => {
    const colorPattern = /^color/
    const bgColorPattern = /^bgcolor/
    const fontsizePattern = /^fontsize/
    const strikeThroughPattern = /^STRIKETHROUGH/

    if (colorPattern.test(style)) {
      const colorStyle = style.replace('color-', '')
      return (
        <span style={{color: colorStyle}} />
      )
    }

    if (bgColorPattern.test(style)) {
      const bgColorStyle = style.replace('bgcolor-', '')
      return (
        <span style={{backgroundColor: bgColorStyle}} />
      )
    }

    if (fontsizePattern.test(style)) {
      const fontSize = style.split('-')[1] || '16'
      return (
        <span style={{fontSize: `${fontSize}px`}} />
      )
    }


    if (strikeThroughPattern.test(style)) {
      return <span style={{ textDecoration: 'line-through' }} />
    }

    if (style === SUBSCRIPT) {
      return <span style={subscriptStyle} data-type={SUBSCRIPT} /> 
    }

    if (style === SUPERSCRIPT) {
      return <span style={superscriptStyle} data-type={SUPERSCRIPT} /> 
    }

    return;
  }

  const blockToHTML = next => (block, ...args) => {
    if (block.type === 'atomic') {
      return {
        start: '<figure>',
        end: '</figure>'
      }
    }
    return next(block)
  }
  blockToHTML.__isMiddleware = true

  const entityToHTML = (entity, originalText) => {
    switch (entity.type) {
      case 'TABLE': {
        const { grids, attributes } = entity.data
        return (
          <table>
            <tbody>
              {grids.map((rows, rowIndex) => {
                return (
                  <tr
                    key={rowIndex}
                    {...attributes[rowIndex].attributes}
                    style={attributes[rowIndex].style}
                  >
                    {rows.map((column, columnIndex) => {
                      return (
                        <td
                          key={columnIndex}
                          {...attributes[rowIndex].td.attributes[columnIndex]}
                          style={attributes[rowIndex].td.style[columnIndex]}
                        >
                          {column}
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

      case 'IMAGE': {
        const { src, width, height, alignment = 'center' } = entity.data
        return (
          <span>
            <img src={src} width={width} height={height} role="presentation" style={imgStyle[alignment]} />
          </span>
        )
      }

      case 'LINK': {
        const { url, target } = entity.data
        return (
          <a href={url} target={target} />
        )
      }

      default:
        return originalText;
    }
  }

  return convertToHTML({
    styleToHTML,
    blockToHTML,
    entityToHTML,
  })(editorContent)
}


export function convertHTMLToDraft(html) {
  const htmlToStyle = (next) => (nodeName, node, currentStyle) => {

      if (
        nodeName === 'span'
      ) {

        if (node.style.color) {
          currentStyle = currentStyle.add(`color-${node.style.color}`);
        }
        if (node.style.fontSize) {
          currentStyle = currentStyle.add(`fontsize-${node.style.fontSize.replace('px', '')}`);
        }
        if (node.style.backgroundColor) {
          currentStyle = currentStyle.add(`bgcolor-${node.style.backgroundColor}`);
        }
        if (node.dataset && node.dataset.type === SUPERSCRIPT) {
          currentStyle = currentStyle.add(SUPERSCRIPT)
        }

        if (node.dataset && node.dataset.type === SUBSCRIPT) {
          currentStyle = currentStyle.add(SUBSCRIPT)
        }

        return currentStyle
      }

      if (nodeName === 'td') {
        return next(currentStyle);
      }

      return currentStyle
  };
  htmlToStyle.__isMiddleware = true

  const htmlToEntity = (nodeName, node) => {
    switch (nodeName) {
      case 'img': {
        const width = node.attributes.width ? node.attributes.width.value : ''
        const height = node.attributes.height ? node.attributes.height.value : ''
        return Entity.create(
            'IMAGE',
            'MUTABLE',
            {
              src: node.src,
              width,
              height,
            }
        )
      }

      case 'table': {
        // convert HTMLCollection to Arrays
        // https://stackoverflow.com/questions/222841/most-efficient-way-to-convert-an-htmlcollection-to-an-array
        const grids = Array.prototype.slice.call(node.firstElementChild.children).map(tr => {
          return Array.prototype.slice.call(tr.children).map(td => {
            return td.textContent
          })
        })

        const attrs = Array.prototype.slice.call(node.firstElementChild.children).map(tr => {

          const parsedStyle = deleteEmptyValue(tr.style)
          const trStyle = Object.keys(parsedStyle).reduce((accu, cssKey) => {
            accu[cssKey] = parsedStyle[cssKey]
            return accu
          }, {})

          const trAttr = Object.keys(tr.attributes).reduce((accu, attributeKey) => {
            const mappedName = trtdAttrToReactMap[tr.attributes[attributeKey].name]
            if (mappedName) {
              accu[mappedName] = tr.attributes[attributeKey].value
            }
            return accu
          }, {})

          const tdStyle = Array.prototype.slice.call(tr.children).map(td => {
            const parsedStyle = deleteEmptyValue(td.style)
            return Object.keys(parsedStyle).reduce((accu, cssKey) => {
              accu[cssKey] = parsedStyle[cssKey]
              return accu
            }, {})
          })

          const tdAttr = Array.prototype.slice.call(tr.children).map(td => {
            return Object.keys(td.attributes).reduce((accu, attributeKey) => {
              const mappedName = trtdAttrToReactMap[td.attributes[attributeKey].name]
              if (mappedName) {
                accu[mappedName] = td.attributes[attributeKey].value
              }
              return accu
            }, {})
          })

          return {
            attributes: trAttr,
            style: trStyle,
            td: {
              attributes: tdAttr,
              style: tdStyle
            }
          }
        })

        return Entity.create(
            'TABLE',
            'IMMUTABLE',
            {
              grids,
              attributes: attrs,
            }
        )
      }

      case 'a': {
        return Entity.create(
            'LINK',
            'MUTABLE',
            {
              url: node.getAttribute('href'),
              target: node.target,
            }
        )
      }

      default:
        return undefined;
    }
  }

  const htmlToBlock = (nodeName, node) => {
    switch (nodeName) {
      case 'img':
        return {
          type: 'atomic',
        };
      case 'table':
        return {
          type: 'atomic',
        };
      case 'p':
        return null

      default:
        return null
    }
  }

  return convertFromHTML({
    htmlToStyle,
    htmlToEntity,
    htmlToBlock,
  })(html, {flat: true});
}
