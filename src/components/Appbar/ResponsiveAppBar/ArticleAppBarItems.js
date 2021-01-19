import { Button } from '@material-ui/core';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

import LogoButton from './components/LogoButton';

const ArticleAppBarItems = () => {
  const t = useTranslate();
  const logoButton = <LogoButton />;
  const BackButton = (
    <Button
      component={Link}
      to="/physics_day"
      variant="outlined"
      color="primary">
      {t('backToEvent')}
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
