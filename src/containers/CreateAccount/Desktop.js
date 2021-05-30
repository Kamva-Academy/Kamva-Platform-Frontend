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
  },
  image: {
    height: '80vh',
    background: `url(${process.env.PUBLIC_URL}'/ZeroJourneyer/Dr.Rastaranj.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
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
          spacing={2}
          alignItems='flex-end'>
          <Grid
            container item
            justify='center'
            alignItems='center'
            xs={7} md={6}>
            <Grid item xs={12}>
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
                        ثبت‌نام
                      </Typography>
                    </Grid>
                    <InputFields />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={5} className={classes.image} />
        </Grid>
      </Container>
    </>
  )
}

export default (DesktopCreateAccount);