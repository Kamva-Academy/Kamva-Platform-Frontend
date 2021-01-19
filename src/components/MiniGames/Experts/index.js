import {
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Zoom,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import timeoutLoop from '../../../utils/timoutLoop';
import { faSeri } from '../../../utils/translateNumber';
import ChangeRoundDialog from './ChangeRoundDialog';
import getConfig from './config';
import ExpertGrid from './ExpertGrid';
import ShowAnswer from './ShowAnswer';
import upImage from './styles/3314612.svg';
import downImage from './styles/3314620.svg';
import businessmanImage from './styles/businessman.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  businessmanImage: {
    width: 200,
  },
  score: {
    position: 'absolute',
    background: '#4466dd',
    top: theme.spacing(5),
    right: theme.spacing(2),
    padding: theme.spacing(1, 2),
    color: 'white',
  },
  content: {
    position: 'relative',
    width: '100%',
    '&>div': {},
  },
  page: {
    position: 'absolute',
    top: 0,
    width: '100%',
    minHeight: 200,
  },
  backgroundImage: {
    width: '100%',
  },
}));

function Experts() {
  const classes = useStyles();
  const [running, setRunning] = useState(false);
  const [forecasting, setForecasting] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [config, setConfig] = useState({});
  const [answerType, setAnswerType] = useState('');
  const [round, setRound] = useState(0.5);

  const submit = (answer) => {
    setOpenAnswer(true);
    if (answer === config.answer) {
      setAnswerType({ result: 'success', type: config.answer });
    } else {
      setAnswerType({ result: 'failure', type: config.answer });
    }
    setConfig({
      ...config,
      experts: config.experts.map((expert) => ({
        ...expert,
        score:
          expert.forecast === config.answer ? expert.score + 1 : expert.score,
      })),
      score: answer === config.answer ? config.score + 1 : config.score,
    });
  };

  const handleCloseBackdrop = () => {
    setRunning(false);
    setOpenAnswer(false);
    if (config.day === config.end - 1) {
      setRound(round + 0.5);
    } else {
      setConfig({
        ...config,
        experts: config.experts.map((expert) => ({ ...expert, forecast: 0 })),
        day: config.day + 1,
      });
    }
    setAnswerType('');
  };

  useEffect(() => {
    if (round === 0.9) {
      setConfig(getConfig({ count: 16, end: 8 }));
      setRound(1);
    } else if (round === 1.9) {
      setConfig(getConfig({ count: 16, end: 25, bestErrors: 1 }));
      setRound(2);
    }
  }, [round]);

  useEffect(() => {
    if (running) {
      const answer = Math.random() > 0.5 ? 1 : -1;
      setForecasting(true);
      timeoutLoop(config.experts.length, 100, function (i) {
        const newExperts = [...config.experts];
        if (config.bestExpert === i) {
          if (config.bestExpertErrors.includes(config.day)) {
            newExperts[i].forecast = -answer;
          } else {
            newExperts[i].forecast = answer;
          }
        } else {
          newExperts[i].forecast = Math.random() > 0.5 ? 1 : -1;
        }

        setConfig({
          ...config,
          experts: newExperts,
        });
        if (i === config.experts.length - 1) {
          setConfig({ ...config, answer });
          setForecasting(false);
        }
      });
    }
  }, [running]);

  return (
    <Container className={classes.root}>
      <Paper className={classes.score}>
        <Typography variant="h6" align="center">
          امتیاز: {config.score}
        </Typography>
      </Paper>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={4}>
        <Grid item container alignItems="center" justify="center" spacing={1}>
          <Grid item>
            <Typography variant="h2" align="center" gutterBottom>
              {`روز ${faSeri(config.day)}`}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{`(از ${config.end} روز)`}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ width: '100%' }}>
          <div className={classes.content}>
            <Grid
              container
              alignItems="stretch"
              justify="center"
              spacing={2}
              className={classes.page}
              style={{ zIndex: running ? 1 : 0 }}>
              <Grid
                item
                container
                justify="space-evenly"
                direction="column"
                xs={4}
                style={{ position: 'relative' }}
                spacing={1}>
                <Zoom in={running}>
                  <img
                    src={downImage}
                    alt="down"
                    className={classes.backgroundImage}
                  />
                </Zoom>
                <div style={{ position: 'absolute', top: 15 }}>
                  <Grid container spacing={1}>
                    <ExpertGrid
                      experts={config.experts}
                      zoomIn={running}
                      forecast={-1}
                    />
                  </Grid>
                </div>
                <Zoom in={running}>
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth
                    disabled={forecasting}
                    onClick={() => submit(-1)}>
                    ارزون می‌شه
                  </Button>
                </Zoom>
              </Grid>

              <Grid
                item
                container
                xs={4}
                alignItems="center"
                justify="center"
                spacing={1}>
                <ExpertGrid experts={config.experts} zoomIn={running} />
              </Grid>
              <Grid
                item
                container
                justify="space-evenly"
                direction="column"
                xs={4}
                style={{ position: 'relative' }}
                spacing={1}>
                <Zoom in={running}>
                  <img
                    src={upImage}
                    alt="up"
                    className={classes.backgroundImage}
                  />
                </Zoom>
                <div style={{ position: 'absolute', top: 15 }}>
                  <ExpertGrid
                    experts={config.experts}
                    zoomIn={running}
                    forecast={1}
                  />
                </div>
                <Zoom in={running}>
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth
                    disabled={forecasting}
                    onClick={() => submit(1)}>
                    گرون می‌شه
                  </Button>
                </Zoom>
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
              spacing={2}
              className={classes.page}
              style={{ zIndex: running ? 0 : 1 }}>
              <Zoom in={!running}>
                <Grid item>
                  <img
                    src={businessmanImage}
                    alt="businessman"
                    className={classes.businessmanImage}
                  />
                </Grid>
              </Zoom>
              <Zoom in={!running}>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={() => setRunning(true)}>
                    بزن بریم
                  </Button>
                </Grid>
              </Zoom>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <ShowAnswer
        open={openAnswer}
        handleClose={handleCloseBackdrop}
        answer={answerType}
      />
      <ChangeRoundDialog
        round={round}
        handleClose={() => setRound(round + 0.4)}
        score={config.score}
      />
    </Container>
  );
}

export default Experts;
