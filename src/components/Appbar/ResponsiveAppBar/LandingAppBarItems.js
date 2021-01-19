import React from 'react';

import AuthButton from './components/AuthButton';
import LogoButton from './components/LogoButton';

const LandingAppBarItems = () => {
  const logoButton = <LogoButton size="large" />;
  const authButton = <AuthButton />;

  return {
    desktopLeftItems: [authButton],
    desktopRightItems: [logoButton],
    mobileLeftItems: [logoButton],
    mobileRightItems: [authButton],
    mobileMenuListItems: [],
  };
};

export default LandingAppBarItems;
