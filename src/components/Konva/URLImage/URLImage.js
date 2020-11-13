import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

export default function URLImage({ imageUrl, props }) {
  const [image] = useImage(imageUrl);
  return <Image image={image} {...props} />;
}
