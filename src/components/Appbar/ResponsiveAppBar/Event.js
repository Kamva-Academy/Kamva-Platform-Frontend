import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import EventLogoButton from './components/EventLogoButton';
import LogoutButton from './components/LogoutButton';

const DashboardItems = ({ event }) => {

  useEffect(() => {
    if (event?.name) {
      document.title = `کاموا | ${event?.name}`;
    }
  }, [event?.name])

  const { eventId } = useParams();

  const logoButton = <EventLogoButton image={event?.cover_page} name={event?.name} eventId={eventId} />;
  const eventButton = <DashboardButton name={event?.name} to={`/event/${eventId}/`} />;
  const profileButton = <DashboardButton name={'پروفایل'} to={`/event/${eventId}/profile/`} />;
  const logoutButton = <LogoutButton />;
  const Avatar = <AvatarComponent />;

  return {
    desktopLeftItems: [logoutButton, Avatar],
    desktopRightItems: [logoButton, profileButton],
    mobileLeftItems: [Avatar],
    mobileRightItems: [],
    mobileMenuListItems: [eventButton, profileButton, logoutButton],
  };
};

export default DashboardItems;