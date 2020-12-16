import {
  Badge,
  Button,
  ButtonGroup,
  Container,
  Fab,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  TextField,
  Toolbar,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Graph from 'react-graph-network';

const useStyles = makeStyles((theme) => ({
  row1: {
    height: '85vh',
  },

  row2: {
    height: '15vh',
  },
}));

const Node = () => {
  return <circle r={7} />;
};

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
      const probability = Math.random();
      if (probability < p) {
        newData.links.push({ source: i, target: j });
      }
    }
  }
  return newData;
};

const GraphTab = () => {
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
    <>
      <Grid container direction="column">
        <Grid container item direction="row" className={classes.row1}>
          <Graph
            NodeComponent={Node}
            nodeDistance={1000}
            data={data}
            id="graph"
            zoomDepth={1}
            enableDrag={true}
          />
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.row2}
          spacing={2}>
          <Grid item>
            <Button
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="contained"
              disabled={!isNValid || !isPValid}
              onClick={() => setData(generateNewGraph(n, p))}>
              یه‌دونه جدید بساز
            </Button>
          </Grid>
          <Grid item>
            <TextField
              error={!isNValid}
              label="تعداد راس‌ها"
              type="number"
              variant="outlined"
              value={n}
              onChange={(e) => checkAndSetN(e.target.value)}
              helperText={
                isNValid ? '' : 'تعداد راس‌ها باید حداقل یک و حداکثر ۳۰ باشد.'
              }
            />
          </Grid>
          <Grid item>
            <TextField
              error={!isPValid}
              label="احتمال"
              type="number"
              variant="outlined"
              value={p}
              onChange={(e) => checkAndSetP(e.target.value)}
              helperText={
                isPValid ? '' : 'احتمال داده شده باید بین ۰ تا ۱ باشد.'
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default GraphTab;
