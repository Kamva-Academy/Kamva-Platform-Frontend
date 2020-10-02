import React from 'react';
import AuthItem from './components/AuthItem';
import LogoButton from './components/LogoButton';

export default () => ({
  desktopLeftItems: [<AuthItem />],
  desktopRightItems: [<LogoButton />],
  mobileLeftItems: [<LogoButton />],
  mobileRightItems: [],
  mobileMenuListItems: [<AuthItem />],
});
