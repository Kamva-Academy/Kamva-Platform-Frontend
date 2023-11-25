import { Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  applyDiscountCodeAction,
  getOneRegistrationFormAction,
  purchaseEventAction,
  submitRegistrationFormAction,
} from 'redux/slices/events';
import { addNotificationAction } from 'redux/slices/notifications';
import { toPersianNumber } from 'utils/translateNumber';

const Payment = ({
  purchaseEvent,
  addNotification,
  applyDiscountCode,

  discountedPrice,
  program,
}) => {
  const [discountCode, setDiscountCode] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(program.merchandise.price);
  }, [program]);

  useEffect(() => {
    if (discountedPrice) {
      setPrice(discountedPrice);
    }
  }, [discountedPrice]);

  const goForPurchase = () => {
    purchaseEvent({ merchandise: program.merchandise.id, code: discountCode });
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
      merchandise: program.merchandise.id,
      code: discountCode,
    });
  };

  return (
    <Stack spacing={4}  >
      <Typography align="center"
        sx={{
          fontSize: 40,
          fontWeight: 600,
          textShadow: '1px 1px #dbd9d9',
        }}>
        {'پرداخت هزینه'}
      </Typography>
      <Stack component={Paper} padding={2}>
        <Grid container spacing={2}>
          <Grid item container justifyContent="center" alignItems="center">
            <Typography variant='h6' align="center">
              {'شما برای شرکت در این دوره پذیرفته‌شده‌اید! توجه کنید تا پرداخت خود را انجام ندهید، ثبت‌نامتان قطعی نشده است.'}
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
        </Grid>
      </Stack>
    </Stack>
  );
};

const mapStateToProps = (state) => ({
  program: state.events.event,
  discountedPrice: state.events.discountedPrice,
});

export default connect(mapStateToProps, {
  getOneRegistrationForm: getOneRegistrationFormAction,
  purchaseEvent: purchaseEventAction,
  submitRegistrationForm: submitRegistrationFormAction,
  addNotification: addNotificationAction,
  applyDiscountCode: applyDiscountCodeAction,
})(Payment);
