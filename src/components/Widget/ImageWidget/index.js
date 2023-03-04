import React from 'react';
import ImageEditWidget from './edit';
export { ImageEditWidget };

const ImageWidget = ({ link, file, alt }) => {
  return (
    <img
      src={file || link} alt={alt}
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

export default ImageWidget;
