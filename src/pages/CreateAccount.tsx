import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  createAccountAction,
  getVerificationCodeAction,
} from '../redux/slices/account';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNotificationAction } from '../redux/slices/notifications';
import appendPreviousParams from '../utils/AppendPreviousParams';
import isNumber from '../utils/validators/isNumber';
import isPhoneNumber from '../utils/validators/isPhoneNumber';

type CreateAccountPropsType = {
  isFetching: boolean;
  createAccount: any;
  getVerificationCode: any;
  addNotification: any;
  token: string;
}

const CreateAccount: FC<CreateAccountPropsType> = ({
  isFetching,
  createAccount,
  getVerificationCode,
  addNotification,
  token,
}) => {
  const navigate = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    confirmationPassword: '',
    code: '',
  });

  const urlParams = new URLSearchParams(window.location.search);
  const programId = urlParams.get('private_event_enter');

  useEffect(() => {
    if (token) {
      if (programId) {
        navigate(`/program/${programId}/`);
      } else {
        navigate('/programs/');
      }
    }
  }, [programId, navigate, token])

  const collectData = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleGettingVerificationCode = () => {
    if (!isPhoneNumber(data.phoneNumber)) {
      addNotification({
        message: 'شماره تلفن وارد‌شده معتبر نیست',
        type: 'error',
      });
      return;
    }
    setButtonDisable(true);
    getVerificationCode({
      phoneNumber: data.phoneNumber,
      codeType: 'verify',
    }).then(() => {
      setTimeout(() => {
        setButtonDisable(false);
      }, 60000);
    });
  };

  const handleCreatingAccount = () => {
    const { phoneNumber, password, confirmationPassword, firstName, lastName } = data;
    if (!phoneNumber || !password || !confirmationPassword || !firstName || !lastName) {
      addNotification({
        message: 'همه‌ی موارد خواسته شده را پر کن',
        type: 'error',
      });
      return;
    }

    if (password !== confirmationPassword) {
      addNotification({
        message: 'رمزهای وارد شده مشابه نیستند',
        type: 'error',
      });
      return;
    }
    createAccount(data);
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Stack width={400} component={Paper} sx={{ padding: 2 }} spacing={1.5}>

        <Typography gutterBottom variant='h2' align='center'>{'ایجاد حساب کاربری'}</Typography>

        <TextField
          variant="outlined"
          fullWidth
          onChange={collectData}
          value={data.firstName}
          name="firstName"
          label="نام"
        />

        <TextField
          variant="outlined"
          fullWidth
          onChange={collectData}
          value={data.lastName}
          name="lastName"
          label="نام خانوادگی"
        />

        <TextField
          variant="outlined"
          fullWidth
          onChange={(e) => {
            if (isNumber(e.target.value)) {
              collectData(e);
            }
          }}
          value={data.phoneNumber}
          name="phoneNumber"
          label="شماره تلفن همراه"
          inputProps={{ className: 'ltr-input' }}
          type="tel"
        />

        <Stack direction='row' spacing={1}>
          <TextField
            variant="outlined"
            fullWidth
            onChange={(e) => {
              if (isNumber(e.target.value)) {
                collectData(e);
              }
            }}
            value={data.code}
            name="code"
            label="کد تایید پیامک‌شده"
            inputProps={{ className: 'ltr-input' }}
            autoComplete='false'
          />
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{
              width: '40%',
              whiteSpace: 'nowrap',
            }}
            onClick={handleGettingVerificationCode}
            disabled={buttonDisable}>
            {buttonDisable ? '۱ دقیقه صبر کن' : 'دریافت کد'}
          </Button>
        </Stack>

        <TextField
          variant="outlined"
          fullWidth
          onChange={collectData}
          label="گذرواژه"
          name="password"
          inputProps={{ className: 'ltr-input' }}
          type="password"
        />

        <TextField
          variant="outlined"
          fullWidth
          onChange={collectData}
          label="تکرار گذرواژه"
          type="password"
          inputProps={{ className: 'ltr-input' }}
          name="confirmationPassword"
        />

        <Button
          onClick={handleCreatingAccount}
          variant="contained"
          color="primary"
          disabled={isFetching}
          fullWidth>
          ثبت
        </Button>

        <Typography align="center">
          <Link style={{ textDecoration: 'none' }} to={appendPreviousParams("/login")}>
            {'از قبل حساب کاربری داشتم...'}
          </Link>
        </Typography>
      </Stack>
    </Container >
  )
}

const mapStateToProps = (state) => ({
  token: state.account.token,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  createAccount: createAccountAction,
  getVerificationCode: getVerificationCodeAction,
  addNotification: addNotificationAction,
})(CreateAccount);
