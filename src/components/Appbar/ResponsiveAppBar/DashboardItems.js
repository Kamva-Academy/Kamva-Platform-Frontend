import React from 'react';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';
import LogoutButton from './components/LogoutButton';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  const eventsButton = <DashboardButton name={'رویدادها'} to={'/events/'} />;
  const workshopButton = <DashboardButton name={'کارگاه‌ها'} to={'/workshops/'} />;
  const profileButton = <DashboardButton name={'پروفایل'} to={'/profile/'} />;
  const logoutButton = <LogoutButton />;
  const Avatar = <AvatarComponent />;

  return {
    desktopLeftItems: [profileButton, logoutButton, Avatar],
    desktopRightItems: [logoButton, eventsButton],
    mobileLeftItems: [Avatar],
    mobileRightItems: [],
    mobileMenuListItems: [profileButton, eventsButton, logoutButton],
  };
};

export default DashboardItems;