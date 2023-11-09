import { Step, StepLabel, Stepper } from '@mui/material';
import React, { FC } from 'react';
import { StepperStepType } from 'types/global';
import { ProgramType } from 'types/models';

type MyStepperPropsType = {
  program: ProgramType;
  activeStep: StepperStepType;
  registrationForm: any;
}

const MyStepper: FC<MyStepperPropsType> = ({
  activeStep,
  program,
  registrationForm,
}) => {

  const steps: StepperStepType[] = [];

  steps.push('تکمیل مشخصات شخصی');

  if (program.audience_type === 'Student') {
    steps.push('تکمیل مشخصات دانش‌آموزی');
  }

  if (program.audience_type === 'Academic') {
    steps.push('تکمیل مشخصات دانشجویی');
  }

  steps.push('تکمیل فرم ثبت‌نام')

  if (registrationForm.accepting_status == 'Manual') {
    steps.push('وضعیت ثبت‌نام')
  }

  if (program.merchandise) {
    steps.push('پرداخت هزینه')
  }

  steps.push('ورود به دوره')

  return (
    <Stepper sx={{ width: '100%' }} activeStep={steps.indexOf(activeStep)} alternativeLabel>
      {[...steps].map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};


export default MyStepper;
