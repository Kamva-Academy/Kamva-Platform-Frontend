import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useParams } from 'react-router-dom';
import Widget, { WidgetModes } from '../components/Widget';
import {
  getOneRegistrationReceiptAction,
  validateRegistrationReceiptAction,
} from '../redux/slices/events'
import { faSeri } from '../utils/translateNumber';
import Layout from './Layout';
import { toast } from 'react-toastify';

function RegistrationReceipt({
  getOneRegistrationReceipt,
  validateRegistrationReceipt,

  registrationReceipt,
}) {
  const t = useTranslate();
  const { registrationReceiptId } = useParams();
  const [status, setStatus] = useState<string>(null);

  useEffect(() => {
    getOneRegistrationReceipt({ registrationReceiptId });
  }, [])

  useEffect(() => {
    if (registrationReceipt?.status) {
      setStatus(registrationReceipt.status);
    }
  }, [registrationReceipt])

  const userProfile = registrationReceipt?.user;
  const answers = registrationReceipt?.answers;

  const handleButtonClick = () => {
    if (!status) {
      toast.error('لطفاً وضعیت را تعیین کن!');
      return;
    }
    validateRegistrationReceipt({ registrationReceiptId, status });
  }

  return (
    <Layout>
      <Grid container spacing={2} alignItems='flex-start'>
        <Grid xs={12} sm={8} container item>
          <Stack component={Paper} spacing={2} sx={{ padding: 1, width: '100%' }}>
            {answers?.length > 0 ?
              answers.map((answer, index) => (
                <Widget key={index} coveredWithPaper={false} mode={WidgetModes.Review} widget={{ last_submitted_answer: answer, ...answer }} />
              )) :
              <Typography variant='h4' sx={{ padding: 2 }} textAlign='center'>
                {'پاسخی در این رسید ثبت‌نام وجود ندارد!'}
              </Typography>
            }
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack component={Paper} spacing={2} sx={{ padding: 1, width: '100%' }}>
            {userProfile &&
              <>
                <Typography align='center' variant='h2'>
                  {(userProfile.first_name && userProfile.last_name) ? `${userProfile.first_name} ${userProfile.last_name}` : 'بی‌نام'}
                </Typography>
                <Divider />
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography >{`پایه‌ی ${userProfile.school_studentship?.grade ? faSeri(userProfile.school_studentship?.grade) : '؟'}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography >{`جنسیت: ${userProfile.gender == 'Male' ? 'پسر' : (userProfile.gender == 'Female' ? 'دختر' : '؟')}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography >{`استان: ${userProfile.province ? userProfile.province : '؟'}`}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography >{`شهر: ${userProfile.city ? userProfile.city : '؟'}`}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography >{`شماره تماس: ${userProfile.phone_number ? userProfile.phone_number : '؟'}`}</Typography>
                  </Grid>
                </Grid>

                {/* <Grid item container justify='center'>
              <Button
                fullWidth variant='outlined'
                className={classes.lastUploadButton}
                disabled={!userProfile.school_studentship?.document}
                href={userProfile.school_studentship?.document}
                component="a" target="_blank">
                {'مشاهده‌ی مدرک تحصیلی'}
              </Button>
            </Grid> */}
                {/* <Divider /> */}
                {status &&
                  <>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>وضعیت ثبت‌نام</InputLabel>
                      <Select
                        value={status}
                        disabled={registrationReceipt?.is_participating}
                        onChange={(e) => setStatus(e.target.value)}
                        name='status'
                        label='وضعیت ثبت‌نام'
                      >
                        <MenuItem value={'Waiting'} >{'منتظر'}</MenuItem>
                        <MenuItem value={'Accepted'} >{'مجاز به پرداخت'}</MenuItem>
                        <MenuItem value={'Rejected'} >{'ردشده'}</MenuItem>
                      </Select>
                    </FormControl >
                    <Box mt={1}>
                      <Button
                        disabled={registrationReceipt?.is_participating}
                        fullWidth variant='contained'
                        onClick={handleButtonClick}
                        color='primary'>
                        {registrationReceipt?.is_participating ? 'ثبت‌نام قطعی است' : 'ثبت'}
                      </Button>
                    </Box>
                  </>
                }
              </>}
          </Stack>
        </Grid>
      </Grid>
    </Layout >
  );
}

const mapStateToProps = (state) => ({
  registrationReceipt: state.events.registrationReceipt,
});

export default connect(mapStateToProps, {
  getOneRegistrationReceipt: getOneRegistrationReceiptAction,
  validateRegistrationReceipt: validateRegistrationReceiptAction,
})(RegistrationReceipt);
