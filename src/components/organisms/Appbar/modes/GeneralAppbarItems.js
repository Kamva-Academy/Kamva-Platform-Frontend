import React from 'react';
import DashboardButton from '../components/DashboardButton';
import Brand from '../components/Brand';

const GeneralAppbarItems = ({}) => {
  const backToLanding = <DashboardButton name={'بازگشت'} to={-1} />;
  const brand = <Brand />;

  const desktopLeftItems = [backToLanding];
  const desktopRightItems = [brand];
  const mobileLeftItems = [backToLanding];
  const mobileRightItems = [brand];
  const mobileMenuListItems = [];

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  };
};

export default GeneralAppbarItems;
