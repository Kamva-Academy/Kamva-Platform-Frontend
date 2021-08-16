import {
  Button,
  ButtonGroup,
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
    width: '100%'
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
}));


function AreYouSure({
  getInstitutes,
  open,
  handleClose,
  createInstitutes
}) {
  const classes = useStyles()
  const [data, setData] = useState();

  const doSetData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleButtonClick = (e) => {
    createInstitutes({ ...data });
    setTimeout(() => {
      getInstitutes();
    }, 2000)
  }

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} >
      <DialogTitle>
        <Typography variant='h2' gutterBottom align='center'>افزودن موسسه</Typography>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justify='center' alignItems='center' >
          <Grid item container xs={12} sm={6}>
            <TextField required fullWidth variant='outlined'
              name='name' onChange={doSetData}
              size='small' label='نام' />
          </Grid>
          <Grid item container xs={12} sm={6}>
            <FormControl required size='small' variant="outlined" className={classes.formControl}>
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
          </Grid>
        </Grid>
        <Grid container spacing={2} justify='center' alignItems='center' >
          <Grid item container xs={12} sm={6}>
            <FormControl size='small' variant="outlined" className={classes.formControl}>
              <InputLabel>استان</InputLabel>
              <Select
                className={classes.dropDown}
                onChange={doSetData}
                name='province'
                label='استان'
              >
                <MenuItem value={'School'} >{'مدرسه'}</MenuItem>
                <MenuItem value={'University'} >{'دانشگاه'}</MenuItem>
                <MenuItem value={'Other'} >{'غیره'}</MenuItem>
              </Select>
            </FormControl >
          </Grid>
          <Grid item container xs={12} sm={6}>
            <FormControl size='small' variant="outlined" className={classes.formControl}>
              <InputLabel>شهر</InputLabel>
              <Select
                className={classes.dropDown}
                onChange={doSetData}
                name='city'
                label='شهر'
              >
                <MenuItem value={'School'} >{'مدرسه'}</MenuItem>
                <MenuItem value={'University'} >{'دانشگاه'}</MenuItem>
                <MenuItem value={'Other'} >{'غیره'}</MenuItem>
              </Select>
            </FormControl >
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid item xs={12}>
          <Button onClick={handleButtonClick} fullWidth variant='contained' color='secondary'>ثبت</Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
})


export default connect(mapStateToProps, {
  createInstitutes: createInstitutesAction,
  getInstitutes: getInstitutesAction,
})(AreYouSure);