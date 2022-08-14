import { Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  CloudUpload as CloudUploadIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
} from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import UploadFileProblemEditWidget from './edit';
import { WidgetModes } from '..';

type UploadFileProblemWidgetPropsType = {
  pushAnswer: any;
  id: number;
  text: string;
  answer_file: any;
  uploadFile: any;
  isFetching: boolean;
  mode: WidgetModes;
}

const UploadFileProblemWidget: FC<UploadFileProblemWidgetPropsType> = ({
  pushAnswer,
  id,
  text = 'محل آپلود فایل:',
  answer_file,
  uploadFile,
  isFetching,
  mode,
}) => {
  const t = useTranslate();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (answer_file) {
      setFile({
        link: answer_file,
        name: 'پاسخ'
      })
    }
  }, [answer_file])

  const changeFile = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.target.files[0]) {
      if (e.target.files[0].size <= 8e6) {
        uploadFile({
          id,
          answerFile: e.target.files[0],
        }).then((response) => {
          if (response.type?.endsWith('fulfilled')) {
            setFile({
              link: response.payload?.response?.answer_file,
              name: e.target.files[0].name,
            });
            pushAnswer('upload_file_answer', response.payload?.response?.id);
          }
        })
      } else {
        e.target.value = '';
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    if (pushAnswer) {
      pushAnswer('upload_file_answer', '');
    }
  }

  return (
    <Grid container>
      <Grid item container justifyContent='center' alignItems='center'>
        <Grid item xs={12} sm={6}>
          <Typography>{text}</Typography>
        </Grid>
        <Grid item container xs={12} sm={6} direction='column' alignItems='center'>
          {mode === WidgetModes.View &&
            <Grid item>
              <Button
                component="label"
                htmlFor={'raised-button-file' + id}
                disabled={isFetching}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<CloudUploadIcon />}
                sx={{
                  marginLeft: 'auto',
                  whiteSpace: 'nowrap',
                }}>
                {t('uploadFile')}
              </Button>
              <input
                accept="application/pdf,image/*"
                style={{ display: 'none' }}
                id={'raised-button-file' + id}
                type="file"
                onChange={changeFile}
              />
            </Grid>
          }
          {file?.link &&
            <Grid container justifyContent='center' alignItems='center'>
              <Grid item>
                <Typography variant='caption'>
                  {'آخرین ارسال:'}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  endIcon={<DescriptionOutlinedIcon />}
                  sx={{
                    color: '#334499',
                    '& .MuiButton-endIcon': {
                      marginLeft: 2,
                    }
                  }}
                  href={file?.link}
                  component="a"
                  target="_blank">
                  {file?.name}
                </Button>
              </Grid>
              {mode === WidgetModes.Edit &&
                <Grid item>
                  <IconButton size='small' onClick={clearFile}>
                    <ClearIcon />
                  </IconButton>
                </Grid>
              }
            </Grid>
          }
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  playerId: state.currentState.player?.id,
  isFetching: state.events.isFetching,
});

export default connect(mapStateToProps)(UploadFileProblemWidget);

export { UploadFileProblemEditWidget };
