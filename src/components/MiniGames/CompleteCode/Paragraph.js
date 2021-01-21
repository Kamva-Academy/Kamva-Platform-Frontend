import { makeStyles } from '@material-ui/core';
import React from 'react';

import Help from './Help';
import Line from './Line';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(2, 0.5, 1),

    maxWidth: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    border: '1px solid #ccc',
    borderRadius: 0,
    background: '#f6f6f6',
    boxShadow: '-4px 3px 0 #aaa',
    position: 'relative',
  },
  helpWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

function Paragraph({ help, lines, onSelectDropArea }) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <div className={classes.helpWrapper}>
        <Help help={help} />
      </div>
      {lines.map((line, index) => (
        <Line {...line} key={index} onSelectDropArea={onSelectDropArea} />
      ))}
    </div>
  );
}

export default Paragraph;
