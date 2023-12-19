import { Stack, Grid, Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from 'components/organisms/Stepper';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
} from 'redux/slices/events';
import Layout from 'components/template/GeneralLayout';
import Form from 'components/template/RegistrationForm';
import Status from 'components/template/RegistrationStatus';
import Payment from 'components/template/Payment';
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
  const [currentStepName, _setCurrentStepName] = useState<RegistrationStepNameType>('personal-profile');
  const [lastActiveStepName, _setLastActiveStepName] = useState<RegistrationStepNameType>('personal-profile');
  const [steps, setSteps] = useState<RegistrationStepType[]>([])

  const getRegistrationSteps = (program: ProgramType, registrationForm) => {
    const steps: RegistrationStepType[] = [];

    steps.push({
      name: 'personal-profile',
      label: 'تکمیل مشخصات شخصی',
      component: <Profiles type='personal' onSuccess={() => goToNextStep(currentStepName)} />,
      onClick: () => goToStep('personal-profile'),
    })

    if (program.audience_type === 'Student') {
      steps.push({
        name: 'student-profile',
        label: 'تکمیل مشخصات دانش‌آموزی',
        component: <Profiles type='student' onSuccess={() => goToNextStep(currentStepName)} />,
        onClick: () => goToStep('student-profile')
      })
    }

    if (program.audience_type === 'Academic') {
      steps.push({
        name: 'academic-profile',
        label: 'تکمیل مشخصات دانشجویی',
        component: <Profiles type='academic' onSuccess={() => goToNextStep(currentStepName)} />,
        onClick: () => goToStep('academic-profile')
      })
    }

    steps.push({
      name: 'form',
      label: 'تکمیل فرم ثبت‌نام',
      component: <Form />,
      onClick: () => goToStep('form')
    })

    if (registrationForm.accepting_status == 'Manual') {
      steps.push({
        name: 'status',
        label: 'وضعیت ثبت‌نام',
        component: <Status />,
        onClick: () => goToStep('status'),
      })
    }

    if (program.merchandise) {
      steps.push({
        name: 'payment',
        label: 'پرداخت هزینه',
        component: <Payment />,
        onClick: () => goToStep('payment'),
      })
    }

    steps.push({
      name: 'program',
      label: 'ورود به دوره',
      component: null,
    })

    return steps;
  }

  const goToStep = (stepName: RegistrationStepNameType) => {
    _setCurrentStepName(stepName);
    const indexOfCurrentStep = steps.indexOf(steps.find(step => step.name === currentStepName));
    const indexOfDestinationStep = steps.indexOf(steps.find(step => step.name === stepName));
    if (indexOfDestinationStep >= indexOfCurrentStep) {
      _setLastActiveStepName(stepName);
    }
  }

  const goToNextStep = (currentStepName: RegistrationStepNameType) => {
    const nextStepName = steps[steps.indexOf(steps.find(step => step.name === currentStepName)) + 1].name;
    goToStep(nextStepName);
  }

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
      goToStep('status');
    }
    if (program?.merchandise && program?.user_registration_status === 'Accepted') {
      goToStep('payment');
    }
  }, [program, steps])

  useEffect(() => {
    if (program && registrationForm) {
      setSteps(getRegistrationSteps(program, registrationForm));
    }
  }, [program, registrationForm])

  if (!program || !registrationForm || !userInfo) return null;

  if (program.is_user_participating) {
    navigate(`/program/${programId}/`);
    return null;
  }

  return (
    <Layout>
      <Grid container spacing={2}
        alignItems={{ xs: 'center', md: 'start' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}>
        <Grid item xs={12} md={3} position={{ xs: null, md: 'sticky' }} top={0}>
          <Stack width={'100%'} spacing={2}>
            <Stepper steps={steps} activeStep={lastActiveStepName} />
            <Button
              variant="outlined"
              color='warning'
              fullWidth
              onClick={() => navigate('/programs/')}>
              {'بازگشت به دوره‌ها'}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack>
            {steps.find(step => step.name === currentStepName) ?
              steps.find(step => step.name === currentStepName).component :
              null}
          </Stack>
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
