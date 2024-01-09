import { Box, Stack, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import FSMsGrid from 'components/organisms/FSMsGrid';
import {
  getEventWorkshopsAction,
  getOneEventInfoAction,
} from 'redux/slices/events';
import Layout from 'components/template/GeneralLayout';
import ProgramPageSidebar from 'components/organisms/ProgramPageSidebar';
import { ITEMS_PER_PAGE_NUMBER } from 'configs/Constants';

function Program({
  workshops,
  workshopsCount,
  event,
  isLoading,
  getEventWorkshops,
  getOneEventInfo,
}) {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getOneEventInfo({ programId });
  }, []);

  useEffect(() => {
    if (event?.is_user_participating != undefined && !event?.is_user_participating) {
      navigate(`/program/${programId}/registration/`);
    }
  }, [event])

  useEffect(() => {
    getEventWorkshops({ programId, pageNumber });
  }, [pageNumber]);

  // todo: handle event not found
  // todo: handle in a better way  
  if (event?.is_user_participating == undefined) {
    return (<Layout appbarMode='PROGRAM'></Layout>)
  }

  return (
    <Layout appbarMode='PROGRAM'>
      <Stack width={'100%'} direction={{ xs: 'column', sm: 'row' }} alignItems='flex-start' spacing={2}>
        <Box width={{ xs: '100%', sm: 180, md: 300 }} position={{ xs: null, sm: 'sticky' }} top={16}>
          <ProgramPageSidebar />
        </Box>
        <Stack width={'100%'} spacing={2}>
          <Typography component="h1" fontWeight={700} fontSize={32} gutterBottom>
            {'کارگاه‌ها'}
          </Typography>
          <Stack>
            <FSMsGrid
              programId={programId}
              fsms={workshops}
              isLoading={isLoading}
            />
          </Stack>
          <Pagination
            variant="outlined"
            color="primary"
            shape='rounded'
            count={Math.ceil(workshopsCount / ITEMS_PER_PAGE_NUMBER)}
            page={pageNumber}
            onChange={(e, value) => setPageNumber(value)}
          />
        </Stack>
      </Stack>
    </Layout>
  );
}

const mapStateToProps = (state, ownProps) => ({
  workshops: state.events.workshops,
  isLoading: state.events.getWorkshopsLoading,
  event: state.events.event,
  workshopsCount: state.events.workshopsCount,
});

export default connect(mapStateToProps, {
  getEventWorkshops: getEventWorkshopsAction,
  getOneEventInfo: getOneEventInfoAction,
})(Program);
