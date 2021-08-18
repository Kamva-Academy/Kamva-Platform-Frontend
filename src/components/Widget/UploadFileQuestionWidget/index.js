import { Button, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { baseURL } from '../../../axios';
import { uploadFileAction } from '../../../redux/slices/events';
import UploadFileQuestionEditWidget from './edit';

import ClearIcon from '@material-ui/icons/Clear';
export { UploadFileQuestionEditWidget };

const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  uploadButton: {
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
  },
  small: {
    fontSize: 10,
  },
  lastUploadButton: {
    fontSize: 10,
    color: '#334499',
    '& .MuiButton-endIcon': {
      marginLeft: 2,
      '& > *:first-child': {
        fontSize: 11,
      },
    },
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const UploadFileQuestionWidget = ({
  pushAnswer,
  widgetId,
  text = 'محل آپلود فایل',
  last_submit,
  disabled,
  answerSheetId,
  uploadFile,
}) => {
  const t = useTranslate();
  const classes = useStyles({ haveFile: !!last_submit });
  const [file, setFile] = useState();

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        pushAnswer('answer_file', e.target.files[0]);
        setFile(
          e.target.files[0] // todo
        );
      } else {
        e.target.value = '';
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  const handleButtonClick = () => {
    uploadFile(file);
  }

  console.log(file)

  return (
    <Grid container>
      <Grid item container justify='center' alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Typography>{text}</Typography>
        </Grid>
        <Grid item container xs={12} sm={6} direction='column' alignItems='center'>
          <Grid item>
            <Button
              component="label"
              htmlFor={'raised-button-file' + pushAnswer}
              disabled={disabled || !answerSheetId}
              variant="contained"
              color="primary"
              size="small"
              startIcon={<CloudUploadIcon />}
              className={classes.uploadButton}>
              {t('uploadFile')}
            </Button>
            <input
              accept="application/pdf,image/*"
              style={{ display: 'none' }}
              id={'raised-button-file' + pushAnswer}
              type="file"
              onChange={handleFileChange}
            />
          </Grid>
          {file?.name &&
            <Grid item>
              <IconButton size='small' onClick={() => setFile()}>
                <ClearIcon />
              </IconButton>
              <Typography variant='caption'>{file?.name}</Typography>
            </Grid>
          }
        </Grid>

      </Grid>
      {last_submit && (
        <>
          <Divider className={classes.divider} />
          <div className={classes.flex}>
            <Typography
              component="small"
              variant="body2"
              className={classes.small}>
              آخرین ارسال:
            </Typography>
            <Button
              size="small"
              endIcon={<DescriptionOutlinedIcon />}
              className={classes.lastUploadButton}
              href={baseURL + last_submit.answer_file} // TODO: fix in back
              component="a"
              download
              target="_blank">
              {last_submit.file_name}
            </Button>
          </div>
        </>
      )}
      {!pushAnswer &&
        <>
          <br />
          <Button fullWidth variant='contained' color='primary' onClick={pushAnswer}>
            {'ارسال'}
          </Button>
        </>
      }
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => ({
  playerId: state.currentState.player?.id,
  pushAnswer: ownProps.pushAnswer, //todo: redundant?!
});

export default connect(mapStateToProps, {
  uploadFile: uploadFileAction,
})(UploadFileQuestionWidget);
