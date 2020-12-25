import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useDrag } from 'react-dnd';

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(0.2, 1),
    borderRadius: 3,
    background: '#fafafa',
    border: '2px solid #222',
    transition: '.2s',
    color: 'black',
    fontWeight: 500,
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '-3px 3px 0 #222',
    },
  },
}));

function DragItem({ text, onDrop }) {
  const classes = useStyles();
  const [{ isDragging }, dragRef] = useDrag({
    item: { text, type: 'CARD' },
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
    <div ref={dragRef} style={{ opacity }} className={classes.item}>
      {text}
    </div>
  );
}

export default DragItem;
