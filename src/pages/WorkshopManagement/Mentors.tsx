import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Pagination } from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  getEventWorkshopsAction,
} from '../../redux/slices/events';
import { addMentorToWorkshopAction } from '../../redux/slices/events';
import { toEnglishNumber } from '../../utils/translateNumber';

type IndexProps= {
  addMentorToWorkshop: Function,
  getEventWorkshops: Function,
  fsmId: number,
}

const Index: FC<IndexProps> = ({
  addMentorToWorkshop,
  getEventWorkshops,
  fsmId,
}) => {
  const { eventId } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [properties, setProperties] = useState({
    username: '',
    fsmId: fsmId,
  });

  useEffect(() => {
    getEventWorkshops({ eventId, pageNumber });
  }, [pageNumber]);

  const putData = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: toEnglishNumber(e.target.value),
    });
  };

  const addMentor = () => {
    addMentorToWorkshop(properties);
  };

  return (
    <>
      <Grid
        container
        item
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction="row">

        <Grid item container xs={12} spacing={2}>
          <Grid item>
            <Typography variant='h2'>
              {'افزودن همیار به کارگاه'}
            </Typography>
          </Grid>
        </Grid>

        <Grid item container xs spacing={1} justifyContent="space-evenly">
          <Grid item xs={12} sm={4}>
            <TextField
              value={properties.username}
              size="small"
              fullWidth
              variant="outlined"
              label="شماره تلفن"
              name="username"
              inputProps={{ className: 'ltr-input' }}
              onChange={putData}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              disabled={!properties.username || !properties.fsmId}
              fullWidth
              variant="contained"
              color="primary"
              onClick={addMentor}>
              {'بیافزا'}
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </>
  );
}
const mapStateToProps = (state) => ({
  fsmId: state.workshop.workshop.id,
});

export default connect(mapStateToProps, {
  addMentorToWorkshop: addMentorToWorkshopAction,
  getEventWorkshops: getEventWorkshopsAction,
})(Index);
