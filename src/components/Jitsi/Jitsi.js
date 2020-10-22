import React, { useEffect, useRef } from 'react';
import { IconButton, makeStyles, withWidth } from '@material-ui/core';
import {
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
} from '@material-ui/icons';
import * as jitsiFuncs from './connection/jitsi';

const useStyles = makeStyles((theme) => ({
  draggableArea: {
    width: '100%',
    background: '#666',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(0, 2),
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
  },
  rightItems: {
    marginLeft: 'auto',
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },
  jitsi: {
    width: '100%',
    height: 300,
    [theme.breakpoints.down('xs')]: {
      height: '100vh',
    },
  },
}));
function Jitsi({ handleClose, width }) {
  const classes = useStyles();
  const jitsiElement = useRef();

  const refresh = () => {
    jitsiFuncs.destroy();
    jitsiFuncs.initJitsi({
      roomName: '1234lkfadmRasdfqlwekfmad3f1m1fklasdffbriu',
      parentNode: jitsiElement.current,
      height: width === 'xs' ? '100%' : '300px',
      userInfo: {
        displayName: 'کاربر',
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      refresh();
    }, 100);
    return jitsiFuncs.destroy;
  }, []);

  return (
    <>
      <div id="jitsi-draggable-area" className={classes.draggableArea}>
        <IconButton size="small" onClick={handleClose}>
          <CancelIcon color="error" />
        </IconButton>
        <div className={classes.rightItems}>
          <IconButton size="small" onClick={refresh}>
            <RefreshIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.jitsi} ref={jitsiElement}></div>
    </>
  );
}

export default withWidth()(Jitsi);
