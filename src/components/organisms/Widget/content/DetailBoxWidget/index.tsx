import React from 'react';

import TinyPreview from 'components/tiny_editor/react_tiny/Preview';
import DetailBoxEditWidget from './edit';

export { DetailBoxEditWidget };

const DetailBoxWidget = ({ text }) => {
  return (
    <TinyPreview
      frameProps={{
        frameBorder: '0',
        scrolling: 'no',
        width: '100%',
      }}
      content={text}
    />
  );
};

export default DetailBoxWidget;
