import { Divider, Paper, Typography, Box, Collapse, IconButton } from '@mui/material';
import React, { useState } from 'react';
import RoadMapType1 from 'components/organisms/RoadMap/RoadMapType1';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

const FSMStateRoadMap = ({ currentNodeId, links, highlighPath = [] }) => {
  const [openRoadMap, setOpenRoadMap] = useState(true);

  return (
    <Box component={Paper}>
      <Typography variant='h4' padding={1}>
        <IconButton onClick={() => setOpenRoadMap(!openRoadMap)}>
          <ArrowDropDownCircleIcon sx={{ transform: openRoadMap ? 'rotate(-180deg)' : null }} />
        </IconButton>
        {'نقشه راه'}
      </Typography>
      <Collapse in={openRoadMap}>
        <Divider />
        <RoadMapType1 currentNodeId={currentNodeId} links={links} highlighPath={highlighPath} />
      </Collapse>
    </Box>
  );
};



export default FSMStateRoadMap;
