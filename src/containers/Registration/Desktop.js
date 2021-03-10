import React from 'react'
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Paper,
} from '@material-ui/core';
import InputFields from './Fields'


const useStyles = makeStyles((theme) => ({
  background: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
  },
  readyImage: {
    height: '60vh',
    background: `url(${process.env.PUBLIC_URL + '/ready.png'})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
}))



const DesktopCreateAccount = () => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.background}>
        <Grid
          container
          className={classes.background}
          justify='center'
          alignItems='center'>
          <Grid
            container item
            justify='center'
            alignItems='center'
            xs={6}>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <Grid item container>
                  <Grid
                    container
                    item
                    direction='column'
                    justify='center'
                    spacing={2}>
                    <Grid item>
                      <Typography gutterBottom variant='h3' align='center'>
                        پیش‌ثبت نام اینترکارسولار۲
                      </Typography>
                    </Grid>
                    <InputFields />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.readyImage} />
        </Grid>
      </Container>
    </>
  )
}

export default (DesktopCreateAccount);