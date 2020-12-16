import { Button, ButtonGroup, Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

import Chart from './Chart';
import Graph from './Graph';

const useStyles = makeStyles((theme) => ({
  tabButtons: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const GraphPage = () => {
  const classes = useStyles();
  const [tabNumber, setTabNumber] = useState(0);

  return (
    <Container>
      <div className={classes.tabButtons}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="outlined primary button group">
          <Button onClick={() => setTabNumber(0)}>گراف</Button>
          <Button onClick={() => setTabNumber(1)}>نمودار</Button>
        </ButtonGroup>
      </div>
      {tabNumber === 0 ? <Graph /> : <Chart />}
    </Container>
  );
};

export default GraphPage;
