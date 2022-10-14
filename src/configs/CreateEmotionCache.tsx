import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { directionType } from '../types/global';

const createEmotionCache = (direction: directionType) => {
  if (direction === 'rtl') {
    return createCache({ key: 'muirtl', stylisPlugins: [prefixer, rtlPlugin] });
  } else {
    return null;
  }
};

export default createEmotionCache;
