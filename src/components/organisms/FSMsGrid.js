import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import WorkshopCard from 'components/organisms/cards/WorkshopCard';

function FSMsGrid({ programId, workshops, isLoading }) {

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(3)].map((e, i) => (
          <Grid item key={i} xs={12} sm={6} lg={4}>
            <WorkshopCard isLoading={true} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (workshops.length > 0) {
    let tmpArr = [...workshops].sort((workshop1, workshop2) => workshop2.id - workshop1.id)
    return (
      <Grid container spacing={2}>
        {tmpArr.map((workshop) => (
          <Grid item key={workshop.id} xs={12} sm={6} lg={4}>
            <WorkshopCard programId={programId} workshop={workshop} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box my={4}>
      <Typography variant='h3' align='center'>
        {'هنوز کارگاه یا آزمونی وجود ندارد!'}
      </Typography>
    </Box>
  );

}

export default FSMsGrid;