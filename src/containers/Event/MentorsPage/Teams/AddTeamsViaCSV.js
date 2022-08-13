import {
  Button,
  Grid,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import {
  addTeamsViaCSVAction,
} from '../../../../redux/slices/events';

function Index({
  addTeamsViaCSV,
  event,
}) {

  const { fsmId } = useParams();
  const [file, setFile] = useState();

  const doCreateTeams = () => {
    addTeamsViaCSV({ registrationFormId: event?.registration_form, file })
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };


  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h4'>
          {'افزودن تیم‌ها از طریق فایل csv'}
        </Typography>
      </Grid>
      <Grid item container xs spacing={1}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              document.getElementById('csv-info').click()
            }>
            انتخاب فایل
          </Button>
          <input
            accept=".csv"
            id="csv-info"
            style={{ display: 'none' }}
            type="file"
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            disabled={!file}
            fullWidth
            variant="contained"
            color="primary"
            onClick={doCreateTeams}>
            {'بساز'}
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
})(Index);
