import React from 'react';
import ImageEditWidget from './edit';
export { ImageEditWidget };

const ImageWidget = ({ link, file, alt }) => {
  return <img src={file || link} alt={alt}
    style={{
      width: '100%',
      borderRadius: 10,
    }} />;
};

export default ImageWidget;
