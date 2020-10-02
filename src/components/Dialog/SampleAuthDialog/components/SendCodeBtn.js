import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { phoneAuth } from '../../../../redux/actions/account';
import { connect } from 'react-redux';

function SendCodeBtn({ phoneAuth, auth_data }) {
  const [remainingTime, setRemainingTime] = useState(120);
  const resendCode = () => {
    phoneAuth({ phone_number: auth_data.phone_number });
    setRemainingTime(120);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setRemainingTime(remainingTime - 1);
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <>
      <small>
        کد ۶ رقمی فعال‌سازی برای شما به شماره {auth_data.phone_number} ارسال
        گردید.
      </small>
      {remainingTime > 0 ? (
        <Typography component="h5" variant="h6" align="left">
          ارسال مجدد کد فعال‌سازی
          {` (${Math.floor(remainingTime / 60)}:${Math.floor(
            (remainingTime % 60) / 10
          )}${remainingTime % 10})`}
        </Typography>
      ) : (
        <div>
          <Button onClick={resendCode}>ارسال مجدد کد فعال‌سازی</Button>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  auth_data: state.account.auth_data,
});

export default connect(mapStateToProps, { phoneAuth })(SendCodeBtn);
