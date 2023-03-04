import React from 'react';
import ImageEditWidget from './edit';
export { ImageEditWidget };

const ImageWidget = ({ link, file, alt }) => {
  return (
    <img
      src={file || link} alt={alt}
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

export default ImageWidget;
