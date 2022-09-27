import React from 'react';
import VideoEditWidget from './edit';
export { VideoEditWidget };

const VideoWidget = ({ link, file }) => {
  return <video controls src={file || link}
    style={{
      width: '100%',
      borderRadius: 10,
    }} />;
};

export default VideoWidget;
