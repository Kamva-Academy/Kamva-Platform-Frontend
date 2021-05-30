import React from 'react';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';
import LogoutButton from './components/LogoutButton';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  const eventsButton = <DashboardButton name={'رویدادها'} to={'/events/'} />;
  const workshopButton = <DashboardButton name={'کارگاه‌ها'} to={'/workshops/'} />;
  const logoutButton = <LogoutButton />;
  const Avatar = <AvatarComponent />;

  return {
    desktopLeftItems: [logoutButton, Avatar],
    desktopRightItems: [logoButton, eventsButton, workshopButton],
    mobileLeftItems: [logoButton],
    mobileRightItems: [],
    mobileMenuListItems: [eventsButton, workshopButton],
  };
};

export default DashboardItems;