import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import jMoment from 'jalali-moment';
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker2";
import { connect } from 'react-redux';

import { getUserProfileAction, updateUserAccountAction } from '../../redux/slices/account';
import Layout from './Layout';

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/profile.png';

const useStyles = makeStyles((theme) => ({
  profileImage: {
    maxHeight: '100px',
    borderRadius: '5px',
  },
  logo: {
    height: 100,
  },
  formControl: {
    width: '100%'
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
}));

const Profile = ({ updateUserAccount, getUserProfile, userAccount, userProfile }) => {
  const [_, refresh] = useState();
  const [picture, setPicture] = useState('');
  const [newProfile, setNewProfile] = useState({});
  const [birthday, setBirthday] = useState(jMoment());

  const classes = useStyles();

  useEffect(() => {
    getUserProfile({ id: userAccount.id });
  }, [getUserProfile])

  useEffect(() => {
    refresh(Math.random());
  }, [userProfile])

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPicture(event.target.files[0])
    }
  };

  const handleOnBlur = (event) => {
    setNewProfile({
      ...newProfile,
      [event.target.name]: event.target.value,
    })
  }

  const onChangeSubmit = () => {
    updateUserAccount(
      {
        id: userAccount.id,
        profile_picture: picture,
        ...newProfile,
      }
    );
  }

  if (!userProfile) {
    return (<></>);
  }

  return (
    <Layout>
      <Grid container justify='center' direction='column' spacing={3} xs={12} sm={9}>
        <Grid item>
          <Typography variant='h2'>تصویر</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2} alignItems='center'>
          <Grid item>
            <img alt='' className={classes.profileImage} src={(picture && URL.createObjectURL(picture)) || userProfile?.profile_picture || PROFILE_PICTURE} />
          </Grid>
          <Grid item>
            <Typography >برای تغییر تصویر بر روی گزینه‌ی زیر کلیک کنید.</Typography>
            <br />
            <Button variant='contained' color='secondary' onClick={() => document.getElementById('userProfilePicture').click()}>انتخاب تصویر</Button>
            <input id='userProfilePicture' style={{ display: 'none' }} type="file" onChange={onImageChange} />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant='h2'>مشخصات فردی</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userAccount?.first_name}
              name='first_name' onBlur={handleOnBlur}
              size='small' label='نام' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userAccount?.last_name}
              name='last_name' onBlur={handleOnBlur}
              size='small' label='نام خانوادگی' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.national_code}
              name='national_code' onBlur={handleOnBlur}
              size='small' label='کد ملی' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.phone_number}
              name='phone_number' onBlur={handleOnBlur}
              size='small' label='شماره موبایل' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.email}
              name='email' onBlur={handleOnBlur}
              size='small' label='ایمیل' />
          </Grid>
          {/* <Grid item xs={12} sm={6}> todo
            <div style={{ display: 'none' }} >
              <DatePicker id='birthdayDatePicker' showTodayButton={false} timePicker={false} max={jMoment()} persianDigits={true}
                isGregorian={false} value={birthday} onChange={value => setBirthday(value)} />
            </div>
            <TextField fullWidth variant='outlined' onClick={() => document?.getElementById('birthdayDatePicker').click()}
              defaultValue={birthday.format('jDD jMMMM jYYYY')}
              name='national_code'
              size='small' label='تاریخ تولد' />
          </Grid> */}
          <Grid item>
            <FormControl size='small' >
              <FormLabel>جنیست</FormLabel>
              <RadioGroup
                name="gender"
                row
                defaultValue={userProfile?.gender}
                onBlur={handleOnBlur}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="مرد"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="زن"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item container xs={12} sm={6}>
            <FormControl size='small' variant="outlined" className={classes.formControl}>
              <InputLabel>استان</InputLabel>
              <Select
                className={classes.dropDown}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={userProfile?.city}
                onBlur={handleOnBlur}
                name='province'
                label='استان'
              >
                <MenuItem value={"DDD"}>{'اصفهان'}</MenuItem>
              </Select>
            </FormControl >
          </Grid>
          <Grid item container xs={12} sm={6}>
            <FormControl size='small' variant="outlined" className={classes.formControl}>
              <InputLabel>شهر</InputLabel>
              <Select
                className={classes.dropDown}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={userProfile?.city}
                onBlur={handleOnBlur}
                name='city'
                label='شهر'
              >
                <MenuItem value={"DDD"}>{'اصفهان'}</MenuItem>
              </Select>
            </FormControl >
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.address}
              name='address' multiline rows={2} onBlur={handleOnBlur}
              size='small' label='آدرس منزل ' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.postal_code}
              name='postal_code' onBlur={handleOnBlur}
              size='small' label='کد پستی' />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button onClick={onChangeSubmit} variant='contained' color='secondary'>ثبت تغییرات</Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  userAccount: state.account.userAccount,
  userProfile: state.account.userProfile,
  isFetching: state.account.isFetching,
  payments: state.account.payments,
});

export default connect(mapStateToProps,
  {
    updateUserAccount: updateUserAccountAction,
    getUserProfile: getUserProfileAction
  }
)(Profile);


// todo: add loading
// todo: remove userAccount and replace userProfile
// todo: cast english digits to persian