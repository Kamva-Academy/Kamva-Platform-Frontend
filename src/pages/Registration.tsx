import { Stack, Grid, Button } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from 'components/organisms/Stepper';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
} from 'redux/slices/events';
import Layout from 'components/template/GeneralLayout';
import { ProgramType, RegistrationFormType } from 'types/models';
import useRegistrationSteps from 'components/Hooks/useRegistrationSteps';

type RegistrationProcessPropsType = {
  registrationForm: RegistrationFormType;
  userInfo: any;
  program: ProgramType;
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
  const {
    currentStepNameIndex,
    lastActiveStepIndex,
    steps,
  } = useRegistrationSteps({ program, registrationForm });

  useEffect(() => {
    getOneEventInfo({ programId });
  }, []);

  useEffect(() => {
    if (program?.registration_form) {
      getOneRegistrationForm({ id: program.registration_form });
    }
  }, [program?.registration_form]);

  if (!program || !registrationForm || !userInfo) return null;

  if (program.is_user_participating) {
    navigate(`/program/${programId}/`);
    return null;
  }

  return (
    <Layout appbarMode='PROGRAM'>
      <Grid container spacing={2}
        alignItems={{ xs: 'center', md: 'start' }}
        justifyContent={{ xs: 'center', md: 'flex-start' }}>
        <Grid item xs={12} md={3} position={{ xs: null, md: 'sticky' }} top={0}>
          <Stack width={'100%'} spacing={2}>
            <Stepper steps={steps} activeStepIndex={lastActiveStepIndex} />
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
            {steps[currentStepNameIndex] ?
              steps[currentStepNameIndex].component :
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
