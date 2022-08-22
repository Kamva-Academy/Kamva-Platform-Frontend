import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'

import UserAvatar from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import ChatRoomButton from './components/ChatRoomButton';
import MentorButton from './components/MentorButton';
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
  const reviewAnswers = <ReviewAnswersButton />
  const chatRoomButton = <ChatRoomButton />;
  const backToEventButton = <DashboardButton onClick={()=> {announceMentorDeparture(teamId, mentorId)}} name={'بازگشت به عقب'} to={`/event/${eventId}/workshop/${fsmId}/manage`} />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const teamAvatar = <TeamAvatar />;
  const userAvatar = <UserAvatar />;

  const desktopLeftItems = [];
  const desktopRightItems = [];
  const mobileLeftItems = [];
  const mobileRightItems = [];
  const mobileMenuListItems = [];

  if (workshop?.first_state?.is_exam && !isMentor) {
    desktopLeftItems.push(reviewAnswers);
    mobileMenuListItems.push(reviewAnswers);
  }

  if (isMentor) {
    if (workshop?.fsm_p_type == 'Individual') {
      desktopRightItems.push(userAvatar);
    } else {
      desktopRightItems.push(teamAvatar);
    }
    desktopLeftItems.push([chatRoomButton]);
    desktopRightItems.push([whiteboardButton,]);
    mobileLeftItems.push([chatRoomButton]);
    mobileRightItems.push([whiteboardButton,]);
  } else {
    if (workshop?.fsm_p_type == 'Individual') {
      desktopRightItems.push(userAvatar);
    } else {
      desktopRightItems.push(teamAvatar);
    }
    if (workshop?.fsm_learning_type == 'Supervised') {
      desktopLeftItems.push([whiteboardButton, mentorButton]);
      desktopRightItems.push([chatRoomButton, backToEventButton]);
      mobileLeftItems.push([whiteboardButton, mentorButton]);
      mobileRightItems.push([chatRoomButton]);
    } else {
      desktopLeftItems.push(backToEventButton)
    }
  }


  mobileMenuListItems.push(backToEventButton);

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default WorkshopAppBarItems;
