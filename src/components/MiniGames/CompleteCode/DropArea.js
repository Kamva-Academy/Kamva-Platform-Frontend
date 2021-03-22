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

function DropArea({ dropItem, onSelectDropArea }) {
  const classes = useStyles({ mode: dropItem.mode });
  // eslint-disable-next-line no-unused-vars
  const [_, dropRef] = useDrop({
    accept: 'CARD',
    drop: () => ({ item: dropItem }),
  });
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      ref={dropRef}
      className={classes.dropArea}
      onClick={() => onSelectDropArea(dropItem)}>
      <Grid item>{dropItem.option}</Grid>
    </Grid>
  );
}

export default DropArea;
