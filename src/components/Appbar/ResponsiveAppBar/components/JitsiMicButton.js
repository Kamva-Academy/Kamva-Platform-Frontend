import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Mic as MicIcon, MicNone as MicNoneIcon } from '@material-ui/icons';
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
        {isMute ? <MicNoneIcon /> : <MicIcon />}
      </IconButton>
    </>
  );
}
