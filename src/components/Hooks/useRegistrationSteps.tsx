import React, { useEffect, useState } from 'react';

import Form from 'components/template/RegistrationForm';
import Status from 'components/template/RegistrationStatus';
import Payment from 'components/template/Payment';
import { RegistrationStepNameType, RegistrationStepType } from 'types/global';
import Profiles from 'components/template/Profile';


const useRegistrationSteps = ({
  program,
  registrationForm,
}) => {
  const [currentStepNameIndex, setCurrentStepIndex] = useState<number>(0);
  const [lastActiveStepIndex, setLastActiveIndex] = useState<number>(0);
  const [steps, setSteps] = useState<RegistrationStepType[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const goToStep = (destinationStepIndex: number) => {
      setCurrentStepIndex(destinationStepIndex);
      if (destinationStepIndex > lastActiveStepIndex) {
        setLastActiveIndex(destinationStepIndex);
      }
    }

    const getStepIndex = (stepName: RegistrationStepNameType) => {
      return steps.indexOf(steps.find(step => step.name === stepName));
    }

    const goToNextStep = () => {
      goToStep(currentStepNameIndex + 1);
    }

    if (!program || !registrationForm) return;
    const steps: RegistrationStepType[] = [];

    steps.push({
      name: 'personal-profile',
      label: 'تکمیل مشخصات شخصی',
      component: <Profiles type='personal' onSuccess={() => goToNextStep()} />,
      onClick: () => goToStep(getStepIndex('personal-profile')),
    })

    if (program.audience_type === 'Student') {
      steps.push({
        name: 'student-profile',
        label: 'تکمیل مشخصات دانش‌آموزی',
        component: <Profiles type='student' onSuccess={() => goToNextStep()} />,
        onClick: () => goToStep(getStepIndex('student-profile'))
      })
    }

    if (program.audience_type === 'Academic') {
      steps.push({
        name: 'academic-profile',
        label: 'تکمیل مشخصات دانشجویی',
        component: <Profiles type='academic' onSuccess={() => goToNextStep()} />,
        onClick: () => goToStep(getStepIndex('academic-profile'))
      })
    }

    steps.push({
      name: 'form',
      label: 'تکمیل فرم ثبت‌نام',
      component: <Form />,
      onClick: () => goToStep(getStepIndex('form'))
    })

    if (registrationForm.accepting_status == 'Manual') {
      steps.push({
        name: 'status',
        label: 'وضعیت ثبت‌نام',
        component: <Status />,
        onClick: () => goToStep(getStepIndex('status')),
      })
    }

    if (program.merchandise) {
      steps.push({
        name: 'payment',
        label: 'پرداخت هزینه',
        component: <Payment />,
        onClick: () => goToStep(getStepIndex('payment')),
      })
    }

    steps.push({
      name: 'program',
      label: 'ورود به دوره',
      component: null,
    })

    if (isFirstRender) {
      if (['Waiting', 'Rejected'].includes(program?.user_registration_status)) {
        goToStep(getStepIndex('status'));
      }
      if (program?.merchandise && program?.user_registration_status === 'Accepted') {
        goToStep(getStepIndex('payment'));
      }
      setIsFirstRender(false);
    }

    setSteps(steps);
  }, [program, registrationForm, currentStepNameIndex, lastActiveStepIndex]);

  return {
    currentStepNameIndex,
    lastActiveStepIndex,
    steps,
  }
}

export default useRegistrationSteps;