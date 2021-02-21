import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import LogoButton from './components/MathHouseLogoButton';

const BackToRastaihaButton = () => {
  return (
    <Button
      component={Link}
      to="/"
      variant="outlined"
      color="primary"
      style={{ background: '#eeeeee88' }}>
      بازگشت
    </Button>
  );
};

const LandingAppBarItems = () => {
  const logoButton = <LogoButton size="large" />;
  const backButton = <BackToRastaihaButton />;

  return {
    desktopLeftItems: [backButton],
    desktopRightItems: [logoButton],
    mobileLeftItems: [logoButton],
    mobileRightItems: [backButton],
    mobileMenuListItems: [],
  };
};

export default LandingAppBarItems;
