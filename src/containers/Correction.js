import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import CorrectionStatesTabbar from '../components/SpecialComponents/CorrectionPage/StatesTabbar';
import SubmitCard from '../components/SpecialComponents/CorrectionPage/SubmitCard';
import {
  getProblemsAction,
  getSubmissionsAction,
} from '../redux/slices/mentor';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  tabbar: {
    overflow: 'hidden',
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    minHeight: 100,
  },
}));

function Correction({
  fsmId,
  states,
  submissions,
  submissionsIsLoading,
  getProblems,
  getSubmissions,
}) {
  const classes = useStyles();
  const [stateNum, setStateNum] = React.useState(0);

  useEffect(() => {
    getProblems();
  }, [fsmId]);

  useEffect(() => {
    if (stateNum) {
      setStateNum(0);
    } else if (states[0]) {
      getSubmissions({
        fsmId,
        stateId: states[0].state_id,
      });
    }
  }, [states]);

  const updateCurrentState = () => {
    if (states[stateNum]?.state_id) {
      getSubmissions({
        fsmId,
        stateId: states[stateNum].state_id,
      });
    }
  };

  useEffect(() => {
    updateCurrentState();
  }, [stateNum]);

  return (
    <>
      <ResponsiveAppBar mode="MENTOR_DASHBOARD" />
      <Container className={classes.container}>
        <Paper className={classes.tabbar}>
          <CorrectionStatesTabbar
            value={stateNum}
            setValue={setStateNum}
            tabs={states}
          />
        </Paper>
        <Paper className={classes.paper}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateCurrentState()}>
            بروز کردن لیست
          </Button>
          <Grid container justify="center" spacing={2}>
            {submissionsIsLoading ? (
              <CircularProgress size={24} />
            ) : (
              submissions.map((submission) => (
                <Grid item key={submission.id} xs={12} sm={4} md={3}>
                  <LazyLoad height={200} once>
                    <SubmitCard submission={submission} />
                  </LazyLoad>
                </Grid>
              ))
            )}
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const fsmId = ownProps.match.params.fsmId;
  return {
    states:
      state.mentor.problems.find((fsm) => +fsm.fsm_id === +fsmId)?.states || [],
    submissions: state.mentor.submissions
      .slice()
      .sort(
        (a, b) => new Date(b.submission_date) - new Date(a.submission_date)
      ),
    submissionsIsLoading: state.mentor.submissionsIsLoading,
    fsmId,
  };
};

export default connect(mapStateToProps, {
  getProblems: getProblemsAction,
  getSubmissions: getSubmissionsAction,
})(Correction);
