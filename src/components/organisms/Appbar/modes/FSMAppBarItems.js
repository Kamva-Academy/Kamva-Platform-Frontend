import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'

import DashboardButton from '../components/DashboardButton';
import ChatRoomButton from '../components/ChatRoomButton';
import MentorButton from '../components/MentorButton';
import ReviewAnswersButton from '../components/ReviewAnswersButton';
import TeamAvatar from '../components/UsersAvatar';
import WhiteboardButton from '../components/WhiteboardButton';

const WorkshopAppBarItems = ({ workshop, isMentor }) => {

  useEffect(() => {
    if (workshop?.name) {
      document.title = workshop?.name;
    }
    return () => {
      document.title = 'کاموا';
    }
  }, [workshop?.name])

  const { programId } = useParams();
  const reviewAnswers = <ReviewAnswersButton />
  const chatRoomButton = <ChatRoomButton />;
  const backToEventButton = <DashboardButton name={'بازگشت'} to={`/program/${programId}/`} />;
  const whiteboardButton = <WhiteboardButton />;
  const mentorButton = <MentorButton />;
  const teamAvatar = <TeamAvatar />;

  const desktopLeftItems = [];
  const desktopRightItems = [];
  const mobileLeftItems = [];
  const mobileRightItems = [];
  const mobileMenuListItems = [];

  if (workshop?.first_state?.is_exam) {
    desktopLeftItems.push(reviewAnswers);
    mobileMenuListItems.push(reviewAnswers);
  }

  if (workshop?.fsm_p_type == 'Team') {
    desktopRightItems.push(teamAvatar);
  }

  if (workshop?.fsm_learning_type == 'Supervised') {
    desktopLeftItems.push([whiteboardButton, mentorButton]);
    desktopRightItems.push([chatRoomButton, backToEventButton]);
    mobileLeftItems.push([whiteboardButton, mentorButton]);
    mobileRightItems.push([chatRoomButton]);
    mobileMenuListItems.push(backToEventButton);
  } else {
    mobileLeftItems.push(backToEventButton);
    desktopLeftItems.push(backToEventButton)
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
