import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import WorkshopCard from 'components/organisms/cards/WorkshopCard';
import useWidth from 'utils/UseWidth';

function FSMsGrid({ programId, fsms, isLoading }) {
  const width = useWidth();

  const numberOfSkeleton = width === 'sm' || width === 'md' ? 4 : 3;

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        {[...Array(numberOfSkeleton)].map((e, i) => (
          <Grid item key={i} xs={12} sm={6} lg={4}>
            <WorkshopCard isLoading={true} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (fsms.length > 0) {
    let tmpArr = [...fsms].sort((fsm1, fsm2) => fsm2.order_in_program - fsm1.order_in_program)
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