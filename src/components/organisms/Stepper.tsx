import { Step, StepLabel, Stepper } from '@mui/material';
import React, { FC } from 'react';
import { RegistrationStepNameType, RegistrationStepType } from 'types/global';
import useWidth from 'utils/UseWidth';

type MyStepperPropsType = {
  steps: RegistrationStepType[];
  activeStep: RegistrationStepNameType;
}

const MyStepper: FC<MyStepperPropsType> = ({
  steps,
  activeStep,
}) => {
  const width = useWidth();
  return (
    <Stepper
      sx={{ width: '100%' }}
      orientation={width === 'xs' || width === 'sm' ? 'horizontal' : 'vertical'}
      activeStep={steps.indexOf(steps.find(step => step.name === activeStep))}
      alternativeLabel={width === 'xs' || width === 'sm' ? true : false}>
      {
        [...steps].map((step) => (
          <Step key={step.name}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))
      }
    </Stepper >
  );
};


export default MyStepper;
