
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  Typography,
  Tooltip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

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
import AddInstitute from '../../../components/Dialog/AddInstitute';


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
  const [newStudentship, setNewStudentship] = useState();
  const [addInstituteDialog, setAddInstituteDialogStatus] = useState(false);


  const handleStudentshipDocumentChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setNewStudentship({
        ...newProfile,
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


  return (
    <>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
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
                defaultValue={userProfile?.school_studentship?.school}
                onChange={handleStudentshipChange}
                name="school"
                label="مدرسه">
                {institutes?.map((school) => (
                  <MenuItem key={school.id} value={school.id}>
                    {school.name}
                  </MenuItem>
                ))}
                {institutes?.length == 0 &&
                  <MenuItem disabled>
                    {'موردی وجود ندارد.'}
                  </MenuItem>
                }
              </Select>
            </FormControl>
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
          </Grid>
          <Grid item container justifyContent="center" xs={12} sm={6}>
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