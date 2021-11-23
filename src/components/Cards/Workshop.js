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
  workshopImage: {
    height: '100%',
    maxHeight: '300px',
    width: '100%',
    objectFit: 'cover',
  },
}));

const workshop = ({
  isWorkshop,
  ...workshop
}) => {
  const classes = useStyles();
  const t = useTranslate();
  console.log(workshop)
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
          <img src={workshop?.cover_page} alt="" className={classes.workshopImage} />
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
              {workshop?.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              {workshop?.description}
            </Typography>
          </Grid>
          <Grid item>
            <Chip
              variant="outlined"
              icon={<PeopleAltIcon />}
              label={
                workshop?.workshop_type == 'Individual'
                  ? 'انفرادی'
                  : `${toPersianNumber(workshop?.team_size)} ${t('person')}`
              }
            />
          </Grid>
          <Grid item>
            {
              workshop?.registration_form &&
              workshop?.user_registration_status === 'NotRegistered' &&
              <Button
                disabled={!workshop?.is_active}
                size="small"
                variant="outlined"
                fullWidth
                component={Link}
                to={`/workshop/${workshop?.id}/registration_form/`}
                color="secondary">
                {t('register')}
              </Button>
            }
            {
              !workshop?.is_user_participating &&
              workshop?.user_registration_status != 'NotRegistered' &&
              <Button
                size="small"
                variant="outlined"
                fullWidth
                component={Link}
                to={`/workshop/${workshop?.id}/status/`}
                color="secondary">
                {'وضعیت ثبت‌نام'}
              </Button>
            }
            {/* {is_user_participating && (
              <Button
                size="small"
                variant="outlined"
                fullWidth
                component={Link}
                to={`/workshop/${id}/team_selection/`}
                color="secondary">
                {'تیم‌کشی'}
              </Button>
            )} */}
            {workshop?.is_user_participating &&
              <Button
                size="small"
                variant="outlined"
                fullWidth
                component={Link}
                to={`/workshop/${workshop?.id}/`}
                color="secondary">
                {'ورود'}
              </Button>
            }
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default workshop;
