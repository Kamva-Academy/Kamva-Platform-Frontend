import { Grid, makeStyles, Paper, withWidth } from '@material-ui/core';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import configs from './configs';
import DragItem from './DragItem';
import Paragraph from './Paragraph';

const useStyles = makeStyles((theme) => ({
  dragItem: {
    display: 'inline-block',
    margin: theme.spacing(0.3, 0.5),
  },
  gridContainer: {
    padding: theme.spacing(1),
    maxHeight: '100vh',
  },
  gridItem: {},
  paper: {
    padding: theme.spacing(0.5, 0.2),
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
        }
      })
    )
  )
);

function CompleteCode({ mode = 0 }) {
  const classes = useStyles();
  const [code, setCode] = useState(configs[mode]);

  const drop = ({ paragraphIndex, lineIndex, itemIndex, option }) => {
    const newCode = { ...code };
    newCode.paragraphs[paragraphIndex].lines[lineIndex].items[
      itemIndex
    ].option = option;
    setCode(newCode);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid
        container
        spacing={1}
        className={classes.gridContainer}
        alignItems="center">
        <Grid item xs={12} sm={4} className={classes.gridItem}>
          <Paper className={classes.paper}>
            {code.options.map((option) => (
              <div
                key={option}
                className={classes.dragItem}
                style={{ direction: 'ltr' }}>
                <DragItem
                  text={option}
                  onDrop={(item) => drop({ ...item, option })}
                />
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.gridItem}>
          <Paper className={classes.paper} style={{ direction: 'ltr' }}>
            {code.paragraphs.map((paragraph, index) => (
              <Paragraph {...paragraph} key={index} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </DndProvider>
  );
}

export default withWidth()(CompleteCode);
