import { Paper, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import Draggable from 'react-draggable';
import useWidth from '../../utils/UseWidth';
import Jitsi from './Jitsi';

const useStyle = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    position: 'fixed',
    right: 10,
    bottom: 10,
    width: 500,
    zIndex: 200,
    [theme.breakpoints.down('sm')]: {
      left: 0,
      bottom: 0,
      width: '100%',
      height: '100vh',
    },
  },
  hidden: {
    height: 0,
    width: 0,
    border: 'none',
    display: 'none',
  },
}));

function DraggableJitsi({ open, handleClose }) {
  const classes = useStyle();
  const width = useWidth();

  return (
    <Box className={clsx(classes.root, !open && classes.hidden)}>
      <Draggable
        handle={
          width === 'xs' ? '#sadfkjasdklfkjasdf' : '#jitsi-draggable-area'
        }>
        <Paper>
          <Jitsi handleClose={handleClose} />
        </Paper>
      </Draggable>
    </Box>
  );
}

export default DraggableJitsi;
