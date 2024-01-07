import { Dialog, IconButton, Tooltip } from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getScoreTypesAction,
} from 'redux/slices/scoring'
import { useParams } from 'react-router-dom';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import UserCurrentScores from 'components/organisms/UserCurrentScores';

type ScoreDialogButtonPropsType = {
  getScoreTypes: any;
}

const ScoreDialogButton: FC<ScoreDialogButtonPropsType> = ({
  getScoreTypes,
}) => {
  const [openScoresDialog, setOpenScoresDialog] = useState(false);
  const { programId } = useParams();

  useEffect(() => {
    getScoreTypes({ program_id: programId })
  }, [])

  return (
    <Fragment>
      <Tooltip arrow title='امتیازات'>
        <IconButton onClick={() => setOpenScoresDialog(openScoresDialog => !openScoresDialog)}>
          <SportsScoreIcon />
        </IconButton>
      </Tooltip>
      <Dialog disableScrollLock maxWidth='xs' fullWidth open={openScoresDialog} onClose={() => setOpenScoresDialog(openScoresDialog => !openScoresDialog)}>
        <UserCurrentScores />
      </Dialog>
      {openScoresDialog}
    </Fragment>
  );
}

export default connect(null, {
  getScoreTypes: getScoreTypesAction,
})(ScoreDialogButton);