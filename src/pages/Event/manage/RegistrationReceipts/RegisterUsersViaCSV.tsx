import {
  Button,
  Grid,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  registerUsersViaCSVAction,
} from '../../../../redux/slices/events';
import { EventType } from '../../../../types/models';

type RegisterUsersViaCSVPropsType = {
  registerUsersViaCSV: any;
  event: EventType;
}

const RegisterUsersViaCSV: FC<RegisterUsersViaCSVPropsType> = ({
  registerUsersViaCSV,
  event,
}) => {
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const submit = () => {
    registerUsersViaCSV({ registrationFormId: event?.registration_form, file })
  }

  const changeFile = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const clearFile = (e) => {
    e.preventDefault();
    setFile(null);
    fileRef.current.value = null;
  }

  return (
    <Stack spacing={1}>
      <Stack direction='row' spacing={1} alignItems='flex-end'>
        <Typography variant='h4' component="h2">
          {'افزودن کاربران از طریق فایل csv'}
        </Typography>
        <Typography>
          <Link style={{ textDecoration: 'none' }} target="_blank" download to={"/register-participants-sample.csv"}>{'(نمونه فایل)'}</Link>
        </Typography>
      </Stack>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Stack direction='row' spacing={1}>
            <Button
              component="label"
              htmlFor={"csv-info-input"}
              sx={{ whiteSpace: 'nowrap' }}
              variant="contained"
              color="secondary">
              انتخاب فایل
            </Button>
            <input
              ref={fileRef}
              accept=".csv"
              id={"csv-info-input"}
              style={{ display: 'none' }}
              type="file"
              onChange={changeFile} />
            {file?.name &&
              <Button
                size="small"
                variant='outlined'
                sx={{
                  whiteSpace: 'nowrap',
                }}
                endIcon={
                  <IconButton size='small' onClick={clearFile}>
                    <ClearIcon sx={{ fontSize: 14 }} />
                  </IconButton>
                }>
                {file?.name}
              </Button>
            }
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            disabled={!file}
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}>
            {'ارسال'}
          </Button>
        </Grid>
      </Grid>
    </Stack >
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
});

export default connect(mapStateToProps, {
  registerUsersViaCSV: registerUsersViaCSVAction,
})(RegisterUsersViaCSV);
