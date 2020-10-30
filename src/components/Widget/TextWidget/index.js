import React from 'react';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';

const TextWidget = ({ content = '' }) => {
  return (
    <TinyPreview
      frameProps={{
        frameBorder: '0',
        scrolling: 'no',
        width: '100%',
      }}
      content={content}
    />
  );
};

export default TextWidget;
