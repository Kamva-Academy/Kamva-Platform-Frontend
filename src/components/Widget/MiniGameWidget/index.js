import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import MiniGameEditWidget from './edit';

export { MiniGameEditWidget };

const useStyles = makeStyles((theme) => ({
  gameWidget: {
    width: '100%',
    borderRadius: 10,
    minHeight: 300,
    border: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.25)',
    maxHeight: '100vh',
  },
}));

const GameWidget = ({ link = '' }) => {
  const t = useTranslate();
  const classes = useStyles();

  const [iFrameHeight, setIFrameHeight] = useState(500);

  return (
    <iframe
      title={t('game')}
      src={link}
      className={classes.gameWidget}
      style={{ height: iFrameHeight }}
      onLoad={(e) => {
        const body =
          e.target?.contentDocument?.body ??
          e.target?.contentWindow?.document?.body;
        setTimeout(() => {
          setIFrameHeight(body.scrollHeight);
          body.style.maxHeight = '100vh';
          body.style.overflowY = 'auto';
          body.style.overflowX = 'hidden';
        }, 10);
      }}
    />
  );
};

export default GameWidget;
