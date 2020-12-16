import { makeStyles } from '@material-ui/core';
import React from 'react';

import MiniGameEditWidget from './edit';

export { MiniGameEditWidget };

const useStyles = makeStyles((theme) => ({
  gameWidget: {
    width: '100%',
    borderRadius: 10,
    minHeight: 500,
  },
}));

const GameWidget = ({ link = '' }) => {
  const classes = useStyles();
  return <iframe title="بازی" src={link} className={classes.gameWidget} />;
};

export default GameWidget;
