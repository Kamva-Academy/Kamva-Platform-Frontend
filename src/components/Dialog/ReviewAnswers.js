import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import Widget from '../Widget';

import {
  getAnswersForReviewAction
} from '../../redux/slices/workshop';

const useStyles = makeStyles((theme) => ({
  container: {
    overflow: 'hidden',
    padding: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(2),
  },
  profileImage: {
    maxHeight: '100px',
    borderRadius: '5px',
  },
  logo: {
    height: 100,
  },
  formControl: {
    width: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
}));

function Index({
  open,
  handleClose,
  getAnswersForReview,

  isFetching,
  answers,
}) {
  const classes = useStyles();
  const { fsmId } = useParams();

  useEffect(() => {
    if (open) {
      getAnswersForReview({ fsmId });
    }
  }, [open])

  console.log(answers)

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h1" gutterBottom align="center">
          {'پاسخ‌های شما'}
        </Typography>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {answers?.map((widget) => (
            <>
              <Grid item key={widget.id} xs={12}>
                <Widget
                  disabled={isFetching}
                  widget={widget}
                  viewMode={true}
                />
                <Divider style={{ marginTop: 20 }} />
              </Grid>
            </>
          ))}
        </Grid>

      </DialogContent>

      <DialogActions>
        <Grid item xs={12}>
          <Button onClick={() => handleClose()} fullWidth variant="contained" color="secondary">
            {'فهمیدم'}
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.workshop.isFetching,
  answers: state.workshop.answers,
});

export default connect(mapStateToProps, {
  getAnswersForReview: getAnswersForReviewAction,
})(Index);
