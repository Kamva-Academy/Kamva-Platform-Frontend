
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddInstitute from '../../../components/Dialog/AddInstitute';
import {
  getInstitutesAction,
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from '../../../redux/slices/account';
import Iran from '../../../utils/iran';
import { toEnglishNumber } from '../../../utils/translateNumber';

const GRADES = [
  { value: 1, name: 'اول' },
  { value: 2, name: 'دوم' },
  { value: 3, name: 'سوم' },
  { value: 4, name: 'چهارم' },
  { value: 5, name: 'پنجم' },
  { value: 6, name: 'ششم' },
  { value: 7, name: 'هفتم' },
  { value: 8, name: 'هشتم' },
  { value: 9, name: 'نهم' },
  { value: 10, name: 'دهم' },
  { value: 11, name: 'یازدهم' },
  { value: 12, name: 'دوازدهم' },
];

const SCHOOL_TYPES = {
  'Elementary': 'دبستان',
  'JuniorHigh': 'دبیرستان دوره اول',
  'High': 'دبیرستان دوره دوم',
  'SchoolOfArt': 'هنرستان',
}

const GENDER_TYPES = {
  'Male': 'پسرانه',
  'Female': 'دخترانه',
}

function StudentProfile({
  getUserProfile,
  updateStudentShip,
  getInstitutes,

  userAccount,
  userProfile,
  institutes,
  newlyAddedInstitute,
}) {
  const [newStudentship, setNewStudentship] = useState();
  const [addInstituteDialog, setAddInstituteDialogStatus] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserProfile({ id: userAccount?.id });
  }, [getUserProfile]);

  useEffect(() => {
    if (userProfile?.city) {
      getInstitutes({ cityTitle: Iran.Cities.find(city => userProfile?.city == city.title).title });
      setNewStudentship({
        ...newStudentship,
        school: '',
      })
    }
  }, [userProfile])

  useEffect(() => {
    if (newlyAddedInstitute) {
      setNewStudentship({
        ...newStudentship,
        school: newlyAddedInstitute.id,
      })
    }
  }, [newlyAddedInstitute])

  const handleStudentshipDocumentChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewStudentship({
        ...newStudentship,
        document: event.target.files[0],
      });
    }
  };

  const handleStudentshipChange = (event) => {
    setNewStudentship({
      ...newStudentship,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const submitStudentship = () => {
    updateStudentShip({
      id: userProfile?.school_studentship?.id,
      ...newStudentship,
    }).then((response) => {
      if (response.type?.endsWith('fulfilled') && eventId) {
        navigate(`/event/${eventId}/`);
      }
    })
  };

  const AddSchoolInstituteIcon = () => {
    return (
      <Tooltip title={
        userProfile?.city ? 'افزودن مدرسه‌ی جدید' : 'لطفاً ابتدا شهر خود را تعیین کنید.'} arrow>
        <IconButton
          size="small"
          onClick={userProfile?.city ? () => setAddInstituteDialogStatus(true) : () => { }}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    );
  };

  if (!userProfile) {
    return <></>;
  }

  return (
    <>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom>مشخصات دانش‌آموزی</Typography>
          <Divider />
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl
              required
              error={!userProfile?.school_studentship?.school && !newStudentship?.school}
              fullWidth>
              <InputLabel>مدرسه</InputLabel>
              <Select
                IconComponent={AddSchoolInstituteIcon}
                onChange={handleStudentshipChange}
                name="school"
                value={institutes ? newStudentship?.school || userProfile?.school_studentship?.school : ''}
                label="مدرسه">
                {institutes && institutes.length !== 0
                  ? institutes.slice().sort((a, b) => {
                    let firstLabel = (a.school_type ? SCHOOL_TYPES[a.school_type] + ' ' : '') + a.name
                    let secondLabel = (b.school_type ? SCHOOL_TYPES[b.school_type] + ' ' : '') + b.name
                    return firstLabel.localeCompare(secondLabel)
                  }).map((school) => (
                    <MenuItem key={school.id} value={school.id}>
                      {(school.school_type ? SCHOOL_TYPES[school.school_type] + ' ' : '') + school.name}
                    </MenuItem>
                  ))
                  : <MenuItem disabled>
                    {'موردی وجود ندارد.'}
                  </MenuItem>}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              required
              error={!userProfile?.school_studentship?.grade && !newStudentship?.grade}
              fullWidth>
              <InputLabel>پایه</InputLabel>
              <Select
                defaultValue={userProfile?.school_studentship?.grade}
                onChange={handleStudentshipChange}
                name="grade"
                value={newStudentship?.grade}
                label="پایه">
                {GRADES.map((grade) => (
                  <MenuItem key={grade.value} value={grade.value}>
                    {grade.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item container justifyContent="center" xs={12} sm={6}>
            <Button
              fullWidth
              variant='outlined'
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
          </Grid> */}

        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={submitStudentship}
            fullWidth
            variant="contained"
            color="secondary">
            ذخیره
          </Button>
        </Grid>
      </Grid>

      <AddInstitute
        province={userProfile?.province}
        city={userProfile?.city}
        open={addInstituteDialog}
        handleClose={() => {
          setAddInstituteDialogStatus(false);
        }}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  newlyAddedInstitute: state.account.newlyAddedInstitute,
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
})(StudentProfile);