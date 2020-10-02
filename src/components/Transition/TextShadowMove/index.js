import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 500;

const defaultStyle = {
  transition: `text-shadow ${duration}ms ease-in-out`,
  textShadow: '-4px 0px #888',
};

const transitionStyles = {
  entering: { textShadow: '-4px 0px #888' },
  entered: { textShadow: '3px 3px #888' },
  exiting: { textShadow: '-3px -3px #888' },
  exited: { textShadow: '0px -4px #888' },
};

export default function TextShadowMove({ in: inProp, children }) {
  return (
    <Transition in={inProp} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}>
          {children}
        </div>
      )}
    </Transition>
  );
}
