import { IconButton, Tooltip, withWidth } from '@material-ui/core';
import { VideoCall as VideoCallIcon } from '@material-ui/icons';
import ForumIcon from '@material-ui/icons/Forum';
import React, { useEffect, useState } from 'react';

import DraggableJitsi from '../../../Jitsi/DraggableJitsi';

const JitsiButton = ({ width }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip arrow title='اتاق گفتگو'>
        <IconButton size={width == 'xs' ? 'small' : 'medium'} onClick={() => setOpen(!open)}>
          <ForumIcon />
        </IconButton>
      </Tooltip>
      <DraggableJitsi open={open} handleClose={() => setOpen(false)} />
    </>
  );
}

export default withWidth()(JitsiButton);