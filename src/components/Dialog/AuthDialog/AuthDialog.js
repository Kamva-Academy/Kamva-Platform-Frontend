import {
  Button,
  CircularProgress,
  Dialog,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { Close as CloseIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useHistory } from 'react-router-dom';

import { login } from '../../../redux/actions/account';
import { addNotification, } from '../../../redux/actions/notifications'

const useStyles = makeStyles((theme) => ({
  image: {
    background: `url(${process.env.PUBLIC_URL + '/ZeroJourneyer/login.png'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  leftContainer: {
    height: 300,
    padding: theme.spacing(2),
  },
  leftGrid: {
    height: '100%',
  },
  buttonProgress: {
    color: green[500],
  },
  notStarted: {
    margin: theme.spacing(3),
  },
}));

function AuthDialog({
  open,
  handleClose,
  login,
  isFetching,
  addNotification,
}) {
  const [userIdentity, setUserIdentity] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const t = useTranslate();

  const isEnglish = (string) => {
    var regex = new RegExp(`[a-zA-Z0-9-_.]{${string.length}}`);
    if (regex.test(string)) {
      return string;
    } else {
      return 'error'
    }
  }

  const isPhoneNumberValid = (phoneNumber) => {
    var regex = new RegExp('^(\\+98|0)?9\\d{9}$');
    if (regex.test(phoneNumber)) {
      return phoneNumber;
    } else {
      return;
    }
  };

  const isValidEmail = (email) => {
    var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regex.test(email)) {
      return email;
    } else {
      return 'error'
    }
  }

  const doLogin = () => {
    if (!userIdentity || !password) {
      addNotification({ message: 'لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن!', type: 'error' });
      return;
    }

    let phone, username, email;
    // if (userIdentity.startsWith('9') || userIdentity.startsWith('09')) {
    //   if (isPhoneNumberValid(userIdentity) === 'error') {
    //     addNotification({ message: 'شماره‌تلفنت معتبر نیست!', type: 'error' });
    //     return;
    //   } else {
    //     phone = userIdentity;
    //   }
    // } else if (userIdentity.includes('@')) {
    //   if (isValidEmail(userIdentity) === 'error') {
    //     addNotification({ message: 'ایمیلت معتبر نیست!', type: 'error' });
    //     return;
    //   } else {
    //     email = userIdentity;
    //   }
    // } else 
    if (isEnglish(userIdentity) === 'error') {
      addNotification({ message: 'نام‌کاربریت معتبر نیست!', type: 'error' });
      return;
    } else {
      username = userIdentity;
    }

    login({ username, password });
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <Grid container direction="row" justify="center">
        <Grid
          item
          xs={12}
          sm={7}
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
          className={classes.leftContainer}>
          <Grid container item direction="row">
            <Grid item xs={3}>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                className={classes.closeIcon}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item container xs={6} justify='center' alignItems='center'>
              <Typography component="h3" variant="h2" align="center">
                {t('login')}
              </Typography>
            </Grid>
            <Grid item xs={3} />
          </Grid>
          <Grid item>
            <TextField
              value={userIdentity}
              label='نام‌کاربری'
              type="text"
              fullWidth
              onChange={(e) => setUserIdentity(e.target.value)}
              inputProps={{ className: 'ltr-input' }}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <TextField
              value={password}
              label={t('password')}
              fullWidth
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ className: 'ltr-input' }}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <Typography align='center'>
              {'اگر رمزتون رو فراموش کردین، به '}
              <a href='/change-password'>
                {'این‌جا'}
              </a>
              {' مراجعه کنید.'}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              onClick={doLogin}
              disabled={isFetching}
              color="primary">
              {isFetching ? (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              ) : (
                  t('login')
                )}
            </Button>
          </Grid>
        </Grid>
        <Hidden xsDown>
          <Grid item sm={5} className={classes.image}></Grid>
        </Hidden>
      </Grid>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.account.isFetching,
});

export default connect(
  mapStateToProps,
  {
    login,
    addNotification,
  }
)(AuthDialog);
