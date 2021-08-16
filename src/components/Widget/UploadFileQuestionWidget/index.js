import { Button, Divider, makeStyles, Typography } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { baseURL } from '../../../axios';
import { sendFileAnswerAction } from '../../../redux/slices/currentState';
import UploadFileQuestionEditWidget from './edit';

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
  id,
  text = 'محل آپلود فایل',
  last_submit,
  disabled,
  answerSheetId,
  sendFileAnswer,
}) => {
  const t = useTranslate();
  const classes = useStyles({ haveFile: !!last_submit });
  const [file, setFile] = useState();

  const handleFileChange = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        pushAnswer('file', e.target.files[0]);
        setFile({
          answer_file: e.target.files[0], // todo
        });
      } else {
        e.target.value = '';
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  const handleButtonClick = () => {
    sendFileAnswer(file);
  }

  return (
    <div>
      <div className={classes.flex}>
        <Typography>{text}</Typography>
        <input
          accept="application/pdf,image/*"
          style={{ display: 'none' }}
          id={'raised-button-file' + id}
          type="file"
          onChange={handleFileChange}
        />
        <Button
          component="label"
          htmlFor={disabled || !answerSheetId ? '' : 'raised-button-file' + id}
          disabled={disabled || !answerSheetId}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<CloudUploadIcon />}
          className={classes.uploadButton}>
          {t('uploadFile')}
        </Button>
      </div>
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
          <Button fullWidth variant='contained' color='primary'>
            {'ارسال'}
          </Button>
        </>
      }
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  playerId: state.currentState.player?.id,
  pushAnswer: ownProps.pushAnswer, //todo: redundant?!
});

export default connect(mapStateToProps, {
  sendFileAnswer: sendFileAnswerAction,
})(UploadFileQuestionWidget);
