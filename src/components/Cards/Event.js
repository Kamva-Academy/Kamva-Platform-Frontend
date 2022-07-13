import { Button, Card, Chip, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import React, { useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useNavigate } from 'react-router-dom';

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
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  content: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(0),
    [theme.breakpoints.down('md')]: {
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

const EventButton = ({ to, text, ...props }) => {
  const navigate = useNavigate();
  return (
    <Button
      size="small"
      variant="outlined"
      fullWidth
      color="secondary"
      {...props}
      onClick={() => navigate(to)}
    >
      {text}
    </Button>)
}

const Event = ({
  ...event
}) => {

  const classes = useStyles();
  const t = useTranslate();
  const [EventButtonObj, setEventButtonObj] = useState(<EventButton to={`/event/${event?.id}/registration_form/`} text={t('register')} />);

  useEffect(() => {
    if (event?.user_registration_status == 'NotStarted') {
      setEventButtonObj(<EventButton text={'ثبت‌نام شروع نشده'} disabled />);
    }
    if (event?.user_registration_status == 'DeadlineMissed') {
      setEventButtonObj(<EventButton text={'ثبت‌نام تمام شده'} disabled />);
    }
    if (['Waiting', 'Rejected', 'Accepted'].includes(event?.user_registration_status)) {
      setEventButtonObj(<EventButton to={`/event/${event?.id}/status/`} text={'مشاهده وضعیت ثبت‌نام'} />);
    }
    if (event?.is_user_participating) {
      setEventButtonObj(<EventButton to={`/event/${event?.id}/`} text={'ورود'} />);
    }
  }, [event?.user_registration_status, event?.is_user_participating]);

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
            {EventButtonObj}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Event;
