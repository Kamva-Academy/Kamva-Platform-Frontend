import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  videoWidget: {
    width: '100%',
    borderRadius: 10,
  },
}));

const VideoWidget = ({ src = '' }) => {
  const classes = useStyles();
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video controls src={src} className={classes.videoWidget} />;
};

export default VideoWidget;
