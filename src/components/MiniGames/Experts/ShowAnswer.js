import { Backdrop, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import failure from './styles/failure.svg';
import success from './styles/success.svg';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const IMG = {
  success,
  failure,
};

const ShowAnswer = ({ open, handleClose, answer }) => {
  const classes = useStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={answer?.type && open}
      onClick={handleClose}>
      <Grid container alignItems="center" justify="center" direction="column">
        <Grid item>
          <img
            src={IMG[answer?.result]}
            alt="success"
            style={{ height: '50vh' }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h1">
            {answer?.type === 1 ? 'گرون شد!' : 'ارزون شد!'}
          </Typography>
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default ShowAnswer;
