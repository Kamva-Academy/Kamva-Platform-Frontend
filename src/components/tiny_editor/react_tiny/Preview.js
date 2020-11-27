import React from 'react';

import Frame from '../../Frame/Frame';
import fixDocumentMathElements from './fixDocumentMathElements';

const TinyPreview = ({ hidden = false, content = '', frameProps = {} }) => {
  return (
    <div style={hidden ? { display: 'none' } : {}}>
      <Frame
        handleUpdateContent={(doc) => fixDocumentMathElements(doc)}
        content={content}
        frameProps={frameProps}
      />
    </div>
  );
};

export default TinyPreview;
