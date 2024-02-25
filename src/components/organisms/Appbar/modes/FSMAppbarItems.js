import React from 'react';
import { useParams } from 'react-router-dom'

import ChatRoomButton from '../components/ChatRoomButton';
import MentorButton from '../components/MentorButton';
import ReviewAnswersButton from '../components/ReviewAnswersButton';
import TeamAvatar from '../components/UsersAvatar';
import WhiteboardButton from '../components/WhiteboardButton';
import ProgramLogoButton from '../components/ProgramLogoButton';
import ScoresDialogButton from '../components/ScoresDialogButton';

const FSMAppbarItems = ({ program, fsm }) => {
  const reviewAnswers = <ReviewAnswersButton />
  const chatRoomButton = <ChatRoomButton />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const teamAvatar = <TeamAvatar />;
  const programLogoButton = <ProgramLogoButton />;
  const scoresDialogButton = <ScoresDialogButton />

  const desktopLeftItems = [];
  const desktopRightItems = [programLogoButton];
  const mobileLeftItems = [];
  const mobileRightItems = [programLogoButton];
  const mobileMenuListItems = [];

  if (fsm?.first_state?.is_exam) {
    desktopLeftItems.push(reviewAnswers);
    mobileMenuListItems.push(reviewAnswers);
  }

  if (program?.show_scores) {
    desktopLeftItems.push(scoresDialogButton);
    mobileMenuListItems.push(scoresDialogButton);
  }

  if (fsm?.fsm_learning_type == 'Supervised') {
    desktopLeftItems.push(mentorButton);
    mobileLeftItems.push(mentorButton);
  }

  if (fsm?.fsm_learning_type == 'Supervised' || fsm?.fsm_p_type == 'Team') {
    desktopLeftItems.push(whiteboardButton, chatRoomButton);
    mobileRightItems.push(whiteboardButton, chatRoomButton);
  }

  if (fsm?.fsm_p_type == 'Team') {
    desktopLeftItems.push(teamAvatar);
  }

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default FSMAppbarItems;
