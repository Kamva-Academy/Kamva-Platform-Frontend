import React from 'react';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  const eventsButton = <DashboardButton name={'رویدادها'} href={'/events'} />;
  const workshopsButton = <DashboardButton name={'کارگاه‌ها'} href={'/'} disabled iconImage='presentation.png' />;
  const profileButton = <DashboardButton name={'مشخصات'} href={'/'} disabled iconImage='user.png' />;
  const signoutButton = <DashboardButton name={'خروج'} href={'/'} iconImage='signout.png' />;
  const Avatar = <AvatarComponent />;

  return {
    desktopLeftItems: [Avatar],
    desktopRightItems: [logoButton, eventsButton,],
    mobileLeftItems: [logoButton,],
    mobileRightItems: [],
    mobileMenuListItems: [eventsButton,],
  };
};

export default DashboardItems;
