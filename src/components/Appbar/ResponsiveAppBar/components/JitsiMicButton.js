import { IconButton } from '@material-ui/core';
import { Mic as MicIcon, MicOff as MicOffIcon } from '@material-ui/icons';
import React, { useState } from 'react';

import * as jitsiFuncs from '../../../Jitsi/connection/jitsi';

export default function JitsiMicButton() {
  const [isMute, setIsMute] = useState(true);
  const toggleAudio = () => {
    if (isMute) {
      jitsiFuncs.unmute();
    } else {
      jitsiFuncs.mute();
    }
    setIsMute(!isMute);
  };
  return (
    <>
      <IconButton onClick={toggleAudio}>
        {isMute ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
    </>
  );
}
