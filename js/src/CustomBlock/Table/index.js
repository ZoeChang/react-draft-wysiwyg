import React from 'react';
import Immutable from 'immutable';
import TableWrapper from './TableWrapper';


const tableBlockRenderMap = Immutable.Map({
  'table-block': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'table',
    wrapper: <TableWrapper />,
  },
});

export default tableBlockRenderMap;
