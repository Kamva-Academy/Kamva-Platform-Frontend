/* eslint-disable jsx-a11y/iframe-has-title */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

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
    if (!doc) {
      return;
    }
    doc.open();
    doc.write(
      `<head><link rel='stylesheet' href='${process.env.PUBLIC_URL}/frame.css' /><link rel='stylesheet' href='${process.env.PUBLIC_URL}/fonts/iranyekan/iranyekan.css' /><base target="_blank" /></head><body>${content}</body>`
    );
    doc.close();

    doc.fonts.ready.then(fixHeight);
  }, [doc, content, fixHeight]);

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

  return <iframe title={title} {...frameProps} ref={setContentRef}></iframe>;
}
