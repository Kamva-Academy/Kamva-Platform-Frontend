import {
  Button,
  Container,
  Grid,
  Icon,
  makeStyles,
  Paper,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  useParams,
} from "react-router-dom";

import AppBar from '../../components/Appbar/ResponsiveAppBar';
import {
  getEventRegistrationInfo,
} from '../../redux/actions/dashboard';

const useStyles = makeStyles((theme) => ({
  container: ({ marginTop }) => ({
    marginTop: marginTop,
    height: `calc(100vh - ${marginTop}px)`,
  }),
  logo: {
    maxHeight: '80vh',
    maxWidth: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  }
}));

const Profile = ({
  getEventRegistrationInfo,
}) => {
  const { eventId } = useParams();

  const [marginTop, setMarginTop] = useState('');
  const classes = useStyles({ marginTop });

  useEffect(() => {
    setMarginTop(document.getElementById("appBar").offsetHeight);
    getEventRegistrationInfo({ eventId });
  }, [])

  return (
    <>
      <AppBar mode='DASHBOARD' />
      <Container className={classes.container}>
        <Grid container justify='space-evenly' alignItems='center' style={{ height: '100%' }} >
          <Grid container item direction='column' sm={5}>
            <Paper className={classes.paper}>
              <Grid item>
                شماره تیم
              </Grid>
              <Grid item>
                اسم تیم
</Grid>
              <Grid item>
                salam
</Grid>
              <Grid item>
                salam
</Grid>
              <Grid item>
                <Button variant='contained' color='primary' fullWidth>
                  پرداخت
                </Button>
              </Grid>
            </Paper>

          </Grid>

          <Grid container item sm={5} justify='center' alignItems='center'>
            <img
              src={process.env.PUBLIC_URL + '/ZeroJourneyer/Dr.Rastaranj.png'}
              alt="logo"
              className={classes.logo}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
})

export default connect(
  mapStateToProps,
  {
    getEventRegistrationInfo,
  }
)(Profile);
