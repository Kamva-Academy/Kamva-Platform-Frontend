import {
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import WorkshopCard from 'components/organisms/cards/WorkshopCardForMentors';
import CreateWorkshopDialog from 'components/organisms/dialogs/CreateWorkshopDialog';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';
import {
  getEventWorkshopsAction,
} from 'redux/slices/events';
import { addMentorToWorkshopAction } from 'redux/slices/events';

function Index({
  getEventWorkshops,
  workshopsCount,
  allEventWorkshops,
}) {
  const { programId } = useParams();
  const [openCreateWorkshopDialog, setOpenCreateWorkshopDialog] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getEventWorkshops({  programId, pageNumber });
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

        <Grid container spacing={2}
          alignItems='stretch'
          margin='10px 5px'
          justifyContent="center"
          sx={(theme) => ({
            height: '100%',
            justifyContent: 'start',
            [theme.breakpoints.down('sm')]: {
              justifyContent: 'center',
              marginRight: "0px",
            },
          })}>
          {allEventWorkshops?.map((workshop) => (
            <Grid container item xs={12} sm={6} md={4} key={workshop.id} alignItems='center' justifyContent='center'>
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
              count={Math.ceil(workshopsCount / ITEMS_PER_PAGE_NUMBER)}
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
  allEventWorkshops: state.events.workshops,
});

export default connect(mapStateToProps, {
  addMentorToWorkshop: addMentorToWorkshopAction,
  getEventWorkshops: getEventWorkshopsAction,
})(Index);
