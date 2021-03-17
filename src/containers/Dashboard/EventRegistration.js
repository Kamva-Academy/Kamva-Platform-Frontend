import {
  Button,
  Container,
  Grid,
  Icon,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  useParams,
} from "react-router-dom";

import AppBar from '../../components/Appbar/ResponsiveAppBar';
import {
  applyDiscount,
  getEventRegistrationInfo,
} from '../../redux/actions/dashboard';
import { addNotification, } from '../../redux/actions/notifications'
import { toPersianNumber } from '../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({
  container: ({ marginTop }) => ({
    marginTop: marginTop,
    height: `calc(100vh - ${marginTop}px)`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }),
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
}));


const Profile = ({
  getEventRegistrationInfo,
  applyDiscount,
  addNotification,
  isFetching,
  uuid,
  participant_id,
  team,
  event,
}) => {
  const [price, setPrice] = useState(70000);
  const [discountCode, setDiscountCode] = useState('');
  const [marginTop, setMarginTop] = useState('');
  const { event_id } = useParams('event_id');
  const classes = useStyles({ marginTop });

  useEffect(() => {
    setMarginTop(document.getElementById("appBar").offsetHeight);
  }, []);

  useEffect(() => {
    if (event_id && uuid) {
      getEventRegistrationInfo({ event_id, uuid });
    }
  }, [event_id, uuid]);

  useEffect(() => {
    if (event && event.price) {
      setPrice(event.price);
    }
  }, [event]);

  const doApplyDiscount = () => {
    if (!discountCode) {
      addNotification({ message: 'یه کد تخفیف وارد کن!', type: 'error' });
      return;
    }
    applyDiscount({ discount_code: discountCode, participant_id, event_id });
  }

  return (
    <>
      <AppBar mode='DASHBOARD' />
      <Container className={classes.container}>
        <Grid container justify='space-evenly' alignItems='center' >
          <Grid item direction='column' sm={4}>
            <Paper className={classes.paper}>
              <Grid container direction='column' spacing={4}>
                <Grid item>
                  <Typography className={classes.title} align='center'>
                    {`«تیم ${''}»`}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.subtitle}>
                    {'اعضا:'}
                  </Typography>
                  <ol>
                    {
                      team.filter((member) => member.me == true).map((me, index) =>
                        <li key={index} >
                          <Typography className={classes.listItem}>
                            {me.name}
                          </Typography>
                        </li>
                      )
                    }
                    {team.filter((member) => member.me != true).map((teammate, index) =>
                      <li key={index} >
                        <Typography className={classes.listItem}>
                          {teammate.name}
                        </Typography>
                      </li>
                    )}
                  </ol>
                </Grid>

                <Grid item>
                  <Typography className={classes.subtitle} align='center'>
                    {`هزینه‌ی ثبت‌نام: ${toPersianNumber(price)} تومان`}
                  </Typography>
                </Grid>

                <Grid item container justify='center' alignItems='stretch' spacing={1}>
                  <Grid item xs={8} sm={9}>
                    <TextField
                      onChange={setDiscountCode}
                      value={discountCode}
                      variant='outlined'
                      fullWidth
                      label='کد تخفیف خود را وارد کنید'
                      type='text' />
                  </Grid>
                  <Grid item xs={4} sm={3} container >
                    <Button fullWidth variant='contained' color='primary' onClick={doApplyDiscount} >
                      {'اعمال تخفیف'}
                    </Button>
                  </Grid>
                </Grid>

                <Grid item>
                  <Button variant='contained' color='primary' fullWidth disabled={isFetching}>
                    به سوی پرداخت...
                </Button>
                </Grid>
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

const mapStateToProps = (state, ownProps) => {
  const { event_id } = useParams('event_id');
  const event = state.events ? state.events[event_id] : [];
  return ({
    uuid: state.account.user ? state.account.user.uuid : '',
    isFetching: state.events.isFetching,
    participant_id: event ? event.participant_id : '',
    team: event ? event.team : [],
    event,
  })
}

export default connect(
  mapStateToProps,
  {
    getEventRegistrationInfo,
    addNotification,
    applyDiscount,
  }
)(Profile);
