import { Box, IconButton, Button, Paper, Stack, Tooltip } from '@mui/material';
import {
  Cancel as CancelIcon,
  Help as HelpIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import React, { useContext, useRef } from 'react';
import { connect } from 'react-redux';
import useWidth from '../../utils/UseWidth';
import { StatePageContext } from '../../containers/Workshop';
import { JitsiMeeting } from '@jitsi/react-sdk'
import { interfaceConfigOverwrite, configOverwrite } from './Config';
import CircularProgress from '@mui/material/CircularProgress';

const MySpinner = () => (
  <Stack sx={{ height: '100%', width: '100%', backgroundColor: 'white' }} alignItems='center' justifyContent='center'>
    <CircularProgress />
  </Stack>
)

function Jitsi({ handleClose, displayName = 'User' }) {
  const width = useWidth();
  const iframeRef = useRef(null);
  const jitsiRef = useRef(null);
  let { teamId, teamRoom } = useContext(StatePageContext);

  teamRoom = 'https://gharar.ir/r/e1c57ae0';

  const handleReload = () => {
    // todo
  }

  return (
    <>
      <Stack
        direction='row'
        justifyContent='flex-end'
        sx={{
          background: '#c4c4c4',
          cursor: width === 'xs' ? 'inherit' : 'move',
          paddingX: 1,
          borderTopLeftRadius: width === 'xs' ? 0 : 6,
          borderTopRightRadius: width === 'xs' ? 0 : 6,
          height: 40,
        }}>
        {/* <Tooltip title='راهنما' arrow leaveDelay={0}>
          <IconButton size='small' >
            <HelpIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip> */}
        <Tooltip title='تازه‌سازی' arrow>
          <IconButton disabled size='small' onClick={handleReload}>
            <RefreshIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title='بستن' arrow>
          <IconButton size='small' onClick={handleClose}>
            <CancelIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box
        sx={{
          width: '100%',
          height: width === 'xs' ? '100%' : 350 - 40,
        }}>
        {teamRoom
          ? <iframe
            ref={iframeRef}
            src={teamRoom}
            allow="camera *; microphone *; fullscreen *; display-capture *;"
            allowFullScreen
            height='100%'
            width='100%'
            style={{ border: 'none' }} />
          : teamId
            ? <JitsiMeeting
              roomName={teamId}
              configOverwrite={configOverwrite}
              interfaceConfigOverwrite={interfaceConfigOverwrite}
              userInfo={{
                displayName,
                email: "",
              }}
              spinner={MySpinner}
              onApiReady={(externalApi) => {
                jitsiRef.current = externalApi;
                // https://github.com/jitsi/jitsi-meet-react-sdk/blob/main/example/src/App.jsx
              }}
              getIFrameRef={(iframeRef) => {
                iframeRef.style.height = '100%';
                iframeRef.style.width = '100%';
              }}
            />
            : <MySpinner />
        }
      </Box>
    </>
  );
}

const mapStatesToProps = (state) => ({
  displayName: state.account.userAccount.is_mentor
    ? 'همیار'
    : state.account.userAccount?.first_name + ' ' + state.account.userAccount?.last_name,
});

export default connect(mapStatesToProps)(Jitsi);

// https://community.jitsi.org/t/reducing-resource-usage-to-improve-performance-both-client-side-and-server-side/39891
