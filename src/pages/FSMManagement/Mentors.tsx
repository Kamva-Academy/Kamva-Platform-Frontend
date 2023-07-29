import {
  Button,
  Divider,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import {
  getEventWorkshopsAction,
} from '../../redux/slices/events';
import { addMentorToWorkshopAction } from '../../redux/slices/events';
import { getAllWorkshopMentorsAction, removeMentorFromWorkshopAction } from '../../redux/slices/workshop';
import { Mentor } from '../../types/models';
import { toEnglishNumber } from '../../utils/translateNumber';

type MentorsPropsType = {
  addMentorToWorkshop: Function,
  getEventWorkshops: Function,
  getAllWorkshopMentors: Function,
  removeMentorFromWorkshop: Function,
  fsmId: number,
  workshopMentors: Mentor[],
}

const Mentors: FC<MentorsPropsType> = ({
  addMentorToWorkshop,
  getEventWorkshops,
  getAllWorkshopMentors,
  removeMentorFromWorkshop,
  fsmId,
  workshopMentors = []
}) => {
  const { eventId } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [properties, setProperties] = useState({
    username: '',
    fsmId: fsmId,
  });

  useEffect(() => {
    if(fsmId){
      getAllWorkshopMentors({ fsmId })
    }
  }, [fsmId])

  useEffect(() => {
    getEventWorkshops({ eventId, pageNumber });
  }, [pageNumber]);

  const putData = (e) => {
    setProperties({
      ...properties,
      [e.target.name]: toEnglishNumber(e.target.value),
    });
  };

  const addMentor = async () => {
    await addMentorToWorkshop(properties);
    setProperties(prevProps => ({ ...prevProps, username: '' }))
    getAllWorkshopMentors({ fsmId })
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
          <Grid item xs={12} sm={6}>
            <TextField
              value={properties.username}
              size="small"
              fullWidth
              variant="outlined"
              label="نام کاربری"
              name="username"
              inputProps={{ className: 'ltr-input' }}
              onChange={putData}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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

      <Divider sx={{ margin: '30px auto' }}></Divider>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>ردیف</TableCell>
              <TableCell align='center'>نام</TableCell>
              <TableCell align='center'>نام خانوادگی</TableCell>
              <TableCell align='center'>شماره تماس</TableCell>
              <TableCell align='center'>ایمیل</TableCell>
              <TableCell align='center'>عملیات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshopMentors.map((mentor, index) =>
              <TableRow key={index}>
                <TableCell align='center'>
                  {index + 1}
                </TableCell>
                <TableCell align='center'>
                  {mentor.first_name || '-'}
                </TableCell>
                <TableCell align='center'>
                  {mentor.last_name || '-'}
                </TableCell>
                <TableCell align='center'>
                  {mentor.phone_number || '-'}
                </TableCell>
                <TableCell align='center'>
                  {mentor.email || '-'}
                </TableCell>
                <TableCell align='center'>
                  <Tooltip title='حذف همیار' arrow>
                    <IconButton size='small'
                      onClick={async () => {
                        // TODO: Hashem
                        await removeMentorFromWorkshop({ fsmId, mentor: {username: mentor.phone_number} })
                        getAllWorkshopMentors({ fsmId })
                      }}>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const mapStateToProps = (state) => ({
  fsmId: state.workshop.workshop?.id,
  workshopMentors: state.workshop.allWorkshopMentors,
});

export default connect(mapStateToProps, {
  addMentorToWorkshop: addMentorToWorkshopAction,
  getEventWorkshops: getEventWorkshopsAction,
  getAllWorkshopMentors: getAllWorkshopMentorsAction,
  removeMentorFromWorkshop: removeMentorFromWorkshopAction,
})(Mentors);
