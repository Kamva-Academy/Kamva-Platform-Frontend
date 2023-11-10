import { Step, StepLabel, Stepper } from '@mui/material';
import React, { FC } from 'react';
import { RegistrationStepNameType, RegistrationStepType } from 'types/global';

type MyStepperPropsType = {
  steps: RegistrationStepType[];
  activeStep: RegistrationStepNameType;
}

const MyStepper: FC<MyStepperPropsType> = ({
  steps,
  activeStep,
}) => {
  return (
    <Stepper sx={{ width: '100%' }} activeStep={steps.indexOf(steps.find(step => step.name === activeStep))} alternativeLabel>
      {[...steps].map((step) => (
        <Step key={step.name}>
          <StepLabel>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};


export default MyStepper;
