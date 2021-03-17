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
  useParams,
} from "react-router-dom";

import AppBar from '../../components/Appbar/ResponsiveAppBar';
import EventCard from '../../components/Cards/Event';
import {
  applyDiscount,
  getEventRegistrationInfo,
} from '../../redux/actions/dashboard';
import { addNotification, } from '../../redux/actions/notifications'
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
}));

const Profile = ({
  getEventRegistrationInfo,
  applyDiscount,
  addNotification,
  isFetching,
  event_id,
  member_uuid,
  participant_id,
  team,
  event,
}) => {
  const [registrationPrice, setRegistrationPrice] = useState(70000);
  const [discountCode, setDiscountCode] = useState('');
  const [marginTop, setMarginTop] = useState('');
  const classes = useStyles({ marginTop });
  // after ZeroJourneyer it would be uncommented:
  // const { event_id } = useParams('event_id'); 

  // to apply discount and get new price:
  const doApplyDiscount = () => {
    if (!discountCode) {
      addNotification({ message: 'یه کد تخفیف وارد کن!', type: 'error' });
      return;
    }
    applyDiscount({ discount_code: discountCode, participant_id, event_id });
  }

  // to apply newPrice on screen:
  useEffect(() => {
    if (event && event.newPrice) {
      setRegistrationPrice(event.newPrice);
    }
  }, [event])

  // to make top margin for main body of page, as long as appbar height, just for appbar
  useEffect(() => {
    setMarginTop(document.getElementById("appBar").offsetHeight);
  }, []);

  // to get registration information of event
  useEffect(() => {
    if (event_id && member_uuid) {
      getEventRegistrationInfo({ event_id, member_uuid });
    }
  }, [event_id, member_uuid]);

  return (
    <>
      <AppBar mode='DASHBOARD' />
      <Container className={classes.container}>
        <Grid container justify='space-evenly' alignItems='center' >
          <Grid item direction='column' sm={4}>
            <EventCard image={'stat.png'} />
          </Grid>

          <Grid container item sm={5} justify='center' alignItems='center'>
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
  const event_id = state.account.events ? state.account.events[0] : '';
  const event = state.events ? state.events[event_id] : [];
  return ({
    isFetching: state.events.isFetching,
    member_uuid: state.account.user ? state.account.user.uuid : '',
    event_id,
    participant_id: event ? event.participant_id : '',
    team: event ? event.team : [],
    event,
  })
}

export default connect(
  mapStateToProps,
  {
    getEventRegistrationInfo,
    addNotification,
    applyDiscount,
  }
)(Profile);
