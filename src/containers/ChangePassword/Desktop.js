import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react'

import InputFields from './Fields'


const useStyles = makeStyles((theme) => ({
  background: {
    position: 'fixed',
    top: 0, right: 0, left: 0, bottom: 0,
    height: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL}/ZeroJourneyer/background.jpg)`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    filter: 'blur(3px)', webkitFilter: 'blur(3px)',
    zIndex: -10,
    paddingTop: theme.spacing(2), paddingBottom: theme.spacing(2),
    transform: 'scale(1.1)'
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    height: '100%',
    width: '100%',
  },
  image: {
    height: '70vh',
    width: '100%',
    background: `url(${process.env.PUBLIC_URL}'/ZeroJourneyer/Dr.Rastaranj.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
}))



const DesktopCreateAccount = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.background} />
      <Container className={classes.container}>
        <Grid
          container
          justify='space-evenly'
          alignItems='center'
          spacing={2}>
          <Grid
            container item
            justify='center'
            alignItems='center'
            sm={6} md={5}>
            <Paper className={classes.paper}>
              <Grid item container>
                <Grid
                  container
                  item
                  direction='column'
                  justify='center'
                  spacing={2}>
                  <Grid item>
                    <Typography gutterBottom variant='h2' align='center'>
                      بازیابی رمز عبور
                      </Typography>
                  </Grid>
                  <InputFields />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item sm={5} md={4} className={classes.image} />
        </Grid>
      </Container>
    </>
  )
}

export default (DesktopCreateAccount);