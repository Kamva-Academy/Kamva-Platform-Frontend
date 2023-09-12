import React, { useEffect } from 'react';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';

const DashboardItems = () => {

  useEffect(() => {
    document.title = 'کاموا';
    return () => {
      document.title = 'کاموا';
    }
  }, [])

  const logoButton = <LogoButton />;
  const eventsButton = <DashboardButton name={'دوره‌‌ها'} to={'/programs/'} />;
  const articlesButton = <DashboardButton name={'مقاله‌ها'} to={'/articles/'} />;
  const workshopButton = <DashboardButton name={'کارگاه‌ها'} to={'/fsms/'} />;
  const Avatar = <AvatarComponent />;

  return {
    desktopLeftItems: [Avatar],
    desktopRightItems: [logoButton, eventsButton, articlesButton],
    mobileLeftItems: [Avatar],
    mobileRightItems: [],
    mobileMenuListItems: [eventsButton, articlesButton],
  };
};

export default DashboardItems;