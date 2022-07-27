import { IconButton, Tooltip } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import React, { FC, useState } from 'react';
import useWidth from '../../../../utils/UseWidth';
import DraggableJitsi from '../../../Jitsi/DraggableJitsi';

type JitsiButtonPropsType = {
}

const JitsiButton: FC<JitsiButtonPropsType> = () => {
  const [open, setOpen] = useState(false);
  const width = useWidth();



  return (
    <>
      <Tooltip arrow title='اتاق گفتگو'>
        <IconButton size={width == 'xs' ? 'small' : 'medium'} onClick={() => setOpen(!open)}>
          <ForumIcon />
        </IconButton>
      </Tooltip>
      <DraggableJitsi open={open} handleClose={() => setOpen(!open)} />
    </>
  );
}

export default JitsiButton;