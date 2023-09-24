import { Paper, Box, Fade } from '@mui/material';
import React, { FC } from 'react';
import Draggable from 'react-draggable';
import useWidth from 'utils/UseWidth';
import Meeting from 'components/organisms/Meeting';

type DraggableMeetingPropsType = {
  open: boolean;
  handleClose: () => void;
};

const DraggableMeeting: FC<DraggableMeetingPropsType> = ({ open, handleClose }) => {
  const width = useWidth();

  return (
    <Fade in={open}>
      <Box
        sx={{
          position: 'fixed',
          left: { xs: 0, sm: 10 },
          bottom: { xs: 'auto', sm: 10 },
          top: { xs: 0, sm: 'auto' },
          height: { xs: '80vh', sm: 350 },
          width: { xs: '100%', sm: 600 },
          zIndex: 1500,
        }}>
        <Draggable disabled={width === 'xs'} position={width === 'xs' ? { x: 0, y: 0 } : null} >
          <Paper sx={{ boxShadow: '0px 0px 6px', width: '100%', height: '100%' }}>
            <Meeting handleClose={handleClose} />
          </Paper>
        </Draggable>
      </Box>
    </Fade >
  );
}

export default DraggableMeeting;
