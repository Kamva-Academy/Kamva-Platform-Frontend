import { Toolbar } from '@mui/material';
import Container from '@mui/material/Container';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { initParseServer } from 'parse/init';
import ResponsiveAppBar from 'components/organisms/Appbar';
import FSMStateTemplate from 'components/template/FSMStateTemplate';
import { createTeamState, getChangeTeamStateSubscription, getTeamState } from '../parse/team';
import {
  enterWorkshopAction,
  mentorGetCurrentStateAction,
  changeOpenChatRoomAction,
} from 'redux/slices/currentState';
import {
  addNotificationAction,
} from 'redux/slices/notifications';
import {
  getOneWorkshopAction,
} from 'redux/slices/workshop';
import { addMentorToRoom, updateMentorTime } from '../parse/mentorsInRoom';
import DraggableChatRoom from '../components/Jitsi/DraggableChatRoom';

var moment = require('moment');

export const StatePageContext = React.createContext();

const Workshop = ({
  fsmState,
  needUpdateState,
  paperId,
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
    initParseServer();
  }, []);

  // useEffect(() => {
  //   let updateInterval
  //   if (!mentorAdded && isMentor && readyToAddMentor) {
  //     addMentorToRoom(teamId, mentorId.toString(), personsName)
  //     setMentorAdded(true)
  //     updateMentorTime(teamId, mentorId.toString())
  //     updateInterval = setInterval(() => { updateMentorTime(teamId, mentorId.toString()) }, 10000)
  //   }

  //   return (
  //     () => {
  //       if (updateInterval) {
  //         clearInterval(updateInterval)
  //       }
  //     }
  //   )
  // }, [isMentor, readyToAddMentor])

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

  useEffect(getCurrentStateIfNeed, [needUpdateState]);

  const [parseTeamState, setParseTeamState] = useState(null);

  const onUpdateStateFromParse = (teamState) =>
    setParseTeamState(teamState.get('paperId'));

  // useEffect(() => {
  //   if (!fsmState?.id || !parseTeamState) return;
  //   if (+parseTeamState !== +fsmState.id) {
  //     if (isMentor) {
  //       addNotification({
  //         type: 'info',
  //         message: 'یکی از دانش‌آموزان مکان گروه رو جا‌به‌جا کرد!',
  //       });
  //       mentorGetCurrentState({ id: playerId });
  //     } else {
  //       addNotification({
  //         type: 'info',
  //         message: 'جابه‌جا شدید!',
  //       });
  //       enterWorkshop({ eventId, fsmId });
  //     }
  //   }
  // }, [parseTeamState]);

  useEffect(() => {
    if (!teamId || !fsmState) return;
    const subscribe = async (teamId) => {
      const teamState = await getTeamState(teamId)
      if (!teamState) {
        await createTeamState(teamId, fsmState.id.toString(), fsmState.name, moment().format('HH:mm:ss'))
      }
      const subscriber = await getChangeTeamStateSubscription({
        uuid: teamId,
      });
      subscriber.on('create', onUpdateStateFromParse);
      subscriber.on('update', onUpdateStateFromParse);
      subscriberRef.current = subscriber;
    }
    subscribe(teamId);
    return () => {
      subscriberRef.current?.unsubscribe();
    }
  }, [teamId, fsmState]);

  return (
    <StatePageContext.Provider
      value={{ fsmId, paperId, playerId, teamId, isMentor, myTeam, teamRoom }}>
      <Container component="main"
        sx={{
          background: '#F7F9FC',
          minHeight: '100vh',
          paddingBottom: 4,
        }}>
        <ResponsiveAppBar mode={isMentor ? "MENTOR_FSM" : "FSM"} />
        <Toolbar id="back-to-top-anchor" />
        {fsmState &&
          <FSMStateTemplate state={fsmState} />
        }
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
  fsmState: state.currentState.fsmState,
  needUpdateState: state.currentState.needUpdateState,
  workshopId: state.currentState.workshopId,
  // paperId: ownProps.match?.params?.paperId,
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
