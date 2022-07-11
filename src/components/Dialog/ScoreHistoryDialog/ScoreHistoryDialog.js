import {
  AppBar,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';

import { StatePageContext } from '../../../containers/Workshop';
import { getScoresAction } from '../../../redux/slices/currentState';

const useStyles = makeStyles((theme) => ({
  dialog: {
    maxHeight: '80vh',
  },
  appbar: {
    padding: theme.spacing(1, 2),
  },
  body: {
    maxHeight: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  score: {
    padding: theme.spacing(2),
    width: 40,
  },
}));

function ScoreHistoryDialog({
  open,
  handleClose,
  scores,
  totalScore,
  getScores,
}) {
  const classes = useStyles();

  const { fsmId, playerId } = useContext(StatePageContext);

  useEffect(() => {
    if (open) {
      getScores({ fsmId, playerId });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      className={classes.dialog}>
      <AppBar position="static" className={classes.appbar}>
        <Typography variant="h3" align="center">
          جمع امتیازات: {totalScore}
        </Typography>
      </AppBar>

      <div className={classes.body}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">نام گام</TableCell>
              <TableCell align="center" className={classes.score}>
                امتیاز
              </TableCell>
              <TableCell align="center">توضیحات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map((result) => (
              <TableRow
                key={result.id}
                style={{ background: result.is_valid ? '#fff' : '#ddd' }}>
                <TableCell component="th" scope="row" align="center">
                  {result.state_name}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.score}
                  align="center">
                  {result.score}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {result.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  scores: state.currentState.scores.filter((score) => score.is_valid).reverse(),
  totalScore: state.currentState.totalScore,
});

export default connect(mapStateToProps, { getScores: getScoresAction })(
  ScoreHistoryDialog
);
