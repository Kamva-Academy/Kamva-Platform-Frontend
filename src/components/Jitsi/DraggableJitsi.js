import { Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import Draggable from 'react-draggable';
import useWidth from '../../utils/UseWidth';
import Jitsi from './Jitsi';

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: 10,
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
    <div className={clsx(classes.root, !open && classes.hidden)}>
      <Draggable
        handle={
          width === 'xs' ? '#sadfkjasdklfkjasdf' : '#jitsi-draggable-area'
        }>
        <Paper>
          <Jitsi handleClose={handleClose} />
        </Paper>
      </Draggable>
    </div>
  );
}

export default DraggableJitsi;
