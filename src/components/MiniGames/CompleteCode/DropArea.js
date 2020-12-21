import { Grid } from '@material-ui/core';
import React from 'react';
import { useDrop } from 'react-dnd';

function DropArea({ item }) {
  const [_, dropRef] = useDrop({
    accept: 'CARD',
    drop: () => ({ item }),
  });
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      ref={dropRef}
      style={{
        border: '1px dotted black',
        minWidth: 50,
        height: 20,
        background: item.option ? '#aaddee' : 'white',
        padding: '1px 3px',
      }}>
      <Grid item>{item.option}</Grid>
    </Grid>
  );
}

export default DropArea;
