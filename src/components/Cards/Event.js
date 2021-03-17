import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Typography,
  Grid,
  Card,
  CardActionArea,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

  statImage: {
    height: '40vh',
    background: `url(${process.env.PUBLIC_URL + '/logo.png'})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  title: {
    fontSize: 60,
    color: '#fbebd1',
    textShadow: '-2px 2px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 40,
    },
  },
  notificationTitle: {
    fontSize: 30,
    color: '#4d4a70',
  },
  paper: {
    backgroundColor: 'rgb(255, 255, 255, 0.94)',
    maxWidth: '20rem',
    fontSize: '1rem',
    textDecoration: 'none',
    overflow: 'hidden',
    boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.1s ease-in-out',
    '&:hover': {
      transform: 'translateY(-0.1rem) scale(1.01)',
      boxShadow: '0 0.5em 1rem -1rem rgba(0, 0, 0, 0.5)',
    }
  },
}));

const Event = ({ name, description, image, eventId }) => {
  const classes = useStyles();

  return (
    <Card onClick={console.log("SSSSs")} className={classes.paper}>
      <CardActionArea >
        <Grid container textAlign="center" spacing={1} >
          <Grid item container justify='center' alignItems='center' xs={12} sm={4} >
            <img src={process.env.PUBLIC_URL + image} alt='' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Grid>
          <Grid item xs={12} sm={8} container direction='column' justify='space-evenly' spacing={1}>
            <Grid item container alignItems='flex-end' spacing={1}>
              <Grid item>
                <Typography variant="h3" className={classes.notificationTitle}>
                  {'name'}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                color="textSecondary">
                {'description'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}


export default Event;