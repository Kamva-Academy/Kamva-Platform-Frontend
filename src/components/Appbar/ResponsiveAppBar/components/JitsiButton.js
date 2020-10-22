import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { VideoCall as VideoCallIcon } from '@material-ui/icons';
import DraggableJitsi from '../../../Jitsi/DraggableJitsi';

export default function JitsiButton() {
  const [open, setOpen] = useState();
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <VideoCallIcon />
      </IconButton>
      <DraggableJitsi open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
