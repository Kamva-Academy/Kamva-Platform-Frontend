
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
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getInstitutesAction } from 'redux/slices/account';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddInstitute from 'components/organisms/dialogs/AddInstitute';
import {
  getUserProfileAction,
  updateStudentShipAction,
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

type StudentProfilePropsType = {
  getInstitutes: any;
  updateStudentShip: any;
  userInfo: any;
  institutes: any[];
  newlyAddedInstitute?: any;
}

const StudentProfile: FC<StudentProfilePropsType> = ({
  getInstitutes,
  updateStudentShip,
  userInfo,
  institutes,
  newlyAddedInstitute,
}) => {
  const [schoolStudentship, setSchoolStudentship] = useState<{ id: string; school: string; grade: number; }>(null);
  const [addInstituteDialog, setAddInstituteDialogStatus] = useState(false);

  useEffect(() => {
    if (userInfo?.school_studentship) {
      setSchoolStudentship({
        id: userInfo.school_studentship.id,
        school: userInfo.school_studentship.school,
        grade: userInfo.school_studentship.grade,
      })
    }
  }, [userInfo?.school_studentship])

  useEffect(() => {
    if (newlyAddedInstitute) {
      setSchoolStudentship({
        ...schoolStudentship,
        school: newlyAddedInstitute.id,
      })
    }
  }, [newlyAddedInstitute])

  useEffect(() => {
    if (userInfo?.city) {
      getInstitutes({ cityTitle: Iran.Cities.find(city => userInfo.city == city.title).title });
    }
  }, [userInfo?.city]);

  if (!userInfo || !schoolStudentship) return null;

  const handleStudentshipChange = (event) => {
    setSchoolStudentship({
      ...schoolStudentship,
      [event.target.name]: event.target.value,
    });
  };

  const submitStudentship = () => {
    updateStudentShip(schoolStudentship);
  };

  const AddSchoolInstituteIcon = () => {
    return (
      <Tooltip title={
        userInfo.city ? 'افزودن مدرسه‌ی جدید' : 'لطفاً ابتدا شهر خود را تعیین کنید.'} arrow>
        <IconButton
          size="small"
          onClick={userInfo.city ? () => setAddInstituteDialogStatus(true) : () => { }}>
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    );
  };

  console.log(schoolStudentship);

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
              fullWidth>
              <InputLabel>مدرسه</InputLabel>
              <Select
                IconComponent={AddSchoolInstituteIcon}
                onChange={handleStudentshipChange}
                name="school"
                value={institutes.find((institute) => institute.id === schoolStudentship.school) ? schoolStudentship.school : ''}
                label="مدرسه">
                {institutes.length > 0 ?
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
            <FormControl required fullWidth>
              <InputLabel>پایه</InputLabel>
              <Select
                onChange={handleStudentshipChange}
                name="grade"
                value={schoolStudentship.grade || ''}
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
        province={userInfo.province}
        city={userInfo.city}
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
  institutes: state.account.institutes || [],
});

export default connect(mapStateToProps, {
  getInstitutes: getInstitutesAction,
  getUserProfile: getUserProfileAction,
  updateStudentShip: updateStudentShipAction,
})(StudentProfile);