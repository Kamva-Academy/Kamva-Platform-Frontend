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

import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
  submitRegistrationFormAction,
} from '../../redux/slices/events';
import { toPersianNumber } from '../../utils/translateNumber';


const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: '100%',
  },
  noPadding: {
    padding: '0px !important',
  },
  eventImage: {
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      borderBottomLeftRadius: '0px',
      borderTopRightRadius: '5px',
    },
    width: '100%',
    objectFit: 'cover',
  },
}));


const RegistrationForm = ({
  getOneEventInfo,
  event,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { eventId } = useParams();

  useEffect(() => {
    getOneEventInfo({ eventId });
  }, []);

  return (
    <Grid
      className={classes.noPadding}
      component={Paper}
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={2}>
      <Grid
        className={classes.noPadding}
        item
        container
        justifyContent="center"
        alignItems="center"
        xs={12}
        sm={5}>
        <img
          src={event?.cover_page}
          alt=""
          className={classes.eventImage}
        />
      </Grid>
      <Grid item container direction="column" xs={12} sm={7} spacing={1}>
        <Grid item>
          {event?.name && (
            <Typography gutterBottom align="center" variant="h1">{`رویداد ${event?.name}`}</Typography>
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
