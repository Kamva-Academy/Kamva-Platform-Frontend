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
import React, { useEffect, useState } from 'react'
import Graph from 'react-graph-network';

const useStyles = makeStyles((theme) => ({
  row1: {
    height: '85vh',
    backgroundColor: 'green'
  },

  row2: {
    height: '15vh',
    backgroundColor: 'yellow'
  },
}))


const Node = () => {
  return (
    <circle r={5} />
  )
}


const GraphPage = ({ }) => {
  const classes = useStyles();
  const [data, setData] = useState('');
  const [n, setN] = useState(10);
  const [p, setP] = useState(0.2);
  const [isNValid, setNValidation] = useState(true);
  const [isPValid, setPValidation] = useState(true);


  const checkAndSetN = (value) => {
    if (value < 1 || value > 30) {
      setNValidation(false);
    } else {
      setNValidation(true)
    }
    setN(value)
  }

  const checkAndSetP = (value) => {
    if (value < 0 || value > 1) {
      setPValidation(false);
    } else {
      setPValidation(true);
    }
    setP(value)
  }


  const generateNewGraph = () => {
    const newData = {
      nodes: [],
      links: [],
    };
    for (var i = 0; i < n; i++) {
      newData.nodes.push({ "id": i })
    }
    for (var i = 0; i < n; i++) {
      for (var j = i + 1; j < n; j++) {
        const probability = Math.random();
        if (probability < p) {
          newData.links.push({ "source": i, "target": j });
        }
      }
    }
    setData(newData);
  }

  console.log(n)

  return (
    <Container>
      <Grid container direction='column'>
        <Grid container item direction='row' className={classes.row1}>
          <Graph
            NodeComponent={Node}
            nodeDistance={1000}
            data={data}
            id="graph"
            zoomDepth={5}
            enableDrag={true}
          />
        </Grid>
        <Grid
          container item
          direction='row'
          justify='center'
          alignItems='center'
          className={classes.row2}
          spacing={2}>
          <Grid item>
            <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="contained"
            >
              <Button
                onClick={generateNewGraph}>
                یه‌دونه جدید بساز
              </Button>
              <Button>Two</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <TextField
              error={!isNValid}
              label="تعداد راس‌ها"
              type="number"
              variant="outlined"
              value={n}
              onChange={(e) => checkAndSetN(e.target.value)}
              helperText={isNValid ? '' : "تعداد راس‌ها باید حداقل یک و حداکثر ۳۰ باشد."}
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
              helperText={isPValid ? '' : "احتمال داده شده باید بین ۰ تا ۱ باشد."}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default GraphPage;