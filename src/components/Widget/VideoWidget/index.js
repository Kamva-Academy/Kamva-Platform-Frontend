import { Box } from '@mui/material';
import React from 'react';
import VideoEditWidget from './edit';
export { VideoEditWidget };

const VideoWidget = ({ link, file }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <video
        controls
        src={file || link}
        style={{
          maxWidth: '100%',
          maxHeight: 500,
          borderRadius: 10,
          objectFit: 'contain',
        }} />
    </Box>
  );
};

export default VideoWidget;
