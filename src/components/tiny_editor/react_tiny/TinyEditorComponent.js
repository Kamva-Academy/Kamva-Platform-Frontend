import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import TinyPreview from './Preview';

import 'tinymce/tinymce';
import '../../../assets/styles/tiny.css';

import conf from '../config';

export default class TinyEditorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { editor: null };
    this.config = {
      ...conf,
      id: this.props.id,
    };

    if (!this.props.initContent) {
      this.config.setup = (editor) => {
        this.setState({ editor });
      };
    }

    this.init = this.init.bind(this);
  }

  getContent() {
    return this.state.editor
      .getContent()
      .replace(/<svg.*\/svg>/g, '')
      .replace(/&nbsp;/g, '');
  }

  init(doc) {
    if (!this.config.setup) {
      this.config.setup = (editor) => {
        this.setState({ editor });
        const content = doc.body.outerHTML;
        editor.on('init', () => {
          editor.setContent(content);
        });
      };
    }
  }

  render() {
    return (
      <>
        {this.props.initContent && (
          <TinyPreview
            frameProps={{
              frameBorder: '0',
              scrolling: 'no',
              width: '0',
            }}
            hidden={true}
            content={this.props.initContent}
            onFixMath={this.init}
          />
        )}

        <Editor id={this.props.id} init={this.config} />
      </>
    );
  }
}
