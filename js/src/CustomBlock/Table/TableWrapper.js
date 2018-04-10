import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableWrapper extends Component {
  render() {
    return (
      <div className="nrc-rich-editor-table">
        {this.props.children}
      </div>
    );
  }
}

TableWrapper.propTypes = {
  children: PropTypes.object,
};

export default TableWrapper;
