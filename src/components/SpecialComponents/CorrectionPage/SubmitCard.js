import {
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';

import { markSubmissionAction } from '../../../redux/slices/mentor';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';

const useStyles = makeStyles((theme) => ({
  item: {
    padding: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  input: {
    marginBottom: theme.spacing(1),
  },
}));

function SubmitCard({ submission, markSubmission }) {
  const classes = useStyles();
  const [score, setScore] = React.useState(submission?.review?.score);
  const [description, setDescription] = React.useState(
    submission?.review?.description
  );

  const problem_name = submission.problem.problem_name
    ? '- ' + submission.problem.problem_name + ' -'
    : '';
  return (
    <Paper className={classes.item}>
      <Typography gutterBottom>
        {'شماره بازیکن: ' + submission.player_id}
      </Typography>
      <Typography gutterBottom>
        {'شماره سوال:‌ ' + submission.problem.problem_id + problem_name}
      </Typography>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={submission.answer_text}
      />
      <Typography>{submission.submission_date}</Typography>
      <Divider className={classes.divider} />
      <TextField
        className={classes.input}
        value={score}
        label="نمره"
        type="number"
        inputProps={{
          min: '0',
          max: '100',
          step: '1',
          maxLength: '3',
        }}
        onChange={(e) => e.target.value < 100 && setScore(e.target.value)}
      />

      <TextField
        className={classes.input}
        value={description}
        label="توضیح"
        type="text"
        multiline
        fullWidth
        rows={3}
        variant="outlined"
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() =>
          markSubmission({ submissionId: submission.id, score, description })
        }>
        ثبت
      </Button>
    </Paper>
  );
}

export default connect(null, { markSubmission: markSubmissionAction })(
  SubmitCard
);
