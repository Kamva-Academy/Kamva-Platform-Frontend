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
  getEventRegistrationInfo,
  submitDiscount,
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
  submitDiscount,
  addNotification,
  event_id,
  member_uuid,
  participant_id,
  team,
  event,
}) => {
  const is_team = true;
  const total_price = 70000;

  const [discountCode, setDiscountCode] = useState('');
  const [marginTop, setMarginTop] = useState('');
  const classes = useStyles({ marginTop });

  const doSubmitDiscount = () => {
    submitDiscount({ discount_code: discountCode, participant_id });
  }

  useEffect(() => {
    setMarginTop(document.getElementById("appBar").offsetHeight);
  }, []);

  useEffect(() => {
    if (event_id && member_uuid) {
      getEventRegistrationInfo({ event_id, member_uuid });
    }
  }, [event_id, member_uuid]);

  console.log(event_id)
  console.log(member_uuid)

  return (
    <>
      <AppBar mode='DASHBOARD' />
      <Container className={classes.container}>
        <Grid container justify='space-evenly' alignItems='center' >
          <Grid item direction='column' sm={4}>
            <Paper className={classes.paper}>
              <Grid container direction='column' spacing={4}>
                {is_team &&
                  <>
                    <Grid item>
                      <Typography className={classes.title} align='center'>
                        {`«تیم ${'عقاب'}»`}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.subtitle}>
                        {'اعضا:'}
                      </Typography>
                      <ol>
                        <li>
                          <Typography className={classes.listItem}>
                            {'سید علیرضا خاتمی'}
                          </Typography>
                        </li>
                        <li>
                          <Typography className={classes.listItem}>
                            {'محمد هاشمی'}
                          </Typography>
                        </li>
                        <li>
                          <Typography className={classes.listItem}>
                            {'داریوش فرضیایی'}
                          </Typography>
                        </li>
                      </ol>
                    </Grid>
                  </>
                }
                <Grid item>
                  <Typography className={classes.subtitle} align='center'>
                    {`هزینه‌ی ثبت‌نام: ${toPersianNumber(total_price)} تومان`}
                  </Typography>
                </Grid>

                <Grid item container justify='center' alignItems='stretch' spacing={1}>
                  <Grid item xs={8} sm={9}>
                    <TextField
                      onChange={setDiscountCode}
                      value={discountCode}
                      label='کد تخفیف خود را وارد کنید'
                      type='text' />
                  </Grid>
                  <Grid item xs={4} sm={3} container >
                    <Button fullWidth variant='contained' color='primary' onClick={doSubmitDiscount} >
                      {'اعمال تخفیف'}
                    </Button>
                  </Grid>
                </Grid>

                <Grid item>
                  <Button variant='contained' color='primary' fullWidth>
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

const mapStateToProps = (state, ownProps) => ({
  member_uuid: state.authentication.user_info ? state.authentication.user_info.uuid : '',
  event_id: state.authentication.events ? state.authentication.events[0] : '',
  participant_id: state.event.participant_id,
  team: state.event.team,
  event: state.event.event,
})

export default connect(
  mapStateToProps,
  {
    getEventRegistrationInfo,
    addNotification,
    submitDiscount,
  }
)(Profile);
