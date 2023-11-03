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

const ProgramRegistrationForm = ({
  getOneRegistrationForm,

  userInfo,
  event,
  registrationForm,
  submitRegistrationForm,
  isFetching,
}) => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const [isDialogOpen, setDialogStatus] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (event?.registration_form) {
      getOneRegistrationForm({ id: event?.registration_form });
    }
  }, [event?.registration_form]);

  useEffect(() => {
    if (event?.is_user_participating) {
      navigate(`/program/${programId}/`);
    }
    if (['Waiting', 'Accepted', 'Rejected'].includes(event?.user_registration_status)) {
      navigate(`/program/${programId}/status/`);
    }
  }, [event])

  // todo: DeadlineMissed

  const submit = () => {
    submitRegistrationForm({
      id: event?.registration_form,
      answers,
      programId,
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
      <Stack width={'100%'} spacing={3} alignItems={'center'}>
        <Info />
        <Box width={'100%'}>
          <Stepper />
        </Box>
        <Stack
          width={'100%'}
          component={Paper}
          sx={{ padding: 2 }}
          spacing={2}>
          {widgets}
          {event?.user_registration_status == 'DeadlineMissed' ?
            <Typography variant='h4' color='error' align="center" gutterBottom>
              {'مهلت ثبت‌نام در دوره پایان یافته است.'}
            </Typography>
            : (
              event?.user_registration_status == 'NotPermitted' ? (
                <Typography variant='h4' color='error' align="center" gutterBottom>
                  {'با توجه به پایه‌ی تحصیلیتان، شما مجاز به شرکت در این دوره نیستید.'}
                </Typography>
              ) : (
                !checkPermission(registrationForm?.audience_type, userInfo) ? (
                  <Typography variant='h4' color={'red'}>
                    {'لطفاً برای ادامه‌ی ثبت‌نام، مشخصات خود را در '}
                    <Typography variant='h4' color={'blue'} component={Link} to={`/program/${programId}/profile/personal/`}>
                      {'اینجا'}
                    </Typography>
                    {' تکمیل کنید.'}
                  </Typography>
                ) : (
                  (event?.user_registration_status == 'GradeNotAvailable' ||
                    event?.user_registration_status == 'StudentshipDataIncomplete') &&
                  <Typography variant='h4' color={'red'}>
                    {'لطفاً از '}
                    <Typography marginX={'0.25em'} variant='h4' color={'blue'} component={Link} to={`/program/${programId}/profile/student/`}>
                      {'اینجا'}
                    </Typography>
                    {' قسمت «مشخصات دانش‌آموزی» را هم تکمیل کنید.'}
                  </Typography>
                )))}
          <Button
            disabled={event?.user_registration_status == 'DeadlineMissed' ||
              event?.user_registration_status == 'NotPermitted' ||
              event?.user_registration_status == 'GradeNotAvailable' ||
              event?.user_registration_status == 'StudentshipDataIncomplete' ||
              !checkPermission(registrationForm?.audience_type, userInfo)}
            variant="contained"
            color="primary"
            onClick={() => {
              setDialogStatus(true);
            }}>
            {'تکمیل مشخصات'}
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
  userInfo: state.account.userInfo,
  event: state.events.event,
  registrationForm: state.events.registrationForm,
  isFetching: state.events.isFetching,
});

export default connect(mapStateToProps, {
  getOneRegistrationForm: getOneRegistrationFormAction,
  getOneEventInfo: getOneEventInfoAction,
  submitRegistrationForm: submitRegistrationFormAction,
})(ProgramRegistrationForm);

// todo: check weather the user has completed the base informations (for All type audience)
const checkPermission = (audienceType, userInfo = {}) => {
  const { first_name, last_name, national_code, birth_date, gender, province, city } = userInfo;
  const checkPrimaryFields = !first_name || !last_name || !national_code || !birth_date || !gender || !province || !city;

  if (audienceType == 'Student') {
    if (userInfo.school_studentship) {
      const { grade, school } = userInfo.school_studentship;
      if (checkPrimaryFields || !grade || !school) {
        return false;
      }
    }
  }

  if (audienceType == 'Academic') {
    // todo
  }

  return true;
}