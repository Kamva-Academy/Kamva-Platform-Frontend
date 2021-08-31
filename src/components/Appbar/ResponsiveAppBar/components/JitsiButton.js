import { IconButton, Tooltip } from '@material-ui/core';
import { VideoCall as VideoCallIcon } from '@material-ui/icons';
import ForumIcon from '@material-ui/icons/Forum';
import React, { useEffect, useState } from 'react';

import DraggableJitsi from '../../../Jitsi/DraggableJitsi';

export default function JitsiButton() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  };

  return (
    <>
      <Tooltip arrow title='اتاق گفتگو'>
        <IconButton size={width > 400 ? 'medium' : 'small'} onClick={() => setOpen(!open)}>
          <ForumIcon />
        </IconButton>
      </Tooltip>
      <DraggableJitsi open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
