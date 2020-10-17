import React, { Component } from 'react';
import TinyPreview from '../../tiny_editor/react_tiny/Preview';
import TinyEditorComponent from '../../tiny_editor/react_tiny/TinyEditorComponent';

export default class BigAnswerProblem extends Component {
  render() {
    return (
      <>
        <TinyPreview
          frameProps={{
            frameBorder: '0',
            scrolling: 'no',
            width: '100%',
          }}
          content="در رابطه با راه حلتون توضیح بدید!"
        />
        <TinyEditorComponent
          id={`edit-big-answer-${Math.floor(Math.random() * 1000)}`}
        />
      </>
    );
  }
}
