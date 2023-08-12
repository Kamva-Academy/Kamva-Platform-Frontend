import { Button, Tooltip, IconButton } from '@mui/material';
import React, { FC, useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import HelpIcon from '@mui/icons-material/Help';

type CustomJoyrideButtonPropsType = {
  step?: Step;
}

const CustomJoyrideButton: FC<CustomJoyrideButtonPropsType> = ({

}) => {
  const [run, setRun] = useState(false);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  return (
    <>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        scrollToFirstStep
        run={run}
        disableScrolling
        disableOverlayClose
        hideCloseButton
        showSkipButton
        locale={{
          back: 'قبلی', close: 'حله', last: 'حله', next: 'بعدی', open: 'باز کن', skip: 'بی‌خیال'
        }}
        showProgress
        steps={[
          {
            disableBeacon: true,
            target: '.my-other-step',
            content: 'که کس مرغان وحشی را از این خوش‌تر نمی‌گیرد!',
          },
          {
            disableBeacon: true,
            target: '.my-first-step',
            content: 'بنازم جشم مستت را!',
          },
        ]}
      />
      <Tooltip title='راهنمای استفاده'>
        <IconButton onClick={() => setRun(true)}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};


export default CustomJoyrideButton;




