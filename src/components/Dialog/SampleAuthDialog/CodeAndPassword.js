import React, { useRef, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import CustomVerificationCode from './components/CustomVerificationCode';
import SendCodeBtn from './components/SendCodeBtn';
import FromTemplate from './pageTemplate/FormTemplate';
import PasswordInput from './components/PasswordInput';
import { register } from '../../../redux/actions/account';
import { connect } from 'react-redux';

function CodeAndPassword({ auth_data, register }) {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const passwordEl = useRef(null);

  const onSubmit = () => {
    register({ code, password, phone_number: auth_data.phone_number });
  };

  return (
    <FromTemplate
      onSubmit={onSubmit}
      title="ثبت‌نام"
      submitText="ادامه"
      formContent={
        <>
          <Typography component="h4" variant="h5" align="left">
            کد ارسال شده را وارد نمایید:
          </Typography>

          <Box mb={3} mt={1}>
            <CustomVerificationCode
              length={6}
              placeholder=""
              onChange={(newCode) => {
                if (newCode.length === 6 && newCode % 10 !== code % 10) {
                  passwordEl.current.focus();
                }
                setCode(newCode);
              }}
            />
          </Box>
          <Box>
            <PasswordInput
              label="انتخاب رمز عبور"
              placeholder="رمز عبور حساب کاربری خود را تعیین کنید"
              inputRef={passwordEl}
              onChange={setPassword}
            />
          </Box>
        </>
      }
      formAction={<SendCodeBtn />}
    />
  );
}

const mapStateToProps = (state) => ({
  auth_data: state.account.auth_data,
});

export default connect(mapStateToProps, { register })(CodeAndPassword);
