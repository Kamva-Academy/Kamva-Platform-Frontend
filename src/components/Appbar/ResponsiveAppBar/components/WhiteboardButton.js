import {
  Dialog,
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  withWidth,
} from '@material-ui/core';
import { Brush as BrushIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import CustomDraggable from '../../../CustomDraggable';
import Whiteboard from '../../../Whiteboard';

const useStyle = makeStyles(() => ({
  dragArea: {
    width: '100%',
    height: 20,
    background: '#666',
    cursor: 'move',
  },
}));

function WhiteboardButton({ width: themeWidth }) {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

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

  return (
    <>
      <Tooltip title='تخته' arrow>
        <IconButton size={themeWidth == 'xs' ? 'small' : 'medium'} onClick={() => setOpen(!open)}>
          <BrushIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={!isDraggable}
        hideBackdrop
        disableEnforceFocus
        style={{ pointerEvents: isDraggable ? 'none' : 'auto' }}
        disableBackdropClick
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
    </>
  );
}

export default withWidth()(WhiteboardButton);
