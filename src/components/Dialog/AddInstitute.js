import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  createInstitutesAction,
  getInstitutesAction,
} from '../../redux/slices/account';
import {
  addNotificationAction,
} from '../../redux/slices/notifications';

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: 'hidden',
    padding: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(2),
  },
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
  open,
  handleClose,
  createInstitutes,
  addNotification,

  province,
  city,
  isFetching,
}) {
  const classes = useStyles();
  const [data, setData] = useState();

  const doSetData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleButtonClick = () => {
    if (!data?.name || !data.school_type) {
      addNotification({
        message: 'لطفاً نام و نوع مدرسه را وارد کنید.',
        type: 'error',
      });
      return;
    }
    createInstitutes({
      institute_type: 'School',
      ...data,
      province,
      city,
    }).then(() => {
      handleClose(false);
    });
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h2" gutterBottom align="center">
          {'افزودن مدرسه‌ی جدید'}
        </Typography>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent="center" alignItems="center">

          <Grid item container xs={12} sm={6}>
            <FormControl
              required
              fullWidth>
              <InputLabel>نوع</InputLabel>
              <Select
                onChange={doSetData}
                name="school_type"
                label="پایه">
                <MenuItem value={'Elementary'}>
                  {'دبستان'}
                </MenuItem>
                <MenuItem value={'JuniorHigh'}>
                  {'دبیرستان متوسطه اول'}
                </MenuItem>
                <MenuItem value={'High'}>
                  {'دبیرستان متوسطه دوم'}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="name"
              onChange={doSetData}
              label="نام مدرسه"
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="phone_number"
              onChange={doSetData}
              label="شماره‌تلفن مدرسه"
            />
          </Grid>

          <Grid item container xs={12} sm={6}></Grid>

          {/* <Grid item container xs={12} sm={6}>
            <FormControl required size='small'  className={classes.formControl}>
              <InputLabel>نوع</InputLabel>
              <Select
                className={classes.dropDown}
                onChange={doSetData}
                name='institute_type'
                label='نوع'
              >
                <MenuItem value={'School'} >{'مدرسه'}</MenuItem>
                <MenuItem value={'University'} >{'دانشگاه'}</MenuItem>
                <MenuItem value={'Other'} >{'غیره'}</MenuItem>
              </Select>
            </FormControl >
          </Grid> */}

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="principal_name"
              onChange={doSetData}
              label="نام مدیر"
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="principal_phone"
              onChange={doSetData}
              label="شماره‌تلفن مدیر"
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              name="province"
              label="استان"
              value={province}
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              name="province"
              label="شهر"
              value={city}
            />
          </Grid>

          <Grid item container xs={12}>
            <TextField
              multiline
              rows={2}
              fullWidth
              name="address"
              onChange={doSetData}
              label="آدرس"
            />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="postal_code"
              onChange={doSetData}
              label="کد پستی"
            />
          </Grid>

          <Grid item container xs={12} sm={6}></Grid>
        </Grid>

      </DialogContent>

      <DialogActions>
        <Grid item xs={12}>
          <Button
            disabled={isFetching}
            onClick={handleButtonClick}
            fullWidth
            variant="contained"
            color="secondary">
            ثبت
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  addNotification: addNotificationAction,
  createInstitutes: createInstitutesAction,
  getInstitutes: getInstitutesAction,
})(Index);
