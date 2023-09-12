import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import isNumber from '../../utils/validators/isNumber';

const GoToAnswer = () => {
  const navigate = useNavigate();
  const { programId, fsmId } = useParams();
  const [answerId, setAnswerId] = useState();

  return (
    <Grid
      container item
      justify='center'
      alignItems='center'
      xs={12} sm={8} md={4}>
      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Grid item container>
            <Grid container item justify='center' spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom variant='h2' align='center'>
                  {'شناسه پاسخ خود را وارد کنید'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label='شناسه' value={answerId} onChange={(e) => isNumber(e.target.value) ? setAnswerId(e.target.value) : {}} />
              </Grid>
              <Grid item xs={12}>
                <Button variant='contained' fullWidth onClick={() => { navigate(`/program/${programId}/fsm/${fsmId}/manage/correction/${answerId}/`) }}>
                  {'ثبت'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default GoToAnswer;