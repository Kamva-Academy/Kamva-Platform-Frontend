import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import MiniGameEditWidget from './edit';
import { useWindowSize } from 'utils/useWindowSIze';

export { MiniGameEditWidget };

const GameWidget = ({ link = '' }) => {
  const [windowWidth, _] = useWindowSize();
  const t = useTranslate();
  const iframeRef = useRef(null);
  const [iFrameHeight, setIFrameHeight] = useState(300);
  const ratio = 9 / 16;

  useEffect(() => {
    if (iframeRef.current?.scrollWidth) {
      setIFrameHeight(ratio * iframeRef.current?.scrollWidth);
    }
  }, [iframeRef.current, windowWidth])

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
        height={iFrameHeight}
        allowFullScreen="true"
        style={{
          width: '100%',
          border: 'none',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.25)',
        }}
      />
      <Button sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }} variant='outlined' onClick={handleFullScreen}>
        {'حالت تمام صفحه'}
      </Button>
    </>
  );
};

export default GameWidget;
