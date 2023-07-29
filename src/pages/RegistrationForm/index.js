import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import AreYouSure from 'components/organisms/dialogs/AreYouSure';
import Stepper from 'components/organisms/Stepper';
import Widget from 'components/organisms/Widget';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
  submitRegistrationFormAction,
} from 'redux/slices/events';
import Layout from 'components/template/GeneralLayout';
import Info from './Info';
import { WidgetModes } from 'components/organisms/Widget';

const ANSWER_TYPES = {
  SmallAnswerProblem: 'SmallAnswer',
  BigAnswerProblem: 'BigAnswer',
  UploadFileProblem: 'UploadFileAnswer',
  MultiChoiceProblem: 'MultiChoiceAnswer',
  Description: 'Description',
  Image: 'Image',
  Video: 'Video',
  Game: 'Game',
  InviteeUsernameQuestion: 'InviteeUsernameResponse',
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

  useEffect(() => {
    if (event?.is_user_participating) {
      navigate(`/event/${eventId}/`);
    }
    if (['Waiting', 'Accepted', 'Rejected'].includes(event?.user_registration_status)) {
      navigate(`/event/${eventId}/status/`);
    }
  }, [event])

  // todo: DeadlineMissed

  const submit = () => {
    submitRegistrationForm({
      id: event?.registration_form,
      answers,
      eventId,
    });
  };

  const collectAnswers = (problemId, widgetType) => (fieldName, answer) => {
    setAnswers((answers) => {
      const temporaryAnswers = [...answers];
      let isFound = false;
      for (let i = 0; i < temporaryAnswers.length; i++) {
        if (temporaryAnswers[i].problem === problemId) {
          if (answer) {
            temporaryAnswers[i] = {
              ...temporaryAnswers[i],
              [fieldName]: answer,
            };
          } else {
            temporaryAnswers.splice(i, 1);
          }
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        temporaryAnswers.push({
          [fieldName]: answer,
          answer_type: widgetType,
          problem: problemId,
          // todo: fix TOF
          question: problemId,
        });
      }
      return temporaryAnswers
    })
  };

  const widgets = useMemo(() => {
    if (registrationForm.widgets) {
      return (
        registrationForm.widgets.map((widget) => (
          <Box key={widget.id}>
            <Widget
              coveredWithPaper={false}
              mode={WidgetModes.InAnswerSheet}
              disabled={isFetching}
              collectAnswers={collectAnswers(
                widget?.id,
                ANSWER_TYPES[widget?.widget_type]
              )}
              widget={widget}
            />
          </Box>
        )))
    } else {
      return []
    }
  }, [registrationForm.widgets]);

  return (
    <Layout>
      <Stack sx={{ width: '100%' }} spacing={3}>
        <Info />
        <Stepper />
        <Stack
          component={Paper}
          sx={{ padding: 2 }}
          spacing={2}
        >
          {widgets}
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
        callBackFunction={submit}
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
  const checkPrimaryFields = !first_name || !last_name || !national_code || !birth_date || !gender || !province || !city;

  if (audienceType == 'Student') {
    const { grade, school } = userProfile?.school_studentship;
    if (checkPrimaryFields || !grade || !school) {
      return false;
    }
  }

  if (audienceType == 'Academic') {
    // todo
  }

  return true;
}