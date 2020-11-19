import React from 'react';
import { Button, Divider, makeStyles, Typography } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@material-ui/icons';
import UploadFileQuestionEditWidget from './edit';
import { sendFileAnswer } from '../../../redux/actions/currentWorkshop';
import { connect } from 'react-redux';

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
  lastFile,
  disabled = true,
  sendFileAnswer,
}) => {
  const classes = useStyles({ haveFile: !!lastFile });
  return (
    <div>
      <div className={classes.flex}>
        <Typography>{text}</Typography>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={(e) =>
            sendFileAnswer({
              answer_file: e.target.files[0],
              // player,
              problem: id,
            })
          }
        />
        <Button
          component="label"
          htmlFor={disabled ? '' : 'raised-button-file'}
          disabled={disabled}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<CloudUploadIcon />}
          className={classes.uploadButton}>
          بارگذاری فایل
        </Button>
      </div>
      {lastFile && (
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
              href={lastFile.src}
              component="a"
              download
              target="_blank">
              {lastFile.name}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default connect(null, { sendFileAnswer })(UploadFileQuestionWidget);
