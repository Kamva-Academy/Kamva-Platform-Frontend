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
  updateUserAccountAction,
} from '../../../redux/slices/account';
import Iran from '../../../utils/iran';
import { toEnglishNumber } from '../../../utils/translateNumber';
import { PersonalProfileType } from '../../../types/profile';
import isNumber from '../../../utils/validators/isNumber';
import { useNavigate, useParams } from 'react-router-dom';

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/images/profile.png';

type PersonalProfilePropsType = {
  updateUserAccount: any;
  userProfile: PersonalProfileType;
  tabs: any;
}

const PersonalProfile: FC<PersonalProfilePropsType> = ({
  updateUserAccount,
  userProfile,
  tabs,
}) => {
  const [profile, setProfile] = useState<PersonalProfileType>(null);
  const navigate = useNavigate();
  const { programId, section } = useParams();

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile, userProfile?.profile_picture])

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
    }).then((response) => {
      if (response.type?.endsWith('fulfilled') && programId && tabs[tabs.indexOf(section) + 1]) {
        navigate(`/program/${programId}/profile/${tabs[tabs.indexOf(section) + 1]}/`);
      }
    });
  };

  if (!profile) {
    return <></>;
  }

  const selectedProvince = Iran.Provinces.find(province => province.title == profile.province);

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
              height: 100,
              width: 100,
              borderRadius: '5px',
              objectFit: 'cover',
            }}
            src={profile.profile_picture || PROFILE_PICTURE}
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
            accept="image/*"
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
            error={!profile.first_name}
            fullWidth
            value={profile.first_name || ''}
            name="first_name"
            onChange={handleProfileChange}
            label='نام'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            error={!profile.last_name}
            fullWidth
            value={profile.last_name || ''}
            name="last_name"
            onChange={handleProfileChange}
            label="نام خانوادگی"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            error={!profile.national_code}
            fullWidth
            value={profile.national_code || ''}
            name="national_code"
            onChange={(e) => {
              if (isNumber(e.target.value)) {
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
            value={profile.phone_number || ''}
            onChange={(e) => {
              if (isNumber(e.target.value)) {
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
                label={'تاریخ تولد'}
                openTo='year'
                views={['year', 'month', 'day']}
                value={moment(profile.birth_date) || ''}
                renderInput={(params) =>
                  <TextField
                    {...params} sx={{ width: "100%" }}
                    error={!profile.birth_date}
                  />}
                onChange={(date) => setProfile({ ...profile, birth_date: moment(date).format('YYYY-MM-DD') })}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            value={profile.email || ''}
            name="email"
            onChange={handleProfileChange}
            inputProps={{ className: 'ltr-input' }}
            label="ایمیل"
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl>
            <FormLabel
              error={!profile.gender}>جنسیت</FormLabel>
            <RadioGroup
              name="gender"
              row
              value={profile.gender || ''}
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
            error={!profile.province}>
            <InputLabel>استان</InputLabel>
            <Select
              value={profile.province || ''}
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
            error={!profile.city}>
            <InputLabel>شهر</InputLabel>
            <Select
              disabled={!profile.province && !profile.city}
              value={profile.city || ''}
              onChange={handleProfileChange}
              name="city"
              label="شهر">
              {Iran.Cities.filter((city) =>
                city.province_id == selectedProvince?.id)
                .map((city) => (
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
            value={profile.address || ''}
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
            value={profile.postal_code || ''}
            onChange={(e) => {
              if (isNumber(e.target.value)) {
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
  userProfile: state.account.userProfile,
  isFetching: state.account.isFetching,
  payments: state.account.payments,
  institutes: state.account.institutes,
});

export default connect(mapStateToProps, {
  updateUserAccount: updateUserAccountAction,
})(PersonalProfile);
