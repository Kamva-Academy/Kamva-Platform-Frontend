import {
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import AreYouSure from '../../components/Dialog/AreYouSure';
import Widget from '../../components/Widget';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
  submitRegistrationFormAction,
} from '../../redux/slices/events';
import Layout from '../Layout';
import Info from './Info';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 40,
    fontWeight: 600,
    textShadow: '1px 1px #dbd9d9',
  },
}));

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
  const classes = useStyles();
  const history = useHistory();
  const { eventId } = useParams();
  const [isDialogOpen, setDialogStatus] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (event?.registration_form) {
      getOneRegistrationForm({ id: event?.registration_form });
    }
  }, [event?.registration_form]);

  if (event?.user_registration_status &&
    event?.user_registration_status != 'NotPermitted' &&
    event?.user_registration_status != 'Permitted' &&
    event?.user_registration_status != 'GradeNotAvailable') {
    history.push(`/event/${eventId}/status/`);
  }

  const doRegister = () => {
    submitRegistrationForm({
      id: event?.registration_form,
      answers,
      eventId,
    });
  };

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
      <Grid container justifyContent="space-evenly" alignItems="center" spacing={4}>
        <Grid item xs={12}>
          <Info />
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" className={classes.title}>
            {'فرم ثبت‌نام'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            style={{ padding: '20px' }}
            component={Paper}
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            {registrationForm?.widgets?.map((widget) => (
              <Grid item key={widget.id} xs={12}>
                <Widget
                  disabled={isFetching}
                  pushAnswer={pushAnswer(
                    widget?.id,
                    ANSWER_TYPES[widget?.widget_type]
                  )}
                  widget={widget}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              {event?.user_registration_status == 'NotPermitted' ? (
                <Typography variant='h4' color='error' align="center" gutterBottom>
                  {'با توجه به پایه‌ی تحصیلیتان، شما مجاز به شرکت در این رویداد نیستید.'}
                </Typography>
              ) : ((
                event?.user_registration_status == 'GradeNotAvailable' ||
                event?.user_registration_status == 'StudentshipDataIncomplete') ? (
                <Typography variant='h4' color='error' align="center" gutterBottom>
                  {'لطفاً در '}
                  <Link to={`/event/${eventId}/profile/student/`}>{'پروفایل'}</Link>
                  {' قسمت «مشخصات دانش‌آموزی» را هم تکمیل کنید.'}
                </Typography>
              ) : (
                !checkPermission(registrationForm?.audience_type, userProfile) &&
                <Typography variant='h4' color='error' align="center" gutterBottom>
                  {'لطفاً برای ادامه‌ی ثبت‌نام، مشخصات خود را در قسمت '}
                  <Link to={`/event/${eventId}/profile/personal/`}>{'پروفایل'}</Link>
                  {' تکمیل کنید.'}
                </Typography>
              ))}
              <Button
                disabled={event?.user_registration_status == 'NotPermitted' ||
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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