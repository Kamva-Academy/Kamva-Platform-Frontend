import React from 'react';

import TinyPreview from '../../tiny_editor/react_tiny/Preview';

const TextWidget = ({ text = '' }) => {
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

export default TextWidget;
