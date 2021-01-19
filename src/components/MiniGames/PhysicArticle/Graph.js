import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  withWidth,
} from '@material-ui/core';
import React, { useState } from 'react';
import Graph from 'react-graph-network';

const useStyles = makeStyles(() => ({
  row1: {
    height: '85vh',
  },
}));

const initial_n = 15;
const initial_p = 0.3;

const generateNewGraph = (n, p) => {
  const newData = {
    nodes: [],
    links: [],
  };
  for (let i = 0; i < n; i++) {
    newData.nodes.push({ id: i });
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.random() < p) {
        newData.links.push({ source: i, target: j });
      }
    }
  }
  return newData;
};

const GraphTab = ({ width }) => {
  const classes = useStyles();
  const [data, setData] = useState(generateNewGraph(initial_n, initial_p));
  const [n, setN] = useState(initial_n);
  const [p, setP] = useState(initial_p);
  const [isNValid, setNValidation] = useState(true);
  const [isPValid, setPValidation] = useState(true);

  const checkAndSetN = (value) => {
    if (value < 1 || value > 30) {
      setNValidation(false);
    } else {
      setNValidation(true);
    }
    setN(value);
  };

  const checkAndSetP = (value) => {
    if (value < 0 || value > 1) {
      setPValidation(false);
    } else {
      setPValidation(true);
    }
    setP(value);
  };
  return (
    <Container>
      <Grid container direction="column">
        <Grid item className={classes.row1}>
          <Graph
            NodeComponent={() => <circle r={width === 'xs' ? 3 : 7} />}
            nodeDistance={width === 'xs' ? 300 : 1000}
            data={data}
            zoomDepth={2}
            enableDrag={true}
          />
        </Grid>
        <Grid
          item
          container
          direction="row-reverse"
          justify="center"
          alignItems="center"
          spacing={2}>
          <Grid item xs={4} md={3}>
            <TextField
              error={!isNValid}
              label="تعداد راس‌ها"
              type="number"
              variant="outlined"
              value={n}
              onChange={(e) => checkAndSetN(e.target.value)}
              fullWidth
              inputProps={{ className: 'ltr-input' }}
              helperText={
                !isNValid && 'تعداد راس‌ها باید حداقل یک و حداکثر ۳۰ باشد.'
              }
            />
          </Grid>
          <Grid item xs={4} md={3}>
            <TextField
              error={!isPValid}
              label="احتمال"
              type="number"
              variant="outlined"
              value={p}
              onChange={(e) => checkAndSetP(e.target.value)}
              fullWidth
              inputProps={{
                className: 'ltr-input',
                step: 0.1,
                min: 0,
                max: 1,
              }}
              helperText={!isPValid && 'احتمال داده شده باید بین ۰ تا ۱ باشد.'}
            />
          </Grid>
          <Grid item xs={4} md={3}>
            <Button
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="contained"
              disabled={!isNValid || !isPValid}
              onClick={() => setData(generateNewGraph(n, p))}
              fullWidth>
              {width === 'xs' ? 'بساز' : 'یه‌دونه جدید بساز'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withWidth()(GraphTab);
