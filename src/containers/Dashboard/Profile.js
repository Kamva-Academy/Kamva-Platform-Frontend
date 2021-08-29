import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import AddInstitute from '../../components/Dialog/AddInstitute';
import {
  getInstitutesAction,
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from '../../redux/slices/account';
import Iran from '../../utils/iran';
import { toEnglishNumber } from '../../utils/translateNumber';
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
    width: '100%',
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
];

const Profile = ({
  updateUserAccount,
  getUserProfile,
  updateStudentShip,
  getInstitutes,
  userAccount,
  userProfile,
  institutes,
}) => {
  const [newProfile, setNewProfile] = useState({});
  const [newStudentship, setNewStudentship] = useState();
  const [addInstituteDialog, setAddInstituteDialogStatus] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (userAccount?.id) {
      getUserProfile({ id: userAccount.id });
    }
    getInstitutes();
  }, [getUserProfile, getInstitutes]);

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

  const handleStudentshipDocumentChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewStudentship({
        ...newProfile,
        document: event.target.files[0],
      });
    }
  };

  const handleProfileChange = (event) => {
    setNewProfile({
      ...newProfile,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const handleStudentshipChange = (event) => {
    setNewStudentship({
      ...newStudentship,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const submitProfile = () => {
    updateUserAccount({
      id: userProfile?.id,
      ...newProfile,
    });
  };

  const submitStudentship = () => {
    updateStudentShip({
      id: userProfile?.school_studentship?.id,
      ...newStudentship,
    });
  };

  const AddSchoolInstituteIcon = () => {
    return (
      <Tooltip title={'افزودن مدرسه‌ی جدید'} arrow>
        <IconButton
          size="small"
          onClick={() => setAddInstituteDialogStatus(true)}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    );
  };

  if (!userProfile) {
    return <></>;
  }

  return (
    <Layout>
      <Grid
        container
        justify="center"
        direction="column"
        spacing={3}
        xs={12}
        sm={9}>
        <Grid item>
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
        <Grid item>
          <Typography variant="h2">مشخصات فردی</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
              autoComplete="off"
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
                defaultValue={userProfile?.province}
                onChange={handleProfileChange}
                name="province"
                label="استان">
                {Iran.Provinces.map((province) => (
                  <MenuItem key={province.id} value={province.id}>
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
                defaultValue={userProfile?.city}
                onChange={handleProfileChange}
                name="city"
                label="شهر">
                {Iran.Cities.filter(
                  (city) =>
                    city.province_id == newProfile?.province ||
                    city.province_id == userProfile.province
                ).map((city) => (
                  <MenuItem key={city.id} value={city.id}>
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
              autoComplete="off"
              defaultValue={userProfile?.address}
              value={newProfile.address}
              name="address"
              multiline
              rows={2}
              onChange={handleProfileChange}
              size="small"
              label="آدرس منزل "
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              variant="outlined"
              autoComplete="off"
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
              ذخیره اطلاعات شخصی
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h2">مشخصات دانش‌آموزی</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              size="small"
              variant="outlined"
              className={classes.formControl}>
              <InputLabel>مدرسه</InputLabel>
              <Select
                IconComponent={AddSchoolInstituteIcon}
                className={classes.dropDown}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={userProfile?.school_studentship?.school}
                onChange={handleStudentshipChange}
                name="school"
                label="مدرسه">
                {institutes?.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="caption" align="center">
              اگر مدرسه‌ی شما در لیست فوق نیست، خودتان آن را اضافه کنید!
            </Typography>
          </Grid>
          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              size="small"
              variant="outlined"
              className={classes.formControl}>
              <InputLabel>پایه</InputLabel>
              <Select
                className={classes.dropDown}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={userProfile?.school_studentship?.grade}
                onChange={handleStudentshipChange}
                name="grade"
                label="پایه">
                {GRADES.map((grade) => (
                  <MenuItem key={grade.value} value={grade.value}>
                    {grade.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="caption" align="center">
              پایه‌ای را انتخاب کنید که در سال جدید به تحصیل در آن خواهید
              پرداخت.
            </Typography>
          </Grid>
          <Grid item container justify="center" xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() =>
                document.getElementById('school-studentship-document').click()
              }>
              انتخاب مدرک شناسایی تحصیلی*
            </Button>
            <input
              id="school-studentship-document"
              style={{ display: 'none' }}
              type="file"
              onChange={handleStudentshipDocumentChange}
            />
            {userProfile?.school_studentship?.document && (
              <a
                target="_blank"
                rel="noreferrer"
                href={userProfile?.school_studentship?.document}>
                آخرین مدرک بارگذاری‌شده
              </a>
            )}
            {!userProfile?.school_studentship?.document && (
              <Typography variant="caption" align="center">
                * منظور از مدرک شناسایی تحصیلی، سندی‌ست که نشان دهد شما مشغول به
                تحصیل در این پایه هستید.
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <Button
              onClick={submitStudentship}
              fullWidth
              variant="contained"
              color="secondary">
              ذخیره اطلاعات دانش‌آموزی
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <AddInstitute
        open={addInstituteDialog}
        handleClose={() => {
          setAddInstituteDialogStatus(false);
        }}
      />
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

export default connect(mapStateToProps, {
  updateUserAccount: updateUserAccountAction,
  getUserProfile: getUserProfileAction,
  updateStudentShip: updateStudentShipAction,
  getInstitutes: getInstitutesAction,
})(Profile);

// todo: cast english digits to persian
