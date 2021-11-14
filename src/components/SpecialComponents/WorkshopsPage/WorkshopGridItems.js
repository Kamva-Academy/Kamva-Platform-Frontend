import { Grid } from '@material-ui/core';
import React from 'react';

import WorkshopCard from './WorkshopCard';

export default function WorkshopGridItems({ eventId, workshops, isLoading }) {
  if (isLoading)
    return [...Array(3)].map((e, i) => (
      <Grid item key={i}>
        <WorkshopCard isLoading={true} />
      </Grid>
    ));

  return workshops.map((workshop) => (
    <Grid item key={workshop.id} xs={12} sm={6} md={4}>
      <WorkshopCard eventId={eventId} workshop={workshop} />
    </Grid>
  ));
}
