import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  changePasswordAction,
  getVerificationCodeAction,
} from '../../redux/slices/account';
import { addNotificationAction } from '../../redux/slices/notifications';


const InputFields = ({
  isFetching,
  getVerificationCode,
  changePassword,
  addNotification,
}) => {
  const [buttonText, setButtonText] = useState('دریافت کد');
  const [data, setData] = useState({
    password: '',
    confirmationPassword: '',
    phoneNumber: '',
    code: '',
  });

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const isEnglishDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(number)) {
      return number;
    } else {
      return 'error';
    }
  };

  const isPhoneNumberValid = (phoneNumber) => {
    var regex = new RegExp('^(\\+98|0)?9\\d{9}$');
    if (regex.test(phoneNumber)) {
      return phoneNumber;
    } else {
      return;
    }
  };

  const doGetVerificationCode = () => {
    if (!data.phoneNumber) {
      addNotification({
        message: 'شماره تلفنی را وارد کن!',
        type: 'error',
      });
      return;
    }

    if (!isPhoneNumberValid(data.phoneNumber)) {
      addNotification({ message: 'شماره تلفنت معتبر نیست!', type: 'error' });
      return;
    }

    setButtonText('۱ دقیقه صبر کن');
    getVerificationCode({ phoneNumber: data.phoneNumber, codeType: 'change_pass' }).then(
      () => {
        setTimeout(
          () => {
            setButtonText('دریافت کد');
          },
          process.env.NODE_ENV === 'production' ? 60000 : 1000
        );
      }
    );
  };

  const doChangePassword = () => {
    const { phoneNumber, password, confirmationPassword } = data;
    if (!phoneNumber || !password) {
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
    changePassword(data);
  };

  return (
    <>
      <Grid item>
        <TextField
          variant='outlined'
          fullWidth
          onBlur={putData}
          label="رمز عبور جدید"
          name="password"
          inputProps={{ className: 'ltr-input' }}
          type="password"
        />
      </Grid>

      <Grid item>
        <TextField
          variant='outlined'
          fullWidth
          onBlur={putData}
          label="تکرار رمز عبور جدید"
          type="password"
          inputProps={{ className: 'ltr-input' }}
          name="confirmationPassword"
        />
      </Grid>

      <Grid item>
        <TextField
          variant='outlined'
          fullWidth
          onChange={(e) => {
            if (isEnglishDigits(e.target.value) !== 'error') {
              putData(e);
            }
          }}
          value={data.phoneNumber}
          name="phoneNumber"
          inputProps={{ className: 'ltr-input' }}
          label="شماره تلفن‌همراه"
          type="tel"
        />
      </Grid>

      <Grid
        item
        container
        justify="space-between"
        alignItems="stretch"
        spacing={1}>
        <Grid item xs={8} sm={9}>
          <TextField
            variant='outlined'
            fullWidth
            onChange={(e) => {
              if (isEnglishDigits(e.target.value) !== 'error') {
                putData(e);
              }
            }}
            value={data.code}
            name="code"
            inputProps={{ className: 'ltr-input' }}
            label="کد پیامک‌شده"
            type="text"
          />
        </Grid>
        <Grid item xs={4} sm={3} container>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={doGetVerificationCode}
            disabled={buttonText !== 'دریافت کد'}>
            {buttonText}
          </Button>
        </Grid>
      </Grid>

      <Grid container item direction="row" justify="center">
        <Button
          onClick={doChangePassword}
          variant="contained"
          color="primary"
          disabled={isFetching}
          fullWidth>
          تغییر
        </Button>
      </Grid>

      <Grid item>
        <Typography align="center">
          {'از '}
          <Link to="/login">{'این‌جا'}</Link>
          {' می‌توانی وارد حسابت شوی.'}
        </Typography>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  getVerificationCode: getVerificationCodeAction,
  changePassword: changePasswordAction,
  addNotification: addNotificationAction,
})(InputFields);
