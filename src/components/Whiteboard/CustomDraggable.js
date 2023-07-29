import { Paper } from '@mui/material';
import React from 'react';
import Draggable from 'react-draggable';

export default function CustomDraggable({ ...props }) {
  return (
    <Draggable cancel=".not-draggable">
      <Paper {...props} style={{ pointerEvents: 'auto', margin: 20 }} />
    </Draggable>
  );
}
