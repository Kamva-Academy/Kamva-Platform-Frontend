import {
  Button,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import {
  getVerificationCodeAction,
  loginAction,
} from '../../redux/slices/account';
import { addNotificationAction } from '../../redux/slices/notifications';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '5px',
    padding: theme.spacing(1),
  },
}));

const InputFields = ({
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

  if (token) {
    return (
      <Redirect to='/dashboard/' />
    );
  }

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const doLogin = () => {
    const { username, password } = data;
    if (!username || !password) {
      addNotification({
        message: 'لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن!',
        type: 'error',
      });
      return;
    }

    login(data);
  };

  return (
    <>
      <Grid item>
        <TextField
          variant='outlined'
          fullWidth
          onChange={putData}
          value={data.phone}
          name='username'
          label='شماره تلفن‌همراه'
          inputProps={{ className: 'ltr-input' }}
          type='tel'
        />
      </Grid>

      <Grid item>
        <TextField
          variant='outlined'
          fullWidth
          onBlur={putData}
          label="گذرواژه"
          name="password"
          inputProps={{ className: 'ltr-input' }}
          type="password"
        />
      </Grid>


      <Grid container item direction="row" justify="center">
        <Button
          onClick={doLogin}
          variant="contained"
          color="primary"
          disabled={isFetching}
          fullWidth>
          بزن بریم...
        </Button>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  login: loginAction,
  addNotification: addNotificationAction,
})(InputFields);