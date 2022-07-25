import { IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import useWidth from '../../utils/UseWidth';
import { StatePageContext } from '../../containers/Workshop';
import * as jitsiFuncs from './connection/jitsi';
import { JitsiMeeting } from '@jitsi/react-sdk'

const useStyles = makeStyles((theme) => ({
  draggableArea: {
    width: '100%',
    background: '#666',
    boxShadow: theme.shadows[10],
    padding: theme.spacing(0, 2),
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
  },
  rightItems: {
    marginLeft: 'auto',
    '& .MuiSvgIcon-root': {
      color: 'white',
    },
  },
  jitsi: {
    width: '100%',
    height: 300,
    [theme.breakpoints.down('sm')]: {
      height: '100vh',
    },
  },
}));

function Jitsi({ handleClose, displayName = 'User' }) {
  const classes = useStyles();
  const jitsiElement = useRef();
  const width = useWidth();

  const { teamId } = useContext(StatePageContext);

  // const refresh = useCallback(() => {
  //   if (teamId) {
  //     jitsiFuncs.destroy();
  //     jitsiFuncs.initJitsi({
  //       roomName: 'ra_' + teamId,
  //       parentNode: jitsiElement.current,
  //       height: width === 'xs' ? '100%' : '300px',
  //       userInfo: {
  //         displayName,
  //       },
  //     });
  //   }
  // }, [width, displayName, teamId]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     refresh();
  //   }, 100);
  //   return jitsiFuncs.destroy;
  // }, [refresh]);

  // https://community.jitsi.org/t/reducing-resource-usage-to-improve-performance-both-client-side-and-server-side/39891

  return (
    <>
      <div id="jitsi-draggable-area" className={classes.draggableArea}>
        <IconButton size="small" onClick={handleClose}>
          <CancelIcon color="error" />
        </IconButton>
        {/* <div className={classes.rightItems}>
          <IconButton size="small" onClick={refresh}>
            <RefreshIcon />
          </IconButton>
        </div> */}
      </div>
      <div className={classes.jitsi} ref={jitsiElement}>
        <JitsiMeeting
          roomName={'ra_' + teamId}
          // https://github.com/jitsi/jitsi-meet/blob/master/config.js
          configOverwrite={{
            defaultLanguage: 'fa',
            disableModeratorIndicator: true,
            disableAudioLevels: true,
            startScreenSharing: true,
            enableEmailInStats: false,
            disableDeepLinking: true,
            prejoinPageEnabled: false,
            startAudioOnly: false,
            startWithAudioMuted: true,
            startWithVideoMuted: true,
            disablePolls: true,
            disableSelfViewSettings: false
          }}

          interfaceConfigOverwrite={{
            // BRAND_WATERMARK_LINK:'https://rastaiha.ir',

            SET_FILMSTRIP_ENABLED: false,
            DISABLE_FOCUS_INDICATOR: true,
            DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
            DISABLE_VIDEO_BACKGROUND: true,

            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            SHOW_CHROME_EXTENSION_BANNER: false,
            RECENT_LIST_ENABLED: false,
            VIDEO_QUALITY_LABEL_DISABLED: true,
            CONNECTION_INDICATOR_DISABLED: true,
            TOOLBAR_ALWAYS_VISIBLE: false,
            DEFAULT_BACKGROUND: '#eaeaea',
            LANG_DETECTION: false,
            HIDE_INVITE_MORE_HEADER: true,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
            SHOW_JITSI_WATERMARK: false,
            APP_NAME: 'Kamva Meet',
            NATIVE_APP_NAME: 'Kamva Meet',
            MOBILE_APP_PROMO: false,
            PROVIDER_NAME: 'Kamva',
            TOOLBAR_BUTTONS: [
              'microphone',
              'camera',
              // 'closedcaptions',
              'desktop',
              'fullscreen',
              // 'fodeviceselection',
              'chat',
              // 'etherpad',
              // 'videoquality',
              // 'tileview',
            ],
          }}
          userInfo={{
            displayName,
          }}
          onApiReady={(externalApi) => {
            // here you can attach custom event listeners to the Jitsi Meet External API
            // you can also store it locally to execute commands
          }}
          getIFrameRef={(iframeRef) => { iframeRef.style.height = width === 'xs' ? '100%' : '300px' }}
        />
      </div>
    </>
  );
}

const mapStatesToProps = (state) => ({
  displayName: state.account.userAccount.is_mentor
    ? 'همیار'
    : state.account.userAccount?.first_name + ' ' + state.account.userAccount?.last_name,
});

export default connect(mapStatesToProps)(Jitsi);
