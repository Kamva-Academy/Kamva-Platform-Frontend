import {
  Dialog,
  DialogContent,
  MenuItem,
  DialogTitle,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Button,
  Grid,
  Typography,
  TextField,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import {
  registerOneUserAction,
} from '../../redux/slices/events';
import { EventType } from '../../types/models';

type AddOneUserDialogPropsType = {
  registerOneUser: any;
  event: EventType;
  open: boolean;
  handleClose: any;
  isFetching: boolean;
}

const RegisterOneUserDialog: FC<AddOneUserDialogPropsType> = ({
  registerOneUser,
  event,
  handleClose,
  open,
  isFetching,
}) => {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    national_code: '',
    phone_number: '',
    password: '',
    gender: '',
    grade: '',
  });

  const submit = () => {
    if (!data.first_name || !data.last_name || !data.gender || !data.grade || !data.username || !data.national_code || !data.phone_number || !data.password) {
      return;
    }
    registerOneUser({ ...data, registrationFormId: event?.registration_form }).then((response) => {
      if (response.type?.endsWith('fulfilled')) {
        handleClose();
      }
    });
  }

  const collectData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        {'افزودن کاربر جدید'}
      </DialogTitle>
      <DialogContent>
        <Grid sx={{ paddingTop: 1 }} container spacing={2} justifyContent="center" alignItems="center">
          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="first_name"
              value={data.first_name}
              onChange={collectData}
              label="نام" />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="last_name"
              value={data.last_name}
              onChange={collectData}
              label="نام خانوادگی" />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              name="username"
              value={data.username}
              onChange={collectData}
              label="نام کاربری" />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              value={data.national_code}
              name="national_code"
              onChange={collectData}
              label="کد ملی" />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              value={data.phone_number}
              name="phone_number"
              onChange={collectData}
              label="شماره تلفن" />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <TextField
              fullWidth
              value={data.password}
              name="password"
              onChange={collectData}
              label="گذرواژه" />
          </Grid>

          <Grid item container xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>جنسیت</InputLabel>
              <Select
                onChange={collectData}
                name='gender'
                value={data.gender}
                label='جنسیت'>
                <MenuItem value={'Male'} >{'پسر'}</MenuItem>
                <MenuItem value={'Female'} >{'دختر'}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item container xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>پایه</InputLabel>
              <Select
                onChange={collectData}
                value={data.grade}
                name='grade'
                label='پایه'>
                <MenuItem value={1}>{'اول'}</MenuItem>
                <MenuItem value={2}>{'دوم'}</MenuItem>
                <MenuItem value={3}>{'سوم'}</MenuItem>
                <MenuItem value={4}>{'چهارم'}</MenuItem>
                <MenuItem value={5}>{'پنجم'}</MenuItem>
                <MenuItem value={6}>{'ششم'}</MenuItem>
                <MenuItem value={7}>{'هفتم'}</MenuItem>
                <MenuItem value={8}>{'هشتم'}</MenuItem>
                <MenuItem value={9}>{'نهم'}</MenuItem>
                <MenuItem value={10}>{'دهم'}</MenuItem>
                <MenuItem value={11}>{'یازدهم'}</MenuItem>
                <MenuItem value={12}>{'دوازدهم'}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Grid item xs={12}>
          <Button
            disabled={isFetching}
            onClick={submit}
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
  isFetching: state.events.isFetching,
  event: state.events.event,
});

export default connect(mapStateToProps, {
  registerOneUser: registerOneUserAction,
})(RegisterOneUserDialog);
