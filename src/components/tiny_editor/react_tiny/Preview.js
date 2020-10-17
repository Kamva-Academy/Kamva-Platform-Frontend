import React, { Component } from 'react';
import Frame from '../../Frame/Frame';
import fixMath from './fixMath';

export default class TinyPreview extends Component {
  constructor(props) {
    super(props);
    this.onUpdateContent = this.onUpdateContent.bind(this);
  }

  print(frame) {
    frame.removeHeaderAndFooter();
    let rastaConfig = {};
    frame.print(rastaConfig);
  }

  onUpdateContent(frame, window) {
    fixMath(window.document);
    if (!!this.props.onFixMath) {
      this.props.onFixMath(window.document);
    }
  }

  render() {
    return (
      <div style={this.props.hidden ? { display: 'none' } : {}}>
        <Frame
          onUpdateContent={this.onUpdateContent}
          content={this.props.content}
          frameProps={this.props.frameProps}
        />
      </div>
    );
  }
}
