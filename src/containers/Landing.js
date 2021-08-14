import './Style.css';

import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const BOMB_HEIGHT = 500;

const useStyles = makeStyles((theme) => ({
  countDownSection: {
    height: `${BOMB_HEIGHT}vh`,
    position: 'fixed',
    top: 0,
  },
  fullHeight: {
    minHeight: '100vh',
  },
  title: {
    maxHeight: '25vh',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: -theme.spacing(12),
      maxHeight: '20vh',
    },
  },
  subtitle: {
    fontSize: 40,
    lineHeight: '40px',
    fontWeight: 600,
    color: '#dbd9d9',
    textShadow: '1px 1px #888',
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
      lineHeight: '20px',
    },
  },

  emptySection: {
    height: `${BOMB_HEIGHT + 100}vh`,
  },
  secondSection: {
    position: 'relative',
    height: '100vh',
    zIndex: 10,
  },
  secondSectionBackground: {
    position: 'absolute',
    // top: `${BOMB_HEIGHT + 100}vh`,
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${process.env.PUBLIC_URL}/ZeroJourneyer/background.jpg)`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(1px)',
    webkitFilter: 'blur(1px)',
    zIndex: 10,
  },
  scrollIcon: {
    position: 'absolute',
    height: '30vh',
  },
  logo: {
    maxHeight: '95vh',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '50vh',
    },
    zIndex: 10,
  },
  eventDescriptionSection: {
    marginTop: -theme.spacing(1),
    position: 'relative',
    padding: theme.spacing(4, 2),
    backgroundColor: '#00869e',
    color: 'white',
    zIndex: 5,
  },
  RastaDescriptionSection: {
    position: 'relative',
    padding: theme.spacing(4, 2),
    backgroundColor: '#feceab',
    color: '#',
  },
  kaftar: {
    maxHeight: '30vh',
    maxWidth: '100%',
  },
  oldman: {
    maxHeight: '50vh',
    maxWidth: '100%',
  },
  moreButton: {
    margin: theme.spacing(2, 'auto', 0),
    textAlign: 'center',
    display: 'table',
  },
  workshopsSection: {
    position: 'relative',
    padding: theme.spacing(4, 2),
    backgroundColor: '#3f3f56',
    color: 'white',
  },
  FAQSection: {
    position: 'relative',
    padding: theme.spacing(4, 2),
    backgroundColor: '#7DC1D3',
  },
  telegramLink: {
    display: 'inline-block',
    marginRight: 10,
    color: 'rgb(85, 85, 255)',
  },
  section2Paper: {
    padding: theme.spacing(2),
    '& img': {
      width: '100%',
    },
  },
  lastEmptySection: {
    height: '100vh',
  },
  h_iframe_aparat_embed_frame: {
    position: 'relative',
    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      boxShadow: '0 2px 4px rgb(0 0 0 / 15%), 0 1px 3px rgb(0 0 0 / 25%)',
      borderRadius: 8,
    },
    '& span': {
      display: 'block',
      paddingTop: '57%',
    },
  },
}));

const ZeroJourneyer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Container>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.fullHeight}>
          <Grid
            direction="column"
            item
            container
            spacing={2}
            alignItems="center"
            justify="space-around"
            className={classes.titleHolder}
            xs={12}
            md={6}>
            <Grid item>
              <Typography variant="h1" align='center'>پلتفرم برگزاری رویداد و کارگاه</Typography>
            </Grid>
            <Grid item>
              <ButtonGroup size="large" variant="contained" color="primary">
                <Button component={Link} to='/login'>ورود</Button>
                <Button component={Link} to='/create_account'>ثبت‌نام</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ZeroJourneyer;
