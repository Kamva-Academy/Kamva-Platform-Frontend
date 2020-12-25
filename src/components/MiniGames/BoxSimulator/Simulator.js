import { Container, Grid, makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

import Answer from './Answer';
import HorizontalBox from './HorizontalBox';
import VerticalBox from './VerticalBox';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

function Simulator({ config, isOnline }) {
  const classes = useStyles();

  const [onlineMode, setOnlineMode] = useState(isOnline ? 1 : 0);

  const getConfig = useCallback(() => {
    return config[onlineMode ? onlineMode - 1 : 0];
  }, [config, onlineMode]);

  const [boxes, setBoxes] = useState([[], [], []]);
  const [items, setItems] = useState([]);
  const [errorCount, setErrorCount] = useState(0);

  const total = Math.max(...boxes.map((box) => box.reduce((a, b) => a + b, 0)));

  const isCorrect = total <= getConfig().answer.optimum;

  const reset = () => {
    setBoxes([[], [], []]);
    setItems([...getConfig().initItems]);
    setErrorCount(1);
  };

  const next = () => {
    setBoxes([[], [], []]);
    setOnlineMode(onlineMode + 1);
  };
  useEffect(() => {
    setItems([...getConfig().initItems]);
  }, [onlineMode]);

  const onDrop = (boxIndex) => {
    const newItems = items.splice(1);
    const droppedItem = items[0];
    const newBoxes = [...boxes];
    newBoxes[boxIndex].push(droppedItem);
    setItems(newItems);
    setBoxes(newBoxes);
  };

  const onItemChangeBox = (itemIndex, fromBoxIndex, toBoxIndex) => {
    const newBoxes = [...boxes];
    newBoxes[toBoxIndex].push(boxes[fromBoxIndex][itemIndex]);
    newBoxes[fromBoxIndex].splice(itemIndex, 1);
    setBoxes(newBoxes);
  };

  return (
    <Container className={classes.root} maxWidth="xs">
      <DndProvider options={HTML5toTouch}>
        <Grid container spacing={2} justify="center">
          {items.length === 0 && (
            <Answer
              answer={getConfig().answer}
              showAnswer={errorCount === 1}
              isCorrect={isCorrect}
              total={total}
              reset={reset}
              onlineMode={onlineMode}
              goNext={next}
              finishNext={onlineMode >= config.length}
            />
          )}
          {boxes.map((box, index) => (
            <Grid key={index} item container justify="center" xs={2}>
              <VerticalBox dropItem={index} items={box} />
            </Grid>
          ))}
        </Grid>
        <br />
        <br />
        <Grid container>
          <HorizontalBox items={items} onDrop={onDrop} hidden={onlineMode} />
        </Grid>
      </DndProvider>
    </Container>
  );
}

export default Simulator;
