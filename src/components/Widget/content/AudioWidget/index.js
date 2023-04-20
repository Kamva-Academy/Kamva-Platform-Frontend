import React from 'react';
import AudioEditWidget from './edit';
export { AudioEditWidget };

const AudioWidget = ({ link, file }) => {
  return (
    <audio controls style={{ width: '100%' }}>
      <source src={file || link} type="audio/mpeg" />
      Your browser does not support the html audio tag.
    </audio>
  );
};

export default AudioWidget;
