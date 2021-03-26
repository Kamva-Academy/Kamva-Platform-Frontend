import React from 'react';

import JitsiButton from './components/JitsiButton';
import JitsiMicButton from './components/JitsiMicButton';
import MentorButton from './components/MentorButton';
import ScoreHistoryButton from './components/ScoreHistoryButton';
import UsersAvatar from './components/UsersAvatar';
import WhiteboardButton from './components/WhiteboardButton';

const WorkshopAppBarItems = () => {
  const jitsiButton = <JitsiButton />;
  const jitsiMicButton = <JitsiMicButton />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const usersAvatar = <UsersAvatar />;
  const scoreHistoryButton = <ScoreHistoryButton />;
  return {
    desktopLeftItems: [whiteboardButton, mentorButton],
    desktopRightItems: [
      usersAvatar,
      jitsiMicButton,
      jitsiButton,
      scoreHistoryButton,
    ],
    mobileLeftItems: [jitsiMicButton, jitsiButton, mentorButton],
    mobileRightItems: [whiteboardButton],
    mobileMenuListItems: [scoreHistoryButton],
  };
};

export default WorkshopAppBarItems;
