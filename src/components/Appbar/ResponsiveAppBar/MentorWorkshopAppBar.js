import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'

import UserAvatar from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import ChatRoomButton from './components/ChatRoomButton';
import ReviewAnswersButton from './components/ReviewAnswersButton';
import TeamAvatar from './components/UsersAvatar';
import WhiteboardButton from './components/WhiteboardButton';
import { announceMentorDeparture } from '../../../parse/mentorsInRoom';

const WorkshopAppBarItems = ({ workshop, isMentor, mentorId }) => {

  useEffect(() => {
    if (workshop?.name) {
      document.title = workshop?.name;
    }
    return () => {
      document.title = 'کاموا';
    }
  }, [workshop?.name])

  const { eventId, fsmId } = useParams();
  const search = useLocation().search;
  let teamId = new URLSearchParams(search).get('teamId');
  const chatRoomButton = <ChatRoomButton />;
  const backToEventButton = <DashboardButton onClick={() => { announceMentorDeparture(teamId, mentorId) }} name={'بازگشت'} to={`/event/${eventId}/workshop/${fsmId}/manage/requests/`} />;
  const whiteboardButton = <WhiteboardButton />;
  const teamAvatar = <TeamAvatar />;
  const userAvatar = <UserAvatar />;

  const desktopLeftItems = [];
  const desktopRightItems = [];
  const mobileLeftItems = [];
  const mobileRightItems = [];
  const mobileMenuListItems = [];

  if (workshop?.fsm_p_type == 'Individual') {
    desktopRightItems.push(userAvatar);
  } else {
    desktopRightItems.push(teamAvatar);
  }
  desktopRightItems.push([chatRoomButton]);
  desktopLeftItems.push([whiteboardButton,]);
  desktopLeftItems.push([backToEventButton]);


  mobileRightItems.push([chatRoomButton]);
  mobileRightItems.push([whiteboardButton,]);

  mobileLeftItems.push(backToEventButton);

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default WorkshopAppBarItems;
