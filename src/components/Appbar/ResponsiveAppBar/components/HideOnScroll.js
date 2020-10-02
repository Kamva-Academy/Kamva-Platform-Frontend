import React from 'react';
import { Slide, useScrollTrigger } from '@material-ui/core';

export default function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({});

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
