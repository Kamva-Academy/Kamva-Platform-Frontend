import { Stack, Typography } from '@mui/material';
import React, { FC, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getUserCurrentScoresAction
} from 'redux/slices/scoring';

type UserCurrentScoresPropsType = {
  getCurrentScores: any;
  scores: any[];
}

const UserCurrentScores: FC<UserCurrentScoresPropsType> = ({
  getCurrentScores,
  scores,
}) => {
  const { programId } = useParams();

  useEffect(() => {
    getCurrentScores({ program_id: programId });
  }, [])

  return (
    <Stack padding={2} spacing={4}>
      <Typography variant='h2' align='center' gutterBottom>
        {'امتیازات'}
      </Typography>
      {Object.entries(scores).length > 0 ?
        <Stack spacing={1}>
          {Object.entries(scores).map(([scoreType, scoreValue], index) => (
            <Stack direction={'row'} key={index} spacing={2} justifyContent={'space-between'}>
              <Typography>{scoreType}</Typography>
              <Typography>{scoreValue}</Typography>
            </Stack>
          ))}
        </Stack> :
        <Typography variant='h4' align='center'>
          {'هنوز امتیازی وجود ندارد'}
        </Typography>
      }
    </Stack>
  );
}

const mapStateToProps = (state) => ({
  scores: state.scoring.scores,
});

export default connect(mapStateToProps, {
  getCurrentScores: getUserCurrentScoresAction,
})(UserCurrentScores);
