import { IconButton, Tooltip, withWidth } from '@material-ui/core';
import { Mic as MicIcon, MicOff as MicOffIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';

import * as jitsiFuncs from '../../../Jitsi/connection/jitsi';

const JitsiMicButton = ({ width }) => {
  const [isMute, setIsMute] = useState(true);

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


export default withWidth()(JitsiMicButton);