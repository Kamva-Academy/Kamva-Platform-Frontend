import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { uploadFileAction } from '../../../redux/slices/events';
import { addNotificationAction } from '../../../redux/slices/notifications';

const useStyles = makeStyles((theme) => ({
  lastUploadButton: {
    color: '#334499',
    fontSize: 12,
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  clearIcon: {
    fontSize: 12,
  },
  required: {
    color: 'red',
  },
}));

const UploadFileQuestionWidget = ({
  pushAnswer,
  addNotification,
  uploadFile,

  required,
  id: widgetId,
  text = 'محل آپلود فایل',
  uploadedFile,
  isFetching,
}) => {
  const t = useTranslate();
  const [file, setFile] = useState({ link: '', name: '', value: '' });
  const classes = useStyles({ haveFile: file });

  useEffect(() => {
    setFile(uploadedFile);
    if (pushAnswer) {
      pushAnswer('upload_file_answer', uploadedFile?.id);
    }
  }, [uploadedFile]);

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        uploadFile({
          widgetId,
          answerFile: e.target.files[0],
        });
      } else {
        e.target.value = '';
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  const clearFile = (e) => {
    e.preventDefault();
    setFile({ link: '', name: '', value: '' });
    if (pushAnswer) {
      pushAnswer('upload_file_answer', '');
    }
  };

  return (
    <Grid container>
      <Grid item container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item xs={12} sm={6}>
          <Typography>
            {text}
            {required ? <span className={classes.required}>{'*'}</span> : ''}
          </Typography>
        </Grid>

        <Grid item container xs={12} sm={6} spacing={1} justifyContent="center" alignItems="center">
          <Grid item>
            <Button
              component="label"
              htmlFor={'raised-button-file-' + widgetId}
              disabled={isFetching}
              variant="contained"
              color="primary"
              startIcon={<CloudUploadIcon />}>
              {t('uploadFile')}
            </Button>
            <input
              value={file?.value}
              accept="application/pdf,image/*"
              style={{ display: 'none' }}
              id={'raised-button-file-' + widgetId}
              type="file"
              onChange={handleFileChange}
            />
          </Grid>

          {file?.name && file?.link && (
            <Grid item justifyContent="center" alignItems="center">
              <Button
                size="small"
                startIcon={
                  <IconButton size="small" onClick={clearFile}>
                    <ClearIcon className={classes.clearIcon} />
                  </IconButton>
                }
                variant='outlined'
                className={classes.lastUploadButton}
                href={file.link}
                component="a"
                download
                target="_blank">
                {file.name.length <= 20 ? file.name : file.name.substring(0, 20) + '...'}
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  uploadedFile: state.events.uploadedFile,
  isFetching: state.events.isFetching,
});

export default connect(mapStateToProps, {
  uploadFile: uploadFileAction,
  addNotification: addNotificationAction,
})(UploadFileQuestionWidget);
