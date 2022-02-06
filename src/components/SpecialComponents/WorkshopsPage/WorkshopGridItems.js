import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';

import WorkshopCard from '../../Cards/WorkshopCard';

export default function WorkshopGridItems({ eventId, workshops, isLoading }) {
  if (isLoading)
    return [...Array(3)].map((e, i) => (
      <Grid item key={i} xs={12} sm={6} md={4}>
        <WorkshopCard isLoading={true} />
      </Grid>
    ));

  if (workshops.length > 0) {
    return workshops.map((workshop) => (
      <Grid item key={workshop.id} xs={12} sm={6} md={4}>
        <WorkshopCard eventId={eventId} workshop={workshop} />
      </Grid>
    ));
  } else {
    return (
      <Grid item xs={12}>
        <Box my={4}>
          <Typography variant='h3' align='center'>
            {'هنوز کارگاه یا آزمونی وجود ندارد!'}
          </Typography>
        </Box>
      </Grid>
    );
  }
}
