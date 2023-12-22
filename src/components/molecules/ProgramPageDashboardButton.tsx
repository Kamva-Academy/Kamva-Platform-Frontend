import { Box, Button, Dialog } from '@mui/material';
import React, { FC, Fragment, useState } from 'react';

type ProgramPageDashboardButtonPropsType = {
  buttonLabel: string;
  paperId: number;
}

const ProgramPageDashboardButton: FC<ProgramPageDashboardButtonPropsType> = ({ buttonLabel, paperId }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Fragment>
      <Button
        size='large'
        variant="contained"
        color='info'
        fullWidth
        onClick={() => setOpenDialog(true)}>
        {buttonLabel}
      </Button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} disableScrollLock>
        <Box position={'relative'} width={{ xs: 300, sm: 400, md: 600 }} height={600} sx={{ overflowX: 'hidden' }}>
          <iframe style={{ position: 'absolute', left: -8, top: 0, width: '100%', height: '100%', border: 0 }} src={`/article/${paperId}`} />
        </Box>
      </Dialog>
    </Fragment>
  );
};

export default ProgramPageDashboardButton;
