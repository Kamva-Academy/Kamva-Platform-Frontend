import { Button, Dialog, Grid, Typography } from '@material-ui/core';
import React from 'react';

import { faSeri } from '../../../utils/translateNumber';

const ChangeRoundDialog = ({ round, handleClose, score }) => {
  const head =
    round === 0.5 ? 'بازی خبرگان' : round === 1.5 ? 'پایان دست اول' : 'پایان';

  return (
    <Dialog
      open={round === 0.5 || round === 1.5 || round === 2.5}
      fullScreen
      fullWidth
      onClose={handleClose}>
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ height: '100%' }}
        direction="column"
        spacing={3}>
        {score && (
          <Grid item>
            <Typography variant="h3">
              تو این دست {score} امتیاز بدست آوردی!
            </Typography>
          </Grid>
        )}

        <Grid item>
          <Typography variant="h1">{head}</Typography>
        </Grid>
        {(round === 0.5 || round === 1.5) && (
          <Grid item>
            <Button color="primary" variant="contained" onClick={handleClose}>
              <Typography variant="h3">
                شروع دست {faSeri(round - 0.5)}
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </Dialog>
  );
};

export default ChangeRoundDialog;
