import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { cost2string } from 'utils/ScoreHandler';

function CostDialog({ open, handleClose, callBackFunction, cost }) {

  return (
    <Dialog disableScrollLock maxWidth="xs" open={open} onClose={handleClose}>
      <DialogContent>
        <Grid item>
          <Typography variant="h5" align="center">
            {`با ارسال پاسخ، ${cost2string(cost)} از شما کسر خواهد شد. آیا مطمئن هستید؟`}
          </Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant="contained" color="primary" fullWidth>
          <Button onClick={callBackFunction}>
            بله
          </Button>
          <Button onClick={handleClose}>انصراف</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}

export default CostDialog;
