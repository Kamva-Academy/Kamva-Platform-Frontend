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

import {
  createStudentShipAction,
  getInstitutesAction,
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from '../../redux/slices/account';
import Layout from '../Layout';

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

const GRADES = [
  // { value: 1, name: 'اول' },
  // { value: 2, name: 'دوم' },
  // { value: 3, name: 'سوم' },
  // { value: 4, name: 'چهارم' },
  // { value: 5, name: 'پنجم' },
  // { value: 6, name: 'ششم' },
  { value: 7, name: 'هفتم' },
  { value: 8, name: 'هشتم' },
  { value: 9, name: 'نهم' },
  { value: 10, name: 'دهم' },
  { value: 11, name: 'یازدهم' },
  { value: 12, name: 'دوازدهم' },
]

const Profile = ({
  updateUserAccount,
  getUserProfile,
  updateStudentShip,
  getInstitutes,
  userAccount,
  userProfile,
  studentship,
  institutes,
}) => {
  const [picture, setPicture] = useState('');
  const [newProfile, setNewProfile] = useState({});
  const [newStudentship, setNewStudentship] = useState();
  const [birthday, setBirthday] = useState(jMoment());
  const classes = useStyles();

  useEffect(() => {
    getUserProfile({ id: userAccount.id });
    getInstitutes();
  }, [getUserProfile, getInstitutes])

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setPicture(event.target.files[0])
    }
  };

  const handleProfileChange = (event) => {
    setNewProfile({
      ...newProfile,
      [event.target.name]: event.target.value,
    })
  }

  const handleStudentshipChange = (event) => {
    setNewStudentship({
      ...newStudentship,
      [event.target.name]: event.target.value,
    })
  }

  const submitProfile = () => {
    updateUserAccount(
      {
        id: userAccount.id,
        profile_picture: picture,
        ...newProfile,
      }
    );
  }

  const submitStudentship = () => {
    updateStudentShip({
      id: userProfile?.school_studentship?.id,
      ...newStudentship,
    })
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
              defaultValue={userProfile?.first_name}
              name='first_name' onChange={handleProfileChange}
              size='small' label='نام' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.last_name}
              name='last_name' onChange={handleProfileChange}
              size='small' label='نام خانوادگی' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.national_code}
              name='national_code' onChange={handleProfileChange}
              size='small' label='کد ملی' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.phone_number}
              name='phone_number' onChange={handleProfileChange}
              size='small' label='شماره موبایل' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.email}
              name='email' onChange={handleProfileChange}
              size='small' label='ایمیل' />
          </Grid>
          {/* <Grid item xs={12} sm={6}> todo
            <div style={{ display: 'none' }} >
              <DatePicker id='birthdayDatePicker' showTodayButton={false} timePicker={false} max={jMoment()} persianDigits={true}
                isGregorian={false} defaultValue={birthday} onChange={value => setBirthday(value)} />
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
                onChange={handleProfileChange}
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
                onChange={handleProfileChange}
                name='province'
                label='استان'
              >
                <MenuItem value={"Isfahan"}>{'اصفهان'}</MenuItem>
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
                onChange={handleProfileChange}
                name='city'
                label='شهر'
              >
                <MenuItem value={"Isfahan"}>{'اصفهان'}</MenuItem>
              </Select>
            </FormControl >
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.address}
              name='address' multiline rows={2} onChange={handleProfileChange}
              size='small' label='آدرس منزل ' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined'
              defaultValue={userProfile?.postal_code}
              name='postal_code' onChange={handleProfileChange}
              size='small' label='کد پستی' />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Button onClick={submitProfile} fullWidth variant='contained' color='secondary'>ذخیره اطلاعات شخصی</Button>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant='h2'>مشخصات دانش‌آموزی</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item container xs={12} sm={6}>
            <FormControl size='small' variant="outlined" className={classes.formControl}>
              <InputLabel>مدرسه</InputLabel>
              <Select
                className={classes.dropDown}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={userProfile?.school_studentship?.school}
                onChange={handleStudentshipChange}
                name='school'
                label='مدرسه'
              >
                {institutes?.map((school) => (
                  <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                ))}
              </Select>
            </FormControl >
          </Grid>
          <Grid item container xs={12} sm={6}>
            <FormControl size='small' variant="outlined" className={classes.formControl}>
              <InputLabel>پایه</InputLabel>
              <Select
                className={classes.dropDown}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={userProfile?.school_studentship?.grade}
                onChange={handleStudentshipChange}
                name='grade'
                label='پایه'
              >
                {GRADES.map((grade) => (
                  <MenuItem key={grade.value} value={grade.value}>{grade.name}</MenuItem>
                ))}
              </Select>
            </FormControl >
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Button onClick={submitStudentship} fullWidth variant='contained' color='secondary'>ذخیره اطلاعات دانش‌آموزی</Button>
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
  institutes: state.account.institutes,
});

export default connect(mapStateToProps,
  {
    updateUserAccount: updateUserAccountAction,
    getUserProfile: getUserProfileAction,
    createStudentShip: createStudentShipAction,
    updateStudentShip: updateStudentShipAction,
    getInstitutes: getInstitutesAction,
  }
)(Profile);


// todo: add loading
// todo: remove userAccount and replace userProfile
// todo: cast english digits to persian