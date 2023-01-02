import React from 'react';
import DashboardButton from './components/DashboardButton';
import LogoButton from './components/LogoButton';

const GeneralPagesAppbarItems = () => {
  const logoButton = <LogoButton />;
  const backToLanding = <DashboardButton name={'بازگشت'} to={-1} />;

  const desktopLeftItems = [backToLanding];
  const desktopRightItems = [logoButton];
  const mobileLeftItems = [backToLanding];
  const mobileRightItems = [logoButton];
  const mobileMenuListItems = [];

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default GeneralPagesAppbarItems;
