import React from 'react';

import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';
import AvatarComponent from './components/Avatar';

const DashboardItems = () => {
  const logoButton = <LogoButton />;
  const eventsButton = <DashboardButton name={'رویدادها'} href={'/'} disabled />;
  const workshopsButton = <DashboardButton name={'کارگاه‌ها'} href={'/'} disabled />;
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
