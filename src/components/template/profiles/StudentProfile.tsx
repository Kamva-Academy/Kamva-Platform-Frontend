
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
import { getInstitutesAction } from 'redux/slices/account';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddInstitute from 'components/organisms/dialogs/AddInstitute';
import {
  getUserProfileAction,
  updateStudentShipAction,
  updateUserAccountAction,
} from 'redux/slices/account';
import Iran from 'utils/iran';

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
  getInstitutes,
  updateStudentShip,
  userInfo,
  institutes,
  newlyAddedInstitute,
}) {
  const [studentship, setStudentship] = useState<{ school: string; grade: string; }>();
  const [addInstituteDialog, setAddInstituteDialogStatus] = useState(false);
  const { programId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setStudentship({
        school: userInfo.school_studentship.school,
        grade: userInfo.school_studentship.grade,
      })
    }
  }, [userInfo])

  useEffect(() => {
    if (newlyAddedInstitute) {
      setStudentship({
        ...studentship,
        school: newlyAddedInstitute.id,
      })
    }
  }, [newlyAddedInstitute])

  useEffect(() => {
    if (!userInfo?.city) return;
    getInstitutes({ cityTitle: Iran.Cities.find(city => userInfo.city == city.title).title });
  }, [userInfo]);

  const handleStudentshipChange = (event) => {
    setStudentship({
      ...studentship,
      [event.target.name]: event.target.value,
    });
  };

  const submitStudentship = () => {
    updateStudentShip({
      id: userInfo?.school_studentship?.id,
      ...studentship,
    }).then((response) => {
      if (response.type?.endsWith('fulfilled') && programId) {
        navigate(`/program/${programId}/`);
      }
    })
  };

  const AddSchoolInstituteIcon = () => {
    return (
      <Tooltip title={
        userInfo?.city ? 'افزودن مدرسه‌ی جدید' : 'لطفاً ابتدا شهر خود را تعیین کنید.'} arrow>
        <IconButton
          size="small"
          onClick={userInfo?.city ? () => setAddInstituteDialogStatus(true) : () => { }}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    );
  };

  if (!studentship) {
    return null;
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
              error={!studentship.school}
              fullWidth>
              <InputLabel>مدرسه</InputLabel>
              <Select
                error={!institutes?.find((institute) => institute.id === studentship.school)}
                IconComponent={AddSchoolInstituteIcon}
                onChange={handleStudentshipChange}
                name="school"
                value={institutes?.find((institute) => institute.id === studentship.school) ? studentship.school : ''}
                label="مدرسه">
                {institutes?.length > 0 ?
                  institutes.slice().sort((a, b) => {
                    let firstLabel = (a.school_type ? SCHOOL_TYPES[a.school_type] + ' ' : '') + a.name
                    let secondLabel = (b.school_type ? SCHOOL_TYPES[b.school_type] + ' ' : '') + b.name
                    return firstLabel.localeCompare(secondLabel)
                  }).map((school) => (
                    <MenuItem key={school.id} value={school.id}>
                      {(school.school_type ? SCHOOL_TYPES[school.school_type] + ' ' : '') + school.name}
                    </MenuItem>
                  )) :
                  <MenuItem disabled>
                    {'موردی وجود ندارد.'}
                  </MenuItem>}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              required
              error={!studentship.grade}
              fullWidth>
              <InputLabel>پایه</InputLabel>
              <Select
                onChange={handleStudentshipChange}
                name="grade"
                value={studentship.grade}
                label="پایه">
                {GRADES.map((grade) => (
                  <MenuItem key={grade.value} value={grade.value}>
                    {grade.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
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
        province={userInfo?.province}
        city={userInfo?.city}
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
  userInfo: state.account.userInfo,
  isFetching: state.account.isFetching,
  payments: state.account.payments,
  institutes: state.account.institutes,
});

export default connect(mapStateToProps, {
  getInstitutes: getInstitutesAction,
  updateUserAccount: updateUserAccountAction,
  getUserProfile: getUserProfileAction,
  updateStudentShip: updateStudentShipAction,
})(StudentProfile);