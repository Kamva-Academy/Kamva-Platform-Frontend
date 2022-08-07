import { Paper, Box, Fade } from '@mui/material';
import React, { FC } from 'react';
import Draggable from 'react-draggable';
import useWidth from '../../utils/UseWidth';
import Room from './Room';

type DraggableJitsiPropsType = {
  open: boolean;
  handleClose: () => void;
};

const DraggableJitsi: FC<DraggableJitsiPropsType> = ({ open, handleClose }) => {
  const width = useWidth();

  return (
    <Fade in={open}>
      {width === 'xs' ?
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '80vh',
            width: '100%',
            zIndex: 1000,
          }}>
          <Room handleClose={handleClose} />
        </Box>
        :
        <Box
          sx={{
            position: 'fixed',
            left: 10,
            bottom: 10,
            width: 600,
            zIndex: 1000,
          }}
        >
          <Draggable>
            <Paper sx={{ boxShadow: '0px 1px 5px' }}>
              <Room handleClose={handleClose} />
            </Paper>
          </Draggable>
        </Box>
      }
    </Fade >
  );
}

export default DraggableJitsi;
