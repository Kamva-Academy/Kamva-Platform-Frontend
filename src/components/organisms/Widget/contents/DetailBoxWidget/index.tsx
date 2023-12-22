import React, { Fragment, useState } from 'react';

import TinyPreview from 'components/tiny_editor/react_tiny/Preview';
import DetailBoxEditDialog from './EditDialog';
import Paper from 'components/template/Paper';
import { Box, Collapse, IconButton, Stack } from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

export { DetailBoxEditDialog };

const DetailBoxWidget = ({ title, details }) => {
  const [openRoadMap, setOpenRoadMap] = useState(false);

  return (
    <Fragment>
      <Stack direction={'row'}>
        <IconButton onClick={() => setOpenRoadMap(!openRoadMap)} sx={{ padding: 0, marginRight: 1, marginTop: -1 }}>
          <ArrowDropDownCircleIcon sx={{ transform: openRoadMap ? 'rotate(-180deg)' : null }} />
        </IconButton>
        <Box>
          <TinyPreview
            frameProps={{
              frameBorder: '0',
              scrolling: 'no',
              width: '100%',
            }}
            content={title}
          />
        </Box>
      </Stack>
      <Collapse in={openRoadMap}>
        <Paper paper={details} />
      </Collapse>
    </Fragment>
  );
};

export default DetailBoxWidget;
