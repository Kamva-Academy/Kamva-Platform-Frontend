import { IconButton, Tooltip } from '@mui/material';
import { VideoCall as VideoCallIcon } from '@mui/icons-material';
import ForumIcon from '@mui/icons-material/Forum';
import React, { useEffect, useState } from 'react';
import useWidth from '../../../../utils/UseWidth';
import DraggableJitsi from '../../../Jitsi/DraggableJitsi';

const JitsiButton = () => {
  const [open, setOpen] = useState(false);
  const width = useWidth();

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

export default JitsiButton;