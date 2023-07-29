import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import WorkshopCard from 'components/organisms/cards/WorkshopCard';

export default function WorkshopGridItems({ eventId, workshops, isLoading }) {
  if (isLoading)
    return [...Array(3)].map((e, i) => (
      <Grid item key={i} xs={12} sm={6} lg={4}>
        <WorkshopCard isLoading={true} />
      </Grid>
    ));

  if (workshops.length > 0) {
    let tmpArr = [...workshops].sort((workshop1, workshop2) => workshop2.id - workshop1.id)
    return tmpArr.map((workshop) => (
      <Grid item key={workshop.id} xs={12} sm={6} lg={4}>
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
