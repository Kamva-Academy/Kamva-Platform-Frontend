import './style.css';

import { Typography } from '@material-ui/core';
import React from 'react';

import BlankBox from './BlankBox';
import { ItemTypes } from './ItemTypes';

const CodeLine = ({
  blanks,
  lineData,
  lineIndex,
  onDrop,
  help,
  situations,
  answers,
}) => {
  return (
    <div id="line">
      <Typography>{help}</Typography>

      {lineData.map((data, index) => {
        if (data.type === ItemTypes.NOT_BLANK) {
          return (
            <div
              style={{
                display: 'table-cell',
                whiteSpace: 'pre',
                verticalAlign: 'middle',
              }}>
              <b>{data.text}</b>
            </div>
          );
        } else if (data.type === ItemTypes.BLANK) {
          return (
            <div
              style={{
                display: 'table-cell',
                verticalAlign: 'middle',
              }}>
              <BlankBox
                text={blanks[data.blankIndex]}
                situation={situations[data.blankIndex]}
                index={index}
                lineIndex={lineIndex}
                onDrop={onDrop}
                blankIndex={data.blankIndex}
                answer={answers[data.blankIndex]}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default CodeLine;
