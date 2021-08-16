import {
  Button,
  ButtonGroup,
  Dialog,
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
    <Dialog maxWidth="xl" open={open} onClose={handleClose}  >
      <Grid container spacing={2} direction='column' justify='center' alignItems='center' className={classes.padding}>
        <Grid item>
          <Typography variant='h5' align='center'>آیا مطمئن هستید؟</Typography>
        </Grid>
        <Grid item>
          <ButtonGroup variant='contained' color='primary' fullWidth>
            <Button onClick={() => { callBackFunction(); handleClose(); }} >بله</Button>
            <Button onClick={handleClose}>انصراف</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Dialog>
  );
}


export default AreYouSure;