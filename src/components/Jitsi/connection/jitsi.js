/* global JitsiMeetExternalAPI */
import jitsiConfig from './config';

let api;

export const initJitsi = (config) => {
  try {
    if (api) {
      destroy();
    }
    api = new JitsiMeetExternalAPI('meet.jit.si/r/', {
      ...jitsiConfig,
      ...config,
    });
  } catch (err) {
    console.log(err);
  }
};

export const messageListener = (onMessage) => {
  try {
    api.addEventListeners({
      endpointTextMessageReceived: (object) =>
        onMessage(JSON.parse(object.data.eventData.text)),
    });
  } catch (err) {
    console.log(err);
    initJitsi({ width: 0, height: 0 });
  }
};

export const sendGroupMessage = (message) => {
  try {
    Object.keys(api._participants).forEach((participant) =>
      api.executeCommand('sendEndpointTextMessage', participant, message)
    );
  } catch (err) {
    console.log(err);
    initJitsi({ width: 0, height: 0 });
  }
};

export const destroy = () => {
  try {
    if (api) {
      api.removeEventListener('endpointTextMessageReceived');
      api.dispose();
      api = null;
    }
  } catch (err) {
    console.log(err);
  }
};

export const unmute = () => {
  try {
    api.isAudioMuted().then((muted) => {
      if (muted) {
        api.executeCommand('toggleAudio');
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const mute = () => {
  try {
    api.isAudioMuted().then((muted) => {
      if (!muted) {
        api.executeCommand('toggleAudio');
      }
    });
  } catch (err) {
    console.log(err);
  }
};
