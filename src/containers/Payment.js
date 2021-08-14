import { Button, Container, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import AppBar from '../components/Appbar/ResponsiveAppBar';
import Widget from '../components/Widget';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
  goForPurchaseUrlAction,
  submitRegistrationFormAction,
} from '../redux/slices/events'
import { toPersianNumber } from '../utils/translateNumber';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  logo: {
    maxHeight: '80vh',
    maxWidth: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 40,
    fontWeight: 600,
    textShadow: '1px 1px #dbd9d9',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 400,
    textShadow: '1px 1px #dbd9d9',
  },
  listItem: {
    fontSize: 20,
    fontWeight: 300,
    textShadow: '1px 1px #dbd9d9',
  },
  notificationTitle: {
    color: '#4d4a70',
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

const EVENT_TYPE = {
  'Team': 'تیمی',
  'Individual': 'انفرادی',
}

const Payment = ({
  getOneEventInfo,
  goForPurchaseUrl,
  event,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { eventId } = useParams()
  const [discountCode, setDiscountCode] = useState();

  useEffect(() => {
    getOneEventInfo({ id: eventId })
  }, [getOneEventInfo])

  useEffect(() => {
    if (event?.registration_form) {
      // getOneRegistrationForm({ id: event?.registration_form })
    }
  }, [event]);

  const goForPurchase = () => {
    goForPurchaseUrl({ merchandise: event?.merchandise?.id, code: discountCode })
  }

  const submitDiscount = () => {
    // todo
  }

  if (event?.user_registration_status == 'NotRegistered') {
    history.push(`/event/${eventId}/registration_form/`);
  }

  return (
    <Layout>
      <Grid
        container
        direction='column'
        justify="space-evenly"
        alignItems="center"
        spacing={4}>
        <Grid item>
          <Typography align='center' className={classes.title}>{'پرداخت'}</Typography>
        </Grid>
        <Grid item>
          <Grid
            component={Paper}
            container
            justify="center"
            alignItems="center"
            spacing={2}>
            <Grid item container justify='center' alignItems='center' spacing={1}>
              <Grid item xs={9}>
                <TextField fullWidth variant='outlined' label='کد تخفیف' onChange={e => setDiscountCode(e.target.value)} />
              </Grid>
              <Grid item xs={3}>
                <Button fullWidth variant='contained' color='primary' onClick={submitDiscount}>
                  اعمال
                </Button>
              </Grid>
            </Grid>
            <Grid item container justify='center' alignItems='center' spacing={1}>
              <Grid item>
                <Typography fullWidth >
                  {`مبلغ قابل پرداخت: ${toPersianNumber(event?.merchandise?.price)} تومان`}
                </Typography>
              </Grid>
              <Grid item>
                <Button variant='contained' color='primary' onClick={goForPurchase}>
                  پرداخت
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  events: state.events.events || [],
  event: state.events.event,
  registrationForm: state.events.registrationForm,
});

export default connect(
  mapStateToProps,
  {
    getOneRegistrationForm: getOneRegistrationFormAction,
    getOneEventInfo: getOneEventInfoAction,
    goForPurchaseUrl: goForPurchaseUrlAction,
    submitRegistrationForm: submitRegistrationFormAction,
  }
)(Payment);