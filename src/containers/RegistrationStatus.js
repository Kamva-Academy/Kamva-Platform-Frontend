import { Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Stepper from '../components/organisms/Stepper';
import {
  applyDiscountCodeAction,
  getOneEventInfoAction,
  getOneRegistrationFormAction,
  getOneRegistrationReceiptAction,
  purchaseEventAction,
  submitRegistrationFormAction,
} from '../redux/slices/events';
import { addNotificationAction } from '../redux/slices/notifications';
import { toPersianNumber } from '../utils/translateNumber';
import Layout from 'components/template/GeneralLayout';

const Payment = ({
  getOneEventInfo,
  purchaseEvent,
  addNotification,
  applyDiscountCode,
  getOneRegistrationReceipt,

  discountedPrice,
  event,
}) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [discountCode, setDiscountCode] = useState();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    getOneEventInfo({ eventId });
  }, []);

  useEffect(() => {
    if (event?.merchandise?.price) {
      setPrice(event?.merchandise?.price);
    }
  }, [event]);

  useEffect(() => {
    if (discountedPrice) {
      setPrice(discountedPrice);
    }
  }, [discountedPrice]);

  useEffect(() => {
    if (event?.registration_receipt) {
      getOneRegistrationReceipt({ registrationReceiptId: event?.registration_receipt });
    }
  }, [event]);

  const goForPurchase = () => {
    purchaseEvent({ merchandise: event?.merchandise?.id, code: discountCode });
  };

  const submitDiscount = () => {
    if (!discountCode) {
      addNotification({
        message: 'کد تخفیفت را وارد کن!',
        type: 'error',
      });
      return;
    }
    applyDiscountCode({
      merchandise: event?.merchandise?.id,
      code: discountCode,
    });
  };

  useEffect(() => {
    if (event?.is_user_participating) {
      navigate(`/event/${eventId}/`);
    }
    if (event?.user_registration_status && !['Waiting', 'Accepted', 'Rejected'].includes(event?.user_registration_status)) {
      navigate('/events/');
    }
  }, [event])

  let step = 1;
  if (event?.user_registration_status == 'Accepted') step++;

  return (
    <Layout>
      <Stack spacing={4}>
        <Typography align="center"
          sx={{
            fontSize: 40,
            fontWeight: 600,
            textShadow: '1px 1px #dbd9d9',
          }}>
          {'وضعیت ثبت‌نام'}
        </Typography>

        <Stepper step={step} />

        <Stack component={Paper} padding={2}>
          <Grid container spacing={2}>

            {event?.user_registration_status == 'Accepted' && (
              <>
                <Grid item container justifyContent="center" alignItems="center">
                  <Typography variant='h6' align="center">
                    {'شما برای شرکت در این رویداد پذیرفته‌شده‌اید! توجه کنید تا پرداخت خود را انجام ندهید، ثبت‌نامتان قطعی نشده است.'}
                  </Typography>
                </Grid>
                <Grid container item justifyContent="center" alignItems='end' spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="کد تخفیف"
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={submitDiscount}>
                        {'اعمال'}
                      </Button>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={1}>
                      <Typography align="center" gutterBottom>
                        {'مبلغ قابل پرداخت:'}
                      </Typography>
                      <Typography
                        align="center"
                        sx={{
                          fontSize: 25,
                          fontWeight: 400,
                        }}>
                        {`${toPersianNumber(price)} تومان`}
                      </Typography>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={goForPurchase}>
                        {'پرداخت'}
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </>
            )}

            {event?.user_registration_status == 'Waiting' && (
              <>
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}>
                  <Typography align="center">
                    {
                      'شما فرم‌ثبت‌نام در این رویداد را پر کرده‌اید! منتظر نتیجه‌ی بررسی از جانب ما باشید.'
                    }
                  </Typography>
                </Grid>
              </>
            )}

            {event?.user_registration_status == 'Rejected' && (
              <>
                <Grid
                  item
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}>
                  <Typography align="center">
                    {'متاسفانه شما برای شرکت در این رویداد پذیرفته‌نشده‌اید :('}
                  </Typography>
                </Grid>
              </>
            )}

          </Grid>
        </Stack>
      </Stack>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  event: state.events.event,
  discountedPrice: state.events.discountedPrice,
});

export default connect(
  mapStateToProps,
  {
    getOneRegistrationForm: getOneRegistrationFormAction,
    getOneEventInfo: getOneEventInfoAction,
    purchaseEvent: purchaseEventAction,
    submitRegistrationForm: submitRegistrationFormAction,
    addNotification: addNotificationAction,
    applyDiscountCode: applyDiscountCodeAction,
    getOneRegistrationReceipt: getOneRegistrationReceiptAction,
  }
)(Payment);
