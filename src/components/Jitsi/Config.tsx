
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
  CONNECTION_INDICATOR_DISABLED: true,
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
    // 'etherpad',
    // 'videoquality',
    // 'tileview',
  ],
};

const configOverwrite = {
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
}

export { interfaceConfigOverwrite, configOverwrite }