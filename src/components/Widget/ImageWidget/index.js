import { makeStyles } from '@material-ui/core';
import React from 'react';

import ImageEditWidget from './edit';

export { ImageEditWidget };

const useStyles = makeStyles((theme) => ({
  imageWidget: {
    width: '100%',
    borderRadius: 10,
  },
}));

const ImageWidget = ({ link = '', alt }) => {
  const classes = useStyles();
  return <img src={link} className={classes.imageWidget} alt={alt} />;
};

export default ImageWidget;
