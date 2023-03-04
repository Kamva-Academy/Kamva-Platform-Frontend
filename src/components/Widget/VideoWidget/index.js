import React from 'react';
import VideoEditWidget from './edit';
export { VideoEditWidget };

const VideoWidget = ({ link, file }) => {
  return (
    <video controls src={file || link}
      style={{
        borderRadius: 10,
        width: '100%',
        height: 500,
        objectFit: 'contain',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      }} />
  );
};

export default VideoWidget;
