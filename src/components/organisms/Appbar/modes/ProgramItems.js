import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardButton from '../components/DashboardButton';
import ProgramLogoButton from '../components/ProgramLogoButton';
import UserInfo from '../components/UserInfo';

const DashboardItems = ({ event }) => {

  useEffect(() => {
    if (event?.name) {
      document.title = event.name;
    }
  }, [event])

  const { programId } = useParams();

  const logoButton = <ProgramLogoButton image={event?.cover_page} name={event?.name} programId={programId} />;
  const backButton = <DashboardButton name={'بازگشت به دوره‌ها'} to={'/programs/'} />;
  const userInfo = <UserInfo />

  return {
    desktopLeftItems: [userInfo],
    desktopRightItems: [logoButton, backButton],
    mobileLeftItems: [userInfo],
    mobileRightItems: [logoButton],
    mobileMenuListItems: [],
  };
};

export default DashboardItems;