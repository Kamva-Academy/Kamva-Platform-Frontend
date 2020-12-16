import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import LogoButton from './components/LogoButton';

const ArticleAppBarItems = () => {
  const logoButton = <LogoButton />;
  const BackButton = (
    <Button
      component={Link}
      to="/physics_day"
      variant="outlined"
      color="primary">
      بازگشت به رویداد
    </Button>
  );
  return {
    desktopLeftItems: [BackButton],
    desktopRightItems: [logoButton],
    mobileLeftItems: [logoButton],
    mobileRightItems: [BackButton],
    mobileMenuListItems: [],
  };
};

export default ArticleAppBarItems;
