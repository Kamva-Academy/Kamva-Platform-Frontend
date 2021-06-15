import { Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, makeStyles, MenuItem, Paper, Radio, RadioGroup, Select, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import jMoment from 'jalali-moment';
import DatePicker from "react-datepicker2";
import { connect } from 'react-redux';

import { getUserProfileAction, updateProfileAction } from '../../redux/slices/account';
import Layout from './Layout';

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

const Profile = ({ updateProfile, getUserProfile, userAccount, userProfile }) => {
  const [image, setImage] = useState(process.env.PUBLIC_URL + '/profile.png');
  const [birthday, setBirthday] = useState(jMoment());

  const classes = useStyles();

  useEffect(() => {
    getUserProfile({ id: userAccount.id });
  }, [getUserProfile])

  const onSubmit = () => {
    console.log("@@@@")
    updateProfile({ 'username': 'salam' });
  }


  useEffect(() => {
    setImage(userProfile?.profile_picture);
  }, [userProfile?.profile_picture])

  console.log(userProfile);


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img))
    }
  };

  const submitChanges = (event) => {

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
            <img alt='' className={classes.profileImage} src={image} />
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
              name='first_name'
              size='small' label='نام' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userAccount?.last_name}
              name='last_name'
              size='small' label='نام خانوادگی' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userAccount?.national_code}
              name='national_code'
              size='small' label='کد ملی' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userAccount?.phone_number}
              name='phone_number'
              size='small' label='شماره موبایل' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.email}
              name='email'
              size='small' label='ایمیل' />
          </Grid>
          <Grid item xs={12} sm={6}>

            <div style={{ display: 'none' }} >
              <DatePicker id='birthdayDatePicker' showTodayButton={false} timePicker={false} max={jMoment()} persianDigits={true}
                isGregorian={false} value={birthday} onChange={value => setBirthday(value)} />
            </div>
            <TextField fullWidth variant='outlined' onClick={() => document?.getElementById('birthdayDatePicker').click()}
              defaultValue={birthday.format('jDD jMMMM jYYYY')}
              name='national_code'
              size='small' label='کد ملی' />

          </Grid>
          <Grid item>
            <FormControl size='small' >
              <FormLabel>جنیست</FormLabel>
              <RadioGroup
                name="gender"
                row
                defaultValue={userProfile?.gender}
              // onChange={putData}
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
                // onClick={handleProvinceChange}
                name='province'
                label='استان'
              >
                <MenuItem value={"DDD"}>{"salam"}</MenuItem>
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
                // onClick={handleProvinceChange}
                name='city'
                label='شهر'
              >
                <MenuItem value={"DDD"}>{"salam"}</MenuItem>
              </Select>
            </FormControl >
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant='outlined'
              defaultValue={userAccount?.address}
              name='address' multiline rows={2}
              size='small' label='آدرس منزل ' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userAccount?.postal_code}
              name='postal_code'
              size='small' label='کد پستی' />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button onClick={submitChanges} variant='contained' color='secondary'>ثبت تغییرات</Button>
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
    updateProfile: updateProfileAction,
    getUserProfile: getUserProfileAction
  }
)(Profile);
