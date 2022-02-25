import {
  makeStyles,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
} from '../../../redux/slices/events';


const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: '100%',
  },
  noPadding: {
    padding: '0px !important',
  },
  eventImage: {
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      borderBottomLeftRadius: '0px',
      borderTopRightRadius: '5px',
    },
    width: '100%',
    objectFit: 'cover',
  },
}));


const RegistrationForm = ({
  getOneRegistrationForm,
  getOneEventInfo,

  step = 0,
  registrationForm,
  event,
}) => {
  const classes = useStyles();
  const { eventId } = useParams();
  const [hasPayment, setPayment] = useState(false);
  const [hasPending, setPending] = useState(false);

  useEffect(() => {
    getOneEventInfo({ eventId });
  }, []);

  useEffect(() => {
    if (event?.registration_form) {
      getOneRegistrationForm({ id: event?.registration_form });
    }
  }, [event?.registration_form]);

  useEffect(() => {
    if (event?.merchandise) {
      setPayment(true)
    }
  }, [event?.merchandise])

  useEffect(() => {
    if (registrationForm?.accepting_status == 'Manual') {
      setPending(true);
    }
  }, [registrationForm?.accepting_status])

  const steps = ['تکمیل فرم ثبت‌نام']

  if (hasPending) {
    steps.push('تایید ثبت‌نام')
  }

  if (hasPayment) {
    steps.push('پرداخت هزینه')
  }

  steps.push('ورود به رویداد')

  return (
    <Stepper activeStep={step} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>

  );
};

const mapStateToProps = (state) => ({
  event: state.events.event,
  registrationForm: state.events.registrationForm,
});


export default connect(mapStateToProps, {
  getOneRegistrationForm: getOneRegistrationFormAction,
  getOneEventInfo: getOneEventInfoAction,
})(RegistrationForm);
