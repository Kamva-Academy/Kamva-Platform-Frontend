import React, { Fragment } from 'react';

import TinyPreview from 'components/tiny_editor/react_tiny/Preview';
import DetailBoxEditDialog from './EditDialog';
import Paper from 'components/template/Paper';

export { DetailBoxEditDialog };

const DetailBoxWidget = ({ title, details }) => {
  return (
    <Fragment>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={title}
      />
      <Paper paper={details} />
    </Fragment>
  );
};

export default DetailBoxWidget;
