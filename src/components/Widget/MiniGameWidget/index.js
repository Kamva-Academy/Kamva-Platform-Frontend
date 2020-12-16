import { makeStyles } from '@material-ui/core';
import React from 'react';

import MiniGameEditWidget from './edit';

export { MiniGameEditWidget };

const useStyles = makeStyles((theme) => ({
  gameWidget: {
    width: '100%',
    borderRadius: 10,
    minHeight: 500,
    border: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
  },
}));

const GameWidget = ({ link = '' }) => {
  const classes = useStyles();
  return (
    <iframe
      title="بازی"
      src={link}
      className={classes.gameWidget}
      scrolling="no"
    />
  );
};

export default GameWidget;
