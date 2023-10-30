import React, { useEffect } from 'react';

import DashboardButton from '../components/DashboardButton';
import Brand from '../components/Brand';
import UserInfo from '../components/UserInfo';

const DashboardAppbarItems = () => {

  useEffect(() => {
    document.title = 'کاموا';
    return () => {
      document.title = 'کاموا';
    }
  }, [])

  const eventsButton = <DashboardButton name={'دوره‌‌ها'} to={'/programs/'} />;
  const articlesButton = <DashboardButton name={'مقاله‌ها'} to={'/articles/'} />;
  const workshopButton = <DashboardButton name={'کارگاه‌ها'} to={'/fsms/'} />; // todo: add fsms section
  const brand = <Brand />
  const userInfo = <UserInfo />

  return {
    desktopLeftItems: [userInfo],
    desktopRightItems: [brand, eventsButton, articlesButton],
    mobileLeftItems: [userInfo],
    mobileRightItems: [],
    mobileMenuListItems: [eventsButton, articlesButton],
  };
};

export default DashboardAppbarItems;