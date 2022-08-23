import {
  Button,
  Grid,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC, useRef, useState } from 'react';
import { connect } from 'react-redux';
import {
  addTeamsViaCSVAction,
} from '../../../../redux/slices/events';
import { EventType } from '../../../../types/models';

type AddTeamsViaCSVPropsType = {
  addTeamsViaCSV: any;
  event: EventType;
}

const AddTeamsViaCSV: FC<AddTeamsViaCSVPropsType> = ({
  addTeamsViaCSV,
  event,
}) => {
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const submit = () => {
    addTeamsViaCSV({ registrationFormId: event?.registration_form, file })
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
    <>
      <Grid item xs={12}>
        <Typography variant='h4'>
          {'افزودن تیم‌ها از طریق فایل csv'}
        </Typography>
      </Grid>
      <Grid item container xs spacing={1}>
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
    </>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
});

export default connect(mapStateToProps, {
  addTeamsViaCSV: addTeamsViaCSVAction,
})(AddTeamsViaCSV);
