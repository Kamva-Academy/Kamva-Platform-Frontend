import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  videoWidget: {
    width: '100%',
    borderRadius: 10,
  },
}));

const VideoWidget = ({ link = '' }) => {
  const classes = useStyles();
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video controls src={link} className={classes.videoWidget} />;
};

export default VideoWidget;
