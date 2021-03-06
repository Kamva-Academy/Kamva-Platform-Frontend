import 'tinymce/tinymce';
import '../../../Theme/Styles/Tiny.css'

import { Editor } from '@tinymce/tinymce-react';
import React from 'react';

import config from '../config';

const TinyEditor = ({ content, onChange }) => {
  return (
    <Editor init={{ ...config }} value={content} onEditorChange={onChange} />
  );
};

export default TinyEditor;
