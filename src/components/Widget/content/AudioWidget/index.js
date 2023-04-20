import React from 'react';
import AudioEditWidget from './edit';
export { AudioEditWidget };

const AudioWidget = ({ link, file }) => {
  return (
    <audio controls style={{ width: '100%' }} src={file || link} preload='auto' />
  );
};

export default AudioWidget;
