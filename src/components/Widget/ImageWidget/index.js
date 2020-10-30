import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  imageWidget: {
    width: '100%',
    borderRadius: 10,
  },
}));

const ImageWidget = ({ src = '', alt }) => {
  const classes = useStyles();
  return <img src={src} className={classes.imageWidget} alt={alt} />;
};

export default ImageWidget;
