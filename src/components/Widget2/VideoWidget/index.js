import makeStyles from '@mui/styles/makeStyles';
import React from 'react';

import VideoEditWidget from './edit';

export { VideoEditWidget };

const useStyles = makeStyles(() => ({
  videoWidget: {
    width: '100%',
    borderRadius: 10,
  },
}));

const VideoWidget = ({ link = '' }) => {
  const classes = useStyles();
  return <video controls src={link} className={classes.videoWidget} />;
};

export default VideoWidget;
