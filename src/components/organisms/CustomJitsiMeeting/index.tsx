import React, { useRef } from 'react';
import { JaaSMeeting } from '@jitsi/react-sdk'
import { interfaceConfigOverwrite, configOverwrite } from './Configs';
import MeetingCustomSpinner from 'components/atoms/MeetingCustomSpinner';

function CustomJitsiMeeting({ userDisplayName, userEmail, roomName, key, appId }) {
  const jitsiRef = useRef(null);

  return (
    <JaaSMeeting
      key={key}
      appId={appId}
      roomName={roomName}
      configOverwrite={configOverwrite}
      interfaceConfigOverwrite={interfaceConfigOverwrite}
      userInfo={{
        displayName: userDisplayName,
        email: userEmail,
      }}
      spinner={MeetingCustomSpinner}
      onApiReady={(externalApi) => {
        jitsiRef.current = externalApi;
        // https://github.com/jitsi/jitsi-meet-react-sdk/blob/main/example/src/App.jsx
      }}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = '100%';
        iframeRef.style.width = '100%';
      }}
    />
  );
}

export default CustomJitsiMeeting;