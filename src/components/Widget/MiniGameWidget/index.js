import { Button, makeStyles } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

const useStyles = makeStyles(() => ({
  gameWidget: {
    width: '100%',
    borderRadius: 5,
    minHeight: 400,
    border: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.25)',
    maxHeight: '100vh',
  },
}));

const GameWidget = ({ link = '' }) => {
  const t = useTranslate();
  const classes = useStyles();
  const iframeObj = useRef();

  const [scale, setScale] = useState(0.7);
  const [iFrameHeight, setIFrameHeight] = useState(500);

  const makeFullScreen = () => {
    var elem = iframeObj.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  return (
    <>
      <iframe
        title={t('game')}
        src={link}
        className={classes.gameWidget}
        ref={iframeObj}
      // style={{
      //   height: iFrameHeight,
      //   transform: `scale(${scale})`,
      //   width: `${(1 / scale) * 100}%`,
      //   marginRight: `-${((1 / scale) * 100 - 100) / 2}%`,
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
      <Button variant='outlined' onClick={makeFullScreen}>
        {'حالت تمام‌صفحه'}
      </Button>
    </>
  );
};

export default GameWidget;
