import React from 'react';

import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';


const DashboardItems = () => {
  const logoButton = <LogoButton />;
  const eventsButton = <DashboardButton name={'رویدادها'} href={'/'} disabled />;
  const workshopsButton = <DashboardButton name={'کارگاه‌ها'} href={'/'} disabled />;
  const infoButton = <DashboardButton name={'مشخصات'} href={'/information'} />;

  return {
    desktopLeftItems: [infoButton],
    desktopRightItems: [logoButton, eventsButton, workshopsButton],
    mobileLeftItems: [logoButton,],
    mobileRightItems: [],
    mobileMenuListItems: [infoButton, eventsButton, workshopsButton],
  };
};

export default DashboardItems;
