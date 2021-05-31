import { Button, Divider, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import AppBar from '../../components/Appbar/ResponsiveAppBar';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
  profileImage: {
    maxHeight: '100px',
  },
  container: {
    marginTop: 80,
    minHeight: `calc(100vh - ${80}px)`,
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '900px !important',
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
  },
  logo: {
    height: 100,
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Grid container justify='center' direction='column' spacing={3} xs={12} sm={9}>
        <Grid item>
          <Typography variant='h2'>تصویر</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2} alignItems='center'>
          <Grid item>
            <img src={process.env.PUBLIC_URL + '/profile.png'} alt='' className={classes.profileImage} />
          </Grid>
          <Grid item>
            <Typography >برای تغییر تصویر بر روی گزینه‌ی زیر کلیک کنید.</Typography>
            <br />
            <Button variant='contained' color='secondary' >تغییر تصویر</Button>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant='h2'>مشخصات فردی</Typography>
          <Divider />
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined' size='small' label='نام' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined' size='small' label='نام خانوادگی' />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined' size='small' label='نام' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth variant='outlined' size='small' label='نام خانوادگی' />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  info: state.account.info,
  isFetching: state.account.isFetching,
  payments: state.account.payments,
});

export default connect(mapStateToProps)(Profile);
