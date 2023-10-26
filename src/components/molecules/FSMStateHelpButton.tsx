import React, { FC, useState } from 'react';
import { Button, Fab, IconButton, Tooltip, Typography } from '@mui/material';
import HelpDialog from 'components/organisms/dialogs/FSMStateHelpDialog';
import { Help as HelpIcon } from '@mui/icons-material';


type FSMStateHelpButtonPropsType = {
  hints: any[]
}

const FSMStateHelpButton: FC<FSMStateHelpButtonPropsType> = ({ hints }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isHover, setIsHover] = useState(false);

  if (hints.length === 0) return null;

  return (
    <>
      <Tooltip arrow title='راهنمایی'>
        <IconButton disableRipple onMouseOver={() => setIsHover(true)} onMouseOut={() => setIsHover(false)} onClick={() => setOpenDialog(true)}>
          <img width={40} src={process.env.PUBLIC_URL + ((isHover || openDialog) ? '/images/idea-on.png' : '/images/idea-off.png')} />
        </IconButton>
      </Tooltip>
      <HelpDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        helps={hints}
      />
    </>
  );
};

export default FSMStateHelpButton;
