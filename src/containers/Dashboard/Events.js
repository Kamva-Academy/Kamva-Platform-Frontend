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

const Events = ({
  addNotification,
  isFetching,
  events,
}) => {
  const [marginTop, setMarginTop] = useState('');
  const classes = useStyles({ marginTop });

  useEffect(() => {
    setMarginTop(document.getElementById("appBar").offsetHeight);
  }, []);

  return (
    <>
      <AppBar mode='DASHBOARD' />
      <Container className={classes.container}>
        <Grid container justify='space-evenly' alignItems='center' >
          {events.map((event, index) => (
            <Grid key={index} item container direction='column' alignItems='center' justify='center' sm={5}>
              <EventCard name={event.name} id={event.id} description={event.description} image={event.cover_page} is_active={event.is_active} />
            </Grid>
          ))}
          <Grid container item sm={6} justify='center' alignItems='center'>
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

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.events.isFetching,
  events: state.events.events ? state.events.events : [],
})

export default connect(
  mapStateToProps,
  {
    getEventRegistrationInfo,
    addNotification,
    applyDiscount,
  }
)(Events);
