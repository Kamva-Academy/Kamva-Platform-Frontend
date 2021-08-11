import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  changePasswordAction,
  getVerificationCodeAction,
} from '../../redux/slices/account';
import { addNotificationAction } from '../../redux/slices/notifications';

const MyTextField = ({ ...rest }) => (
  <TextField
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px' }}
    variant="filled"
    fullWidth
    {...rest}
  />
);

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
        message: 'یک شماره تلفن‌همراه وارد کن!',
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
        <MyTextField
          onBlur={putData}
          label="رمز عبور جدید"
          name="password"
          inputProps={{ className: 'ltr-input' }}
          type="password"
        />
      </Grid>

      <Grid item>
        <MyTextField
          onBlur={putData}
          label="تکرار رمز عبور جدید"
          type="password"
          inputProps={{ className: 'ltr-input' }}
          name="confirmationPassword"
        />
      </Grid>

      <Grid item>
        <MyTextField
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
          <MyTextField
            onChange={(e) => {
              if (isEnglishDigits(e.target.value) !== 'error') {
                putData(e);
              }
            }}
            value={data.code}
            name="code"
            inputProps={{ className: 'ltr-input' }}
            label="کد پیامک‌شده رو وارد کنید"
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
          تغییر بده
        </Button>
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
