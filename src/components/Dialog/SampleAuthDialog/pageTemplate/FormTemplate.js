import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: 'left',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2, 0),
      textAlign: 'center',
    },
  },
  grid: {
    height: '100%',
    padding: theme.spacing(1, 0),
  },
  fullHeight: {
    height: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  formAction: {
    margin: theme.spacing(1, 0),
  },
}));

export default function FromTemplate({
  title,
  formContent,
  formAction,
  submitText = 'ادامه',
  onSubmit,
}) {
  const classes = useStyles();

  return (
    <ValidatorForm
      className={classes.fullHeight}
      onSubmit={onSubmit}
      instantValidate={false}>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="stretch"
        className={classes.grid}>
        <div>
          <Typography component="h2" variant="h3" className={classes.title}>
            {title}
          </Typography>
        </div>
        <div className={classes.fullWidth}>{formContent}</div>
        <div className={classes.fullWidth}>
          <div className={classes.formAction}>{formAction}</div>
          <Button variant="contained" fullWidth color="primary" type="submit">
            {submitText}
          </Button>
        </div>
      </Grid>
    </ValidatorForm>
  );
}
