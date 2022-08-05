import {
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import StatesTabbar from '../../components/organisms/StatesTabbar';
import {
  getAllWorkshopStatesInfoAction,
} from '../../redux/slices/workshop';
import {
  getOneStateAction,
} from '../../redux/slices/Paper';
import { State } from '../../types/models';
import { Box, Divider } from '@mui/material';
import EditHints from '../../components/organisms/EditHints';
import EditWidgets from '../../components/organisms/EditWidgets';


type DesignWorkshopPropsType = {
  getAllWorkshopStatesInfo: Function;
  getOneState: Function;
  papers: {};
  allStates: State[];
}

const DesignWorkshop: FC<DesignWorkshopPropsType> = ({
  getAllWorkshopStatesInfo,
  getOneState,
  allStates = [],
  papers,
}) => {
  const { fsmId } = useParams();
  const [tab, setTab] = React.useState(0);
  const currentState = papers[allStates[tab]?.id];

  useEffect(() => {
    getAllWorkshopStatesInfo({ fsmId });
  }, []);

  useEffect(() => {
    if (allStates[tab]) {
      getOneState({ stateId: allStates[tab].id });
    }
  }, [allStates, tab]);

  if (!allStates[tab]?.id) {
    return <></>
  }

  if (!currentState) return <></>

  const widgets = currentState.widgets;
  const hints = currentState.hints;
  
  return (
    <Stack spacing={2}>
      <StatesTabbar
        value={tab}
        setValue={setTab}
        tabs={allStates.map((state) => state.name)}
        fsmId={fsmId}
      />
      <EditWidgets {...currentState} />
      <EditHints hints={hints} stateId={currentState.id} />
    </Stack>
  );
};

const mapStateToProps = (state, ownProps) => ({
  allStates: state.workshop.allStates,
  papers: state.paper.papers,
});

export default connect(mapStateToProps, {
  getOneState: getOneStateAction,
  getAllWorkshopStatesInfo: getAllWorkshopStatesInfoAction,
})(DesignWorkshop);
