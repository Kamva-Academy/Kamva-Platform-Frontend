import React, { useEffect } from 'react';
import ProgramLogoButton from '../components/ProgramLogoButton';
import UserInfo from '../components/UserInfo';

const ProgramAppbarItems = ({ event }) => {

  useEffect(() => {
    if (event?.name) {
      document.title = event.name;
    }
  }, [event])

  const programLogoButton = <ProgramLogoButton />;
  const userInfo = <UserInfo />

  const desktopLeftItems = [];
  const desktopRightItems = [programLogoButton];
  const mobileRightItems = [programLogoButton];
  desktopLeftItems.push(userInfo);

  return {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems: [userInfo],
    mobileRightItems,
    mobileMenuListItems: [],
  };
};

export default ProgramAppbarItems;