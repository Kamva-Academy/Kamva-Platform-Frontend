import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { checkUsernameAction } from 'redux/slices/Question';
import TinyPreview from 'components/tiny_editor/react_tiny/Preview';
import { WidgetModes } from '../..';
import InviteeUsernameEdit from './edit';
import isPhoneNumber from 'utils/validators/isPhoneNumber';

type InviteeUsernamePropsType = {
  onAnswerSubmit: any;
  onAnswerChange: any;

  checkUsername: any;
  inviteeUserFirstName: string;
  inviteeUserLastName: string;
  isFetching: boolean;
  id: number;
  mode: WidgetModes;
  text: string;
  answer: any;
  last_submitted_answer: any;
}

const InviteeUsername: FC<InviteeUsernamePropsType> = ({
  onAnswerSubmit,
  onAnswerChange,

  checkUsername,
  id: paperId,
  inviteeUserFirstName,
  inviteeUserLastName,
  isFetching,
  mode,
  text: questionText,
  last_submitted_answer,
  answer: mainAnswer,
}) => {
  const t = useTranslate();
  const [username, setUsername] = useState<string>(last_submitted_answer ? last_submitted_answer.text : '');
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  useEffect(() => {
    if (isPhoneNumber(username)) {
      checkUsername({ username });
    }
  }, [username])

  const changeText = (e) => {
    onAnswerChange({ username: e.target.value });
    setUsername(e.target.value);
  }

  const submit = () => {
    if (!username) {
      return;
    }
    setDisableSubmitButton(true);
    setTimeout(() => {
      setDisableSubmitButton(false);
    }, 20000);
    onAnswerSubmit({ widgetId: paperId, username });
  }

  return (
    <Stack spacing={1}>
      <TinyPreview
        frameProps={{
          frameBorder: '0',
          scrolling: 'no',
          width: '100%',
        }}
        content={questionText}
      />
      <Stack
        direction='row'
        justifyContent='flex-start'
        alignItems="stretch"
        spacing={1}>
        {(mode === WidgetModes.View || mode === WidgetModes.InAnswerSheet) &&
          <>
            <TextField
              InputProps={{
                endAdornment:
                  isFetching ? (
                    <InputAdornment position="start">
                      <CircularProgress size={25} />
                    </InputAdornment>
                  ) : <></>
              }}
              fullWidth
              variant='outlined'
              value={username}
              placeholder={'شماره تلفن همراه معرف'}
              onChange={changeText}
              size="small"
              error={!!username && !(inviteeUserFirstName && isPhoneNumber(username))}
              helperText={username &&
                ((inviteeUserFirstName && isPhoneNumber(username))
                  ? `شما توسط ${inviteeUserFirstName} ${inviteeUserLastName} به این دوره دعوت شده‌اید!`
                  : 'نام کاربری معتبر نیست')}
              color={username && inviteeUserFirstName && isPhoneNumber(username) ? 'success' : null}
            />
            {mode === WidgetModes.View &&
              <Button
                variant="outlined"
                color="primary"
                sx={{ whiteSpace: 'nowrap' }}
                disabled={disableSubmitButton}
                onClick={submit}>
                {t('submit')}
              </Button>
            }
          </>
        }
        {mode === WidgetModes.Review &&
          <>
            {username ?
              <Typography>{username}</Typography> :
              <Typography color='red' variant='caption'>
                {'پاسخی برای این سوال ثبت نشده است.'}
              </Typography>
            }
          </>
        }
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  inviteeUserFirstName: state.question.inviteeUserFirstName,
  inviteeUserLastName: state.question.inviteeUserLastName,
  isFetching: state.question.isFetching,
});

export default connect(mapStateToProps, {
  checkUsername: checkUsernameAction,
})(InviteeUsername);

export { InviteeUsernameEdit };
