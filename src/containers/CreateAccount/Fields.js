import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import {
  createAccountAction,
  getVerificationCodeAction,
} from '../../redux/slices/account';
import { addNotificationAction } from '../../redux/slices/notifications';
import { toEnglishNumber } from '../../utils/translateNumber';

const InputFields = ({
  isFetching,
  createAccount,
  getVerificationCode,
  addNotification,
  token,
}) => {
  const [buttonText, setButtonText] = useState('دریافت کد');
  const [data, setData] = useState({
    phoneNumber: '',
    password: '',
    confirmationPassword: '',
    code: '',
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

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(toEnglishNumber(number))) {
      return true;
    } else {
      return false;
    }
  };

  const isPhoneNumberValid = (phoneNumber) => {
    var regex = new RegExp('^09\\d{9}$');
    if (regex.test(phoneNumber)) {
      return phoneNumber;
    } else {
      return;
    }
  };

  const doGetVerificationCode = () => {
    if (!data.phoneNumber) {
      addNotification({
        message: 'یک شماره تلفن همراه وارد کن!',
        type: 'error',
      });
      return;
    }
    if (!isPhoneNumberValid(data.phoneNumber)) {
      addNotification({ message: 'شماره تلفنت معتبر نیست!', type: 'error' });
      return;
    }
    setButtonText('۱ دقیقه صبر کن');
    getVerificationCode({
      phoneNumber: data.phoneNumber,
      codeType: 'verify',
    }).then(() => {
      setTimeout(() => {
        setButtonText('دریافت کد');
      }, 60000);
    });
  };

  const doRegistration = () => {
    const { phoneNumber, password, confirmationPassword } = data;
    if (!phoneNumber || !password || !confirmationPassword) {
      addNotification({
        message: 'لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن!',
        type: 'error',
      });
      return;
    }

    if (password !== confirmationPassword) {
      addNotification({
        message: 'رمزهایی که وارد کردی مشابه هم نیستند!',
        type: 'error',
      });
      return;
    }

    createAccount(data);
  };

  return (
    <>
      <Grid item>
        <TextField
          variant="outlined"
          fullWidth
          onChange={(e) => {
            if (isJustDigits(e.target.value)) {
              putData(e);
            }
          }}
          value={data.phoneNumber}
          name="phoneNumber"
          label="شماره تلفن همراه"
          inputProps={{ className: 'ltr-input' }}
          type="tel"
        />
      </Grid>

      <Grid item container justifyContent="center" alignItems="stretch" spacing={1}>
        <Grid item xs={8} sm={9}>
          <TextField
            variant="outlined"
            fullWidth
            onChange={(e) => {
              if (isJustDigits(e.target.value)) {
                putData(e);
              }
            }}
            value={data.code}
            name="code"
            label="کد تایید پیامک‌شده"
            inputProps={{ className: 'ltr-input' }}
            type="text"
          />
        </Grid>
        <Grid item xs={4} sm={3} container>
          <Button
            size="small"
            fullWidth
            variant="contained"
            color="primary"
            onClick={doGetVerificationCode}
            disabled={buttonText !== 'دریافت کد'}>
            {buttonText}
          </Button>
        </Grid>
      </Grid>

      <Grid item>
        <TextField
          variant="outlined"
          fullWidth
          onChange={putData}
          label="گذرواژه"
          name="password"
          inputProps={{ className: 'ltr-input' }}
          type="password"
        />
      </Grid>

      <Grid item>
        <TextField
          variant="outlined"
          fullWidth
          onChange={putData}
          label="تکرار گذرواژه"
          type="password"
          inputProps={{ className: 'ltr-input' }}
          name="confirmationPassword"
        />
      </Grid>

      <Grid container item direction="row" justifyContent="center">
        <Button
          onClick={doRegistration}
          variant="contained"
          color="primary"
          disabled={isFetching}
          fullWidth>
          ثبت
        </Button>
      </Grid>

      <Grid item>
        <Typography align="center">
          {' از قبل حساب داشتی؟ به '}
          <Link to="/login">{'این‌جا'}</Link>
          {' برو.'}
        </Typography>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  createAccount: createAccountAction,
  getVerificationCode: getVerificationCodeAction,
  addNotification: addNotificationAction,
})(InputFields);
