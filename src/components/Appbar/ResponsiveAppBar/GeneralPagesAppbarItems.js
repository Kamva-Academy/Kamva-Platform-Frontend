import React, { useEffect } from 'react';

import DashboardButton from './components/DashboardButton';

const Index = () => {

  useEffect(() => {
    document.title = 'درباره‌ی ما';
  }, [])

  const backToLanding = <DashboardButton name={'برگشت به صفحه‌ی اصلی'} to={`/`} />;

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
