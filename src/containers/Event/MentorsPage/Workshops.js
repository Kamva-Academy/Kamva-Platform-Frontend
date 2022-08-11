import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import WorkshopCard from '../../../components/Cards/WorkshopCardForMentors';
import CreateWorkshopDialog from '../../../components/Dialog/CreateWorkshopDialog';



import {
  getEventWorkshopsAction,
} from '../../../redux/slices/events';
import { addMentorToWorkshopAction } from '../../../redux/slices/events';

function Index({
  addMentorToWorkshop,
  getEventWorkshops,

  workshopsCount,
  allEventWorkshops,
}) {
  const { eventId } = useParams();
  const [openCreateWorkshopDialog, setOpenCreateWorkshopDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getEventWorkshops({ eventId, pageNumber });
  }, [pageNumber]);

  return (
    <>
      <Grid
        container
        item
        spacing={2}
        alignItems="center"
        justify="center"
        direction="row">

        <Grid item container justifyContent='space-between' xs={12} spacing={2} style={{ marginTop: 2 }}>
          <Grid item>
            <Typography variant='h2'>
              {'کارگاه‌ها'}
            </Typography>
          </Grid>
          <Grid item>
            <Button variant='outlined' onClick={() => setOpenCreateWorkshopDialog(true)}>
              {'افزودن کارگاه جدید'}
            </Button>
          </Grid>
        </Grid>

        <Grid item container xs={12} justify="flex-start" spacing={2}>
          {allEventWorkshops?.map((workshop) => (
            <Grid item xs={12} sm={6} md={4} key={workshop.id}>
              <WorkshopCard {...workshop} />
            </Grid>
          ))}
        </Grid>

        <Grid item container>
          <Grid item>
            <Pagination
              variant="outlined"
              color="primary"
              shape='rounded'
              count={Math.ceil(workshopsCount / 12)}
              page={pageNumber}
              onChange={(e, value) => setPageNumber(value)}
            />
          </Grid>

        </Grid>
      </Grid>
      <CreateWorkshopDialog
        open={openCreateWorkshopDialog}
        handleClose={() => setOpenCreateWorkshopDialog(false)}
      />
    </>
  );
}
const mapStateToProps = (state) => ({
  workshopsCount: state.events.workshopsCount,
  allEventWorkshops: state.events.allEventWorkshops,
});

export default connect(mapStateToProps, {
  addMentorToWorkshop: addMentorToWorkshopAction,
  getEventWorkshops: getEventWorkshopsAction,
})(Index);
