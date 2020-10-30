import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import 'tinymce/tinymce';
import '../../../assets/styles/tiny.css';

import config from '../config';

const TinyEditor = ({ content, onChange }) => {
  return (
    <Editor init={{ ...config }} value={content} onEditorChange={onChange} />
  );
};

export default TinyEditor;
