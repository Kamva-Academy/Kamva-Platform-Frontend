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
import { useHistory } from 'react-router';

import { loginAction } from '../../../redux/slices/account';
import { addNotificationAction } from '../../../redux/slices/notifications';

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
  isFetching,
  isLoggedIn,
  user,
  login,
  addNotification,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const t = useTranslate();

  const history = useHistory();

  useEffect(() => {
    if (open && isLoggedIn) {
      if (user.is_mentor) {
        history.push('/mentor');
      } else {
        history.push('/events');
      }
    }
  }, [isLoggedIn, user, open, history]);

  const doLogin = () => {
    if (!username || !password) {
      addNotification({
        message: 'لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن!',
        type: 'error',
      });
      return;
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
            <Grid item container xs={6} justify="center" alignItems="center">
              <Typography component="h3" variant="h2" align="center">
                {t('login')}
              </Typography>
            </Grid>
            <Grid item xs={3} />
          </Grid>
          <Grid item>
            <TextField
              value={username}
              label="نام‌کاربری"
              type="text"
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
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
            <Typography align="center">
              {'اگر رمزتون رو فراموش کردین، به '}
              <a href="/change-password">{'این‌جا'}</a>
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
  isLoggedIn: !!state.account.token,
  user: state.account.user,
});

export default connect(mapStateToProps, {
  login: loginAction,
  addNotification: addNotificationAction,
})(AuthDialog);

// todo:
// به نظر میاد وقتی توی دیالوگ درخواست می‌زنیم، دو تا اکشن درمی‌کنه!
