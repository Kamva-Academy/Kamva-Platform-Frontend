import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDrop } from 'react-dnd';

const MODES = {
  E: {
    color: 'white',
  },
  N: {
    color: '#aaddee',
  },
  T: {
    color: '#ddeeaa',
  },
  F: {
    color: '#eeddaa',
  },
};

const useStyles = makeStyles((theme) => ({
  dropArea: ({ mode }) => ({
    border: '1px dotted black',
    minWidth: 50,
    height: 30,
    [theme.breakpoints.down('xs')]: {
      minWidth: 40,
      height: 20,
    },
    background: MODES[mode].color,
    padding: '1px 3px',
  }),
}));

function DropArea({ item }) {
  const classes = useStyles({ mode: item.mode });
  const [_, dropRef] = useDrop({
    accept: 'CARD',
    drop: () => ({ item }),
  });
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      ref={dropRef}
      className={classes.dropArea}>
      <Grid item>{item.option}</Grid>
    </Grid>
  );
}

export default DropArea;
