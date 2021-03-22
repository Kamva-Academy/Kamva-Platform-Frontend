import { IconButton } from '@material-ui/core';
import { VideoCall as VideoCallIcon } from '@material-ui/icons';
import React, { useState } from 'react';

import DraggableJitsi from '../../../Jitsi/DraggableJitsi';

export default function JitsiButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <VideoCallIcon />
      </IconButton>
      <DraggableJitsi open={open} handleClose={() => setOpen(false)} />
    </>
  );
}
