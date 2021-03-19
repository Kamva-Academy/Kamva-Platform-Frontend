import {
  Button,
  Container,
  Grid,
  Icon,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
  useHistory,
  useParams,
} from "react-router-dom";

import AppBar from '../../components/Appbar/ResponsiveAppBar';
import {
  getEventRegistrationInfo,
} from '../../redux/actions/dashboard';
import { addNotification, } from '../../redux/actions/notifications'
import {
  applyDiscount,
  paymentRequest
} from '../../redux/actions/payment';
import { toPersianNumber } from '../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({
  container: ({ marginTop }) => ({
    marginTop: marginTop,
    height: `calc(100vh - ${marginTop}px)`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }),
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
    fontSize: 30,
    fontWeight: 600,
    textShadow: '1px 1px #dbd9d9',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 400,
  },
  listItem: {
    fontSize: 20,
    fontWeight: 300,
  },
}))

const Profile = ({
  getEventRegistrationInfo,
  paymentRequest,
  applyDiscount,
  addNotification,
  isFetching,
  member_uuid,
  events,
}) => {

  const { event_id } = useParams('event_id');
  const [isButtonDisabled, setButtonStatus] = useState(false);
  const [isDataReady, setDataStatus] = useState(false);
  const [discount_code, setDiscountCode] = useState('');
  const [marginTop, setMarginTop] = useState('');
  const classes = useStyles({ marginTop });
  const [teamMembers, setTeamMembers] = useState([]);
  const [participant_id, setParticipantId] = useState('');
  const [event, setEvent] = useState({ price: '' });
  const history = useHistory();

  useEffect(() => {
    if (event_id && member_uuid) {
      getEventRegistrationInfo({ event_id, member_uuid });
    }
  }, [event_id, member_uuid]);

  useEffect(() => {
    setMarginTop(document.getElementById("appBar").offsetHeight);
  }, []);

  useEffect(() => {
    if (events && events[event_id] && !isDataReady) {
      setEvent(events[event_id].event);
      setTeamMembers(events[event_id].team);
      setParticipantId(events[event_id].participant_id);
      setDataStatus(true);
    }
  }, [events]);

  useEffect(() => {
    if (teamMembers
      && teamMembers.filter((member) => member.is_me === true)[0]
      && teamMembers.filter((member) => member.is_me === true)[0].is_paid) {
      history.push('/workshops');
    }
  }, [teamMembers]);

  const doApplyDiscount = () => {
    if (!discount_code) {
      addNotification({ message: 'کد تخفیفت رو وارد کن!', type: 'error' });
      return;
    }
    setButtonStatus(true);
    applyDiscount({ discount_code, participant_id, event_id }).then(
      (action) => {
        if (action.response && action.response.success) {
          setEvent({
            ...event,
            price: Math.round(event.price * (1 - action.response.value))
          });
          addNotification({ message: 'حله! کد تخفیفت اعمال شد.', type: 'success' })
        } else {
          setButtonStatus(false);
        }
      },
    );
  }

  const goForPayment = () => {
    paymentRequest({ discount_code, participant_id })
  }

  const getParticipantStatus = (participant) => {
    if (!participant.is_accepted) {
      return `${participant.name} | وضعیت: قبول‌نشده ❌`
    } else {
      if (participant.is_paid) {
        return `${participant.name} | وضعیت: قبول‌شده، پرداخت‌کرده ✅ `
      } else {
        return `${participant.name} | وضعیت: قبول‌شده، پرداخت‌نکرده ❌ `
      }
    }
  }

  return (
    <>
      <AppBar mode='STUDENT_DASHBOARD' />
      <Container className={classes.container}>
        <Grid container justify='space-evenly' alignItems='center' spacing={2} >
          <Grid item direction='column' xs={12} sm={6} md={5}>
            <Paper className={classes.paper}>
              <Grid container direction='column' spacing={4}>
                <Grid item>
                  <Typography className={classes.title} align='center'>
                    {`ثبت‌نام رویداد ${event.name}`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.subtitle}>
                    {'اعضا:'}
                  </Typography>
                  <ol>
                    {
                      teamMembers.filter((member) => member.is_me == true).map((me, index) =>
                        <li key={index} >
                          <Typography className={classes.listItem}>
                            <b>{getParticipantStatus(me)}</b>
                          </Typography>
                        </li>
                      )
                    }
                    {teamMembers.filter((member) => member.is_me != true).map((teammate, index) =>
                      <li key={index} >
                        <Typography className={classes.listItem}>
                          {getParticipantStatus(teammate)}
                        </Typography>
                      </li>
                    )}
                  </ol>
                </Grid>
                <Grid item>
                  <Typography className={classes.subtitle} align='center'>
                    {`هزینه‌ی ثبت‌نام: ${toPersianNumber(event.price)} تومان`}
                  </Typography>
                </Grid>

                <Grid item container justify='center' alignItems='stretch' spacing={1}>
                  <Grid item xs={8} sm={9}>
                    <TextField
                      onChange={(event) => setDiscountCode(event.target.value)}
                      value={discount_code}
                      variant='outlined'
                      fullWidth
                      disabled={isButtonDisabled}
                      label='کد تخفیف خود را وارد کنید'
                      type='text' />
                  </Grid>
                  <Grid item xs={4} sm={3} container >
                    <Button fullWidth variant='contained' color='primary' onClick={doApplyDiscount} disabled={isButtonDisabled}  >
                      {'بررسی کد'}
                    </Button>
                  </Grid>
                </Grid>

                <Grid item>
                  <Button variant='contained' onClick={goForPayment} color='primary' fullWidth disabled={isFetching}>
                    {'به سوی پرداخت...'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid container item xs={12} sm={5} justify='center' alignItems='center'>
            <img
              src={process.env.PUBLIC_URL + '/ZeroJourneyer/Dr.Rastaranj.png'}
              alt="logo"
              className={classes.logo}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {

  const events = state.events ? state.events : [];
  return ({
    member_uuid: state.account.user ? state.account.user.uuid : '',
    isFetching: state.events.isFetching,
    events,
  })
}

export default connect(
  mapStateToProps,
  {
    getEventRegistrationInfo,
    paymentRequest,
    addNotification,
    applyDiscount,
  }
)(Profile);
