import {
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import {makeStyles} from '@mui/styles'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  createDiscountCodeAction,
  deleteDiscountCodeAction,
  getAllMerchandiseDiscountCodesAction,
} from '../../../redux/slices/account';
import {
  addNotificationAction,
} from '../../../redux/slices/notifications';
import { toEnglishNumber, toPersianNumber } from '../../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
}));

function Index({
  addNotification,
  createDiscountCode,
  deleteDiscountCode,
  getAllMerchandiseDiscountCodes,

  event,
  userAccount,
  discountCodes,
}) {
  const [value, setValue] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    if (event?.merchandise?.id) {
      getAllMerchandiseDiscountCodes({ merchandiseId: event?.merchandise?.id });
    }
  }, [getAllMerchandiseDiscountCodes, event?.merchandise?.id])

  const handleCreateDiscountCode = () => {
    if (!username) {
      addNotification({
        message: 'شماره تلفن کاربر مورد نظر را وارد کنید..',
        type: 'error',
      });
      return;
    }
    if (value > 100 || value < 0 || value.toString().includes('.')) {
      addNotification({
        message: 'لطفاً عددی طبیعی بین ۰ تا ۱۰۰ وارد کنید.',
        type: 'error',
      });
      return;
    }
    createDiscountCode({ value: (value / 100), merchandise: event?.merchandise?.id, username });
  }

  const handleDeleteDiscountCode = (discountCodeId) => {
    deleteDiscountCode({ discountCodeId })
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={12}>
          <Typography variant='h4'>
            {'ایجاد کد تخفیف'}
          </Typography>
        </Grid>
        <Grid item container xs spacing={1}>
          <Grid item xs={12} sm={4} >
            <TextField
              size='small' fullWidth
              variant='outlined'
              label='شماره تلفن'
              inputProps={{ className: 'ltr-input' }}
              value={username} onChange={(e) => setUsername(toEnglishNumber(e.target.value))} />
          </Grid>
          <Grid item xs={12} sm={4} >
            <TextField
              size='small' fullWidth
              variant='outlined'
              label='درصد تخفیف'
              inputProps={{ className: 'ltr-input' }}
              value={value} onChange={(e) => setValue(toEnglishNumber(e.target.value))} />
          </Grid>
          <Grid item xs={12} sm={4} >
            <Button
              fullWidth variant='contained'
              color='primary'
              onClick={handleCreateDiscountCode}>{'ایجاد'}</Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h4'>
            {'کدهای تخفیف موجود'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>صاحب</TableCell>
                  <TableCell align='center'>شماره</TableCell>
                  <TableCell align='center'>کد</TableCell>
                  <TableCell align='center'>درصد تخفیف</TableCell>
                  <TableCell align='center'>دفعات باقی‌مانده</TableCell>
                  <TableCell align='center'>حذف</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {discountCodes?.map((discountCode, index) =>
                  <TableRow key={index}>
                    <TableCell align='center'>
                      {discountCode?.first_name && discountCode.last_name ?
                        `${discountCode?.first_name} ${discountCode.last_name}` :
                        '-'
                      }
                    </TableCell>
                    <TableCell align='center'>
                      {discountCode?.phone_number || '-'}
                    </TableCell>
                    <TableCell align='center'>
                      {discountCode?.code}
                    </TableCell>
                    <TableCell align='center'>
                      {toPersianNumber(discountCode?.value)}
                    </TableCell>
                    <TableCell align='center'>
                      {toPersianNumber(discountCode?.remaining)}
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton size='small'
                        onClick={() => { handleDeleteDiscountCode(discountCode?.id) }}>
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  event: state.events.event,
  userAccount: state.account.userAccount,
  newDiscountCode: state.account.newDiscountCode,
  discountCodes: state.account.discountCodes,
});

export default connect(
  mapStateToProps,
  {
    addNotification: addNotificationAction,
    createDiscountCode: createDiscountCodeAction,
    deleteDiscountCode: deleteDiscountCodeAction,
    getAllMerchandiseDiscountCodes: getAllMerchandiseDiscountCodesAction,
  }
)(Index);
