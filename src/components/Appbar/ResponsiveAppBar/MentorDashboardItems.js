import React from 'react';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';
import LogoutButton from './components/LogoutButton';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  const dashboard = <DashboardButton name={'داشبورد'} href={'/mentor'} />;
  const logoutButton = <LogoutButton />;
  const Avatar = <AvatarComponent />;

  return {
    desktopLeftItems: [logoutButton, Avatar],
    desktopRightItems: [logoButton, dashboard,],
    mobileLeftItems: [logoButton,],
    mobileRightItems: [],
    mobileMenuListItems: [dashboard,],
  };
};

export default DashboardItems;
