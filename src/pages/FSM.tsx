import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { initParseServer } from 'parse/init';
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
import { addMentorToRoom, updateMentorTime } from 'parse/mentorsInRoom';
import DraggableChatRoom from 'components/organisms/DraggableMeeting';
import { getOneEventInfoAction } from 'redux/slices/events';
import Layout from 'components/template/Layout';

var moment = require('moment');

export const StatePageContext = React.createContext<any>({});

const FSM = ({
  currentState,
  needUpdateState,
  paperId,
  studentPlayerId,
  myTeam,
  getOneWorkshop,
  enterWorkshop,
  getOneEventInfo,
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
  const { fsmId, programId } = useParams();
  const subscriberRef = useRef(null);
  const [mentorAdded, setMentorAdded] = useState(false)
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
    getOneWorkshop({ fsmId });
    getOneEventInfo({ programId });
  }, [])

  useEffect(() => {
    if (isMentor) {
      mentorGetCurrentState({ id: playerId });
    }
  }, [playerId, isMentor]);

  useEffect(() => {
    if (!isMentor) {
      enterWorkshop({ programId, fsmId });
    }
  }, [fsmId, isMentor]);

  const getCurrentStateIfNeed = () => {
    if (needUpdateState) {
      if (isMentor) {
        mentorGetCurrentState({ id: playerId });
      } else {
        enterWorkshop({ programId, fsmId });
      }
    }
  };

  useEffect(getCurrentStateIfNeed, [needUpdateState]);

  const [parseTeamState, setParseTeamState] = useState(null);

  const onUpdateStateFromParse = (teamState) =>
    setParseTeamState(teamState.get('paperId'));

  // useEffect(() => {
  //   if (!currentState?.id || !parseTeamState) return;
  //   if (+parseTeamState !== +currentState.id) {
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
  //       enterWorkshop({  programId, fsmId });
  //     }
  //   }
  // }, [parseTeamState]);

  useEffect(() => {
    if (!teamId || !currentState) return;
    const subscribe = async (teamId) => {
      const teamState = await getTeamState(teamId)
      if (!teamState) {
        await createTeamState(teamId, currentState.id.toString(), currentState.name, moment().format('HH:mm:ss'))
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
  }, [teamId, currentState]);

  useEffect(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, [currentState])

  if (!currentState || !workshop) return null;

  return (
    <Fragment>
      {workshop &&
        <Helmet>
          <title>{workshop.name}</title>
        </Helmet>
      }
      <StatePageContext.Provider value={{ fsmId, paperId, playerId, teamId, isMentor, myTeam, teamRoom }}>
        <Layout appbarMode={isMentor ? 'MENTOR_FSM' : 'FSM'}>
          <FSMStateTemplate state={currentState} playerId={parseInt(playerId)} />
        </Layout>
        {(workshop.fsm_p_type == 'Team' || workshop.fsm_learning_type == 'Supervised') &&
          <DraggableChatRoom open={openChatRoom} handleClose={() => changeOpenChatRoom()} />
        }
      </StatePageContext.Provider>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => ({
  openChatRoom: state.currentState.openChatRoom,
  teamRoom: state.currentState.teamRoom,
  myTeam: state.currentState.myTeam,
  currentState: state.currentState.fsmState,
  needUpdateState: state.currentState.needUpdateState,
  studentPlayerId: state.currentState.playerId,
  teamId: state.currentState.teamId,
  personsName: `${state.account.userInfo?.first_name} ${state.account.userInfo?.last_name}`,
  mentorId: state.account.userInfo?.id,
  workshop: state.workshop.workshop,
});

export default connect(mapStateToProps, {
  getOneWorkshop: getOneWorkshopAction,
  enterWorkshop: enterWorkshopAction,
  mentorGetCurrentState: mentorGetCurrentStateAction,
  addNotification: addNotificationAction,
  changeOpenChatRoom: changeOpenChatRoomAction,
  getOneEventInfo: getOneEventInfoAction,
})(FSM);
