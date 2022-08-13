import { Paper, Box, Fade } from '@mui/material';
import React, { FC, useState } from 'react';
import Draggable from 'react-draggable';
import useWidth from '../../utils/UseWidth';
import ChatRoom from './ChatRoom';

type DraggableChatRoomPropsType = {
  open: boolean;
  handleClose: () => void;
};

const DraggableChatRoom: FC<DraggableChatRoomPropsType> = ({ open, handleClose }) => {
  const width = useWidth();

  return (
    <Fade in={open}>
      <Box
        sx={{
          position: 'fixed',
          left: width === 'xs' ? 0 : 10,
          bottom: width === 'xs' ? 'auto' : 10,
          top: width === 'xs' ? 0 : 'auto',
          height: width === 'xs' ? '80vh' : 350,
          width: width === 'xs' ? '100%' : 600,
          zIndex: 1500,
        }}
      >
        <Draggable disabled={width === 'xs'} position={width === 'xs' && { x: 0, y: 0 }}>
          <Paper sx={{ boxShadow: '0px 0px 6px', width: '100%', height: '100%' }}>
            <ChatRoom handleClose={handleClose} />
          </Paper>
        </Draggable>
      </Box>
    </Fade >
  );
}

export default DraggableChatRoom;
