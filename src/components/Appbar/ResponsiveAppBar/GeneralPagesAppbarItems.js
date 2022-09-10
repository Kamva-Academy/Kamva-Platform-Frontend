import React from 'react';
import DashboardButton from './components/DashboardButton';

const GeneralPagesAppbarItems = () => {
  const backToLanding = <DashboardButton name={'بازگشت'} to={-1} />;

  const desktopLeftItems = [backToLanding];
  const desktopRightItems = [];
  const mobileLeftItems = [];
  const mobileRightItems = [];
  const mobileMenuListItems = [backToLanding];

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default GeneralPagesAppbarItems;
