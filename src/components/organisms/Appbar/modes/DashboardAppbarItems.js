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

  const eventsButton = <DashboardButton name={'دوره‌ها'} to={'/programs/'} />;
  const articlesButton = <DashboardButton name={'مقاله‌ها'} to={'/articles/'} />;
  const aboutUsButton = <DashboardButton name={'درباره ما'} onClick={() => window.location.href = 'https://platform.kamva.academy/about-us/'} />;
  const contactUsButton = <DashboardButton name={'تماس با ما'} onClick={() => window.location.href = 'https://platform.kamva.academy/article/2044/'} />;
  const brand = <Brand />
  const userInfo = <UserInfo />

  return {
    desktopLeftItems: [userInfo],
    desktopRightItems: [brand, eventsButton, articlesButton, aboutUsButton, contactUsButton],
    mobileLeftItems: [userInfo],
    mobileRightItems: [],
    mobileMenuListItems: [eventsButton, articlesButton, aboutUsButton, contactUsButton],
  };
};

export default DashboardAppbarItems;