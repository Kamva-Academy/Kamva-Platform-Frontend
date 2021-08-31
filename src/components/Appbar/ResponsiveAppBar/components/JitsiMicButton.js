import { IconButton, Tooltip } from '@material-ui/core';
import { Mic as MicIcon, MicOff as MicOffIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import * as jitsiFuncs from '../../../Jitsi/connection/jitsi';

export default function JitsiMicButton() {
  const [isMute, setIsMute] = useState(true);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => window.removeEventListener('resize', updateWindowDimensions);
  });

  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  };

  const toggleAudio = () => {
    if (isMute) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
        jitsiFuncs.unmute();
        setIsMute(false);
      });
    } else {
      jitsiFuncs.mute();
      setIsMute(true);
    }
  };
  return (
    <Tooltip title={isMute ? 'فعال‌کردن میکروفون' : 'قطع‌کردن میکروفون'} arrow>
      <IconButton size={width > 400 ? 'medium' : 'small'} onClick={toggleAudio}>
        {isMute ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
    </Tooltip>
  );
}
