import { Stack } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from 'components/organisms/Stepper';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
} from 'redux/slices/events';
import Layout from 'components/template/GeneralLayout';
import PersonalProfile from 'components/template/profiles/PersonalProfile';
import StudentProfile from 'components/template/profiles/StudentProfile';
import AcademicProfile from 'components/template/profiles/AcademicProfile';
import Form from './Form';
import Status from './Status';
import Payment from './Payment';
import { StepperStepType } from 'types/global';
import { ProgramType, RegistrationFormType } from 'types/models';
import { getUserProfileAction } from 'redux/slices/account';

type RegistrationProcessPropsType = {
  registrationForm?: RegistrationFormType;
  userInfo?: any;
  program?: ProgramType;
  getOneRegistrationForm: any;
  getOneEventInfo: any;
  getUserProfile: any;
}

const RegistrationProcess: FC<RegistrationProcessPropsType> = ({
  registrationForm,
  userInfo,
  program,
  getOneRegistrationForm,
  getOneEventInfo,
  getUserProfile,
}) => {
  const navigate = useNavigate();
  const { programId } = useParams();

  useEffect(() => {
    if (userInfo?.id) {
      getUserProfile({ id: userInfo.id });
    }
  }, [userInfo?.id]);

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

  let activeStep: StepperStepType = 'تکمیل مشخصات شخصی';

  const getStepComponent = () => {
    if (!hasUserCompletedPrimaryInformation(userInfo)) {
      activeStep = 'تکمیل مشخصات شخصی';
      return <PersonalProfile />
    }
    if (!hasUserCompletedStudentshipInformation(userInfo)) {
      activeStep = 'تکمیل مشخصات دانش‌آموزی';
      return <StudentProfile />
    }
    if (!hasUserCompletedAcademicInformation(userInfo)) {
      activeStep = 'تکمیل مشخصات دانشجویی';
      return <AcademicProfile />
    }
    if (['Waiting', 'Rejected'].includes(program.user_registration_status)) {
      activeStep = 'وضعیت ثبت‌نام';
      return <Status />
    }
    if (program.merchandise && program.user_registration_status === 'Accepted') {
      activeStep = 'پرداخت هزینه';
      return <Payment />
    }
    activeStep = 'تکمیل فرم ثبت‌نام';
    return <Form />
  }

  const stepComponent = getStepComponent();

  return (
    <Layout>
      <Stack width={'100%'} spacing={2}>
        <Stepper program={program} registrationForm={registrationForm} activeStep={activeStep} />
        <Stack>
          {stepComponent}
        </Stack>
      </Stack>
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
  getUserProfile: getUserProfileAction,
})(RegistrationProcess);

const hasUserCompletedPrimaryInformation = (userInfo) => {
  const { first_name, last_name, national_code, birth_date, gender, province, city } = userInfo;
  return first_name && last_name && national_code && birth_date && gender && province && city;
}

const hasUserCompletedStudentshipInformation = (userInfo) => {
  if (userInfo.school_studentship) { // todo: why should some user have not school_studentship?
    const { grade, school } = userInfo.school_studentship;
    return grade && school;
  }
  return true;
}

const hasUserCompletedAcademicInformation = (userInfo) => {
  // todo: not implemented yet
  return true;
}