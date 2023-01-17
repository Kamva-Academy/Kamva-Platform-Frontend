import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAction } from '../redux/slices/account';
import { addNotificationAction } from '../redux/slices/notifications';
import appendPreviousParams from '../utils/AppendPreviousParams';
import { toEnglishNumber } from '../utils/translateNumber';

type LoginPagePropsType = {
  isFetching: boolean;
  login: any;
  addNotification: any;
  token: string;
};

const LoginPage: FC<LoginPagePropsType> = ({
  isFetching,
  login,
  addNotification,
  token,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: '',
    username: '',
  });

  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('private_event_enter');

  useEffect(() => {
    if (token) {
      if (eventId) {
        navigate(`/event/${eventId}/`);
      } else {
        navigate('/events/');
      }
    }
  }, [eventId, navigate, token])


  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(toEnglishNumber(number))) {
      return true;
    } else {
      return false;
    }
  };

  const putData = (event) => {
    setData({
      ...data,
      [event.target.name]: toEnglishNumber(event.target.value),
    });
  };

  const doLogin = () => {
    const { username, password } = data;
    if (!username || !password) {
      return;
    }
    login(data);
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Stack width={400} spacing={2}>
        <Stack width='md' sx={{ padding: 2, width: '100%' }} spacing={1.5} component={Paper}>
          <Typography
            gutterBottom
            component="h1"
            variant="h2"
            align="center">
            {'ورود'}
          </Typography>

          <TextField
            autoComplete="on"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              if (isJustDigits(e.target.value)) {
                putData(e);
              }
            }}
            value={data.username}
            name="username"
            label="نام کاربری"
            // helperText="نام کاربری، شماره تلفن یا شماره شناسنامه‌ی شماست."
            inputProps={{ className: 'ltr-input' }}
          />

          <TextField
            autoComplete="on"
            variant="outlined"
            fullWidth
            onChange={putData}
            label="گذرواژه"
            name="password"
            inputProps={{ className: 'ltr-input' }}
            type="password"
          />

          <Button
            onClick={doLogin}
            variant="contained"
            color="primary"
            disabled={isFetching}
            fullWidth>
            بزن بریم
          </Button>
        </Stack>
        <Stack>
          <Typography gutterBottom align='center'>
            <Link style={{ textDecoration: 'none' }} to={appendPreviousParams('/reset-password')}>
              {'گذروازه‌ام را فراموش کرده‌ام :('}
            </Link>
          </Typography>
          <Typography align='center'>
            <Link style={{ textDecoration: 'none' }} to={appendPreviousParams('/create-account')}>
              {'می‌خواهم یک حساب کاربری جدید بسازم...'}
            </Link>
          </Typography>
        </Stack>
      </Stack>

    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, {
  login: loginAction,
  addNotification: addNotificationAction,
})(LoginPage);
