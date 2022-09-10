import {
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';

import {
  createCommentAction,
  getAnswerAction,
  setScoreAction,
} from '../../redux/slices/scoring';
import {
  getWidgetAction,
} from '../../redux/slices/Paper';


const useStyles = makeStyles((theme) => ({
}));

function Index({
  setScore,
  createComment,
  scores,
  comments,
}) {
  const classes = useStyles();
  const t = useTranslate();
  const { answerId } = useParams();
  const [scoreValues, setScoreValues] = useState({});
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    if (scores) {
      const tmp = {};
      scores.forEach((score) => {
        tmp[score.type.id] = score.score?.value;
      })
      setScoreValues(tmp);
    }
  }, [scores])

  const handleSettingScore = (scoreTypeId) => {
    if (scoreValues[scoreTypeId]) {
      setScore({ answer_id: answerId, score_type_id: scoreTypeId, score: scoreValues[scoreTypeId] })
    }
  }

  const handleCreateComment = () => {
    if (commentContent) {
      createComment({ content: commentContent, answer_id: answerId });
      setCommentContent('');
    }
  }

  return (
    <>
      <Stack spacing={2} justifyContent='center'>
        <Typography variant='h2' align='center' gutterBottom>{'نمره‌دهی'}</Typography>
        <Divider />
        {scores?.map((score, index) => (
          <Stack key={index} spacing={1}>
            <TextField
              value={scoreValues[score.type.id] != undefined ? scoreValues[score.type.id] : ''}
              onChange={(e) => setScoreValues({ ...scoreValues, [score.type.id]: e.target.value })}
              fullWidth label={score.type.name} />
            <Button onClick={() => handleSettingScore(score.type.id)} variant='outlined' color='primary' fullWidth>{'ثبت'}</Button>
          </Stack>
        ))}
      </Stack>

      <Stack spacing={2} justifyContent='center' style={{ marginTop: 20 }}>
        <Typography variant='h2' align='center' gutterBottom>{'نظرات'}</Typography>
        <Divider />
        <Stack sx={{ width: '100%' }} spacing={1}>
          {comments?.map((comment, index) => (
            <Typography key={index} onChange={(e) => setCommentContent((e.target as any).value)}>
              {`${comment.writer.first_name ? comment.writer.first_name : '؟'} ${comment.writer.last_name ? comment.writer.last_name : '؟'}: ${comment.content}`}
            </Typography>
          ))}
        </Stack>
        <Stack spacing={1}>
          <TextField value={commentContent} onChange={(e) => setCommentContent(e.target.value)} fullWidth label='نظر شما' />
          <Button onClick={() => handleCreateComment()} variant='outlined' color='primary' fullWidth>{'ثبت'}</Button>
        </Stack>
      </Stack>
    </>
  );
}

const mapStateToProps = (state) => ({
  comments: state.scoring.comments,
  scores: state.scoring.scores,
});

export default connect(
  mapStateToProps,
  {
    createComment: createCommentAction,
    setScore: setScoreAction,
    setComment: getWidgetAction,
    getAnswer: getAnswerAction,
  }
)(Index);
