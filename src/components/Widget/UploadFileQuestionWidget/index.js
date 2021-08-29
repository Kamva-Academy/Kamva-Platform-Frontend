import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { uploadFileAction } from '../../../redux/slices/events';
import { addNotificationAction } from '../../../redux/slices/notifications';

const useStyles = makeStyles((theme) => ({
  uploadButton: {
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
  },
  small: {
    fontSize: 10,
  },
  lastUploadButton: {
    color: '#334499',
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const UploadFileQuestionWidget = ({
  pushAnswer,
  addNotification,
  uploadFile,

  id,
  text = 'محل آپلود فایل',
  last_submit,
  uploadedFile,
  isFetching,
}) => {
  const t = useTranslate();
  const [file, setFile] = useState({ link: '', name: '', value: '' });
  const classes = useStyles({ haveFile: file });

  React.useEffect(() => {
    setFile(uploadedFile);
    pushAnswer('upload_file_answer', uploadedFile?.id);
  }, [uploadedFile]);

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        uploadFile({
          id,
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
    pushAnswer('upload_file_answer', '');
  };

  return (
    <Grid container>
      <Grid item container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography>{text}</Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={6}
          justifyContent="center"
          alignItems="center">
          <Grid item>
            <Button
              component="label"
              htmlFor={'raised-button-file' + id}
              disabled={isFetching}
              variant="contained"
              color="primary"
              size="small"
              startIcon={<CloudUploadIcon />}
              className={classes.uploadButton}>
              {t('uploadFile')}
            </Button>
            <input
              value={file?.value}
              accept="application/pdf,image/*"
              style={{ display: 'none' }}
              id={'raised-button-file' + id}
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
                    <ClearIcon />
                  </IconButton>
                }
                className={classes.lastUploadButton}
                href={file.link}
                component="a"
                download
                target="_blank">
                {file.name}
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  pushAnswer: ownProps.pushAnswer, //todo: redundant?!
  uploadedFile: state.events.uploadedFile,
  isFetching: state.events.isFetching,
});

export default connect(mapStateToProps, {
  uploadFile: uploadFileAction,
  addNotification: addNotificationAction,
})(UploadFileQuestionWidget);
