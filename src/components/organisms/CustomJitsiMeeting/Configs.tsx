// link to reducing resource usage:
// https://community.jitsi.org/t/reducing-resource-usage-to-improve-performance-both-client-side-and-server-side/39891


const interfaceConfigOverwrite = {
  BRAND_WATERMARK_LINK: 'https://kamva.academy/',

  SET_FILMSTRIP_ENABLED: false,
  DISABLE_FOCUS_INDICATOR: true,
  DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
  DISABLE_VIDEO_BACKGROUND: true,

  // DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
  SHOW_CHROME_EXTENSION_BANNER: false,
  RECENT_LIST_ENABLED: false,
  VIDEO_QUALITY_LABEL_DISABLED: true,
  CONNECTION_INDICATOR_DISABLED: false,
  TOOLBAR_ALWAYS_VISIBLE: false,
  DEFAULT_BACKGROUND: 'white',
  LANG_DETECTION: false,
  HIDE_INVITE_MORE_HEADER: true,
  DISPLAY_WELCOME_PAGE_CONTENT: false,
  GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
  SHOW_JITSI_WATERMARK: false,
  APP_NAME: 'Kamva Academy',
  NATIVE_APP_NAME: 'Kamva Academy',
  MOBILE_APP_PROMO: false,
  PROVIDER_NAME: 'Kamva Academy',
  TOOLBAR_BUTTONS: [
    'microphone',
    'camera',
    // 'closedcaptions',
    'desktop',
    'fullscreen',
    // 'fodeviceselection',
    'chat',
    'raisehand',
    // 'etherpad',
    // 'videoquality',
    // 'tileview',
  ],
};

// https://github.com/jitsi/jitsi-meet/blob/master/config.js
const configOverwrite = {

  useAppLanguage: true,
  defaultLanguage: 'fa',

  // Default local name to be displayed
  defaultLocalDisplayName: 'من',

  // Default remote name to be displayed
  defaultRemoteDisplayName: 'غریبه',

  // Disables profile and the edit of all fields from the profile settings (display name and email)
  disableProfile: false,

  // When 'true', the user cannot edit the display name.
  // (Mainly useful when used in conjunction with the JWT so the JWT name becomes read only.)
  readOnlyName: true,

  // Disables self-view tile. (hides it from tile view and from filmstrip)
  disableSelfView: false,

  // Disables self-view settings in UI
  disableSelfViewSettings: true,

  disableLocalVideoFlip: true,
  doNotFlipLocalVideo: true,
  enableLocalVideoFlip: true,

  // Disables all invite functions from the app (share, invite, dial out...etc)
  disableInviteFunctions: true,

  remoteVideoMenu: {
    // Whether the remote video context menu to be rendered or not.
    disabled: true,
    // If set to true the 'Kick out' button will be disabled.
    disableKick: true,
    // If set to true the 'Grant moderator' button will be disabled.
    disableGrantModerator: true,
    // If set to true the 'Send private message' button will be disabled.
    disablePrivateChat: true,
  },

  // Options related to the participants pane.
  participantsPane: {
    // Hides the moderator settings tab.
    hideModeratorSettingsTab: true,
    // Hides the more actions button.
    hideMoreActionsButton: true,
    // Hides the mute all button.
    hideMuteAllButton: true,
  },

  // good for disabling buttons:
  // buttonsWithNotifyClick: [],

  // Options related to the breakout rooms feature.
  breakoutRooms: {
    // Hides the add breakout room button. This replaces `hideAddRoomButton`.
    hideAddRoomButton: false,
    // Hides the auto assign participants button.
    hideAutoAssignButton: false,
    // Hides the join breakout room button.
    hideJoinRoomButton: false,
  },

  // hideConferenceSubject: true,
  // hideConferenceTimer: true,
  disableReactions: true,
  disableReactionsModeration: false,
  disablePolls: true,
  startWithAudioMuted: true,
  startWithVideoMuted: true,

  startAudioOnly: false,
  disableModeratorIndicator: true,
  startScreenSharing: true,
  enableEmailInStats: false,
  disableDeepLinking: true,
  prejoinPageEnabled: false,

  // reload
  enableIceRestart: true,
  enableForcedReload: true,

  // Logging
  logging: {
    // Default log level for the app and lib-jitsi-meet.
    defaultLogLevel: 'error',
    // Option to disable LogCollector (which stores the logs on CallStats).
    disableLogCollector: true,
    // Individual loggers are customizable.
    loggers: {
      // The following are too verbose in their logging with the default level.
      'modules/RTC/TraceablePeerConnection.js': 'error',
      'modules/statistics/CallStats.js': 'error',
      'modules/xmpp/strophe.util.js': 'error',
    },
  }
}

export { interfaceConfigOverwrite, configOverwrite }