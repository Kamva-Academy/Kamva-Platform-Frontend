import React, { useState } from 'react';
import { connect } from 'react-redux'
import {
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { register } from '../../redux/actions/account'
import { redirect } from '../../redux/actions/redirect'

import { toast } from 'react-toastify';

const InputFields = ({
  register,
  isFetching,
}) => {
  const [nationalID, setNationalID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const checkForEnglishDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(number)) {
      return number;
    } else {
      return 'error'
    }
  }

  const doCreateAccount = () => {
    if (!nationalID || !password || !confirmPassword || !phoneNumber) {
      toast.error('لطفاً همه‌ی چیزهایی که ازت خواسته شده رو پر کن!')
      return;
    }
    if (password !== confirmPassword) {
      toast.error('رمزهایی که وارد کردی مشابه هم نیستند!')
      return;
    }
    var regex = new RegExp('^(\\+98|0)?9\\d{9}$');
    if (!regex.test(phoneNumber)) {
      toast.error('شماره موبایلی که وارد کردی نامعتبره!')
      return;
    }
    createAccount(nationalID, password, phoneNumber);
  }

  return (
    <>
      <Grid item>
        <TextField
          onChange={
            (e) => {
              if (checkForEnglishDigits(e.target.value) !== 'error') {
                setNationalID(checkForEnglishDigits(e.target.value))
              }
            }
          }
          label='کد ملی'
          helperText='یادت باشه فقط از ارقام انگلیسی استفاده کنی!'
          value={nationalID}
          type='text'
          variant='filled'
          fullWidth />
      </Grid>
      <Grid item>
        <TextField
          onChange={
            (e) => {
              if (checkForEnglishDigits(e.target.value) !== 'error') {
                setPhoneNumber(checkForEnglishDigits(e.target.value))
              }
            }
          }
          value={phoneNumber}
          label='شماره موبایل'
          type='tel'
          helperText='این‌جا هم همینطور، فقط رقم انگلیسی به کار ببر.'
          variant='filled'
          fullWidth>
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          onBlur={(e) => setPassword(e.target.value)}
          label='رمز عبور'
          variant='filled'
          type='password'
          fullWidth>
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          onBlur={(e) => setConfirmPassword(e.target.value)}
          label='تکرار رمز عبور'
          type='password'
          variant='filled'
          fullWidth>
        </TextField>
      </Grid>
      <Grid item container justify='center'>
        <Typography align='center'>
          {'اگه قبلاً پیش‌ثبت‌نامت رو انجام دادی، از '}
          <a href='/login'>
            {'این‌جا'}
          </a>
          {' وارد شو!'}
        </Typography>
      </Grid>
      <Grid container item direction='row' justify='center'>
        <Button
          onClick={doCreateAccount}
          variant='contained'
          color='secondary'
          disabled={isFetching}
          fullWidth>
          ثبت
        </Button>
      </Grid>
    </>
  )
}


const mapStateToProps = (state, ownProps) => ({
  isFetching: state.account.isFetching,
})

export default connect(
  mapStateToProps,
  {
    register,
    redirect,
  }
)(InputFields)