import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  Fab,
  Grid,
  makeStyles,
  Paper,
  Toolbar,
} from '@material-ui/core';
import { connect } from 'react-redux';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import BigAnswerProblem from '../components/Widget/BigAnswer/problem';

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
  workshopContent: {
    paddingTop: 30,
  },
  paper: {
    overflow: 'hidden',
  },
  item: {
    padding: theme.spacing(1),
  },
}));

const Homepage = (props) => {
  const classes = useStyles();
  return (
    <Container component="main" className={classes.body}>
      <CssBaseline />
      <ResponsiveAppBar mode="WORKSHOP" />
      <Toolbar id="back-to-top-anchor" />
      <Grid
        container
        spacing={2}
        className={classes.workshopContent}
        justify="center">
        <Grid item xs={12} md={7} lg={7}>
          <Paper className={classes.paper}>
            <div className={classes.item}>
              <BigAnswerProblem />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <div className={classes.item}>sdfasf</div>
          </Paper>
        </Grid>
      </Grid>
      <ScrollTop children={props.children}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Container>
  );
};

export default connect()(Homepage);
