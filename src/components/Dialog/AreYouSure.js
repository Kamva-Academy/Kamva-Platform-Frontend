import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(2),
  }
}));


function AreYouSure({
  open,
  handleClose,
  callBackFunction,
}) {
  const classes = useStyles()

  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose}  >
      <DialogContent>
        <Grid item>
          <Typography variant='h5' align='center'>آیا مطمئن هستید؟</Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <ButtonGroup variant='contained' color='primary' fullWidth>
          <Button onClick={() => { callBackFunction(); handleClose(); }} >بله</Button>
          <Button onClick={handleClose}>انصراف</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
}


export default AreYouSure;