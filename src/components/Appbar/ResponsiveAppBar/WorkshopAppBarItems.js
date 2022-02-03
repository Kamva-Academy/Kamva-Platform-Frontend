import React from 'react';
import { useParams } from 'react-router-dom'

import UserAvatar from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import JitsiButton from './components/JitsiButton';
import JitsiMicButton from './components/JitsiMicButton';
import MentorButton from './components/MentorButton';
import TeamAvatar from './components/UsersAvatar';
import WhiteboardButton from './components/WhiteboardButton';

const WorkshopAppBarItems = ({ workshop, isMentor }) => {
  const { eventId } = useParams();
  const jitsiButton = <JitsiButton />;
  // todo: return to its event, not all events!
  const backToEventButton = <DashboardButton name={'بازگشت به رویداد'} to={`/event/${eventId}/`} />;
  const jitsiMicButton = <JitsiMicButton />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const teamAvatar = <TeamAvatar />;
  const userAvatar = <UserAvatar />;

  const desktopLeftItems = [];
  const desktopRightItems = [];
  const mobileLeftItems = [];
  const mobileRightItems = [];
  const mobileMenuListItems = [backToEventButton];

  console.log("ismentor: ", isMentor)

  if (isMentor) {
    if (workshop?.fsm_p_type == 'Individual') {
      desktopRightItems.push(userAvatar);
    } else {
      desktopRightItems.push(teamAvatar);
    }
    desktopLeftItems.push([jitsiMicButton, jitsiButton]);
    desktopRightItems.push([whiteboardButton,]);
    mobileLeftItems.push([jitsiMicButton, jitsiButton]);
    mobileRightItems.push([whiteboardButton,]);
  } else {
    if (workshop?.fsm_p_type == 'Individual') {
      desktopRightItems.push(userAvatar);
    } else {
      desktopRightItems.push(teamAvatar);
    }
    if (workshop?.fsm_learning_type == 'Supervised') {
      desktopLeftItems.push([whiteboardButton, mentorButton]);
      desktopRightItems.push([jitsiMicButton, jitsiButton, backToEventButton]);
      mobileLeftItems.push([mentorButton, whiteboardButton]);
      mobileRightItems.push([jitsiMicButton, jitsiButton]);
    } else {
      desktopLeftItems.push(backToEventButton)
    }
  }

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default WorkshopAppBarItems;
