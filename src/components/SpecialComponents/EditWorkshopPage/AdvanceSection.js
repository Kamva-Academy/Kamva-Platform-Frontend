import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import DeleteStateDialog from './components/DeleteStateDialog';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    overflow: 'hidden',
  },
  item: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    background: '#fafafa',
  },
  advance: {
    padding: theme.spacing(2),
  },
}));
function AdvanceSection({ stateId }) {
  const classes = useStyles();
  const t = useTranslate();
  const [openDeleteStateDialog, setOpenDeleteStateDialog] = useState();
  return (
    <>
      <Typography variant="h3" gutterBottom>
        پیشرفته
      </Typography>
      <Grid container justify="center">
        <Grid item xs={12} md={5}>
          <Paper className={classes.advance}>
            <Typography variant="h4" gutterBottom>
              {t('removeState')}
            </Typography>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              disabled={true}
              onClick={() => setOpenDeleteStateDialog(true)}
              startIcon={<DeleteIcon />}>
              {t('removeState')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <DeleteStateDialog
        open={openDeleteStateDialog}
        handleClose={() => setOpenDeleteStateDialog(false)}
        stateId={stateId}
      />
    </>
  );
}

export default AdvanceSection;
