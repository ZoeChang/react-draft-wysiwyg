import React from 'react'
import { Entity } from 'draft-js'
import { convertToHTML, convertFromHTML } from 'draft-convert'

export function convertDraftToHTML(editorContent) {
  const styleToHTML = (style) => {
    const colorPattern = /^color/
    const bgColorPattern = /^bgcolor/
    const fontsizePattern = /^fontsize/

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
        <span style={{fontSize: fontSize}} />
      )
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
        const grids = entity.data.grids
        return (
          <table>
            <tbody>
              {grids.map((rows, rowIndex) => {
                return (
                  <tr
                    key={rowIndex}
                  >
                    {rows.map((column, columnIndex) => {
                      return (
                        <td
                          key={columnIndex}
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
        const { src, width, height } = entity.data
        return (
          <div>
            <img src={src} width={width} height={height} role="presentation" />
          </div>
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
  const htmlToStyle = (nodeName, node, currentStyle) => {

      if (nodeName === 'span') {

        if (node.style.color) {
          currentStyle = currentStyle.add(`color-${node.style.color}`);
        }
        if (node.style.fontSize) {
          currentStyle = currentStyle.add(`fontsize-${node.style.fontSize}`);
        }
        if (node.style.backgroundColor) {
          currentStyle = currentStyle.add(`bgcolor-${node.style.backgroundColor}`);
        }

        return currentStyle
      }

      return currentStyle;
  };

  const htmlToEntity = (nodeName, node) => {
    switch (nodeName) {
      case 'img': {
        return Entity.create(
            'IMAGE',
            'MUTABLE',
            {
              src: node.src,
              width: node.style.width,
              height: node.style.height,
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

        return Entity.create(
            'TABLE',
            'IMMUTABLE',
            {
              grids
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

  const htmlToBlock = next => (nodeName, ...args) => {
    switch (nodeName) {
      case 'img':
        return {
          type: 'atomic',
        };
      case 'table':
        return {
          type: 'atomic',
      };
      default:
        return {
          type: 'unstyled',
        };
    }
  }
  htmlToBlock.__isMiddleware = true

  return convertFromHTML({
    htmlToStyle,
    htmlToEntity,
    // textToEntity: (text) => {},
    htmlToBlock,
  })(html);
}
