import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import AreYouSure from '../../components/Dialog/AreYouSure';
import Stepper from '../../components/SpecialComponents/RegistrationProcess/Stepper';
import Widget from '../../components/Widget';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
  submitRegistrationFormAction,
} from '../../redux/slices/events';
import Layout from '../Layout';
import Info from './Info';

const ANSWER_TYPES = {
  SmallAnswerProblem: 'SmallAnswer',
  BigAnswerProblem: 'BigAnswer',
  UploadFileProblem: 'UploadFileAnswer',
  MultiChoiceProblem: 'MultiChoiceAnswer',
  Description: 'Description',
  Image: 'Image',
  Video: 'Video',
  Game: 'Game',
};

const RegistrationForm = ({
  getOneRegistrationForm,

  userProfile,
  event,
  registrationForm,
  submitRegistrationForm,
  isFetching,
}) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [isDialogOpen, setDialogStatus] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (event?.registration_form) {
      getOneRegistrationForm({ id: event?.registration_form });
    }
  }, [event?.registration_form]);


  if (['Waiting', 'Accepted', 'Rejected'].includes(event?.user_registration_status)) {
    navigate(`/event/${eventId}/status/`);
  }

  const doRegister = () => {
    submitRegistrationForm({
      id: event?.registration_form,
      answers,
      eventId,
    });
  };

  // DeadlineMissed

  const pushAnswer = (problemId, widgetType) => (fieldName, answer) => {
    const temporaryAnswer = [...answers];
    let doesFind = false;
    for (let i = 0; i < temporaryAnswer.length; i++) {
      // todo: remove answer_type from world :/
      if (temporaryAnswer[i].answer_type === widgetType && temporaryAnswer[i].problem === problemId) {
        if (answer) {
          temporaryAnswer[i] = {
            ...temporaryAnswer[i],
            [fieldName]: answer,
          };
        } else {
          temporaryAnswer.splice(i, 1);
        }
        doesFind = true;
        break;
      }
    }
    if (!doesFind) {
      temporaryAnswer.push({
        [fieldName]: answer,
        answer_type: widgetType,
        problem: problemId,
      });
    }
    setAnswers(temporaryAnswer);
  };

  return (
    <Layout>
      <Stack spacing={3}>
        <Info />
        <Stepper />
        <Stack
          component={Paper}
          sx={{ padding: 2 }}
          spacing={2}
        >
          {registrationForm?.widgets?.map((widget) => (
            <Box key={widget.id}>
              <Widget
                disabled={isFetching}
                pushAnswer={pushAnswer(
                  widget?.id,
                  ANSWER_TYPES[widget?.widget_type]
                )}
                widget={widget}
              />
            </Box>
          ))}
          {event?.user_registration_status == 'DeadlineMissed' ?
            <Typography variant='h4' color='error' align="center" gutterBottom>
              {'مهلت ثبت‌نام در رویداد پایان یافته است.'}
            </Typography>
            : (
              event?.user_registration_status == 'NotPermitted' ? (
                <Typography variant='h4' color='error' align="center" gutterBottom>
                  {'با توجه به پایه‌ی تحصیلیتان، شما مجاز به شرکت در این رویداد نیستید.'}
                </Typography>
              ) : (
                !checkPermission(registrationForm?.audience_type, userProfile) ? (
                  <Typography variant='h4' color='error' align="center" gutterBottom>
                    {'لطفاً برای ادامه‌ی ثبت‌نام، مشخصات خود را در '}
                    <Link to={`/event/${eventId}/profile/personal/`}>{'اینجا'}</Link>
                    {' تکمیل کنید.'}
                  </Typography>
                ) : (
                  (event?.user_registration_status == 'GradeNotAvailable' ||
                    event?.user_registration_status == 'StudentshipDataIncomplete') &&
                  <Typography variant='h4' color='error' align="center" gutterBottom>
                    {'لطفاً از '}
                    <Link to={`/event/${eventId}/profile/student/`}>{'اینجا'}</Link>
                    {' قسمت «مشخصات دانش‌آموزی» را هم تکمیل کنید.'}
                  </Typography>
                )))}
          <Button
            disabled={event?.user_registration_status == 'DeadlineMissed' ||
              event?.user_registration_status == 'NotPermitted' ||
              event?.user_registration_status == 'GradeNotAvailable' ||
              event?.user_registration_status == 'StudentshipDataIncomplete' ||
              !checkPermission(registrationForm?.audience_type, userProfile)}
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              setDialogStatus(true);
            }}>
            {'ثبت'}
          </Button>
        </Stack>
      </Stack>
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => {
          setDialogStatus(!isDialogOpen);
        }}
        callBackFunction={doRegister}
      />
    </Layout >
  );
};

const mapStateToProps = (state) => ({
  userProfile: state.account.userProfile,
  events: state.events.events || [],
  event: state.events.event,
  registrationForm: state.events.registrationForm,
  isFetching: state.events.isFetching,
});

export default connect(mapStateToProps, {
  getOneRegistrationForm: getOneRegistrationFormAction,
  getOneEventInfo: getOneEventInfoAction,
  submitRegistrationForm: submitRegistrationFormAction,
})(RegistrationForm);


const checkPermission = (audienceType, userProfile = {}) => {
  const { first_name, last_name, national_code, birth_date, gender, province, city } = userProfile;
  if (!first_name || !last_name || !national_code || !birth_date || !gender || !province || !city) {
    return false;
  }


  if (audienceType == 'Student') {
    const { grade, school } = userProfile?.school_studentship;
    if (!grade || !school) {
      return false;
    }
  }

  if (audienceType == 'Academic') {
    // todo
  }

  return true;
}