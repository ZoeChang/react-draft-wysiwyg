import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './styles.css'

class Html extends Component {
  render() {
    const { config, onToggleHtmlMode, isHtmlMode } = this.props
    const optionWrapperClasses = {
      'rdw-option-wrapper': true,
      'rdw-option-active': isHtmlMode,
    }
    return (
      <div
        className='rdw-html-wrapper'
        aria-haspopup="true"
        aria-label="rdw-html-control"
        onClick={onToggleHtmlMode}
      >
        <div className={classNames(optionWrapperClasses)}>
          <i
            className={config.icon}
          />
        </div>
      </div>
    )
  }
}

export default Html
