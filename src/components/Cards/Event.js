import { Button, Card, Chip, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

import { toPersianNumber } from '../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({
  notificationTitle: {
    color: '#4d4a70',
  },
  paper: {
    height: '100%',
    padding: '0px !important',
    backgroundColor: 'rgb(255, 255, 255, 0.94)',
    fontSize: '1rem',
    textDecoration: 'none',
    overflow: 'hidden',
    boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.1s ease-in-out',
    '&:hover': {
      transform: 'translateY(-0.1rem) scale(1.01)',
      boxShadow: '0 0.5em 1rem -1rem rgba(0, 0, 0, 0.5)',
    },
  },
  grid: {
    height: '100%',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  content: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
    },
  },
  noPadding: {
    padding: '0px !important',
  },
  eventImage: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
}));

const EventButton = ({ to, text, ...props }) => (
  <Button
    size="small"
    variant="outlined"
    fullWidth
    color="secondary"
    {...props}
    component={Link}
    target="_blank"
    to={to}
  >
    {text}
  </Button>
)

const Event = ({
  ...event
}) => {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <Card className={classes.paper}>
      <Grid container alignItems='stretch' className={classes.grid}>
        <Grid className={classes.noPadding} item container justifyContent="center" alignItems="center" xs={12} md={5}>
          <img src={event?.cover_page} alt="" className={classes.eventImage} />
        </Grid>
        <Grid item container xs={12} md={7} direction="column" justifyContent="space-between" spacing={2} className={classes.content}>
          <Grid item>
            <Typography variant="h3" className={classes.notificationTitle}>
              {event?.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {event?.description}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              variant="outlined"
              icon={<PeopleAltIcon />}
              label={
                event?.event_type == 'Individual'
                  ? 'انفرادی'
                  : `${toPersianNumber(event?.team_size)} ${t('person')}`
              }
            />
          </Grid>
          <Grid item>
            {
              event?.user_registration_status == 'NotStarted' &&
              <EventButton text={'ثبت‌نام شروع نشده'} disabled />
            }
            {
              event?.user_registration_status == 'DeadlineMissed' &&
              <EventButton text={'بت‌نام تمام شده'} disabled />
            }
            {
              (event?.user_registration_status === 'Permitted' || event?.user_registration_status === 'NotPermitted') &&
              <EventButton to={`/event/${event?.id}/registration_form/`} text={t('register')} disabled={!event?.is_active} />
            }
            {
              event?.user_registration_status == 'Waiting' &&
              <EventButton to={`/event/${event?.id}/status/`} text={'مشاهده وضعیت ثبت‌نام'} />
            }
            {
              (event?.user_registration_status == 'Accepted' ||
                event?.user_registration_status == 'GradeNotAvailable') &&
              <EventButton to={`/event/${event?.id}/`} text={'ورود'} />
            }
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Event;
