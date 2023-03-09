import React from 'react';
import ImageEditWidget from './edit';
export { ImageEditWidget };

const ImageWidget = ({ link, file, alt }) => {
  return (
    <img
      alt={alt}
      src={file || link}
      style={{
        width: '100%',
        maxWidth: '100%',
        maxHeight: 500,
        objectFit: 'contain',
      }} />
  );
};

export default ImageWidget;
