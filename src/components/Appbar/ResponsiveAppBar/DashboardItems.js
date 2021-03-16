import React from 'react';

import AvatarComponent from './components/Avatar';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  const eventsButton = <DashboardButton name={'رویدادها'} href={'/'} disabled />;
  const workshopsButton = <DashboardButton name={'کارگاه‌ها'} href={'/'} disabled iconImage='presentation.png' />;
  const infoButton = <DashboardButton name={'مشخصات'} href={'/information'} />;
  const Avatar = <AvatarComponent />;

  return {
    desktopLeftItems: [infoButton, Avatar],
    desktopRightItems: [logoButton, eventsButton, workshopsButton],
    mobileLeftItems: [logoButton,],
    mobileRightItems: [],
    mobileMenuListItems: [infoButton, eventsButton, workshopsButton],
  };
};

export default DashboardItems;
