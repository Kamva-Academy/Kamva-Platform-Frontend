import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AdapterJalali from '@date-io/date-fns-jalali';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import {
  getInstitutesAction,
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from '../../../redux/slices/account';
import Iran from '../../../utils/iran';
import { toEnglishNumber } from '../../../utils/translateNumber';
import { PersonalProfile } from '../../../types/profile';
import { Moment } from 'jalali-moment';

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/images/profile.png';

type PersonalProfilePropsType = {
  updateUserAccount: any;
  getUserProfile: any;
  updateStudentShip: any;
  getInstitutes: any;
  userAccount: any;
  userProfile: PersonalProfile;
  institutes: any;
}

const Index: FC<PersonalProfilePropsType> = ({
  updateUserAccount,
  getUserProfile,
  updateStudentShip,
  getInstitutes,
  userAccount,
  userProfile,
  institutes,
}) => {
  const [profile, setProfile] = useState<PersonalProfile>(null);

  useEffect(() => {
    if (userAccount?.id) {
      getUserProfile({ id: userAccount.id });
    }
  }, [getUserProfile, userAccount]);

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile, userProfile?.profile_picture])

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(toEnglishNumber(number))) {
      return true;
    } else {
      return false;
    }
  };

  const handleProfilePictureChange = (event) => {
    if (event.target.files?.[0]) {
      updateUserAccount({
        id: userProfile.id,
        profile_picture: event.target.files[0],
      });
    }
  };

  const handleProfileChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const submitProfile = () => {
    const newProfile = {};
    for (const key in profile) {
      const newVal = profile[key];
      const oldVal = userProfile[key];
      if (oldVal !== newVal) {
        newProfile[key] = newVal;
      }
    }
    updateUserAccount({
      id: userProfile.id,
      ...newProfile,
    });
  };

  if (!profile) {
    return <></>;
  }

  return (
    <Grid container item spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" gutterBottom>تصویر</Typography>
        <Divider />
      </Grid>
      <Grid item container spacing={2} alignItems="center">
        <Grid item>
          <img
            alt=""
            style={{
              maxHeight: '100px',
              borderRadius: '5px',
            }}
            src={profile?.profile_picture || PROFILE_PICTURE}
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
        <Typography variant="h2" gutterBottom>مشخصات فردی</Typography>
        <Divider />
      </Grid>

      <Grid item container spacing={2}>

        <Grid item xs={12} sm={6}>
          <TextField
            error={!profile?.first_name}
            fullWidth
            value={profile?.first_name}
            name="first_name"
            onChange={handleProfileChange}

            label='نام'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            error={!profile?.last_name}
            fullWidth
            value={profile?.last_name}
            name="last_name"
            onChange={handleProfileChange}

            label="نام خانوادگی"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            error={!profile?.national_code}
            fullWidth
            value={profile?.national_code}
            name="national_code"
            onChange={(e) => {
              if (isJustDigits(e.target.value)) {
                handleProfileChange(e);
              }
            }}
            inputProps={{ className: 'ltr-input' }}
            label="کد ملی"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled={true}
            value={profile?.phone_number}
            onChange={(e) => {
              if (isJustDigits(e.target.value)) {
                handleProfileChange(e);
              }
            }}
            name="phone_number"
            inputProps={{ className: 'ltr-input' }}
            label="شماره موبایل"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterJalali}>
              <DatePicker
                openTo='year'
                views={['year', 'month', 'day']}
                value={moment(profile?.birth_date)}
                renderInput={(params) => <TextField
                  {...params} sx={{ width: "100%" }}
                  error={!profile?.birth_date}
                />}
                onChange={(date) => setProfile({ ...profile, birth_date: moment(date).format('YYYY-MM-DD') })}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={profile?.email}
            name="email"
            onChange={handleProfileChange}
            inputProps={{ className: 'ltr-input' }}
            label="ایمیل"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormLabel
              error={!profile?.gender}>جنسیت</FormLabel>
            <RadioGroup
              name="gender"
              row
              value={profile?.gender}
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

        <Grid item container xs={12} sm={6}>
          <FormControl
            fullWidth
            error={!profile?.province}>
            <InputLabel>استان</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={profile?.province || profile?.province}
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
            fullWidth
            error={!profile?.city}>
            <InputLabel>شهر</InputLabel>
            <Select
              disabled={!profile?.province && !profile?.city}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={profile?.city || profile?.city}
              onChange={handleProfileChange}
              name="city"
              label="شهر">
              {Iran.Cities.filter(
                (city) =>
                  Iran.Provinces.find(province => province.id == city.province_id).title == profile?.province ||
                  Iran.Provinces.find(province => province.id == city.province_id).title == profile?.province
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
            helperText='جوایز و یادگاری‌ها به این آدرس ارسال می‌شوند.'
            value={profile?.address}
            name="address"
            multiline
            rows={2}
            onChange={handleProfileChange}

            label="آدرس منزل"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="postal_code"
            value={profile?.postal_code}
            onChange={(e) => {
              if (isJustDigits(e.target.value)) {
                handleProfileChange(e);
              }
            }}
            inputProps={{ className: 'ltr-input' }}

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
