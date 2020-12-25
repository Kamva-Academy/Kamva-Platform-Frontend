import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useDrag } from 'react-dnd';

const useStyles = makeStyles((theme) => ({
  root: ({ draggable }) => ({
    borderRadius: 6,
    background: draggable ? theme.palette.primary.main : '#333',
    border: 'solid 1px #ccc',
    color: 'white',
    width: 25,
    height: 25,
    lineHeight: '25px',
    fontSize: 15,
    transition: '.2s',
    '&:hover': {
      cursor: draggable && 'pointer',
      boxShadow: draggable && '-3px 3px 0 #777',
    },
  }),
}));

const Item = ({ num, draggable, onDrop }) => {
  const classes = useStyles({ draggable });

  const [{ isDragging }, dragRef] = useDrag({
    item: { num, type: 'CARD' },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDrop(dropResult.item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <Typography
      ref={draggable && dragRef}
      style={{ opacity }}
      align="center"
      className={classes.root}
      variant="h5">
      {num || '-'}
    </Typography>
  );
};

export default Item;
