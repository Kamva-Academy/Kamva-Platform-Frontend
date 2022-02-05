import React from 'react';

import appendPreviousParams from '../../../utils/AppendPreviousParams';
import DashboardButton from './components/DashboardButton';

const Index = () => {

  const backToLanding = <DashboardButton name={'برگشت به صفحه‌ی اصلی'} to={appendPreviousParams(`/`)} />;

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

export default Index;
