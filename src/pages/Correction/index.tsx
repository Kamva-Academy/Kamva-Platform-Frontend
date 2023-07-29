import {
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';
import Widget, { WidgetModes } from '../../components/organisms/Widget';
import {
  getAnswerAction,
  getScoresAndCommentsAction,
  setScoreAction,
} from '../../redux/slices/scoring';
import {
  getWidgetAction,
} from '../../redux/slices/Paper';
import Layout from 'components/template/GeneralLayout';
import ScoringColumn from './ScoringColumn';

function Correction({
  getAnswer,
  getWidget,
  getScoresAndComments,
  answer,
  problem,
}) {
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
  }, [answer])

  if (!problem) {
    return <></>
  }

  const problemWithAnswer = {
    ...problem,
    last_submitted_answer: answer,
  };

  return (
    <Layout appbarMode='GENERAL'>
      <Grid container spacing={4} justifyContent='center' alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align='center'>
            {'تصحیح'}
          </Typography>
        </Grid>
        <Grid item container spacing={2} xs={12} md={8}>
          <Paper sx={{ width: '100%', padding: 2 }}>
            {problemWithAnswer &&
              <Widget coveredWithPaper={false} mode={WidgetModes.Review} widget={problemWithAnswer} />
            }
          </Paper>
        </Grid>
        <Grid item container spacing={2} xs={12} md={4}>
          <Paper sx={{ width: '100%', padding: 2 }}>
            <ScoringColumn />
          </Paper>
        </Grid>
      </Grid >
    </Layout >
  );
}

const mapStateToProps = (state) => ({
  answer: state.scoring.answer,
  scores: state.scoring.scores,
  problem: state.paper.widget,
});

export default connect(mapStateToProps, {
  setScore: setScoreAction,
  getScoresAndComments: getScoresAndCommentsAction,
  getWidget: getWidgetAction,
  getAnswer: getAnswerAction,
})(Correction);
