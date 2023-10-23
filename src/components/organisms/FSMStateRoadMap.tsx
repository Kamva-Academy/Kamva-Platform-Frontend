import { Divider, Paper, Typography, Box, Collapse, IconButton } from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import RoadMapType1 from 'components/organisms/RoadMap/RoadMapType1';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import { getPlayerTakenPathAction, getFSMRoadmapAction } from 'redux/slices/Roadmap';
import { connect } from 'react-redux';
import { Link } from 'types/redux/Roadmap';

type FSMStateRoadMapPropsType = {
  currentNodeId: string;
  playerTakenPath: Link[];
  FSMRoadmap: Link[];
  playerId: number;
  fsmId: number;
  getPlayerTakenPath: any;
  getFSMRoadmap: any;
};

const FSMStateRoadMap: FC<FSMStateRoadMapPropsType> = ({
  currentNodeId,
  playerTakenPath,
  FSMRoadmap,
  playerId,
  fsmId,
  getPlayerTakenPath,
  getFSMRoadmap,
}) => {
  const [openRoadMap, setOpenRoadMap] = useState(true);

  useEffect(() => {
    getPlayerTakenPath({ player_id: playerId });
    getFSMRoadmap({ fsm_id: fsmId });
  }, [])

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
        <RoadMapType1 currentNodeId={currentNodeId} links={FSMRoadmap} highlighPath={playerTakenPath} />
      </Collapse>
    </Box>
  );
};


const mapStatesToProps = (state) => ({
  playerTakenPath: state.Roadmap.playerTakenPath,
  FSMRoadmap: state.Roadmap.FSMRoadmap,
});

export default connect(mapStatesToProps, {
  getPlayerTakenPath: getPlayerTakenPathAction,
  getFSMRoadmap: getFSMRoadmapAction,
})(FSMStateRoadMap);


