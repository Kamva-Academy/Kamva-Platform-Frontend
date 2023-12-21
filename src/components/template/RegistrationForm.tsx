import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import AreYouSure from 'components/organisms/dialogs/AreYouSure';
import Widget from 'components/organisms/Widget';
import {
  getOneRegistrationFormAction,
  submitRegistrationFormAction,
} from 'redux/slices/events';
import { WidgetModes } from 'components/organisms/Widget';
import ProgramInfo from 'components/organisms/ProgramInfo';
import { ProgramType, RegistrationFormType } from 'types/models';
import useCollectWidgetsAnswers from 'components/Hooks/useCollectWidgetsAnswers';

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
}

const RegistrationForm: FC<RegistrationFormPropsType> = ({
  program,
  registrationForm,
  submitRegistrationForm,
}) => {
  const { programId } = useParams();
  const [isDialogOpen, setDialogStatus] = useState(false);
  const { answers, setAnswers, collectAnswers } = useCollectWidgetsAnswers([]);

  const submit = () => {
    submitRegistrationForm({
      id: registrationForm.id,
      answers,
      programId,
    });
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

  if (!program || !registrationForm) return null;

  return (
    <Stack spacing={2}>
      <ProgramInfo program={program} />
      <Stack width={'100%'} component={Paper} padding={2} spacing={2}>
        {registrationForm.widgets.map((widget) => (
          <Box key={widget.id}>
            <Widget
              paperId={registrationForm.id}
              coveredWithPaper={false}
              mode={WidgetModes.InAnswerSheet}
              collectDataForPaper={collectAnswers({ widgetId: widget.id, widgetType: ANSWER_TYPES[widget.widget_type] })}
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
  submitRegistrationForm: submitRegistrationFormAction,
})(RegistrationForm);
