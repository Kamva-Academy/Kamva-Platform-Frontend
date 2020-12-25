import {
  AppBar,
  Button,
  Container,
  Grid,
  Hidden,
  makeStyles,
  Paper,
} from '@material-ui/core';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

import configs from './configs';
import DragItem from './DragItem';
import Paragraph from './Paragraph';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(0.5, 0.2),
  },
  dragItemsPaper: {
    padding: theme.spacing(0.5, 0.2),
    background: 'white',
    [theme.breakpoints.down('xs')]: {
      borderRadius: '10px 10px 0 0',
    },
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));

configs.forEach((config, configIndex) =>
  config.paragraphs.forEach((paragraph, paragraphIndex) =>
    paragraph.lines.forEach((line, lineIndex) =>
      line.items.forEach((item, itemIndex) => {
        if (typeof item !== 'string') {
          item.configIndex = configIndex;
          item.paragraphIndex = paragraphIndex;
          item.lineIndex = lineIndex;
          item.itemIndex = itemIndex;
          item.mode = 'E';
        }
      })
    )
  )
);

const DragItems = ({ options, drop }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.dragItemsPaper}>
      <Grid container spacing={1} alignItems="center" justify="center">
        {options.map((option) => (
          <Grid item key={option} style={{ direction: 'ltr' }}>
            <DragItem
              text={option}
              onDrop={(item) => drop({ ...item, option })}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

function CompleteCode({ mode = 0 }) {
  const classes = useStyles();
  const [code, setCode] = useState(configs[mode]);

  const drop = ({ paragraphIndex, lineIndex, itemIndex, option }) => {
    const newCode = { ...code };
    const item =
      newCode.paragraphs[paragraphIndex].lines[lineIndex].items[itemIndex];
    item.option = option;
    item.mode = 'N';
    setCode(newCode);
  };

  const checkAnswers = () => {
    const newCode = { ...code };
    newCode.paragraphs.forEach((paragraph) =>
      paragraph.lines.forEach((line) =>
        line.items.forEach((item) => {
          if (typeof item !== 'string') {
            if (item.option === -1) {
              item.mode = 'E';
            } else if (code.options[item.answer] === item.option) {
              item.mode = 'T';
            } else {
              item.mode = 'F';
            }
          }
        })
      )
    );
    setCode(newCode);
  };

  return (
    <DndProvider options={HTML5toTouch}>
      <Hidden smUp>
        <AppBar position="sticky" color="transparent">
          <DragItems options={code.options} drop={drop} />
        </AppBar>
      </Hidden>
      <Container className={classes.container}>
        <Grid container spacing={1} alignItems="stretch">
          <Hidden xsDown>
            <Grid
              item
              sm={4}
              className={classes.gridItem}
              style={{ maxHeight: '100vh' }}>
              <div style={{ position: 'sticky', top: 50 }}>
                <DragItems options={code.options} drop={drop} />
              </div>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={8} className={classes.gridItem}>
            <Paper className={classes.paper} style={{ direction: 'ltr' }}>
              {code.paragraphs.map((paragraph, index) => (
                <Paragraph {...paragraph} key={index} />
              ))}
            </Paper>
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={checkAnswers}>
          بررسی جواب
        </Button>
      </Container>
    </DndProvider>
  );
}

export default CompleteCode;
