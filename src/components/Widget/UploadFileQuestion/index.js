import React from 'react';
import { Button, Divider, makeStyles, Typography } from '@material-ui/core';
import {
  CloudUpload as CloudUploadIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@material-ui/icons';

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

const UploadFileQuestion = ({
  content = 'محل آپلود فایل',
  src = '',
  lastFile = '',
}) => {
  const classes = useStyles({ haveFile: !!lastFile });
  return (
    <div>
      <div className={classes.flex}>
        <Typography>{content}</Typography>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
        />
        <Button
          component="label"
          htmlFor="raised-button-file"
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

export default UploadFileQuestion;
