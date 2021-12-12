import React from 'react';

import UserAvatar from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import JitsiButton from './components/JitsiButton';
import JitsiMicButton from './components/JitsiMicButton';
import MentorButton from './components/MentorButton';
import TeamAvatar from './components/UsersAvatar';
import WhiteboardButton from './components/WhiteboardButton';

const WorkshopAppBarItems = ({ workshop }) => {

  const jitsiButton = <JitsiButton />;
  // todo: return to its event, not all events!
  const backToEventsButton = <DashboardButton name={'بازگشت به رویدادها'} to={'/events/'} />;
  const jitsiMicButton = <JitsiMicButton />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const teamAvatar = <TeamAvatar />;
  const userAvatar = <UserAvatar />;

  const desktopLeftItems = [];
  const desktopRightItems = [];
  const mobileLeftItems = [];
  const mobileRightItems = [];
  const mobileMenuListItems = [backToEventsButton];

  if (workshop?.fsm_p_type == 'Individual') {
    desktopRightItems.push(userAvatar);
  } else {
    desktopRightItems.push(teamAvatar);
  }

  if (workshop?.fsm_learning_type == 'Supervised') {
    desktopLeftItems.push([whiteboardButton, mentorButton]);
    desktopRightItems.push([jitsiMicButton, jitsiButton, backToEventsButton]);
    mobileLeftItems.push([mentorButton, whiteboardButton]);
    mobileRightItems.push([jitsiMicButton, jitsiButton]);
  } else {
    desktopLeftItems.push(backToEventsButton)
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
