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

import AreYouSure from '../components/Dialog/AreYouSure';
import Widget from '../components/Widget';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
  submitRegistrationFormAction,
} from '../redux/slices/events';
import { toPersianNumber } from '../utils/translateNumber';
import Layout from './Layout';


const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  logo: {
    maxHeight: '80vh',
    maxWidth: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 40,
    fontWeight: 600,
    textShadow: '1px 1px #dbd9d9',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 400,
    textShadow: '1px 1px #dbd9d9',
  },
  listItem: {
    fontSize: 20,
    fontWeight: 300,
    textShadow: '1px 1px #dbd9d9',
  },
  notificationTitle: {
    color: '#4d4a70',
  },
  content: {
    padding: '10px !important',
  },
  noPadding: {
    padding: '0px !important',
  },
  eventImage: {
    borderRadius: '5px',
    height: '100%',
    width: '100%',
    objectFit: 'cover',
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
  getOneEventInfo,

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
    getOneEventInfo({ eventId });
  }, []);

  useEffect(() => {
    if (event?.registration_form) {
      getOneRegistrationForm({ id: event?.registration_form });
    }
  }, [event?.registration_form]);

  if (event?.user_registration_status &&
    event?.user_registration_status != 'NotPermitted' &&
    event?.user_registration_status != 'Permitted') {
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
          <Grid
            component={Paper}
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <Grid
              className={classes.noPadding}
              item
              container
              justifyContent="center"
              alignItems="center"
              xs={12}
              sm={4}>
              <img
                src={event?.cover_page}
                alt=""
                className={classes.eventImage}
              />
            </Grid>
            <Grid item container direction="column" xs={12} sm={8} spacing={1}>
              <Grid item>
                {event?.name && (
                  <Typography
                    gutterBottom
                    align="center"
                    variant="h1">{`رویداد ${event?.name}`}</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography align="center">{event?.description}</Typography>
              </Grid>
              <Grid item>
                {event?.event_type == 'Team' && (
                  <Typography align="center">{`شرکت در این رویداد در قالب تیم‌های ${toPersianNumber(event?.team_size)} نفره امکان‌پذیر است.`}</Typography>
                )}
                {event?.event_type == 'Individual' && (
                  <Typography align="center">{'شرکت در این رویداد به صورت فردی است.'}</Typography>
                )}
              </Grid>
              <Grid item>
                {event?.merchandise?.price > 0 ? (
                  <Typography align="center">{`هزینه‌ی ثبت‌نام برای هر نفر ${toPersianNumber(event?.merchandise?.price)} تومان است.`}</Typography>
                ) : (
                  <Typography align="center">{'هزینه‌ی ثبت‌نام رایگان است!'}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" className={classes.title}>
            {'فرم ثبت‌نام'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            component={Paper}
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            {registrationForm?.widgets?.map((widget) => (
              <Grid item key={widget.id} xs={12}>
                <Paper className={classes.paper} elevation={2}>
                  <Widget
                    disabled={isFetching}
                    pushAnswer={pushAnswer(
                      widget?.id,
                      ANSWER_TYPES[widget?.widget_type]
                    )}
                    widget={widget}
                  />
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12}>
              {
                event?.user_registration_status == 'NotPermitted' &&
                <Typography variant='h4' color='error' align="center" gutterBottom>
                  {'لطفاً برای ادامه‌ی ثبت‌نام، ابتدا مشخصات خود را در قسمت '}
                  <Link to={`/event/${eventId}/profile`}>{'پروفایل'}</Link>
                  {' تکمیل کنید.'}
                </Typography>
              }
              {
                <Button
                  disabled={event?.user_registration_status == 'NotPermitted'}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setDialogStatus(true);
                  }}>
                  {'ثبت‌نام'}
                </Button>
              }

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
