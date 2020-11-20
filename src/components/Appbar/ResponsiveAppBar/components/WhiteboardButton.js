import React, { useEffect, useState } from 'react';
import { Dialog, IconButton } from '@material-ui/core';
import { Brush as BrushIcon } from '@material-ui/icons';
import Whiteboard from '../../../Whiteboard';

function WhiteboardButton() {
  const [open, setOpen] = useState();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(!open)}>
        <BrushIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        <Whiteboard
          width={2500}
          height={2500}
          handleClose={() => setOpen(false)}
        />
      </Dialog>
    </>
  );
}

export default WhiteboardButton;
