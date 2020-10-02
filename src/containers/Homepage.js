import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Fab, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import HomeAppbar from '../components/Appbar/HomeAppbar/HomeAppbar';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)',
  },
  title: {
    fontSize: 60,
    color: '#555',
    textShadow: '3px 3px #888',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 40,
    },
  },
  body: {
    background: '#F7F9FC',
  },
}));

const Homepage = (props) => {
  const classes = useStyles();
  return (
    <Container component="main" className={classes.body}>
      <CssBaseline />
      <HomeAppbar />
      <Toolbar id="back-to-top-anchor" />
      <div className={classes.centerItems}>
        <Typography component="h1" variant="h1" className={classes.title}>
          مدرسه‌ی مجازی
        </Typography>
      </div>
      <ScrollTop children={props.children}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Container>
  );
};

export default connect()(Homepage);
