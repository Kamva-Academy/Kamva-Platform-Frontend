import { Button, Card, Chip, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

import { toPersianNumber } from '../../utils/translateNumber';

const useStyles = makeStyles(() => ({
  notificationTitle: {
    color: '#4d4a70',
  },
  paper: {
    padding: '0px !important',
    maxWidth: '400px',
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
  content: {
    padding: '10px !important',
  },
  noPadding: {
    padding: '0px !important',
  },
  eventImage: {
    height: '100%',
    maxHeight: '300px',
    width: '100%',
    objectFit: 'cover',
  },
}));

const Event = ({
  cover_page,
  id,
  name,
  description,
  is_active,
  team_size,
  is_user_participating,
  user_registration_status,
}) => {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <Card className={classes.paper}>
      <Grid container justifyContent="center" spacing={1}>
        <Grid
          className={classes.noPadding}
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
          sm={5}>
          <img src={cover_page} alt="" className={classes.eventImage} />
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={7}
          direction="column"
          justifyContent="space-between"
          spacing={2}
          className={classes.content}>
          <Grid item>
            <Typography variant="h3" className={classes.notificationTitle}>
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              variant="outlined"
              icon={<PeopleAltIcon />}
              label={
                team_size == 1
                  ? 'انفرادی'
                  : `${toPersianNumber(team_size)} ${t('person')}`
              }
            />
          </Grid>
          <Grid item>
            {user_registration_status === 'NotRegistered' && (
              <Button
                disabled={!is_active}
                size="small"
                variant="outlined"
                fullWidth
                component={Link}
                to={`/event/${id}/registration_form/`}
                color="secondary">
                {t('register')}
              </Button>
            )}
            {!is_user_participating &&
              user_registration_status != 'NotRegistered' && (
                <Button
                  size="small"
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to={`/event/${id}/status/`}
                  color="secondary">
                  {'وضعیت ثبت‌نام'}
                </Button>
              )}
            {/* {is_user_participating && (
              <Button
                size="small"
                variant="outlined"
                fullWidth
                component={Link}
                to={`/event/${id}/team_selection/`}
                color="secondary">
                {'تیم‌کشی'}
              </Button>
            )} */}
            {is_user_participating && (
              <Button
                // disabled
                size="small"
                variant="outlined"
                fullWidth
                component={Link}
                to={`/event/${id}/`}
                color="secondary">
                {'ورود'}
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Event;
