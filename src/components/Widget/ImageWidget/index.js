import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
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
