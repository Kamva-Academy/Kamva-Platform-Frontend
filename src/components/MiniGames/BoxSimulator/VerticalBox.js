import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useDrop } from 'react-dnd';

import Item from './Item';

const useStyles = makeStyles((theme) => ({
  box: {
    border: '3px solid #333',
    borderRadius: 4,
    minHeight: 200,
    maxWidth: 40,
    height: '100%',
    padding: '1px 3px',
  },
}));

const VerticalBox = ({ items, dropItem, draggable, onDrop }) => {
  const classes = useStyles();

  const [_, dropRef] = useDrop({
    accept: 'CARD',
    drop: () => ({ item: dropItem }),
  });

  return (
    <Grid
      container
      className={classes.box}
      direction="column-reverse"
      alignItems="center"
      spacing={1}
      ref={dropRef}>
      {items?.map((item, index) => (
        <Grid item key={index}>
          <Item
            num={item}
            draggable={draggable}
            onDrop={(toBoxIndex) => onDrop(index, toBoxIndex)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default VerticalBox;
