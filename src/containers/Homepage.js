import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Fab, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import TextShadowMove from '../components/Transition/TextShadowMove';

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
  const [inProp, setInProp] = useState(true);
  useEffect(() => setTimeout(() => setInProp(false), 100), []);
  useEffect(() => setTimeout(() => setInProp(true), 800), []);
  return (
    <Container component="main" className={classes.body}>
      <CssBaseline />
      <ResponsiveAppBar mode="LANDING" />
      <Toolbar id="back-to-top-anchor" />
      <div className={classes.centerItems}>
        <TextShadowMove in={inProp}>
          <Typography component="h1" variant="h1" className={classes.title}>
            مدرسه‌ی مجازی
          </Typography>
        </TextShadowMove>
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
