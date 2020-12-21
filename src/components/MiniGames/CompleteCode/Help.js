import { IconButton, Popover, Typography } from '@material-ui/core';
import { Help as HelpIcon } from '@material-ui/icons';
import React, { useState } from 'react';

function Help({ help }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'help-popover' : undefined;

  return (
    <>
      <IconButton
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}>
        <HelpIcon />
      </IconButton>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Typography style={{ padding: 10 }}>{help}</Typography>
      </Popover>
    </>
  );
}

export default Help;
