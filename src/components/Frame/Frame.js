/* eslint-disable jsx-a11y/iframe-has-title */
import parse from 'html-react-parser';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export default function Frame({
  content,
  frameProps,
  title = '',
  handleUpdateContent,
}) {
  const [contentRef, setContentRef] = useState(null);
  const doc =
    contentRef?.contentDocument ?? contentRef?.contentWindow?.document;

  const fixHeight = useCallback(() => {
    if (!contentRef) {
      return;
    }
    contentRef.style.height = doc?.documentElement?.scrollHeight * 1.01 + 'px';
  }, [contentRef, doc?.documentElement?.scrollHeight]);

  useEffect(() => {
    if (!contentRef) {
      return;
    }
    handleUpdateContent?.(doc);
  }, [content, contentRef, doc, handleUpdateContent]);

  useLayoutEffect(() => {
    window.addEventListener('resize', fixHeight);
    return () => window.removeEventListener('resize', fixHeight);
  }, [fixHeight]);

  useEffect(() => {
    fixHeight();
  }, [content, contentRef, fixHeight]);

  return (
    <iframe title={title} {...frameProps} ref={setContentRef}>
      {doc?.body && createPortal(parse(content), doc.body)}
      {doc?.head &&
        createPortal(
          <>
            <link
              rel="stylesheet"
              type="text/css"
              href="/fonts/iranyekan/iranyekan.css"
              onLoad={fixHeight}
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="/frame.css"
              onLoad={fixHeight}
            />
            <base target="_blank" />
          </>,
          doc.head
        )}
    </iframe>
  );
}
