import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';

import Item from './Item';

const useStyles = makeStyles((theme) => ({
  box: {
    border: '3px solid #333',
    borderRadius: 4,
    overflow: 'hidden',
    minHeight: 40,
  },
  item: {
    padding: theme.spacing(0.2, 1),
    borderRadius: 3,
    background: '#fafafa',
    border: '2px solid #222',
    transition: '.2s',
    color: 'black',
    fontWeight: 500,
    '&:hover': {
      cursor: 'pointer',
      boxShadow: '-3px 3px 0 #222',
    },
  },
  firstItem: {
    borderLeft: '2px solid #333',
    height: '100%',
    minWidth: 40,
    padding: theme.spacing(1),
  },
  hidden: {
    opacity: 0.5,
    filter: 'blur(3px)',
  },
}));

const HorizontalBox = ({ items, onDrop, hidden }) => {
  const classes = useStyles();

  const sendItem = items[0];

  const staticItems = items.slice(1);

  return (
    <Grid
      container
      className={classes.box}
      direction="row-reverse"
      alignItems="center">
      <Grid xs={1} item className={classes.firstItem}>
        {sendItem && <Item num={sendItem} draggable onDrop={onDrop} />}
      </Grid>
      <Grid xs={10} item style={{ direction: 'ltr' }}>
        <div
          style={{ overflow: 'hidden', display: 'flex' }}
          className={hidden && classes.hidden}>
          {staticItems?.map((item, index) => (
            <div item key={index}>
              <Item num={!hidden && item} />
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default HorizontalBox;
