import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(2),
  }
}));


function Index({
  inviteSomeone,
  handleClose,

  invitee,
  teamId,
  open,
}) {
  const classes = useStyles()
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const sendInvitation = () => {
    if (!phoneNumber) return;
    console.log(teamId, invitee, phoneNumber)
    inviteSomeone({ teamId, invitee, username: phoneNumber });
    handleClose();
  }

  const isJustDigits = (number) => {
    var regex = new RegExp(`\\d{${number.length}}`);
    if (regex.test(number)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Dialog maxWidth="sm" open={open} onClose={handleClose}  >
      <DialogContent>
        <Typography gutterBottom >
          {'شماره تلفن فرد مورد نظر را وارد کنید.'}
        </Typography>
        <TextField
          fullWidth variant='outlined'
          value={phoneNumber}
          onChange={e => {
            if (isJustDigits(e.target.value)) {
              setPhoneNumber(e.target.value);
            }
          }}
          inputProps={{ className: 'ltr-input' }} />
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained' color='primary'
          fullWidth onClick={sendInvitation}>
          {'ارسال دعوت‌نامه'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Index;