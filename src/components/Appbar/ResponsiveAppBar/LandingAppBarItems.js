import React from 'react';
import LogoButton from './components/LogoButton';

const LandingAppBarItems = () => ({
  desktopLeftItems: [],
  desktopRightItems: [<LogoButton />],
  mobileLeftItems: [<LogoButton />],
  mobileRightItems: [],
  mobileMenuListItems: [],
});

export default LandingAppBarItems;
