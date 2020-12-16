import { Button, Divider, makeStyles, Typography } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';

import { sendFileAnswer } from '../../../redux/actions/currentState';
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
  id,
  text = 'محل آپلود فایل',
  last_submit,
  disabled = true,
  playerId,
  sendFileAnswer,
}) => {
  const classes = useStyles({ haveFile: !!last_submit });
  const onChangeFile = async (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        sendFileAnswer({
          answer_file: e.target.files[0],
          playerId,
          problemId: id,
        });
      } else {
        e.target.value = '';
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  return (
    <div>
      <div className={classes.flex}>
        <Typography>{text}</Typography>
        <input
          accept="application/pdf,image/*"
          style={{ display: 'none' }}
          id={'raised-button-file' + id}
          type="file"
          onChange={onChangeFile}
        />
        <Button
          component="label"
          htmlFor={disabled || !playerId ? '' : 'raised-button-file' + id}
          disabled={disabled || !playerId}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<CloudUploadIcon />}
          className={classes.uploadButton}>
          بارگذاری فایل
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
              href={'http://rastaiha.ir' + last_submit.answer_file} // TODO: fix in back
              component="a"
              download
              target="_blank">
              {last_submit.file_name}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.currentState.player?.id,
});

export default connect(mapStateToProps, { sendFileAnswer })(
  UploadFileQuestionWidget
);
