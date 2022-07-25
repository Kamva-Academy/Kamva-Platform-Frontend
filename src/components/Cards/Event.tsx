import { Button, Card, Chip, Grid, Typography } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import React, { FC, useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useNavigate } from 'react-router-dom';
import { toPersianNumber } from '../../utils/translateNumber';
import { EventType } from '../../types/event';

const EventButton: FC<{ to?: string; text: string; disabled?: boolean }> = ({ to, text, disabled = false }) => {
  const navigate = useNavigate();
  return (
    <Button
      size="small"
      variant="outlined"
      fullWidth
      color="secondary"
      disabled={disabled}
      onClick={to ? () => navigate(to) : null}
    >
      {text}
    </Button>)
}

type EventCardPropsType = {
  event: EventType;
}

const EventCard: FC<EventCardPropsType> = ({
  event
}) => {
  const t = useTranslate();
  const [eventButtonObj, setEventButtonObj] = useState(event ? <EventButton to={`/event/${event.id}/registration_form/`} text={t('register')} /> : null);

  useEffect(() => {
    if (!event) return;
    if (event.user_registration_status === 'NotStarted') {
      setEventButtonObj(<EventButton text={'ثبت‌نام شروع نشده'} disabled />);
    }
    if (event.user_registration_status === 'DeadlineMissed') {
      setEventButtonObj(<EventButton text={'ثبت‌نام تمام شده'} disabled />);
    }
    if (['Waiting', 'Rejected', 'Accepted'].includes(event.user_registration_status)) {
      setEventButtonObj(<EventButton to={`/event/${event.id}/status/`} text={'مشاهده وضعیت ثبت‌نام'} />);
    }
    if (event.is_user_participating) {
      setEventButtonObj(<EventButton to={`/event/${event.id}/`} text={'ورود'} />);
    }
  }, [event]);

  if (!event) return <></>

  return (
    <Card
      sx={{
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
      }}>
      <Grid
        container
        alignItems='stretch'
        sx={(theme) => ({
          height: '100%',
          justifyContent: 'space-between',
          [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
          },
        })}>
        <Grid sx={{ padding: 0 }} item container justifyContent="center" alignItems="center" xs={12} md={5}>
          <img src={event.cover_page} alt=""
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }} />
        </Grid>
        <Grid item container xs={12} md={7}
          direction="column"
          justifyContent="space-between" spacing={2}
          sx={(theme) => ({
            padding: theme.spacing(2),
            paddingLeft: theme.spacing(2),
          })}>
          <Grid item>
            <Typography variant="h3"
              sx={{
                color: '#4d4a70',
              }}>
              {event.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {event.description}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              variant="outlined"
              icon={<PeopleAltIcon />}
              label={
                event.event_type === 'Individual'
                  ? 'انفرادی'
                  : `${toPersianNumber(event.team_size)} ${t('person')}`
              }
            />
          </Grid>
          <Grid item>
            {eventButtonObj}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EventCard;
