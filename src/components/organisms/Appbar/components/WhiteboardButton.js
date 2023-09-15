import { Dialog, IconButton, Paper, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Brush as BrushIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';

import CustomDraggable from 'components/Whiteboard/CustomDraggable';
import Whiteboard from 'components/Whiteboard';
import useWidth from 'utils/UseWidth';

const useStyle = makeStyles(() => ({
  dragArea: {
    width: '100%',
    height: 20,
    background: '#666',
    cursor: 'move',
  },
}));

function WhiteboardButton() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const themeWidth = useWidth();

  const classes = useStyle();

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  const isDraggable = themeWidth != 'xs' && !isFullScreen;

  return <>
    <Tooltip title='تخته' arrow>
      <IconButton size={themeWidth == 'xs' ? 'small' : 'medium'} onClick={() => setOpen(!open)}>
        <BrushIcon />
      </IconButton>
    </Tooltip>
    <Dialog disableScrollLock
      maxWidth="lg"
      open={open}
      onClose={() => setOpen(false)}
      fullScreen={!isDraggable}
      hideBackdrop
      disableEnforceFocus
      style={{ pointerEvents: isDraggable ? 'none' : 'auto' }}
      PaperComponent={isDraggable ? CustomDraggable : Paper}>
      {isDraggable && <div className={classes.dragArea}></div>}
      <div className="not-draggable">
        <Whiteboard
          width={isDraggable ? 1000 : width}
          height={isDraggable ? 500 : height}
          handleClose={() => setOpen(false)}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
      </div>
    </Dialog>
  </>;
}

export default WhiteboardButton;
