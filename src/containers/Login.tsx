import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { loginAction } from '../redux/slices/account';
import { addNotificationAction } from '../redux/slices/notifications';
import appendPreviousParams from '../utils/AppendPreviousParams';
import { toEnglishNumber } from '../utils/translateNumber';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

type LoginPagePropsType = {
  isFetching: boolean;
  login: any;
  addNotification: any;
  token: string;
};

const LoginPage: FC<LoginPagePropsType> = ({
  isFetching,
  login,
  addNotification,
  token,
}) => {
  const classes = useStyles();

  const [data, setData] = useState({
    password: '',
    username: '',
  });

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('private_event_enter');

  if (token) {
    if (eventId) {
      return <Redirect to={`/event/${eventId}/`} />;
    } else {
      return <Redirect to="/events/" />;
    }
  }

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(toEnglishNumber(number))) {
      return true;
    } else {
      return false;
    }
  };

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const doLogin = () => {
    const { username, password } = data;
    if (!username || !password) {
      return;
    }
    login(data);
  };

  return (
    <Container className={classes.container}>
      <Grid container item xs={12} sm={8} md={4} spacing={2}>
        <Grid style={{ height: 64, width: '100%' }}></Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid item container>
              <Grid
                container
                item
                direction="column"
                justifyContent="center"
                spacing={2}>
                <Grid item>
                  <Typography
                    gutterBottom
                    component="h1"
                    variant="h2"
                    align="center">
                    {'ورود'}
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    autoComplete="on"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                      if (isJustDigits(e.target.value)) {
                        putData(e);
                      }
                    }}
                    value={data.username}
                    name="username"
                    label="نام کاربری"
                    helperText='نام کاربری، شماره تلفن یا شماره شناسنامه‌ی شماست.'
                    inputProps={{ className: 'ltr-input' }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    autoComplete="on"
                    variant="outlined"
                    fullWidth
                    onChange={putData}
                    label="گذرواژه"
                    name="password"
                    inputProps={{ className: 'ltr-input' }}
                    type="password"
                  />
                </Grid>
                <Grid container item direction="row" justifyContent="center">
                  <Button
                    onClick={doLogin}
                    variant="contained"
                    color="primary"
                    disabled={isFetching}
                    fullWidth>
                    بزن بریم
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Typography gutterBottom>
            <li>
              <Link
                style={{ textDecoration: 'none' }}
                to={appendPreviousParams('/reset_password')}>
                {'گذروازه‌ام را فراموش کرده‌ام :('}
              </Link>
            </li>
          </Typography>
          <Typography>
            <li>
              <Link
                style={{ textDecoration: 'none' }}
                to={appendPreviousParams('/create_account')}>
                {'می‌خواهم یک حساب کاربری جدید بسازم.'}
              </Link>
            </li>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  login: loginAction,
  addNotification: addNotificationAction,
})(LoginPage);
