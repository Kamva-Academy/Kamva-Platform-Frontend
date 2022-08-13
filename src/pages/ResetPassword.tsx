import { Button, TextField, Container, Grid, Paper, Typography, Stack } from '@mui/material';
import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  changePasswordAction,
  getVerificationCodeAction,
} from '../redux/slices/account';
import { addNotificationAction } from '../redux/slices/notifications';
import appendPreviousParams from '../utils/AppendPreviousParams';
import { toEnglishNumber } from '../utils/translateNumber';

type ResetPasswordPropsType = {
  isFetching: boolean;
  getVerificationCode: any;
  changePassword: any;
  addNotification: any;
}

const ResetPassword: FC<ResetPasswordPropsType> = ({
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
    getVerificationCode({
      phoneNumber: data.phoneNumber,
      codeType: 'changePass',
    }).then(() => {
      setTimeout(
        () => {
          setButtonText('دریافت کد');
        },
        process.env.NODE_ENV === 'production' ? 60000 : 1000
      );
    });
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
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        xs={12} sm={8} md={4}>
        <Paper
          sx={{
            padding: 2,
            height: '100%',
            width: '100%',
          }}>
          <Stack
            justifyContent='center'
            spacing={2}>

            <Typography gutterBottom variant='h2' align='center'>
              {'بازنشانی رمز عبور'}
            </Typography>

            <TextField
              autoComplete="on"
              variant="outlined"
              fullWidth
              onChange={putData}
              label="رمز عبور جدید"
              name="password"
              inputProps={{ className: 'ltr-input' }}
              type="password"
            />

            <TextField
              autoComplete="on"
              variant="outlined"
              fullWidth
              onChange={putData}
              label="تکرار رمز عبور جدید"
              type="password"
              inputProps={{ className: 'ltr-input' }}
              name="confirmationPassword"
            />



            <TextField
              autoComplete="on"
              variant="outlined"
              fullWidth
              onChange={(e) => {
                if (isJustDigits(e.target.value)) {
                  putData(e);
                }
              }}
              value={data.phoneNumber}
              name="phoneNumber"
              inputProps={{ className: 'ltr-input' }}
              label="شماره تلفن همراه"
              type="tel"
            />


            <Stack
              direction='row'
              alignItems='stretch'
              justifyContent='space-between'
              spacing={1}>
              <TextField
                autoComplete="on"
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  if (isJustDigits(e.target.value)) {
                    putData(e);
                  }
                }}
                value={data.code}
                name="code"
                inputProps={{ className: 'ltr-input' }}
                label="کد پیامک‌شده"
                type="text"
              />
              <Button
                sx={(theme) => ({
                  width: '40%',
                  whiteSpace: 'nowrap',
                })}
                fullWidth
                variant="contained"
                color="primary"
                onClick={doGetVerificationCode}
                disabled={buttonText !== 'دریافت کد'}>
                {buttonText}
              </Button>
            </Stack>

            <Button
              onClick={doChangePassword}
              variant="contained"
              color="primary"
              disabled={isFetching}
              fullWidth>
              تغییر
            </Button>

            <Typography align="center">
              {'از '}
              <Link style={{ textDecoration: 'none' }} to={appendPreviousParams("/login")}>{'این‌جا'}</Link>
              {' می‌توانی وارد حسابت شوی.'}
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  getVerificationCode: getVerificationCodeAction,
  changePassword: changePasswordAction,
  addNotification: addNotificationAction,
})(ResetPassword);
