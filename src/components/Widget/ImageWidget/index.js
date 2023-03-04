import { Box } from '@mui/material';
import React from 'react';
import ImageEditWidget from './edit';
export { ImageEditWidget };

const ImageWidget = ({ link, file, alt }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <img
        alt={alt}
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

export default ImageWidget;
