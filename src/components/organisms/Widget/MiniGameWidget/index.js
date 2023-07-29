import { Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useRef, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import MiniGameEditWidget from './edit';

export { MiniGameEditWidget };

const useStyles = makeStyles(() => ({
  gameWidget: {
    width: '100%',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    minHeight: 300,
    border: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.25)',
    maxHeight: '100vh',
  },
}));

const GameWidget = ({ link = '' }) => {
  const t = useTranslate();
  const classes = useStyles();
  const iframeRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [iFrameHeight, setIFrameHeight] = useState(500);

  const handleFullScreen = () => {
    if (iframeRef.current.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    } else if (iframeRef.current.webkitRequestFullscreen) { /* Safari */
      iframeRef.current.webkitRequestFullscreen();
    } else if (iframeRef.current.msRequestFullscreen) { /* IE11 */
      iframeRef.current.msRequestFullscreen();
    }
  }

  return (
    <>
      <iframe
        title={t('game')}
        src={link}
        ref={iframeRef}
        className={classes.gameWidget}
        height={iFrameHeight}
      // style={{
      // height: iFrameHeight,
      // transform: `scale(${scale})`,
      // width: `${(1 / scale) * 100}%`,
      // marginRight: `-${((1 / scale) * 100 - 100) / 2}%`
      // }}
      // onLoad={(e) => {
      //   const body =
      //     e.target?.contentDocument?.body ??
      //     e.target?.contentWindow?.document?.body;
      //   setTimeout(() => {
      //     setIFrameHeight(body.scrollHeight);
      //     body.style.maxHeight = '100vh';
      //     body.style.overflowY = 'auto';
      //     body.style.overflowX = 'hidden';
      //   }, 10);
      // }}
      />
      <Button sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} variant='outlined' onClick={handleFullScreen}>
        {'حالت تمام صفحه'}
      </Button>
    </>
  );
};

export default GameWidget;
