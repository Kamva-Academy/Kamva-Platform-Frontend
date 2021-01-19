import React, { forwardRef } from 'react';
import { Text } from 'react-konva';

const KonvaTextNode = (
  { onTextChange, transformer, ...props },
  forwardedRef
) => {
  const onDblTap = (e) => {
    const node = e.target;
    node.hide();
    transformer.hide();
    // create textarea over canvas with absolute position
    // first we need to find position for textarea
    // how to find it?
    // at first lets find position of text node relative to the stage:
    let textPosition = node.absolutePosition();
    // then lets find position of stage container on the page:
    let stageBox = node.getStage().container().getBoundingClientRect();
    // so position of textarea will be the sum of positions above:
    let areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };
    // create textarea and style it
    let textarea = document.createElement('textarea');
    const drawingItem = document.querySelector('.drawing') || document.body;
    drawingItem.appendChild(textarea);
    // apply many styles to match text on canvas as close as possible
    // remember that text rendering on canvas and on the textarea can be different
    // and sometimes it is hard to make it 100% the same. But we will try...
    textarea.value = node.text();
    textarea.style.zIndex = 100000000;
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = node.width() - node.padding() * 2 + 'px';
    textarea.style.height = node.height() - node.padding() * 2 + 5 + 'px';
    textarea.style.fontSize = node.fontSize() + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = node.lineHeight();
    textarea.style.fontFamily = node.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = node.align();
    textarea.style.color = node.fill();
    let rotation = node.rotation();
    let transform = '';
    if (rotation) {
      transform += 'rotateZ(' + rotation + 'deg)';
    }
    let px = 0;
    let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (isFirefox) {
      px += 2 + Math.round(node.fontSize() / 20);
    }
    transform += 'translateY(-' + px + 'px)';
    textarea.style.transform = transform;
    textarea.style.height = 'auto';
    // after browsers resized it we can set actual value
    textarea.style.height = textarea.scrollHeight + 3 + 'px';
    textarea.focus();
    const removeTextarea = () => {
      textarea.parentNode.removeChild(textarea);
      window.removeEventListener('click', handleOutsideClick);
      node.show();
      transformer.show();
      node.getLayer().batchDraw();
      // transformer.forceUpdate();
    };

    const setTextareaWidth = (newWidth) => {
      if (!newWidth) {
        // set width for placeholder
        newWidth = node.placeholder.length * node.fontSize();
      }
      // some extra fixes on different browsers
      let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isSafari || isFirefox) {
        newWidth = Math.ceil(newWidth);
      }
      let isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
      if (isEdge) {
        newWidth += 1;
      }
      textarea.style.width = newWidth + 'px';
    };
    textarea.addEventListener('keydown', () => {
      if (textarea.value.length > 0) {
        const english = /^[A-Za-z0-9]*$/;
        if (english.test(textarea.value[0])) {
          if (node.align() === 'right') {
            node.align('left');
            textarea.style.textAlign = 'left';
          }
        } else if (node.align() === 'left') {
          node.align('right');
          textarea.style.textAlign = 'right';
        }
      }
      let scale = node.getAbsoluteScale().x;
      setTextareaWidth(node.width() * scale);
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + node.fontSize() + 'px';
    });
    const handleOutsideClick = (e) => {
      if (e.target !== textarea) {
        onTextChange(textarea.value);
        removeTextarea();
      }
    };
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
  };
  const onTransform = (e) => {
    e.target.setAttrs({
      width: e.target.width() * e.target.scaleX(),
      scaleX: 1,
    });
  };
  return (
    <Text
      ref={forwardedRef}
      {...props}
      onDblClick={onDblTap}
      onDblTap={onDblTap}
      onTransform={onTransform}
    />
  );
};

export default forwardRef(KonvaTextNode);
