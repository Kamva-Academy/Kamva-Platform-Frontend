import React, { useState } from 'react';
import FromTemplate from './pageTemplate/FormTemplate';
import { Box } from '@material-ui/core';
import EmailInput from './components/EmailInput';
import { setAccountData } from '../../../redux/actions/account';
import { connect } from 'react-redux';
import TextInput from './components/TextInput';

function NameAndEmail({ setAccountData }) {
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const onSubmit = () => {
    setAccountData({ email, first_name, last_name });
  };

  return (
    <FromTemplate
      onSubmit={onSubmit}
      title="ثبت‌نام"
      submitText="ثبت"
      formContent={
        <>
          <Box my={1}>
            <TextInput
              autoFocus
              label="نام"
              placeholder="نام خود را وارد کنید"
              onChange={setFirstName}
            />
          </Box>
          <Box my={1}>
            <TextInput
              label="نام‌خانوادگی"
              placeholder="نام‌خانوادگی خود را وارد کنید"
              onChange={setLastName}
            />
          </Box>
          <Box my={1}>
            <EmailInput
              onChange={setEmail}
              label="آدرس ایمیل"
              placeholder="ایمیل خود را وارد کنید"
            />
          </Box>
        </>
      }
    />
  );
}

export default connect(null, { setAccountData })(NameAndEmail);
