import { makeStyles } from '@material-ui/core';
import React from 'react';

import DropArea from './DropArea';

const useStyles = makeStyles((theme) => ({
  root: {
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dash: {
    minWidth: 15,
    opacity: 0.6,
    color: '#35a',
  },
  item: {
    fontWeight: 700,
    margin: 5,
    [theme.breakpoints.down('xs')]: {
      fontWeight: 500,
      margin: 3,
    },
  },
}));

function Line({ tab = 0, items, onSelectDropArea }) {
  const classes = useStyles();

  return (
    <div container spacing={1} alignItems="center" className={classes.root}>
      {[...Array(tab)].map((e, i) => (
        <div key={i} item className={classes.dash}>
          -
        </div>
      ))}

      {items.map((item, index) => (
        <div item key={index} className={classes.item}>
          {typeof item === 'string' ? (
            item
          ) : (
            <DropArea dropItem={item} onSelectDropArea={onSelectDropArea} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Line;
