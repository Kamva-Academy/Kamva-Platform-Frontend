import { Paper, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ProgramType } from 'types/models';

type StatusPropsType = {
  program: ProgramType;
}

const Status: FC<StatusPropsType> = ({
  program
}) => {

  return (
    <Stack spacing={4}>
      <Typography align="center"
        sx={{
          fontSize: 40,
          fontWeight: 600,
          textShadow: '1px 1px #dbd9d9',
        }}>
        {'وضعیت ثبت‌نام'}
      </Typography>
      <Stack component={Paper} padding={2} spacing={2}>
        {program.user_registration_status == 'Waiting' && (
          <Typography align="center">
            {'شما فرم‌ثبت‌نام در این دوره را پر کرده‌اید! منتظر نتیجه‌ی بررسی از جانب ما باشید.'}
          </Typography>
        )}
        {program.user_registration_status == 'Rejected' && (
          <Typography align="center">
            {'متاسفانه شما برای شرکت در این دوره پذیرفته‌نشده‌اید :('}
          </Typography>
        )}
      </Stack>
    </Stack >
  );
};

const mapStateToProps = (state) => ({
  program: state.events.event
});

export default connect(mapStateToProps)(Status);
