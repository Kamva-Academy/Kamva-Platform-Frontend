import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Table,
  Typography,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
const PROFILE_PICTURE = process.env.PUBLIC_URL + '/profile.png';

import {
  getInstitutesAction,
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from '../../../redux/slices/account';
import {
  addNotificationAction,
} from '../../../redux/slices/notifications';
import { toEnglishNumber, toPersianNumber } from '../../../utils/translateNumber';
import Iran from '../../../utils/iran';

const useStyles = makeStyles((theme) => ({
  profileImage: {
    maxHeight: '100px',
    borderRadius: '5px',
  },
  logo: {
    height: 100,
  },
  formControl: {
    width: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
}));

function Index({
  updateUserAccount,
  getUserProfile,
  updateStudentShip,
  getInstitutes,
  userAccount,
  userProfile,
  institutes,
}) {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [username, setUsername] = useState();
  const [newProfile, setNewProfile] = useState({});

  useEffect(() => {
    if (userAccount?.id) {
      getUserProfile({ id: userAccount.id });
    }
  }, [])

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(toEnglishNumber(number))) {
      return true;
    } else {
      return false;
    }
  };

  const handleProfilePictureChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewProfile({
        ...newProfile,
        profile_picture: event.target.files[0],
      });
    }
  };


  const handleProfileChange = (event) => {
    setNewProfile({
      ...newProfile,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const submitProfile = () => {
    updateUserAccount({
      id: userProfile?.id,
      ...newProfile,
    });
  };


  if (!userProfile) {
    return <></>;
  }

  return (
    <>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">تصویر</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2} alignItems="center">
          <Grid item>
            <img
              alt=""
              className={classes.profileImage}
              src={
                (newProfile?.profile_picture &&
                  URL.createObjectURL(newProfile?.profile_picture)) ||
                userProfile?.profile_picture ||
                PROFILE_PICTURE
              }
            />
          </Grid>
          <Grid item>
            <Typography>
              برای تغییر تصویر بر روی گزینه‌ی زیر کلیک کنید.
            </Typography>
            <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                document.getElementById('userProfilePicture').click()
              }>
              انتخاب تصویر
            </Button>
            <input
              id="userProfilePicture"
              style={{ display: 'none' }}
              type="file"
              onChange={handleProfilePictureChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">مشخصات فردی</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              autoComplete="on"
              required
              defaultValue={userProfile?.first_name}
              value={newProfile.first_name}
              name="first_name"
              onChange={handleProfileChange}
              size="small"
              label="نام"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              autoComplete="on"
              required
              defaultValue={userProfile?.last_name}
              value={newProfile.last_name}
              name="last_name"
              onChange={handleProfileChange}
              size="small"
              label="نام خانوادگی"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              autoComplete="on"
              required
              defaultValue={userProfile?.national_code}
              value={newProfile.national_code}
              name="national_code"
              onChange={(e) => {
                if (isJustDigits(e.target.value)) {
                  handleProfileChange(e);
                }
              }}
              inputProps={{ className: 'ltr-input' }}
              size="small"
              label="کد ملی"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              disabled={true}
              required
              defaultValue={userProfile?.phone_number}
              name="phone_number"
              inputProps={{ className: 'ltr-input' }}
              size="small"
              label="شماره موبایل"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              autoComplete="on"
              defaultValue={userProfile?.email}
              value={newProfile.email}
              name="email"
              onChange={handleProfileChange}
              inputProps={{ className: 'ltr-input' }}
              size="small"
              label="ایمیل"
            />
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
            <FormControl size="small" required>
              <FormLabel>جنیست</FormLabel>
              <RadioGroup
                name="gender"
                row
                required
                defaultValue={userProfile?.gender}
                onChange={handleProfileChange}>
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="پسر"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="دختر"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              size="small"
              variant="outlined"
              className={classes.formControl}>
              <InputLabel>استان</InputLabel>
              <Select
                className={classes.dropDown}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newProfile?.province || userProfile?.province}
                onChange={handleProfileChange}
                name="province"
                label="استان">
                {Iran.Provinces.map((province) => (
                  <MenuItem key={province.id} value={province.title}>
                    {province.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              size="small"
              variant="outlined"
              className={classes.formControl}>
              <InputLabel>شهر</InputLabel>
              <Select
                className={classes.dropDown}
                disabled={!newProfile?.province && !userProfile?.city}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newProfile?.city || userProfile?.city}
                onChange={handleProfileChange}
                name="city"
                label="شهر">
                {Iran.Cities.filter(
                  (city) =>
                    Iran.Provinces.find(province => province.id == city.province_id).title == newProfile?.province ||
                    Iran.Provinces.find(province => province.id == city.province_id).title == userProfile?.province
                ).map((city) => (
                  <MenuItem key={city.id} value={city.title}>
                    {city.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              autoComplete="on"
              defaultValue={userProfile?.address}
              value={newProfile.address}
              name="address"
              multiline
              rows={2}
              onChange={handleProfileChange}
              size="small"
              label="آدرس منزل"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              autoComplete="on"
              defaultValue={userProfile?.postal_code}
              name="postal_code"
              value={newProfile.postal_code}
              onChange={(e) => {
                if (isJustDigits(e.target.value)) {
                  handleProfileChange(e);
                }
              }}
              inputProps={{ className: 'ltr-input' }}
              size="small"
              label="کد پستی"
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Button
              onClick={submitProfile}
              fullWidth
              variant="contained"
              color="secondary">
              ذخیره
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  userAccount: state.account.userAccount,
  userProfile: state.account.userProfile,
  isFetching: state.account.isFetching,
  payments: state.account.payments,
  institutes: state.account.institutes,
});

export default connect(mapStateToProps, {
  updateUserAccount: updateUserAccountAction,
  getUserProfile: getUserProfileAction,
  updateStudentShip: updateStudentShipAction,
  getInstitutes: getInstitutesAction,
})(Index);
