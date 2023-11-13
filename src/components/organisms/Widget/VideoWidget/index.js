import React, { useEffect, useRef } from 'react';
import VideoEditWidget from './edit';
export { VideoEditWidget };

const VideoWidget = ({ link, file }) => {

  return (
    <video
      onContextMenu={(e) => e.preventDefault()}
      controlsList="nodownload"
      controls
      src={file || link}
      style={{
        width: '100%',
        maxWidth: '100%',
        maxHeight: 500,
        objectFit: 'contain',
      }} />
  );
};

export default VideoWidget;
