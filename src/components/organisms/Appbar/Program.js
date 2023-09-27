import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import ProgramLogoButton from './components/ProgramLogoButton';
import NotificationButton from './components/NotificationButton';

const DashboardItems = ({ event }) => {

  useEffect(() => {
    if (event?.name) {
      document.title = event.name;
    }
  }, [event])

  const { programId } = useParams();


  const notificationButton = <NotificationButton />;
  const logoButton = <ProgramLogoButton image={event?.cover_page} name={event?.name} programId={programId} />;
  const backButton = <DashboardButton name={'بازگشت به دوره‌ها'} to={'/programs/'} />;
  const Avatar = <AvatarComponent />

  return {
    desktopLeftItems: [notificationButton, Avatar],
    desktopRightItems: [logoButton, backButton],
    mobileLeftItems: [Avatar],
    mobileRightItems: [logoButton],
    mobileMenuListItems: [],
  };
};

export default DashboardItems;