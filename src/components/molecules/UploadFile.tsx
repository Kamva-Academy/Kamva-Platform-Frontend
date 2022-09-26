import {
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC, useState } from 'react';
import { makeWidgetFileEmptyAction } from '../../redux/slices/Paper';
import { connect } from 'react-redux';

type UploadFilePropsType = {
  previousFile: string;
  file: any;
  setFile: any;
  widgetId: number;
  paperId: number;
  makeWidgetFileEmpty: any;
}

const UploadFile: FC<UploadFilePropsType> = ({
  setFile,
  previousFile,
  file,
  widgetId,
  paperId,
  makeWidgetFileEmpty,
}) => {
  const submitFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file.size <= 8e6) {
      setFile(file);
    }
  };

  const clearFile = (e) => {
    makeWidgetFileEmpty({ widgetId, paperId });
    e.preventDefault();
  }

  const fileSrc = file ? window.URL.createObjectURL(file) : previousFile;

  return (
    <Stack spacing={1}>
      <Button
        component="label"
        htmlFor={'upload-widget-file'}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<CloudUploadIcon />}
        sx={{ whiteSpace: 'nowrap' }}>
        {'بارگذاری فایل'}
      </Button>
      <input
        accept="application/pdf,image/*"
        style={{ display: 'none' }}
        id={'upload-widget-file'}
        type="file"
        onChange={submitFile}
      />
      {fileSrc &&
        <Button
          size="small"
          variant='outlined'
          sx={{
            whiteSpace: 'nowrap',
          }}
          endIcon={
            !file ?
              <IconButton size='small' onClick={clearFile}>
                <ClearIcon sx={{ fontSize: 14 }} />
              </IconButton>
              : null
          }
          href={fileSrc}
          component="a"
          target="_blank">
          {file ? 'فایل انتخاب‌شده' : 'آخرین فایل ارسالی'}
        </Button>
      }
    </Stack>
  );
}

export default connect(null, {
  makeWidgetFileEmpty: makeWidgetFileEmptyAction,
})(UploadFile);