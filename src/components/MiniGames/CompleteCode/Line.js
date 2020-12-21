import { Grid } from '@material-ui/core';
import React from 'react';

import DropArea from './DropArea';

function Line({ tab = 0, items }) {
  return (
    <Grid container spacing={1}>
      {[...Array(tab)].map((e, i) => (
        <Grid
          key={i}
          item
          style={{ minWidth: 15, opacity: 0.3, color: '#35a' }}>
          _
        </Grid>
      ))}

      {items.map((item, index) => (
        <Grid item key={index}>
          {typeof item === 'string' ? item : <DropArea item={item} />}
        </Grid>
      ))}
    </Grid>
  );
}

export default Line;
