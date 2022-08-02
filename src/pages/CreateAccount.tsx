import { Container, Grid, Paper, Typography } from '@mui/material';
import {
  createAccountAction,
  getVerificationCodeAction,
} from '../redux/slices/account';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addNotificationAction } from '../redux/slices/notifications';
import appendPreviousParams from '../utils/AppendPreviousParams';
import { toEnglishNumber } from '../utils/translateNumber';

type CreateAccountPropsType = {
  isFetching: boolean;
  createAccount: any;
  getVerificationCode: any;
  addNotification: any;
  token: string;
}

const CreateAccount: FC<CreateAccountPropsType> = ({
  isFetching,
  createAccount,
  getVerificationCode,
  addNotification,
  token,
}) => {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('دریافت کد');
  const [data, setData] = useState({
    phoneNumber: '',
    password: '',
    confirmationPassword: '',
    code: '',
  });

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('private_event_enter');

  useEffect(() => {
    if (token) {
      if (eventId) {
        navigate(`/event/${eventId}/`);
      } else {
        navigate('/events/');
      }
    }
  }, [eventId, navigate, token])

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
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 4,
        paddingBottom: 4,
      }}>
      <Grid xs={12} sm={8} md={4}>
        <Paper sx={{ padding: 2 }}>
          <Grid item container>
            <Grid
              container
              item
              direction='column'
              justifyContent='center'
              spacing={2}>
              <Grid item>
                <Typography gutterBottom variant='h2' align='center'>{'ایجاد حساب کاربری'}</Typography>
              </Grid>

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
                <Grid item xs={8} sm={8}>
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
                <Grid item xs={4} sm={4} container>
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
                  <Link style={{ textDecoration: 'none' }}
                    to={appendPreviousParams("/login")}>{'این‌جا'}</Link>
                  {' برو.'}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  token: state.account.token,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  createAccount: createAccountAction,
  getVerificationCode: getVerificationCodeAction,
  addNotification: addNotificationAction,
})(CreateAccount);
