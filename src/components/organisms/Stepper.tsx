import { Step, StepButton, StepLabel, Stepper } from '@mui/material';
import React, { FC } from 'react';
import { RegistrationStepNameType, RegistrationStepType } from 'types/global';
import useWidth from 'utils/UseWidth';

type MyStepperPropsType = {
  steps: RegistrationStepType[];
  activeStepIndex: number;
}

const MyStepper: FC<MyStepperPropsType> = ({
  steps,
  activeStepIndex,
}) => {
  const width = useWidth();
  return (
    <Stepper
      sx={{ width: '100%' }}
      orientation={width === 'xs' || width === 'sm' ? 'horizontal' : 'vertical'}
      activeStep={activeStepIndex}
      alternativeLabel={width === 'xs' || width === 'sm' ? true : false}>
      {
        [...steps].map((step) => (
          <Step key={step.name}>
            <StepButton onClick={step.onClick}>{step.label}</StepButton>
          </Step>
        ))
      }
    </Stepper >
  );
};


export default MyStepper;
