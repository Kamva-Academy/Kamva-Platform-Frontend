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
    <Grid item key={workshop.id}>
      <WorkshopCard eventId={eventId} workshop={workshop} />
    </Grid>
  ));
}
