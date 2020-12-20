import './style.css';

import { Typography } from '@material-ui/core';
import React from 'react';
import { useDrag } from 'react-dnd';

import { ItemTypes } from './ItemTypes';

export default function AnswerBox({ text }) {
  const [{ isDragging }, drag] = useDrag({
    item: { text, type: ItemTypes.ANSWER },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      id="answerBox"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}>
      <Typography align="center">{text}</Typography>
    </div>
  );
}
