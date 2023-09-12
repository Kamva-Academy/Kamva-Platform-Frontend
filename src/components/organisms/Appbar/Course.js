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

  const { programId } = useParams();

  const logoButton = <EventLogoButton image={event?.cover_page} name={event?.name} programId={programId} />;
  const eventButton = <DashboardButton name={event?.name} to={`/program/${programId}/`} />;
  const FSMsButton = <DashboardButton name={'کارگاه‌ها'} to={`/program/${programId}/`} />;
  const backButton = <DashboardButton name={'بازگشت به دوره‌ها'} to={'/programs/'} />;
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