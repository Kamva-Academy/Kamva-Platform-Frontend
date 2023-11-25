import { Stack, Box, Grid } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from 'components/organisms/Stepper';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
} from 'redux/slices/events';
import Layout from 'components/template/GeneralLayout';
import Form from './Form';
import Status from './Status';
import Payment from './Payment';
import { RegistrationStepNameType, RegistrationStepType } from 'types/global';
import { ProgramType, RegistrationFormType } from 'types/models';
import Profiles from 'components/template/Profile';

type RegistrationProcessPropsType = {
  registrationForm?: RegistrationFormType;
  userInfo?: any;
  program?: ProgramType;
  getOneRegistrationForm: any;
  getOneEventInfo: any;
}

const RegistrationProcess: FC<RegistrationProcessPropsType> = ({
  registrationForm,
  userInfo,
  program,
  getOneRegistrationForm,
  getOneEventInfo,
}) => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    getOneEventInfo({ programId });
  }, []);

  useEffect(() => {
    if (program?.registration_form) {
      getOneRegistrationForm({ id: program.registration_form });
    }
  }, [program?.registration_form]);

  useEffect(() => {
    if (['Waiting', 'Rejected'].includes(program?.user_registration_status)) {
      setActiveStepIndex(getStepIndex('status'));
    }
    if (program?.merchandise && program?.user_registration_status === 'Accepted') {
      setActiveStepIndex(getStepIndex('payment'));
    }
  }, [program])

  if (!program || !registrationForm || !userInfo) return null;

  if (program.is_user_participating) {
    navigate(`/program/${programId}/`);
    return null;
  }

  const getRegistrationSteps = (program: ProgramType, registrationForm) => {
    const goToNextStep = () => setActiveStepIndex((activeStepIndex) => activeStepIndex + 1)

    const steps: RegistrationStepType[] = [
      {
        name: 'personal-profile',
        label: 'تکمیل مشخصات شخصی',
        component: <Profiles type='personal' onSuccess={goToNextStep} />
      }
    ]

    if (program.audience_type === 'Student') {
      steps.push({
        name: 'student-profile',
        label: 'تکمیل مشخصات دانش‌آموزی',
        component: <Profiles type='student' onSuccess={goToNextStep} />
      })
    }

    if (program.audience_type === 'Academic') {
      steps.push({
        name: 'academic-profile',
        label: 'تکمیل مشخصات دانشجویی',
        component: <Profiles type='academic' onSuccess={goToNextStep} />
      })
    }

    steps.push({
      name: 'form',
      label: 'تکمیل فرم ثبت‌نام',
      component: <Form />
    })

    if (registrationForm.accepting_status == 'Manual') {
      steps.push({
        name: 'status',
        label: 'وضعیت ثبت‌نام',
        component: <Status />
      })
    }

    if (program.merchandise) {
      steps.push({
        name: 'payment',
        label: 'پرداخت هزینه',
        component: <Payment />
      })
    }

    steps.push({
      name: 'program',
      label: 'ورود به دوره',
      component: null,
    })

    return steps;
  }


  const getStepIndex = (stepName: RegistrationStepNameType) => {
    return steps.indexOf(steps.find(step => step.name === stepName))
  }

  const steps = getRegistrationSteps(program, registrationForm);

  return (
    <Layout>
      <Grid container width={'100%'} spacing={2} direction={'row'} alignItems={'start'} justifyContent={'flex-start'}>
        <Grid item xs={12} md={3}>
          <Stepper steps={steps} activeStep={steps[activeStepIndex].name} />
        </Grid>
        <Grid item xs={12} md={9}>
          {steps[activeStepIndex].component}
        </Grid>
      </Grid>
    </Layout >
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.account.userInfo,
  program: state.events.event,
  registrationForm: state.events.registrationForm,
});

export default connect(mapStateToProps, {
  getOneRegistrationForm: getOneRegistrationFormAction,
  getOneEventInfo: getOneEventInfoAction,
})(RegistrationProcess);
