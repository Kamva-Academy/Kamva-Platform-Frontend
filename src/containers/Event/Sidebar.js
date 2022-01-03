import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {
  getCertificateAction,
  getOneEventInfoAction,
  getOneRegistrationFormAction,
} from '../../redux/slices/events';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  customAmountBox: {
    display: 'none',
  },
}));

function Workshops({
  getCertificate,
  getOneEventInfo,
  getOneRegistrationForm,
  registrationForm,
  event,
}) {
  const classes = useStyles();
  const { eventId } = useParams();
  const [amount, setAmount] = React.useState('');

  useEffect(() => {
    getOneEventInfo({ id: eventId });
  }, [getOneEventInfo]);

  const handleAmountChange = (event) => {
    const box = document.getElementById('customAmount');
    if (event.target.value == 'Custom') {
      box.style.display = 'unset';
      setAmount(50000);
    } else {
      box.style.display = 'none';
      setAmount(event.target.value);
    }
  };

  const handleTextboxAmountChange = (event) => {
    setAmount(parseInt(event.target.value));
  };

  const doGetCertificate = () => {
    getCertificate({ registrationReceiptId: event?.registration_receipt }).then(
      (action) => {
        if (action.meta.requestStatus == 'fulfilled') {
          window.open(action.payload.response.certificate, '_blank');
        }
      }
    );
  };

  const payDonation = () => {
    console.log(amount);
  };

  return (
    <>
      <Grid item>
        <Paper className={classes.paper}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5">
                {`به رویداد ${event?.name || ''} خوش آمدید!`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={event?.event_type == 'Individual'}
                variant="outlined"
                fullWidth
                component={Link}
                to={`/event/${event?.id}/team_selection/`}>
                {'تیم‌کشی'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!event?.has_certificate || !event?.certificates_ready}
                onClick={doGetCertificate}
                variant="outlined"
                fullWidth>
                {'گواهی حضور'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5">{'کمک مالی'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">مقدار</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={amount}
                  onChange={handleAmountChange}>
                  <MenuItem value={10000}>ده هزار تومان</MenuItem>
                  <MenuItem value={20000}>بیست هزار تومان</MenuItem>
                  <MenuItem value={30000}>سی هزار تومان</MenuItem>
                  <MenuItem value={'Custom'}>مقدار دیگر</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <form
                className={classes.customAmountBox}
                noValidate
                autoComplete="off"
                fullWidth
                id={'customAmount'}>
                <TextField
                  id="standard-basic"
                  fullWidth
                  value={amount}
                  type="number"
                  onChange={handleTextboxAmountChange}
                />
                <Typography variant="p">{'تومان'}</Typography>
              </form>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={payDonation} variant="outlined" fullWidth>
                {'پرداخت'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
  registrationForm: state.events.registrationForm,
});

export default connect(mapStateToProps, {
  getCertificate: getCertificateAction,
  getOneEventInfo: getOneEventInfoAction,
  getOneRegistrationForm: getOneRegistrationFormAction,
})(Workshops);
