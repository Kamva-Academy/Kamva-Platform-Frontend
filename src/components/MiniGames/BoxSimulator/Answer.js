import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  leftItem: {
    marginRight: 'auto',
  },
  paper: {
    width: '100%',
  },
}));

const Answer = ({
  showAnswer,
  isCorrect,
  reset,
  answer,
  total,
  onlineMode,
  goNext,
  finishNext,
}) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      alignItems="stretch"
      justify="space-between"
      xs={6}
      direction="column"
      spacing={2}>
      <Grid item>
        {(onlineMode || showAnswer) && (
          <Paper className={classes.paper}>
            <List>
              <ListItem>
                <Typography className={classes.leftItem}>
                  {answer.optimum}
                </Typography>
                <Typography align="right">Optimum</Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography className={classes.leftItem}>{total}</Typography>
                <Typography align="right">Total Time</Typography>
              </ListItem>
              <Divider />
              <ListItem>
                <Typography className={classes.leftItem}>
                  {Math.floor((total / answer.optimum) * 100) / 100}
                </Typography>
                <Typography align="right">Total Time / Optimum</Typography>
              </ListItem>
            </List>
          </Paper>
        )}
      </Grid>
      {onlineMode ? (
        <Grid item>
          {finishNext ? (
            <Typography variant="h3" align="center">
              پایان
            </Typography>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={goNext}>
              برو به دست بعدی
            </Button>
          )}
        </Grid>
      ) : isCorrect ? (
        <Grid item>
          <Typography variant="h3" align="center">
            درست گذاشتی :)
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item>
            <Typography variant="h3" align="center">
              درست نچیدی :(
            </Typography>
          </Grid>
          <Grid item>
            <Button
              disabled={showAnswer}
              variant="outlined"
              color="primary"
              fullWidth
              onClick={reset}>
              تلاش مجدد
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Answer;
