import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';
import styles from './styles.css'; // eslint-disable-line no-unused-vars
import openlink from '../../../../images/openlink.svg';

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

function getLinkComponent(config) {
  const showOpenOptionOnHover = config.showOpenOptionOnHover;
  return class Link extends Component {

    static propTypes = {
      entityKey: PropTypes.string.isRequired,
      children: PropTypes.array,
      contentState: PropTypes.object,
    };

    state: Object = {
      showPopOver: false,
    };

    openLink: Function = () => {
      const { entityKey, contentState } = this.props;
      const { url } = contentState.getEntity(entityKey).getData();
      const linkTab = window.open(url, 'blank'); // eslint-disable-line no-undef
      linkTab.focus();
    };

    toggleShowPopOver: Function = () => {
      const showPopOver = !this.state.showPopOver;
      this.setState({
        showPopOver,
      });
    };

    onClickLink = (e) => {
      const { entityKey, contentState } = this.props;
      const { url, target } = contentState.getEntity(entityKey).getData();
      window.open(url, target);
    }

    render() {
      const { children } = this.props;
      const { showPopOver } = this.state;
      return (
        <span
          className="rdw-link-decorator-wrapper editor-anchor"
          onMouseEnter={this.toggleShowPopOver}
          onMouseLeave={this.toggleShowPopOver}
          onClick={this.onClickLink}
        >
          {children}
          {showPopOver && showOpenOptionOnHover ?
            <img
              src={openlink}
              alt=""
              onClick={this.openLink}
              className="rdw-link-decorator-icon"
            />
            : undefined
          }
        </span>
      );
    }
  }
}

export default (config) => {
  return {
    strategy: findLinkEntities,
    component: getLinkComponent(config),
  }
};
