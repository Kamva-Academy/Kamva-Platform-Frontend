import { makeStyles, Paper, withWidth } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import Draggable from 'react-draggable';

import Jitsi from './Jitsi';

const useStyle = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: 10,
    bottom: 10,
    width: 500,
    zIndex: 200,
    [theme.breakpoints.down('xs')]: {
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

function DraggableJitsi({ open, handleClose, width }) {
  const classes = useStyle();

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

export default withWidth()(DraggableJitsi);
