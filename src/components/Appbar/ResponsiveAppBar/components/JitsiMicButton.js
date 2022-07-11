import { IconButton, Tooltip } from '@mui/material';
import { Mic as MicIcon, MicOff as MicOffIcon } from '@mui/icons-material';
import React, { useState } from 'react';
import useWidth from '../../../../utils/UseWidth';

import * as jitsiFuncs from '../../../Jitsi/connection/jitsi';

const JitsiMicButton = () => {
  const [isMute, setIsMute] = useState(true);
  const width = useWidth();

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
      <IconButton size={width == 'xs' ? 'small' : 'medium'} onClick={toggleAudio}>
        {isMute ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
    </Tooltip>
  );
}


export default JitsiMicButton;