import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux'

import {
  getTeamData,
  getVerifyCode,
  register,
} from '../../redux/actions/authentication'
import { addNotification, } from '../../redux/actions/notifications'
import { redirect } from '../../redux/actions/redirect'

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%'
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '5px',
    padding: theme.spacing(1),
  }
}))

const MyTextField = ({ ...rest }) => (
  <TextField
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px' }}
    variant='filled'
    fullWidth
    {...rest}
  />
)

const InputFields = ({
  isFetching,
  register,
  getVerifyCode,
  getTeamData,
  addNotification,
}) => {
  const classes = useStyles();
  const [buttonText, setButtonText] = useState('دریافت کد');
  const [data, setData] = useState({
    password: '',
    confirmationPassword: '',
    phone: '',
  });

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const isEnglishDigits = (number) => {
    var regex = new RegExp(`\\d*`);
    if (regex.test(number)) {
      return number;
    } else {
      return 'error'
    }
  }

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

  const doGetVerifyCode = () => {
    if (!data.phone) {
      addNotification({ message: 'یه شماره تلفن‌همراه وارد کن!', type: 'error' })
      return;
    }
    if (!isPhoneNumberValid(data.phone)) {
      addNotification({ message: 'شماره تلفنت معتبر نیست!', type: 'error' })
      return;
    }
    setButtonText('۱ دقیقه صبر کن');
    getVerifyCode({ phone: data.phone }).then(
      () => {
        addNotification({ message: 'کد تایید فرستاده شد! این کد بعد از ۵ دقیقه منقضی میشه.', type: 'success' })
        setTimeout(() => {
          setButtonText('دریافت کد');
        }, 60000)
      }
    )
  }

  console.log(data)

  const doRecoverPassword = () => {
    const { phone, password, confirmationPassword } = data;
    if (!phone || !password) {
      addNotification({ message: 'لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن!', type: 'error' });
      return;
    }

    if (password !== confirmationPassword) {
      addNotification({ message: 'رمزهایی که وارد کردی مشابه هم نیستند!', type: 'error' });
      return;
    }

    register(data);
  }

  return (
    <>
      <Grid item>
        <MyTextField
          onBlur={putData}
          label='رمز عبور جدید'
          name='password'
          type='password' />
      </Grid>

      <Grid item>
        <MyTextField
          onBlur={putData}
          label='تکرار رمز عبور جدید'
          type='password'
          name='confirmationPassword' />
      </Grid>

      <Grid item>
        <MyTextField
          onChange={
            (e) => {
              if (isEnglishDigits(e.target.value) !== 'error') {
                putData(e);
              }
            }
          }
          value={data.phone}
          name='phone'
          label='شماره تلفن‌همراه'
          type='tel' />
      </Grid>

      <Grid item container justify='center' alignItems='stretch' spacing={1}>
        <Grid item xs={8} sm={9}>
          <MyTextField
            onChange={
              (e) => {
                if (isEnglishDigits(e.target.value) !== 'error') {
                  putData(e);
                }
              }
            }
            value={data.verify_code}
            name='verify_code'
            label='کد ۵ رقمی پیامک‌شده رو وارد کنید'
            type='text' />
        </Grid>
        <Grid item xs={4} sm={3} container >
          <Button fullWidth variant='contained' color='primary' onClick={doGetVerifyCode} disabled={buttonText !== 'دریافت کد'}>
            {buttonText}
          </Button>
        </Grid>
      </Grid>

      <Grid container item direction='row' justify='center'>
        <Button
          onClick={doRecoverPassword}
          variant='contained'
          color='primary'
          disabled={isFetching}
          fullWidth>
          تغییر کن
        </Button>
      </Grid>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.authentication.isFetching,
})

export default connect(
  mapStateToProps,
  {
    register,
    getVerifyCode,
    getTeamData,
    addNotification,
    redirect,
  }
)(InputFields)