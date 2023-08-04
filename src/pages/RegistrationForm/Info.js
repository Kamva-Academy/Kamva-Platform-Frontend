import { Stack, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import useWidth from '../../utils/UseWidth';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
  submitRegistrationFormAction,
} from '../../redux/slices/events';
import { toPersianNumber } from '../../utils/translateNumber';

const RegistrationForm = ({
  getOneEventInfo,
  event,
}) => {
  const { eventId } = useParams();
  const width = useWidth();

  useEffect(() => {
    if (eventId) {
      getOneEventInfo({ eventId });
    }
  }, [eventId]);

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{
        width: '100%',
        padding: '0px !important',
        display: 'flex',
      }}
      component={Paper}
      alignItems='center'
      justifyContent="space-between">

      <img
        src={event?.cover_page}
        alt=""
        style={width == 'xs' ? {
          flex: 0,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          width: '100%',
          objectFit: 'cover',
        } : {
          flex: 0,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          maxWidth: '40%',
          objectFit: 'cover',
        }}
      />

      <Stack spacing={2} sx={{ padding: 2, flex: 1 }}>
        {event?.name && (
          <Typography gutterBottom align="center" variant="h1">{event?.name}</Typography>
        )}
        <Typography align="center">{event?.description}</Typography>
        {event?.event_type == 'Team' && (
          <Typography align="center">{`شرکت در این رویداد در قالب گروه‌های ${toPersianNumber(event?.team_size)} نفره امکان‌پذیر است.`}</Typography>
        )}
        {event?.event_type == 'Individual' && (
          <Typography align="center">{'شرکت در این رویداد به صورت فردی است.'}</Typography>
        )}
        {event?.merchandise?.price > 0 ? (
          <Typography align="center">{`هزینه‌ی ثبت‌نام برای هر نفر ${toPersianNumber(event?.merchandise?.price)} تومان است.`}</Typography>
        ) : (
          <Typography align="center">{'هزینه‌ی ثبت‌نام رایگان است!'}</Typography>
        )}
        <div />
      </Stack>
    </Stack>

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
