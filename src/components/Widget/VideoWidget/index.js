import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(() => ({
  videoWidget: {
    width: '100%',
    borderRadius: 10,
    maxHeight: 500,
  },
}));

const VideoWidget = ({ link = '' }) => {
  const classes = useStyles();
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video controls src={link} className={classes.videoWidget} />;
};

export default VideoWidget;
