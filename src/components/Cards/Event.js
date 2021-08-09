import { Button, Card, CardActions, Chip, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
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
  }
}));

const Event = ({
  cover_page,
  id,
  name,
  description,
  is_active,
  team_size,
  registration_form,
}) => {
  const classes = useStyles();
  const t = useTranslate()

  return (
    <Card className={classes.paper}>
      <Grid container justify='center' spacing={1} >
        <Grid
          className={classes.noPadding}
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          sm={5}>
          <img
            src={cover_page}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={7}
          direction="column"
          justify="space-between"
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
          <Grid item >
            <Chip
              variant="outlined"
              icon={<PeopleAltIcon />}
              label={`${toPersianNumber(team_size)} ${t('person')}`}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={!is_active}
              size='small'
              variant='outlined'
              fullWidth
              component={Link}
              to={`${process.env.PUBLIC_URL}/event/${id}/registration_form/${registration_form}`}
              color='secondary'>
              {t('preRegister')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Event;

