import {
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';

import Widget, { MODES } from '../components/Widget';
import {
    getAnswerAction,
    getScoresAndCommentsAction,
    setScoreAction,
} from '../redux/slices/scoring';
import {
  getWidgetAction,
} from '../redux/slices/widget';
import Layout from '../pages/WorkshopManagement/Layout';

import CorrectionColumn from './CorrectionColumn';
  
  
const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    padding: theme.spacing(2),
  },
}));
  
function Index({
  getAnswer,
  getWidget,
  getScoresAndComments,
  answer,
  problem,
}) {
  const classes = useStyles();
  const t = useTranslate();
  const { eventId, answerId } = useParams();

  useEffect(() => {
    getAnswer({ answerId })
    getScoresAndComments({ answer_id: answerId })
  }, [])

  useEffect(() => {
    if (answer?.problem) {
      getWidget({ widgetId: answer?.problem })
    }
  }, [answer?.problem])

  return (
    <Layout>
      <Grid container spacing={4} justify='center' alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align='center'>
            {'تصحیح'}
          </Typography>
        </Grid>
        <Grid item spacing={2} xs={12} md={8}>
          <Paper component={Paper} className={classes.paper}>
            <Grid container spacing={2}>
              {problem &&
                <Grid item xs={12}>
                  <Typography variant="h2" gutterBottom>
                    {'مسئله'}
                  </Typography>
                  <Widget mode={MODES.VIEW} widget={problem} />
                </Grid>
              }
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {answer &&
                <Grid item xs={12}>
                  <Typography variant="h2" gutterBottom>
                    {'پاسخ'}
                  </Typography>
                  <Widget mode={MODES.VIEW} widget={answer} />
                </Grid>
              }
            </Grid>
          </Paper>
        </Grid>
        <Grid item container spacing={2} xs={12} md={4}>
          <Paper component={Paper} className={classes.paper}>
            <CorrectionColumn />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
  
const mapStateToProps = (state) => ({
  answer: state.scoring.answer,
  scores: state.scoring.scores,
  problem: state.widget.widget,
});

export default connect(
  mapStateToProps,
  {
    setScore: setScoreAction,
    getScoresAndComments: getScoresAndCommentsAction,
    getWidget: getWidgetAction,
    getAnswer: getAnswerAction,
  }
)(Index);
  