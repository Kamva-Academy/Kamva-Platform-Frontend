import { Button } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';

type ProgramHelperButtonPropsType = {
}

const ProgramHelperButton: FC<ProgramHelperButtonPropsType> = ({ }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <Button
        size='large'
        variant="contained"
        color='info'
        fullWidth
        onClick={() => setOpenDialog(!openDialog)}>
        {'راهنمای سایت'}
      </Button>
    </Fragment>
  );
};

export default ProgramHelperButton;
