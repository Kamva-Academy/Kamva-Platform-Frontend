import React from 'react';

import DashboardButton from './components/DashboardButton';
import JitsiButton from './components/JitsiButton';
import JitsiMicButton from './components/JitsiMicButton';
import MentorButton from './components/MentorButton';
import UsersAvatar from './components/UsersAvatar';
import WhiteboardButton from './components/WhiteboardButton';

const WorkshopAppBarItems = () => {
  const jitsiButton = <JitsiButton />;
  // todo: return to its event, not all events!
  const backToEventsButton = <DashboardButton name={'بازگشت به رویدادها'} to={'/events/'} />;
  const jitsiMicButton = <JitsiMicButton />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const usersAvatar = <UsersAvatar />;

  return {
    desktopLeftItems: [whiteboardButton, mentorButton],
    desktopRightItems: [usersAvatar, jitsiMicButton, jitsiButton, backToEventsButton],
    mobileLeftItems: [whiteboardButton, mentorButton],
    mobileRightItems: [jitsiMicButton, jitsiButton],
    mobileMenuListItems: [backToEventsButton],
  };
};

export default WorkshopAppBarItems;
