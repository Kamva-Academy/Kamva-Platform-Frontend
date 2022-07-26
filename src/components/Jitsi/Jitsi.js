import { Box, IconButton, Paper, Stack, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Cancel as CancelIcon,
  Help as HelpIcon
} from '@mui/icons-material';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import useWidth from '../../utils/UseWidth';
import { StatePageContext } from '../../containers/Workshop';
import { JitsiMeeting } from '@jitsi/react-sdk'
import { interfaceConfigOverwrite, configOverwrite } from './Config';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles((theme) => ({
  draggableArea: {

  },
  rightItems: {
    marginLeft: 'auto',
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },
  jitsi: {
  },
}));

const MySpinner = () => (
  <Stack sx={{ height: '100%', width: '100%', backgroundColor: 'white' }} alignItems='center' justifyContent='center'>
    <CircularProgress />
  </Stack>
)

function Jitsi({ handleClose, displayName = 'User' }) {
  const classes = useStyles();
  const jitsiElement = useRef();
  const width = useWidth();
  const { teamId } = useContext(StatePageContext);

  return (
    <>
      <Stack
        direction='row'
        justifyContent='flex-end'
        sx={{
          background: '#666',
          cursor: 'move',
          paddingX: 1,
          paddingY: 0.5,
        }}>
        <Tooltip title='راهنما' arrow leaveDelay={0}>
          <IconButton size='small' >
            <HelpIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title='بستن' arrow>
          <IconButton size='small' onClick={handleClose}>
            <CancelIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Box sx={{
        width: '100%',
        height: width === 'xs' ? '100vh' : 300,
      }}>
        {teamId ?
          <JitsiMeeting
            roomName={'ra_' + teamId}
            configOverwrite={configOverwrite}
            interfaceConfigOverwrite={interfaceConfigOverwrite}
            userInfo={{
              displayName,
            }}
            spinner={MySpinner}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = '100%';
              iframeRef.style.width = '100%';
            }}
          />
          :
          <MySpinner />
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
