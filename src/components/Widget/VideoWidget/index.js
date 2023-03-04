import React from 'react';
import VideoEditWidget from './edit';
export { VideoEditWidget };

const VideoWidget = ({ link, file }) => {
  return (
    <video
      controls
      src={file || link}
      style={{
        width: '100%',
        maxWidth: '100%',
        maxHeight: 500,
        objectFit: 'contain',
        borderRadius: 10,
      }} />
  );
};

export default VideoWidget;
