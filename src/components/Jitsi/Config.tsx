
// https://github.com/jitsi/jitsi-meet/blob/master/config.js

const interfaceConfigOverwrite = {
  // BRAND_WATERMARK_LINK:'https://rastaiha.ir',

  SET_FILMSTRIP_ENABLED: false,
  DISABLE_FOCUS_INDICATOR: true,
  DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
  DISABLE_VIDEO_BACKGROUND: true,

  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
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
    'raisehand',
    // 'etherpad',
    // 'videoquality',
    // 'tileview',
  ],
};

const configOverwrite = {

  useAppLanguage: true,
  defaultLanguage: 'fa',

  // Disables self-view tile. (hides it from tile view and from filmstrip)
  disableSelfView: false,

  // Disables self-view settings in UI
  disableSelfViewSettings: true,

  disableLocalVideoFlip: true,

  doNotFlipLocalVideo: true,


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
    hideModeratorSettingsTab: false,
    // Hides the more actions button.
    hideMoreActionsButton: false,
    // Hides the mute all button.
    hideMuteAllButton: false,
  },

  // Options related to the breakout rooms feature.
  breakoutRooms: {
    // Hides the add breakout room button. This replaces `hideAddRoomButton`.
    hideAddRoomButton: false,
    // Hides the auto assign participants button.
    hideAutoAssignButton: false,
    // Hides the join breakout room button.
    hideJoinRoomButton: false,
  },

  conferenceInfo: {
    // hide raised hands count
    alwaysVisible: []
  },

  hideConferenceSubject: true,
  hideConferenceTimer: true,
  disableReactions: true,
  disableReactionsModeration: false,
  disablePolls: true,
  startWithAudioMuted: true,
  startWithVideoMuted: true,
  startAudioOnly: false,


  // ???
  disableModeratorIndicator: true,
  startScreenSharing: true,
  enableEmailInStats: false,
  disableDeepLinking: true,
  prejoinPageEnabled: false,
}

export { interfaceConfigOverwrite, configOverwrite }