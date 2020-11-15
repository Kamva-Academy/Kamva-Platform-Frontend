import { Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import SampleAuthDialog from '../../../Dialog/SampleAuthDialog';

const useStyles = makeStyles((theme) => ({
  signUpColor: {
    color: 'white',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  space: {
    margin: theme.spacing(1),
  },
}));

function AuthItem({ isLoggedIn }) {
  const classes = useStyles();
  const [authOpen, setAuthOpen] = useState(false);
  if (isLoggedIn) {
    return (
      <Button variant="outlined" color="inherit">
        خروج
      </Button>
    );
  }
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={classes.space}
        onClick={() => setAuthOpen(true)}>
        ورود
      </Button>
      <Button
        variant="contained"
        className={clsx(classes.signUpColor, classes.space)}
        onClick={() => setAuthOpen(true)}>
        ثبت‌نام
      </Button>
      <SampleAuthDialog
        open={authOpen}
        handleClose={() => setAuthOpen(false)}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps)(AuthItem);
