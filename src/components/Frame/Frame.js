/* eslint-disable jsx-a11y/iframe-has-title */

import React, { Component } from 'react';

export default class Frame extends Component {
  constructor(props) {
    super(props);

    this.initIframe(props.frameProps);
    this.print = this.print.bind(this);
    this.removeHeaderAndFooter = this.removeHeaderAndFooter.bind(this);
    this.addStyles = this.addStyles.bind(this);
    this.onUpdateContent = this.onUpdateContent.bind(this);
    this.initContent = this.initContent.bind(this);
  }

  initIframe(frameProps) {
    this.iframeEl = document.createElement('iframe');
    for (let key in frameProps) {
      this.iframeEl[key] = frameProps[key];
    }
    this.iframeEl.style.height = 0;
  }

  onUpdateContent() {
    if (!!this.props.onUpdateContent) {
      this.props.onUpdateContent(this, this.state.window);
    }
  }

  setContent(innerBody) {
    const body = '<body>' + innerBody + '</body>';
    this.state.window.document.open();
    this.state.window.document.write(body);
    this.state.window.document.close();
    this.onUpdateContent();
  }

  addStyles(styles) {
    const doc = this.state.window.document;
    const styleElement = doc.createElement('style');
    styleElement.type = 'text/css';
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = styles;
    } else {
      styleElement.appendChild(doc.createTextNode(styles));
    }
    doc.getElementsByTagName('head')[0].appendChild(styleElement);
  }

  fixHeight() {
    try {
      this.iframeEl.style.height =
        this.state.window.document.documentElement.scrollHeight * 1.1 + 'px';
      this.wrapper.style.height =
        this.state.window.document.documentElement.scrollHeight * 1.1 + 'px';
    } catch {}
  }

  addCSS(href) {
    const doc = this.state.window.document;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.onload = () => {
      setTimeout(() => {
        this.fixHeight(); // TODO: fix font load time
      }, 100);
      setTimeout(() => {
        this.fixHeight();
      }, 500);
      setTimeout(() => {
        this.fixHeight();
      }, 4000);
    };
    link.href = href;

    doc.getElementsByTagName('head')[0].appendChild(link);
  }

  removeHeaderAndFooter() {
    this.addStyles('@page { size: auto; margin: 0mm }');
  }
  print() {
    this.state.window.print();
  }

  componentDidMount() {
    this.wrapper.appendChild(this.iframeEl);
    const window = this.iframeEl.contentWindow;
    this.setState({ window }, () => {
      this.initContent();
    });
  }

  initContent() {
    this.setContent(this.props.content);
    this.addStyles(
      'html,body{overflow:hidden;height:100%;direction: rtl; margin: 0; height:min-content; height: fit-content;height: -moz-fit-content;}'
    );
    this.addCSS('/fonts/iranyekan/iranyekan.css');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.initContent();
    }
  }

  render() {
    return <div ref={(wrapper) => (this.wrapper = wrapper)}></div>;
  }
}
