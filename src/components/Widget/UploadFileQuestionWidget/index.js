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

import {
  uploadFileAction,
} from '../../../redux/slices/events';
import { addNotificationAction } from '../../../redux/slices/notifications';
import {
  makeAnswerEmptyAction,
} from '../../../redux/slices/widget';

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
  makeAnswerEmpty,

  viewMode,
  disabled,
  last_submitted_answer,
  required,
  id: widgetId,
  text = 'محل آپلود فایل',
}) => {
  const t = useTranslate();
  const [file, setFile] = useState({ link: '', name: '', value: '' });
  const [isButtonDisabled, setButtonDisable] = useState(false);
  const classes = useStyles({ haveFile: file });

  useEffect(() => {
    if (last_submitted_answer) {
      setFile({
        link: `https://backend.rastaiha.ir${last_submitted_answer?.answer_file}`,
        name: 'آخرین فایل ارسالی'
      })
    }
  }, [])

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 21e6) {
        setButtonDisable(true);
        setTimeout(() => {
          setButtonDisable(false);
        }, 20000);
        uploadFile({
          widgetId,
          answerFile: e.target.files[0],
          name: e.target.files[0].name,
        }).then((action) => {
          setFile({
            link: action.payload?.response?.answer_file,
            name: action?.meta?.arg?.answerFile?.name,
          });
          if (pushAnswer) {
            pushAnswer('upload_file_answer', action.payload?.response?.id);
          }
        });
      } else {
        e.target.value = '';
        addNotification({
          message: 'حداکثر حجم فایل ارسالی،  ۲۰ مگابایت است.',
          type: 'error',
        });
      }
    }
  };

  const clearFile = (e) => {
    e.preventDefault();
    setFile({ link: '', name: '', value: '' });
    makeAnswerEmpty({ widgetId });
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
          {!viewMode &&
            <Grid item>
              <Button
                component="label"
                htmlFor={'raised-button-file-' + widgetId}
                disabled={isButtonDisabled || disabled}
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}>
                {t('uploadFile')}
              </Button>
              <input
                value={file?.value}
                accept="application/pdf,image/*,.zip,.rar"
                style={{ display: 'none' }}
                id={'raised-button-file-' + widgetId}
                type="file"
                onChange={handleFileChange}
              />
            </Grid>
          }

          {file?.name && file?.link && (
            <Grid item justifyContent="center" alignItems="center">
              <Button
                size="small"
                startIcon={
                  viewMode ? '' :
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
});

export default connect(
  mapStateToProps,
  {
    uploadFile: uploadFileAction,
    addNotification: addNotificationAction,
    makeAnswerEmpty: makeAnswerEmptyAction,
  }
)(UploadFileQuestionWidget);
