import React from 'react';
import VideoEditWidget from './edit';
export { VideoEditWidget };

const VideoWidget = ({ link, file }) => {
  return (
    <video controls src={file || link}
      style={{
        maxWidth: '100%',
        maxHeight: 500,
        borderRadius: 10,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      }} />
  );
};

export default VideoWidget;
