import './style.css';

import React from 'react';
import { useDrop } from 'react-dnd';

import * as situations from './blanksSituation';
import { ItemTypes } from './ItemTypes';

export default function BlankBox({
  text,
  index,
  lineIndex,
  onDrop,
  blankIndex,
  situation,
  answer,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.ANSWER,
    drop: (item) => {
      onDrop(item.text, blankIndex);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <div
      id="blankBox"
      ref={drop}
      style={{
        opacity: isOver ? 0.3 : 1,
      }}>
      <div
        id="blankBox"
        textAlign="center"
        compact
        style={{
          color: situation === situations.WRONG ? '#f2e372' : 'black',
          backgroundColor: isOver
            ? '#f5f5ba'
            : situation === situations.NONE
              ? '#faf6aa'
              : situation === situations.WRONG
                ? '#eb7965'
                : '#a8eba7',
        }}>
        {situation === situations.WRONG ? answer : text ? text : blankIndex + 1}
      </div>
    </div>
  );
}
