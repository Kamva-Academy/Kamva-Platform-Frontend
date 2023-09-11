import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import EventLogoButton from './components/EventLogoButton';

const DashboardItems = ({ event }) => {

  useEffect(() => {
    if (event?.name) {
      document.title = event?.name;
    }
  }, [event?.name])

  const { eventId } = useParams();

  const logoButton = <EventLogoButton image={event?.cover_page} name={event?.name} eventId={eventId} />;
  const eventButton = <DashboardButton name={event?.name} to={`/event/${eventId}/`} />;
  const FSMsButton = <DashboardButton name={'کارگاه‌ها'} to={`/event/${eventId}/`} />;
  const backButton = <DashboardButton name={'بازگشت به دوره‌ها'} to={'/events/'} />;
  const Avatar = <AvatarComponent />

  return {
    desktopLeftItems: [backButton, Avatar],
    desktopRightItems: [logoButton, FSMsButton],
    mobileLeftItems: [Avatar],
    mobileRightItems: [],
    mobileMenuListItems: [eventButton, backButton],
  };
};

export default DashboardItems;