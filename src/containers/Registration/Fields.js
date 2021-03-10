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
    username: '',
    password: '',
    confirmationPassword: '',
    grade: '',
    gender: '',
    document: '',
    name: '',
    email: '',
    phone: '',
    verify_code: '',
    selection_doc: '',
    team_code: '',
    school: '',
  });

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const putFile = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        setData({
          ...data,
          [e.target.name]: e.target.files[0]
        });
      } else {
        e.target.value = '';
        e.target.setCustomValidity('حجم فایلت بیشتر از ۶ مگابایته! کمترش کن اگه می‌تونی.');
        e.target.reportValidity();
      }
    }
  };

  const isEnglishDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
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

  const isValidEmail = (email) => {
    var regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (regex.test(email)) {
      return email;
    } else {
      return 'error'
    }
  }

  const doRegistration = () => {
    const { name, email, document, grade, phone, school, city, gender, password, confirmationPassword, verify_code, username, selection_doc, team_code } = data;
    if (!name || !email || !document || !grade || !phone || !school || !city || !gender || !password || !verify_code || !username || !selection_doc) {
      addNotification({ message: 'لطفاً همه‌ی مواردی که ازت خواسته شده رو پر کن!', type: 'error' });
      return;
    }

    if (password !== confirmationPassword) {
      addNotification({ message: 'رمزهایی که وارد کردی مشابه هم نیستند!', type: 'error' });
      return;
    }

    if (isEnglish(username) === 'error') {
      addNotification({ message: 'نام کاربری فقط می‌تونه شامل ارقام و حروف انگلیسی و کارکترهای . و - و ـ باشه!', type: 'error' });
      return;
    }

    if (team_code && isEnglish(team_code) === 'error') {
      addNotification({ message: 'کد تیمت معتبر نیست!', type: 'error' });
      return;
    }

    if (isValidEmail(email) === 'error') {
      addNotification({ message: 'ایمیلت معتبر نیست!', type: 'error' });
      return;
    }

    register(data);
  }

  return (
    <>
      <Grid item>
        <MyTextField
          onBlur={putData}
          label='نام کاربری'
          type='text'
          name='username' />
      </Grid>

      <Grid item>
        <MyTextField
          onBlur={putData}
          label='رمز عبور'
          name='password'
          type='password' />
      </Grid>

      <Grid item>
        <MyTextField
          onBlur={putData}
          label='تکرار رمز عبور'
          type='password'
          name='confirmationPassword' />
      </Grid>

      <Grid item>
        <MyTextField
          onBlur={putData}
          name='email'
          label='ایمیل'
          type='text' />
      </Grid>

      <Grid item>
        <MyTextField
          onBlur={putData}
          label='نام و نام‌خانوادگی'
          type='text'
          name='name' />
      </Grid>

      <Grid item>
        <FormControl variant="filled" fullWidth className={classes.input} >
          <Grid item container direction='column' >
            <Grid item>
              <FormLabel >پیش از اسمتون چی باید بیارم؟</FormLabel>
            </Grid>
            <Grid item >
              <RadioGroup name='gender' row value={data.gender} onChange={putData}>
                <FormControlLabel
                  value="male"
                  control={<Radio color="primary" />}
                  label="آقایِ"
                  labelPlacement="end"
                />

                <FormControlLabel
                  value="female"
                  control={<Radio color="primary" />}
                  label="خانمِ"
                  labelPlacement="end"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </FormControl>
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

      <Grid item>
        <MyTextField
          onBlur={putData}
          name='school'
          label='مدرسه'
          type='text' />
      </Grid>

      <Grid item>
        <MyTextField
          onBlur={putData}
          name='city'
          label='شهر'
          type='text' />
      </Grid>

      <Grid item>
        <FormControl variant="filled" fullWidth className={classes.input}>
          <Grid item container direction='column' spacing={1}>
            <Grid item>
              <FormLabel>مدرک شناسایی</FormLabel>
            </Grid>
            <Grid item >
              <input
                name='document'
                accept="application/pdf,image/*"
                onChange={putFile}
                type='file' />
            </Grid>
            <FormLabel>توجه کنید که فقط می‌تونید عکس یا pdf بفرستید</FormLabel>
          </Grid>
        </FormControl >
      </Grid >

      <Grid item>
        <FormControl variant="filled" fullWidth style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px' }}>
          <InputLabel>پایه تحصیلی</InputLabel>
          <Select

            value={data.grade}
            name='grade'
            onChange={putData}
          >
            <MenuItem value={10}>دهم</MenuItem>
            <MenuItem value={11}>یازدهم</MenuItem>
            <MenuItem value={12}>دوازدهم</MenuItem>
          </Select>
        </FormControl >
      </Grid>

      <Grid item>
        <MyTextField
          onBlur={putData}
          label='کد تیم (اختیاری)'
          type='text'
          name='team_code' />
      </Grid>

      <Grid item>
        <FormControl variant="filled" fullWidth className={classes.input}>
          <Grid item container direction='column' spacing={1}>
            <Grid item>
              <FormLabel>پاسخ سوالات</FormLabel>
            </Grid>
            <Grid item >
              <input
                name='selection_doc'
                accept="application/pdf,image/*"
                onChange={putFile}
                type='file' />
            </Grid>
            <FormLabel>توجه کنید که فقط می‌تونید عکس یا pdf بفرستید</FormLabel>
          </Grid>
        </FormControl >
      </Grid >

      <Grid container item direction='row' justify='center'>
        <Button
          onClick={doRegistration}
          variant='contained'
          color='primary'
          disabled={isFetching}
          fullWidth>
          بزن بریم...
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