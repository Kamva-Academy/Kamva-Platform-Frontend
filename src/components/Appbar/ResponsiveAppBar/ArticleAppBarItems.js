import React from 'react';

import LogoButton from './components/LogoButton';

const ArticleAppBarItems = () => {
  const logoButton = <LogoButton />;
  return {
    desktopLeftItems: [],
    desktopRightItems: [logoButton],
    mobileLeftItems: [logoButton],
    mobileRightItems: [],
    mobileMenuListItems: [],
  };
};

export default ArticleAppBarItems;
