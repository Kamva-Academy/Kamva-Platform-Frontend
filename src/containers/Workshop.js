import { Fab, Toolbar } from '@mui/material';
import Container from '@mui/material/Container';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import StatePage from '../components/SpecialComponents/WorkshopPage/StatePage';
import { getChangeTeamStateSubscription } from '../parse/team';
import {
  enterWorkshopAction,
  mentorGetCurrentStateAction,
  changeOpenChatRoomAction,
} from '../redux/slices/currentState';
import {
  addNotificationAction,
} from '../redux/slices/notifications';
import {
  getOneWorkshopAction,
} from '../redux/slices/workshop';
import { addMentorToRoom, updateMentorTime } from './../parse/mentorsInRoom';
import DraggableChatRoom from '../components/Jitsi/DraggableChatRoom'

export const StatePageContext = React.createContext();

const Workshop = ({
  workshopState,
  needUpdateState,
  workshopId,
  stateId,
  studentPlayerId,
  myTeam,
  getOneWorkshop,
  enterWorkshop,
  mentorGetCurrentState,
  addNotification,
  // todo:
  teamRoom,
  openChatRoom,
  changeOpenChatRoom,
  personsName,
  mentorId,
  workshop,
  teamId,
}) => {
  const { fsmId } = useParams();
  const search = useLocation().search;
  let playerId = new URLSearchParams(search).get('playerId');
  teamId = new URLSearchParams(search).get('teamId') || teamId
  let isMentor = false;

  if (playerId) {
    isMentor = true;
  } else {
    playerId = studentPlayerId;
  }
  let readyToAddMentor = false
  if (teamId !== undefined && mentorId !== undefined && personsName !== undefined) {
    readyToAddMentor = true
  }
  const { eventId } = useParams();
  const subscriberRef = useRef(null);
  const [mentorAdded, setMentorAdded] = useState(false)

  useEffect(() => {
    let updateInterval
    if (!mentorAdded && isMentor && readyToAddMentor) {
      addMentorToRoom(teamId, mentorId.toString(), personsName)
      setMentorAdded(true)
      updateMentorTime(teamId, mentorId.toString())
      updateInterval = setInterval(() => { updateMentorTime(teamId, mentorId.toString()) }, 10000)
    }

    return (
      () => {
        if (updateInterval) {
          clearInterval(updateInterval)
        }
      }
    )
  }, [isMentor, readyToAddMentor])

  useEffect(() => {
    if (fsmId) {
      getOneWorkshop({ workshopId: fsmId });
    }
  }, [fsmId])

  useEffect(() => {
    if (isMentor) {
      mentorGetCurrentState({ id: playerId });
    }
  }, [playerId, isMentor]);

  useEffect(() => {
    if (!isMentor) {
      enterWorkshop({ eventId, fsmId });
    }
  }, [fsmId, isMentor]);

  const getCurrentStateIfNeed = () => {
    if (needUpdateState) {
      if (isMentor) {
        mentorGetCurrentState({ id: playerId });
      } else {
        enterWorkshop({ eventId, fsmId });
      }
    }
  };

  useEffect(getCurrentStateIfNeed, [needUpdateState, getCurrentStateIfNeed]);

  const [parseTeamState, setParseTeamState] = useState('');

  const onUpdateStateFromParse = (teamState) =>
    setParseTeamState(teamState.get('stateId'));

  useEffect(() => {
    if (!workshopState.id || !parseTeamState) return;
    if (+parseTeamState !== +workshopState.id) {
      if (isMentor) {
        addNotification({
          type: 'info',
          message: 'یکی از بچه‌ها مکان تیم رو جا‌به‌جا کرد!',
        });
        mentorGetCurrentState({ id: playerId });
      } else {
        addNotification({
          type: 'info',
          message: 'جابه‌جا شدید!',
        });
        enterWorkshop({ eventId, fsmId });
      }
    }
  }, [parseTeamState]);

  useEffect(() => {
    const subscribe = async (teamId) => {
      const subscriber = await getChangeTeamStateSubscription({
        uuid: teamId,
      });
      subscriber.on('create', onUpdateStateFromParse);
      subscriber.on('update', onUpdateStateFromParse);
      subscriberRef.current = subscriber;
    }
    if (teamId) {
      subscribe(teamId);
    }
    return () => {
      subscriberRef.current?.unsubscribe();
    }
  }, [teamId]);

  return (
    <StatePageContext.Provider
      value={{ fsmId, stateId, playerId, teamId, isMentor, myTeam, teamRoom }}>
      <Container component="main"
        sx={{
          background: '#F7F9FC',
          height: '100%'
        }}>

        <ResponsiveAppBar mode="WORKSHOP" />
        <Toolbar id="back-to-top-anchor" />
        <StatePage state={workshopState} />
        {/* <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop> */}
      </Container>
      {(workshop?.fsm_p_type == 'Team' || workshop?.fsm_learning_type == 'Supervised') &&
        <DraggableChatRoom open={openChatRoom} handleClose={() => changeOpenChatRoom()} />
      }
    </StatePageContext.Provider>
  );
};

const mapStateToProps = (state, ownProps) => ({
  openChatRoom: state.currentState.openChatRoom,
  teamRoom: state.currentState.teamRoom,
  myTeam: state.currentState.myTeam,

  workshopState: state.currentState.state,
  needUpdateState: state.currentState.needUpdateState,
  workshopId: state.currentState.workshopId,
  // stateId: ownProps.match?.params?.stateId,
  studentPlayerId: state.currentState.playerId,
  teamId: state.currentState.teamId,
  personsName: `${state.account.userAccount?.first_name} ${state.account.userAccount?.last_name}`,
  mentorId: state.account.userAccount?.id,
  workshop: state.workshop.workshop,
});

export default connect(mapStateToProps, {
  getOneWorkshop: getOneWorkshopAction,
  enterWorkshop: enterWorkshopAction,
  mentorGetCurrentState: mentorGetCurrentStateAction,
  addNotification: addNotificationAction,
  changeOpenChatRoom: changeOpenChatRoomAction,
})(Workshop);
