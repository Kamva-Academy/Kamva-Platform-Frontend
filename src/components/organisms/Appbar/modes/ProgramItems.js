import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardButton from '../components/DashboardButton';
import ProgramLogoButton from '../components/ProgramLogoButton';
import UserInfo from '../components/UserInfo';

const DashboardItems = ({ event }) => {
  const { programId } = useParams();

  useEffect(() => {
    if (event?.name) {
      document.title = event.name;
    }
  }, [event])


  const logoButton = <ProgramLogoButton image={event?.cover_page} name={event?.name} programId={programId} />;
  const backButton = <DashboardButton name={'بازگشت به دوره‌ها'} to={'/programs/'} />;
  const userInfo = <UserInfo />

  const desktopLeftItems = [];
  const desktopRightItems = [logoButton];
  const mobileRightItems = [logoButton];
  if (event && !event?.is_private && !desktopRightItems.includes(backButton)) {
    desktopLeftItems.push(backButton);
    mobileRightItems.push(backButton);
  }
  desktopLeftItems.push(userInfo);

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems: [userInfo],
    mobileRightItems,
    mobileMenuListItems: [],
  };
};

export default DashboardItems;