import { Step, StepLabel, Stepper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
} from 'redux/slices/events';


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
    [theme.breakpoints.down('sm')]: {
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

  registrationForm,
  event,
}) => {
  const { programId } = useParams();
  const [hasPayment, setPayment] = useState(false);
  const [hasPending, setPending] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    getOneEventInfo({  programId });
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

  steps.push('ورود به دوره')

  useEffect(() => {
    if (event?.user_registration_status == 'Waiting' || event?.user_registration_status == 'Rejected') {
      setStep(1);
    }
    if (event?.user_registration_status == 'Accepted') {
      setStep(steps.length - 2)
    }
  }, [steps, event?.user_registration_status])

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
