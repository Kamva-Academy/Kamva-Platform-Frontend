import { Slide, useScrollTrigger } from '@mui/material';
import React from 'react';

export default function HideOnScroll({ children, disable = false }) {
  const trigger = useScrollTrigger({});
  if (disable) return <>{children}</>;

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
