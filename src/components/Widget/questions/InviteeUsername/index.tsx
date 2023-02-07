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
import { sendInviteeUsernameResponseAction } from '../../../../redux/slices/Paper';
import { checkUsernameAction } from '../../../../redux/slices/Question';
import TinyPreview from '../../../tiny_editor/react_tiny/Preview';
import { WidgetModes } from '../..';
import InviteeUsernameEdit from './edit';
import { toast } from 'react-toastify';

type InviteeUsernamePropsType = {
  sendInviteeUsernameResponse: any;
  checkUsername: any;
  inviteeUserFirstName: string;
  inviteeUserLastName: string;
  isFetching: boolean;
  collectAnswers: any;
  id: number;
  mode: WidgetModes;
  text: string;
  answer: any;
  last_submitted_answer: any;
}

const InviteeUsername: FC<InviteeUsernamePropsType> = ({
  sendInviteeUsernameResponse,
  checkUsername,
  collectAnswers,
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
    if (username.length > 9) {
      checkUsername({ username });
    }
  }, [username])

  const changeText = (e) => {
    if (mode === WidgetModes.InAnswerSheet) {
      collectAnswers('username', e.target.value);
    }
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
    sendInviteeUsernameResponse({ widgetId: paperId, username });
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
              error={!!username && !inviteeUserFirstName}
              helperText={username && inviteeUserFirstName && `شما توسط ${inviteeUserFirstName} ${inviteeUserLastName} به این رویداد دعوت شده‌اید!`}
            />
            {mode === WidgetModes.View &&
              <Button
                variant="contained"
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
  playerId: state.currentState.player?.id,
  inviteeUserFirstName: state.question.inviteeUserFirstName,
  inviteeUserLastName: state.question.inviteeUserLastName,
  isFetching: state.question.isFetching,
});

export default connect(mapStateToProps, {
  sendInviteeUsernameResponse: sendInviteeUsernameResponseAction,
  checkUsername: checkUsernameAction,
})(InviteeUsername);

export { InviteeUsernameEdit };
