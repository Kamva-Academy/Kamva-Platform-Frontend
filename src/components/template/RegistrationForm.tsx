import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AreYouSure from 'components/organisms/dialogs/AreYouSure';
import Widget from 'components/organisms/Widget';
import {
  getOneEventInfoAction,
  getOneRegistrationFormAction,
  submitRegistrationFormAction,
} from 'redux/slices/events';
import { WidgetModes } from 'components/organisms/Widget';
import ProgramInfo from 'components/organisms/ProgramInfo';
import { ProgramType, RegistrationFormType } from 'types/models';

const ANSWER_TYPES = {
  SmallAnswerProblem: 'SmallAnswer',
  BigAnswerProblem: 'BigAnswer',
  UploadFileProblem: 'UploadFileAnswer',
  MultiChoiceProblem: 'MultiChoiceAnswer',
  TextWidget: 'TextWidget',
  Image: 'Image',
  Video: 'Video',
  Game: 'Game',
  InviteeUsernameQuestion: 'InviteeUsernameResponse',
};

type RegistrationFormPropsType = {
  program: ProgramType;
  registrationForm: RegistrationFormType;
  submitRegistrationForm: any;
  getOneEventInfo: any;
}

const RegistrationForm: FC<RegistrationFormPropsType> = ({
  program,
  registrationForm,
  submitRegistrationForm,
  getOneEventInfo,
}) => {
  const { programId } = useParams();
  const [isDialogOpen, setDialogStatus] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getOneEventInfo({ programId });
  }, []);

  const submit = () => {
    submitRegistrationForm({
      id: program.registration_form,
      answers,
      programId,
    });
  };

  const collectAnswers = (problemId, widgetType) => (fieldName, answer) => {
    let isFound = false;
    const newAnswers = [...answers];
    for (let i = 0; i < newAnswers.length; i++) {
      if (newAnswers[i].problem === problemId) {
        if (answer) {
          newAnswers[i][fieldName] = answer;
        } else {
          newAnswers.splice(i, 1);
        }
        isFound = true;
        break;
      }
    }
    if (!isFound) {
      newAnswers.push({
        [fieldName]: answer,
        answer_type: widgetType,
        problem: problemId,
        // todo: fix TOF
        question: problemId,
      });
    }
    setAnswers(newAnswers);
  };

  const isSubmitButtonDisabled = (): { isDisabled: boolean; message: string; } => {
    return {
      isDisabled:
        program.user_registration_status == 'DeadlineMissed' ||
        program.user_registration_status == 'NotPermitted' ||
        program.user_registration_status == 'GradeNotAvailable' ||
        program.user_registration_status == 'StudentshipDataIncomplete',
      message:
        program.user_registration_status == 'DeadlineMissed' ? 'مهلت ثبت‌نام تمام شده است' :
          program.user_registration_status == 'NotPermitted' ? 'با توجه به پایه تحصیلیتان، شما مجاز به شرکت در این رویداد نیستید' :
            program.user_registration_status == 'GradeNotAvailable' ? 'ابتدا پایه‌ی تحصیلی خود را انتخاب کنید' :
              program.user_registration_status == 'StudentshipDataIncomplete' ? 'مشخصات دانش‌آموزی‌تان کامل نیست' :
                'خبری نیست، سلامتی!'
    }
  }

  return (
    <Stack spacing={2}>
      <ProgramInfo program={program} />
      <Stack width={'100%'} component={Paper} padding={2} spacing={2}>
        {registrationForm.widgets.map((widget) => (
          <Box key={widget.id}>
            <Widget
              coveredWithPaper={false}
              mode={WidgetModes.InAnswerSheet}
              collectAnswers={collectAnswers(widget.id, ANSWER_TYPES[widget.widget_type])}
              widget={widget}
            />
          </Box>
        ))}
        {isSubmitButtonDisabled().isDisabled &&
          <Typography color={'red'} textAlign={'center'} fontSize={24} fontWeight={400}>
            {isSubmitButtonDisabled().message}
          </Typography>
        }
        <Button
          disabled={isSubmitButtonDisabled().isDisabled}
          variant="contained"
          color="primary"
          onClick={() => setDialogStatus(true)}>
          {'ثبت‌نام'}
        </Button>
      </Stack >
      <AreYouSure
        open={isDialogOpen}
        handleClose={() => {
          setDialogStatus(!isDialogOpen);
        }}
        callBackFunction={submit}
      />
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.account.userInfo,
  program: state.events.event,
  registrationForm: state.events.registrationForm,
  isFetching: state.events.isFetching,
});

export default connect(mapStateToProps, {
  getOneRegistrationForm: getOneRegistrationFormAction,
  getOneEventInfo: getOneEventInfoAction,
  submitRegistrationForm: submitRegistrationFormAction,
})(RegistrationForm);
