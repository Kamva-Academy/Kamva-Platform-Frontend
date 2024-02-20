import {
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  Typography,
  Tooltip,
} from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import React, { FC, useEffect, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useNavigate } from 'react-router-dom';
import { toPersianNumber } from 'utils/translateNumber';
import { ProgramType } from 'types/models';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

type EventButtonPropsType = {
  to?: string;
  text: string;
  disabled?: boolean;
}

const EventButton: FC<EventButtonPropsType> = ({
  to,
  text,
  disabled = false,
}) => {
  const navigate = useNavigate();

  return (
    <Button
      size="small"
      variant="outlined"
      fullWidth
      color="secondary"
      disabled={disabled}
      onClick={to ? () => navigate(to) : null}>
      {text}
    </Button>)
}

type ProgramCardPropsType = {
  program: ProgramType;
}

const ProgramCard: FC<ProgramCardPropsType> = ({
  program
}) => {
  const t = useTranslate();
  const [eventButtonObj, setEventButtonObj] = useState(program ? <EventButton to={`/program/${program.id}/registration/`} text={t('register')} /> : null);

  useEffect(() => {
    if (!program) return;
    if (program.user_registration_status === 'NotStarted') {
      setEventButtonObj(<EventButton text={'ثبت‌نام شروع نشده'} disabled />);
    }
    if (program.user_registration_status === 'DeadlineMissed') {
      setEventButtonObj(<EventButton text={'ثبت‌نام تمام شده'} disabled />);
    }
    if (['Waiting', 'Rejected', 'Accepted'].includes(program.user_registration_status)) {
      setEventButtonObj(<EventButton to={`/program/${program.id}/registration/`} text={'مشاهده وضعیت ثبت‌نام'} />);
    }
    if (program.is_user_participating) {
      setEventButtonObj(<EventButton to={`/program/${program.id}/`} text={'ورود'} />);
    }
  }, [program]);

  if (!program) return null;

  return (
    <Card
      sx={{
        height: '100%',
        width: '100%',
        padding: '0px !important',
        backgroundColor: 'rgb(255, 255, 255, 0.94)',
        fontSize: '1rem',
        textDecoration: 'none',
        overflow: 'hidden',
        boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
        transition: 'all 0.1s ease-in-out',
        '&:hover': {
          transform: 'translateY(-0.1rem) scale(1.02)',
          boxShadow: '0 0.5em 2rem -1rem rgba(0, 0, 0, 0.5)',
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
          <img src={program.cover_page} alt=""
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }} />
        </Grid>
        <Grid xs={12} md={7} item container
          sx={{
            padding: 2,
            paddingLeft: 2,
          }}>
          <Stack justifyContent="space-between" spacing={2} sx={{ width: '100%' }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'start'}>
              <Typography variant="h3"
                sx={{ color: '#4d4a70' }}>
                {program.name}
              </Typography>
              <Tooltip title='تعداد کسانی که در این برنامه ثبت‌نام کرده‌اند' arrow>
                <Chip
                  size='small'
                  sx={{ userSelect: 'none' }}
                  icon={<PeopleAltIcon fontSize='small' />}
                  label={toPersianNumber(program.participants_count)}
                />
              </Tooltip>
            </Stack>
            <Typography variant="body2" color="textSecondary">
              {program.description}
            </Typography>
            <Stack spacing={1}>
              <Grid container direction={'row'} spacing={1}>
                <Grid item>
                  <Chip
                    color='info'
                    sx={{ userSelect: 'none' }}
                    icon={<PeopleAltIcon />}
                    label={
                      program.event_type === 'Individual'
                        ? 'انفرادی'
                        : `${toPersianNumber(program.team_size)} ${t('person')}`
                    }
                  />
                </Grid>
                {(!program.merchandise || program.merchandise.price === 0) &&
                  <Grid item>
                    <Chip
                      color='success'
                      sx={{ userSelect: 'none' }}
                      icon={<InsertEmoticonIcon />}
                      label={'رایگان'}
                    />
                  </Grid>
                }
              </Grid>
              {eventButtonObj}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProgramCard;
