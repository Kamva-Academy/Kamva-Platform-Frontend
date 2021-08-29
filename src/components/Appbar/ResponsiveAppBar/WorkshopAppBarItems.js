import React from 'react';

import JitsiButton from './components/JitsiButton';
import JitsiMicButton from './components/JitsiMicButton';
import MentorButton from './components/MentorButton';
import UsersAvatar from './components/UsersAvatar';
import WhiteboardButton from './components/WhiteboardButton';

const WorkshopAppBarItems = () => {
  const jitsiButton = <JitsiButton />;
  const jitsiMicButton = <JitsiMicButton />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const usersAvatar = <UsersAvatar />;
  return {
    desktopLeftItems: [whiteboardButton, mentorButton],
    desktopRightItems: [usersAvatar, jitsiMicButton, jitsiButton],
    mobileLeftItems: [jitsiMicButton, jitsiButton, mentorButton],
    mobileRightItems: [whiteboardButton],
    mobileMenuListItems: [],
  };
};

export default WorkshopAppBarItems;
