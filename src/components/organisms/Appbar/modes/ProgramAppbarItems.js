import React from 'react';
import ProgramLogoButton from '../components/ProgramLogoButton';
import UserInfo from '../components/UserInfo';

const ProgramAppbarItems = ({ program }) => {
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