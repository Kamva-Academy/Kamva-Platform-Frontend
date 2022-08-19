import { Button, IconButton, Stack, Typography } from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import {
  uploadFileAnswerAction,
  makeAnswerEmptyAction,
} from '../../../redux/slices/Paper';
import UploadFileProblemEditWidget from './edit';
import { WidgetModes } from '..';
import { baseURL } from '../../../configs/axios'

type UploadFileProblemWidgetPropsType = {
  collectAnswers: any;
  uploadFileAnswer: any;
  makeAnswerEmpty: any;
  id: number;
  text: string;
  last_submitted_answer: any;
  isFetching: boolean;
  mode: WidgetModes;
}

const UploadFileProblemWidget: FC<UploadFileProblemWidgetPropsType> = ({
  collectAnswers,
  uploadFileAnswer,
  makeAnswerEmpty,
  id: widgetId,
  text = 'محل بارگذاری فایل:',
  last_submitted_answer,
  isFetching,
  mode,
  ...props
}) => {
  const t = useTranslate();
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (last_submitted_answer) {
      setFile({
        link: last_submitted_answer.answer_file,
        name: 'آخرین فایل ارسالی',
      })
    }
  }, [last_submitted_answer])

  const changeFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 8e6) {
        uploadFileAnswer({
          problemId: widgetId,
          fileName: file.name,
          answerFile: file,
        }).then((response) => {
          if (response.type?.endsWith('fulfilled')) {
            setFile({
              link: response.payload?.response?.answer_file,
              name: file.name,
            });
            if (mode === WidgetModes.InAnswerSheet) {
              collectAnswers('upload_file_answer', response.payload?.response?.id);
            }
          } else {
            e.target.value = null;
          }
        })
      } else {
        e.target.value = null;
        e.target.setCustomValidity('Maximum upload file size is 8 MB.');
        e.target.reportValidity();
      }
    }
  };

  const clearFile = (e) => {
    e.preventDefault();
    makeAnswerEmpty({ widgetId }).then((response) => {
      if (response.type?.endsWith('fulfilled')) {
        setFile(null);
        if (mode === WidgetModes.InAnswerSheet) {
          collectAnswers('upload_file_answer', null);
        }
      }
    });
  }

  console.log(file?.link)

  return (
    <Stack alignItems='center' justifyContent='space-between' direction='row' spacing={1}>
      <Typography>{text}</Typography>
      <Stack justifyContent='flex-end' spacing={1}>
        {(mode === WidgetModes.View || mode === WidgetModes.InAnswerSheet) &&
          <>
            <Button
              component="label"
              htmlFor={'raised-button-file' + widgetId}
              disabled={isFetching}
              variant="contained"
              color="primary"
              size="small"
              startIcon={<CloudUploadIcon />}
              sx={{ whiteSpace: 'nowrap' }}>
              {t('uploadFile')}
            </Button>
            <input
              accept="application/pdf,image/*"
              style={{ display: 'none' }}
              id={'raised-button-file' + widgetId}
              type="file"
              onChange={changeFile}
            />
            {file?.link &&
              <Button
                size="small"
                variant='outlined'
                sx={{
                  whiteSpace: 'nowrap',
                }}
                endIcon={
                  <IconButton size='small' onClick={clearFile}>
                    <ClearIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                }
                href={baseURL + file?.link}
                component="a"
                target="_blank">
                {file?.name}
              </Button>
            }
          </>
        }
      </Stack>
      {mode === WidgetModes.Review && !file?.link &&
        <Typography color='red' variant='caption'>
          {'پاسخی برای این سوال ثبت نشده است.'}
        </Typography>
      }
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.paper.isFetching,
});

export default connect(
  mapStateToProps,
  {
    uploadFileAnswer: uploadFileAnswerAction,
    makeAnswerEmpty: makeAnswerEmptyAction,
  }
)(UploadFileProblemWidget);

export { UploadFileProblemEditWidget };
